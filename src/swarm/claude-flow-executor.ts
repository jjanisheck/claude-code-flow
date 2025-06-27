/**
 * Ollama/Gemma Flow SPARC Executor
 * Executes tasks using Ollama/Gemma instead of Claude for SPARC system
 */

import { TaskDefinition, AgentState, TaskResult } from './types.js';
import { Logger } from '../core/logger.js';
import * as path from 'node:path';
import { spawn } from 'node:child_process';

export interface ClaudeFlowExecutorConfig {
  logger?: Logger;
  ollamaModel?: string;
  ollamaHost?: string;
  enableSparc?: boolean;
  verbose?: boolean;
  timeoutMinutes?: number;
}

export class ClaudeFlowExecutor {
  private logger: Logger;
  private ollamaModel: string;
  private ollamaHost: string;
  private enableSparc: boolean;
  private verbose: boolean;
  private timeoutMinutes: number;

  constructor(config: ClaudeFlowExecutorConfig = {}) {
    this.logger = config.logger || new Logger(
      { level: 'info', format: 'text', destination: 'console' },
      { component: 'OllamaFlowExecutor' }
    );
    this.ollamaModel = config.ollamaModel || 'gemma3n:e2b';
    this.ollamaHost = config.ollamaHost || 'localhost:11434';
    this.enableSparc = config.enableSparc ?? true;
    this.verbose = config.verbose ?? false;
    this.timeoutMinutes = config.timeoutMinutes ?? 59;
  }

  async executeTask(
    task: TaskDefinition,
    agent: AgentState,
    targetDir?: string
  ): Promise<TaskResult> {
    this.logger.info('Executing task with Ollama/Gemma Flow SPARC', {
      taskId: task.id.id,
      taskName: task.name,
      agentType: agent.type,
      model: this.ollamaModel,
      targetDir
    });

    const startTime = Date.now();

    try {
      // Determine the SPARC mode based on task type and agent type
      const sparcMode = this.determineSparcMode(task, agent);
      
      // Build the Ollama command
      const command = this.buildOllamaCommand(task, sparcMode, targetDir);
      
      this.logger.info('Executing Ollama SPARC command', { 
        mode: sparcMode,
        model: this.ollamaModel,
        command: command.join(' ') 
      });

      // Execute the command
      const result = await this.executeCommand(command);
      
      const endTime = Date.now();
      const executionTime = endTime - startTime;

      return {
        output: result.output,
        artifacts: result.artifacts || {},
        metadata: {
          executionTime,
          sparcMode,
          model: this.ollamaModel,
          command: command.join(' '),
          exitCode: result.exitCode,
          quality: 0.95,
          completeness: 0.9
        },
        error: result.error
      };
    } catch (error) {
      this.logger.error('Failed to execute Ollama Flow SPARC command', { 
        error: error.message,
        taskId: task.id.id 
      });
      
      return {
        output: '',
        artifacts: {},
        metadata: {
          executionTime: Date.now() - startTime,
          quality: 0,
          completeness: 0
        },
        error: error.message
      };
    }
  }

  private determineSparcMode(task: TaskDefinition, agent: AgentState): string {
    // Map task types and agent types to SPARC modes
    const modeMap = {
      // Task type mappings
      'coding': 'code',
      'testing': 'tdd',
      'analysis': 'spec-pseudocode',
      'documentation': 'docs-writer',
      'research': 'spec-pseudocode',
      'review': 'refinement-optimization-mode',
      'deployment': 'devops',
      'optimization': 'refinement-optimization-mode',
      'integration': 'integration',
      
      // Agent type overrides
      'developer': 'code',
      'tester': 'tdd',
      'analyzer': 'spec-pseudocode',
      'documenter': 'docs-writer',
      'reviewer': 'refinement-optimization-mode',
      'researcher': 'spec-pseudocode',
      'coordinator': 'architect'
    };

    // Check for specific keywords in task description
    const description = task.description.toLowerCase();
    if (description.includes('architecture') || description.includes('design')) {
      return 'architect';
    }
    if (description.includes('security')) {
      return 'security-review';
    }
    if (description.includes('debug')) {
      return 'debug';
    }
    if (description.includes('test')) {
      return 'tdd';
    }
    if (description.includes('document')) {
      return 'docs-writer';
    }
    if (description.includes('integrate')) {
      return 'integration';
    }

    // Use agent type first, then task type
    return modeMap[agent.type] || modeMap[task.type] || 'code';
  }

  private buildOllamaCommand(task: TaskDefinition, mode: string, targetDir?: string): string[] {
    const command = ['ollama', 'run', this.ollamaModel];

    // Build a comprehensive prompt based on SPARC mode
    const prompt = this.buildSparcPrompt(task, mode, targetDir);
    command.push(prompt);

    return command;
  }

