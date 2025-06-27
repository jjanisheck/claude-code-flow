/**
 * Ollama/Gemma instance management commands
 */

import { Command } from '@cliffy/command';
import { colors } from '@cliffy/ansi/colors';
import { spawn } from 'node:child_process';
import { generateId } from '../../utils/helpers.js';

export const ollamaCommand = new Command()
  .description('Manage Ollama/Gemma instances')
  .action(() => {
    ollamaCommand.showHelp();
  })
  .command('spawn', new Command()
    .description('Spawn a new Ollama/Gemma instance with specific configuration')
    .arguments('<task:string>')
    .option('-m, --model <model:string>', 'Gemma model to use', { 
      default: 'gemma3n:e2b' 
    })
    .option('--host <host:string>', 'Ollama host', { default: 'localhost:11434' })
    .option('--temperature <temp:number>', 'Generation temperature', { default: 0.7 })
    .option('--context <context:number>', 'Context length', { default: 8192 })
    .option('--mode <mode:string>', 'Development mode (full, backend-only, frontend-only, api-only)', {
      default: 'full'
    })
    .option('--coverage <coverage:number>', 'Test coverage target', { default: 80 })
    .option('--commit <frequency:string>', 'Commit frequency (phase, feature, manual)', {
      default: 'phase'
    })
    .option('-v, --verbose', 'Enable verbose output')
    .option('--dry-run', 'Show what would be executed without running')
    .action(async (options: any, task: string) => {
      try {
        const instanceId = generateId('gemma');
        
        // Build Ollama command args
        const ollamaArgs = ['run'];
        
        // Add model
        ollamaArgs.push(options.model);
        
        // Format the task as a complete prompt
        const prompt = `You are an AI assistant helping with development tasks. Please complete the following task:

${task}

Mode: ${options.mode}
Coverage Target: ${options.coverage}%
Commit Frequency: ${options.commit}

Please provide a detailed response with code, explanations, and any necessary steps.`;
        
        ollamaArgs.push(prompt);
        
        if (options.dryRun) {
          console.log(colors.yellow('DRY RUN - Would execute:'));
          console.log(colors.gray(`ollama ${ollamaArgs.join(' ')}`));
          console.log('\nConfiguration:');
          console.log(`  Instance ID: ${instanceId}`);
          console.log(`  Model: ${options.model}`);
          console.log(`  Host: ${options.host}`);
          console.log(`  Task: ${task}`);
          console.log(`  Mode: ${options.mode}`);
          console.log(`  Temperature: ${options.temperature}`);
          console.log(`  Context: ${options.context}`);
          console.log(`  Coverage: ${options.coverage}%`);
          console.log(`  Commit: ${options.commit}`);
          return;
        }
        
        console.log(colors.green(`Spawning Ollama/Gemma instance: ${instanceId}`));
        console.log(colors.gray(`Model: ${options.model}`));
        console.log(colors.gray(`Task: ${task}`));
        
        // Spawn Ollama process
        const ollama = spawn('ollama', ollamaArgs, {
          stdio: 'inherit',
          env: {
            ...process.env,
            OLLAMA_HOST: options.host,
            OLLAMA_INSTANCE_ID: instanceId,
            OLLAMA_FLOW_MODE: options.mode,
            OLLAMA_FLOW_COVERAGE: options.coverage.toString(),
            OLLAMA_FLOW_COMMIT: options.commit,
            OLLAMA_NUM_CTX: options.context.toString(),
          }
        });
        
        ollama.on('error', (err) => {
          console.error(colors.red('Failed to spawn Ollama:'), err.message);
          console.error(colors.yellow('Make sure Ollama is installed and running:'));
          console.error(colors.gray('  curl -fsSL https://ollama.ai/install.sh | sh'));
          console.error(colors.gray('  ollama pull gemma3n:e2b'));
          console.error(colors.gray('  ollama serve'));
        });
        
        ollama.on('exit', (code) => {
          if (code === 0) {
            console.log(colors.green(`Ollama instance ${instanceId} completed successfully`));
          } else {
            console.log(colors.red(`Ollama instance ${instanceId} exited with code ${code}`));
          }
        });
        
      } catch (error) {
        console.error(colors.red('Failed to spawn Ollama:'), (error as Error).message);
      }
    }),
  )
  .command('batch', new Command()
    .description('Spawn multiple Ollama/Gemma instances from workflow')
    .arguments('<workflow-file:string>')
    .option('--model <model:string>', 'Gemma model to use', { default: 'gemma3n:e2b' })
    .option('--host <host:string>', 'Ollama host', { default: 'localhost:11434' })
    .option('--dry-run', 'Show what would be executed without running')
    .action(async (options: any, workflowFile: string) => {
      try {
        const content = await Deno.readTextFile(workflowFile);
        const workflow = JSON.parse(content);
        
        console.log(colors.green('Loading workflow:'), workflow.name || 'Unnamed');
        console.log(colors.gray(`Tasks: ${workflow.tasks?.length || 0}`));
        
        if (!workflow.tasks || workflow.tasks.length === 0) {
          console.log(colors.yellow('No tasks found in workflow'));
          return;
        }
        
        for (const task of workflow.tasks) {
          const ollamaArgs = ['run', options.model];
          
          // Format task prompt
          const prompt = `You are an AI assistant helping with development tasks. Complete this workflow task:

Task: ${task.name || task.id}
Description: ${task.description || task.name}
${task.type ? `Type: ${task.type}` : ''}

Please provide a detailed response with code, explanations, and any necessary steps.`;
          
          ollamaArgs.push(prompt);
          
          if (options.dryRun) {
            console.log(colors.yellow(`\nDRY RUN - Task: ${task.name || task.id}`));
            console.log(colors.gray(`ollama ${ollamaArgs.join(' ')}`));
          } else {
            console.log(colors.blue(`\nSpawning Ollama for task: ${task.name || task.id}`));
            
            const ollama = spawn('ollama', ollamaArgs, {
              stdio: 'inherit',
              env: {
                ...process.env,
                OLLAMA_HOST: options.host,
                OLLAMA_TASK_ID: task.id || generateId('task'),
                OLLAMA_TASK_TYPE: task.type || 'general',
              }
            });
            
            // Wait for completion if sequential
            if (!workflow.parallel) {
              await new Promise((resolve) => {
                ollama.on('exit', resolve);
              });
            }
          }
        }
        
        if (!options.dryRun && workflow.parallel) {
          console.log(colors.green('\nAll Ollama instances spawned in parallel mode'));
        }
        
      } catch (error) {
        console.error(colors.red('Failed to process workflow:'), (error as Error).message);
      }
    }),
  );