  private buildSparcPrompt(task: TaskDefinition, mode: string, targetDir?: string): string {
    const taskDescription = this.formatTaskDescription(task);
    
    // Map SPARC modes to specific prompts for Gemma
    const sparcPrompts = {
      'code': `You are an expert software developer. Write clean, efficient, and well-documented code for the following task:

${taskDescription}

${targetDir ? `Target directory: ${targetDir}` : ''}

Please provide:
1. Complete working code
2. Clear explanations of your approach
3. Any necessary setup instructions
4. Best practices used`,

      'tdd': `You are a test-driven development expert. Implement the following using TDD approach:

${taskDescription}

${targetDir ? `Target directory: ${targetDir}` : ''}

Please provide:
1. Test cases first (failing tests)
2. Minimal code to make tests pass
3. Refactored final implementation
4. Test coverage report`,

      'architect': `You are a software architect. Design a comprehensive system architecture for:

${taskDescription}

${targetDir ? `Target directory: ${targetDir}` : ''}

Please provide:
1. High-level system design
2. Component architecture
3. Data flow diagrams
4. Technology stack recommendations
5. Scalability considerations`,

      'docs-writer': `You are a technical documentation expert. Create comprehensive documentation for:

${taskDescription}

${targetDir ? `Target directory: ${targetDir}` : ''}

Please provide:
1. Clear project overview
2. Installation instructions
3. Usage examples
4. API documentation
5. Contributing guidelines`,

      'spec-pseudocode': `You are a system analyst. Analyze and create detailed specifications for:

${taskDescription}

${targetDir ? `Target directory: ${targetDir}` : ''}

Please provide:
1. Detailed requirements analysis
2. System specifications
3. Pseudocode algorithms
4. Data structures design
5. Edge cases and constraints`,

      'refinement-optimization-mode': `You are a code optimization expert. Review and optimize the following:

${taskDescription}

${targetDir ? `Target directory: ${targetDir}` : ''}

Please provide:
1. Performance analysis
2. Code quality improvements
3. Optimization strategies
4. Refactoring recommendations
5. Best practices implementation`,

      'debug': `You are a debugging expert. Analyze and fix issues in:

${taskDescription}

${targetDir ? `Target directory: ${targetDir}` : ''}

Please provide:
1. Issue identification
2. Root cause analysis
3. Fix implementation
4. Prevention strategies
5. Testing verification`,

      'integration': `You are an integration specialist. Implement integration solutions for:

${taskDescription}

${targetDir ? `Target directory: ${targetDir}` : ''}

Please provide:
1. Integration architecture
2. API connections
3. Data transformation
4. Error handling
5. Integration testing`,

      'security-review': `You are a security expert. Perform security analysis for:

${taskDescription}

${targetDir ? `Target directory: ${targetDir}` : ''}

Please provide:
1. Security assessment
2. Vulnerability identification
3. Risk mitigation strategies
4. Secure coding practices
5. Compliance recommendations`,

      'devops': `You are a DevOps engineer. Implement deployment and operations for:

${taskDescription}

${targetDir ? `Target directory: ${targetDir}` : ''}

Please provide:
1. Deployment pipeline
2. Infrastructure as code
3. Monitoring setup
4. CI/CD configuration
5. Operational procedures`
    };

    return sparcPrompts[mode] || sparcPrompts['code'];
  }

  private formatTaskDescription(task: TaskDefinition): string {
    // Format the task description for SPARC command
    let description = task.description;
    
    // If the task has specific instructions, include them
    if (task.instructions && task.instructions !== task.description) {
      description = `${task.description}. ${task.instructions}`;
    }

    // Add context if available
    if (task.context?.targetDir) {
      description += ` in ${task.context.targetDir}`;
    }

    return description.replace(/"/g, '\\"');
  }

  private async executeCommand(command: string[]): Promise<any> {
    return new Promise((resolve, reject) => {
      const [cmd, ...args] = command;
      
      const proc = spawn(cmd, args, {
        shell: true,
        env: {
          ...process.env,
          OLLAMA_HOST: this.ollamaHost,
          GEMMA_FLOW_NON_INTERACTIVE: 'true',
          GEMMA_FLOW_AUTO_CONFIRM: 'true'
        }
      });

      let stdout = '';
      let stderr = '';
      const artifacts: Record<string, any> = {};

      proc.stdout.on('data', (data) => {
        const chunk = data.toString();
        stdout += chunk;
        
        // Parse artifacts from output
        const artifactMatch = chunk.match(/Created file: (.+)/g);
        if (artifactMatch) {
          artifactMatch.forEach(match => {
            const filePath = match.replace('Created file: ', '').trim();
            artifacts[filePath] = true;
          });
        }
      });

      proc.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      proc.on('close', (code) => {
        clearTimeout(timeoutId); // Clear timeout when process completes
        if (code === 0) {
          resolve({
            output: stdout,
            artifacts,
            exitCode: code,
            error: null
          });
        } else {
          resolve({
            output: stdout,
            artifacts,
            exitCode: code,
            error: stderr || `Command exited with code ${code}`
          });
        }
      });

      proc.on('error', (err) => {
        reject(err);
      });

      // Handle timeout - configurable for SPARC operations
      const timeoutMs = this.timeoutMinutes * 60 * 1000;
      const timeoutId = setTimeout(() => {
        proc.kill('SIGTERM');
        reject(new Error('Command execution timeout'));
      }, timeoutMs);
    });
  }
}

// Export for use in swarm coordinator
export default ClaudeFlowExecutor;