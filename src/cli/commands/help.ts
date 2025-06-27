/**
 * Comprehensive help system for Claude-Flow CLI
 */

import { Command } from '@cliffy/command';
import { colors } from '@cliffy/ansi/colors';
import { Table } from '@cliffy/table';
import { Select } from '@cliffy/prompt';

export const helpCommand = new Command()
  .description('Comprehensive help system with examples and tutorials')
  .arguments('[topic:string]')
  .option('-i, --interactive', 'Start interactive help mode')
  .option('-e, --examples', 'Show examples for the topic')
  .option('--tutorial', 'Show tutorial for the topic')
  .option('--all', 'Show all available help topics')
  .action(async (options: any, topic: string | undefined) => {
    if (options.interactive) {
      await startInteractiveHelp();
    } else if (options.all) {
      showAllTopics();
    } else if (topic) {
      await showTopicHelp(topic, options);
    } else {
      showMainHelp();
    }
  });

interface HelpTopic {
  name: string;
  description: string;
  category: 'basic' | 'advanced' | 'workflow' | 'configuration' | 'troubleshooting';
  examples?: HelpExample[];
  tutorial?: string[];
  related?: string[];
}

interface HelpExample {
  description: string;
  command: string;
  explanation?: string;
}

const HELP_TOPICS: HelpTopic[] = [
  {
    name: 'getting-started',
    description: 'Basic introduction to Claude-Flow',
    category: 'basic',
    tutorial: [
      'Welcome to Claude-Flow! This tutorial will get you started.',
      '1. First, initialize a configuration file:',
      '   ollama-flow config init',
      '',
      '2. Start the orchestration system:',
      '   ollama-flow start',
      '',
      '3. In another terminal, spawn your first agent:',
      '   ollama-flow agent spawn researcher --name "My Research Agent"',
      '',
      '4. Create a task for the agent:',
      '   ollama-flow task create research "Find information about AI trends"',
      '',
      '5. Monitor progress:',
      '   ollama-flow status',
      '',
      'You can also use the interactive REPL mode:',
      '   ollama-flow repl',
      '',
      'For more help, try: ollama-flow help <topic>'
    ],
    related: ['agents', 'tasks', 'configuration']
  },
  {
    name: 'agents',
    description: 'Working with Claude-Flow agents',
    category: 'basic',
    examples: [
      {
        description: 'Spawn a research agent',
        command: 'ollama-flow agent spawn researcher --name "Research Assistant"',
        explanation: 'Creates a new research agent with specialized capabilities for information gathering'
      },
      {
        description: 'List all active agents',
        command: 'ollama-flow agent list',
        explanation: 'Shows all currently running agents with their status and task counts'
      },
      {
        description: 'Get detailed agent information',
        command: 'ollama-flow agent info agent-001',
        explanation: 'Displays comprehensive information about a specific agent'
      },
      {
        description: 'Terminate an agent',
        command: 'ollama-flow agent terminate agent-001',
        explanation: 'Safely shuts down an agent and reassigns its tasks'
      }
    ],
    tutorial: [
      'Agents are the core workers in Claude-Flow. Each agent has:',
      '• A unique ID (automatically generated)',
      '• A name (for easy identification)',
      '• A type (coordinator, researcher, implementer, analyst, custom)',
      '• Capabilities (what the agent can do)',
      '• A system prompt (instructions for the agent)',
      '',
      'Agent Types:',
      '• coordinator: Plans and delegates tasks',
      '• researcher: Gathers and analyzes information',
      '• implementer: Writes code and creates solutions',
      '• analyst: Identifies patterns and generates insights',
      '• custom: User-defined behavior',
      '',
      'Best Practices:',
      '• Use descriptive names for your agents',
      '• Match agent types to your workflow needs',
      '• Monitor agent performance with "ollama-flow status"',
      '• Terminate idle agents to free resources'
    ],
    related: ['tasks', 'workflows', 'coordination']
  },
  {
    name: 'tasks',
    description: 'Creating and managing tasks',
    category: 'basic',
    examples: [
      {
        description: 'Create a research task',
        command: 'ollama-flow task create research "Find papers on quantum computing" --priority 5',
        explanation: 'Creates a high-priority research task with specific instructions'
      },
      {
        description: 'Create a task with dependencies',
        command: 'ollama-flow task create analysis "Analyze research results" --dependencies task-001',
        explanation: 'Creates a task that waits for task-001 to complete before starting'
      },
      {
        description: 'Assign task to specific agent',
        command: 'ollama-flow task create implementation "Write API client" --assign agent-003',
        explanation: 'Directly assigns a task to a specific agent'
      },
      {
        description: 'Monitor task progress',
        command: 'ollama-flow task status task-001',
        explanation: 'Shows detailed status and progress information for a task'
      },
      {
        description: 'Cancel a running task',
        command: 'ollama-flow task cancel task-001 --reason "Requirements changed"',
        explanation: 'Stops a task and provides a reason for cancellation'
      }
    ],
    tutorial: [
      'Tasks are units of work that agents execute. Key concepts:',
      '',
      'Task Properties:',
      '• ID: Unique identifier',
      '• Type: Category of work (research, implementation, analysis, etc.)',
      '• Description: What needs to be done',
      '• Priority: Execution order (0-10, higher = more urgent)',
      '• Dependencies: Tasks that must complete first',
      '• Input: Data needed by the task',
      '• Status: Current state (pending, running, completed, failed)',
      '',
      'Task Lifecycle:',
      '1. Created (pending status)',
      '2. Queued (waiting for agent)',
      '3. Assigned (agent selected)',
      '4. Running (actively being worked on)',
      '5. Completed/Failed (final state)',
      '',
      'Task Dependencies:',
      '• Tasks can depend on other tasks',
      '• Dependencies must complete before task starts',
      '• Use for sequential workflows',
      '• Circular dependencies are not allowed'
    ],
    related: ['agents', 'workflows', 'coordination']
  },
  {
    name: 'ollama',
    description: 'Spawning Ollama/Gemma instances with specific configurations',
    category: 'basic',
    examples: [
      {
        description: 'Spawn Ollama with specific model',
        command: 'ollama-flow ollama spawn "implement user authentication" --model gemma3n:e4b',
        explanation: 'Creates an Ollama instance using the larger Gemma 3n E4B model'
      },
      {
        description: 'Spawn Ollama with custom temperature',
        command: 'ollama-flow ollama spawn "fix payment bug" --temperature 0.3',
        explanation: 'Runs Ollama with lower temperature for more focused code generation'
      },
      {
        description: 'Spawn Ollama with custom context length',
        command: 'ollama-flow ollama spawn "analyze codebase" --context 16384',
        explanation: 'Sets larger context window for processing bigger codebases'
      },
      {
        description: 'Spawn Ollama with specific host',
        command: 'ollama-flow ollama spawn "write unit tests" --host "192.168.1.100:11434"',
        explanation: 'Connects to remote Ollama server for distributed processing'
      },
      {
        description: 'Dry run to preview command',
        command: 'ollama-flow ollama spawn "build API" --model gemma3n:e2b --dry-run',
        explanation: 'Shows what would be executed without actually running Ollama'
      }
    ],
    tutorial: [
      'The ollama spawn command launches Ollama/Gemma instances with specific configurations.',
      '',
      'Available Options:',
      '• --model, -m: Gemma model to use (gemma3n:e2b, gemma3n:e4b)',
      '• --host: Ollama server host and port (default: localhost:11434)',
      '• --temperature: Generation temperature 0-2 (default: 0.7)',
      '• --context: Context length in tokens (default: 8192)',
      '• --mode: Development mode (full, backend-only, frontend-only, api-only)',
      '• --coverage: Test coverage target percentage (default: 80)',
      '• --commit: Commit frequency (phase, feature, manual)',
      '• --verbose, -v: Enable verbose output',
      '• --dry-run, -d: Preview what would be executed',
      '',
      'Environment Variables Set:',
      '• OLLAMA_HOST: Ollama server endpoint',
      '• GEMMA_INSTANCE_ID: Unique identifier for the Ollama instance',
      '• GEMMA_FLOW_MODE: Development mode setting',
      '• GEMMA_FLOW_COVERAGE: Target test coverage percentage',
      '• GEMMA_FLOW_COMMIT: Commit frequency setting',
      '',
      'Common Use Cases:',
      '• Code generation: --model gemma3n:e4b --temperature 0.3',
      '• Large projects: --context 16384 --mode full',
      '• Quick tasks: --model gemma3n:e2b --temperature 0.5',
      '• Remote processing: --host remote-server:11434',
      '• Testing: --coverage 95 --commit feature'
    ],
    related: ['agents', 'tasks', 'workflows']
  },
  {
    name: 'workflows',
    description: 'Building complex multi-step workflows',
    category: 'workflow',
    examples: [
      {
        description: 'Run a workflow from file',
        command: 'ollama-flow workflow run research-pipeline.json --watch',
        explanation: 'Executes a workflow definition and monitors progress in real-time'
      },
      {
        description: 'Validate workflow before running',
        command: 'ollama-flow workflow validate my-workflow.json --strict',
        explanation: 'Checks workflow syntax and dependencies without executing'
      },
      {
        description: 'Generate workflow template',
        command: 'ollama-flow workflow template research --output research-workflow.json',
        explanation: 'Creates a pre-configured workflow template for research tasks'
      },
      {
        description: 'Monitor running workflows',
        command: 'ollama-flow workflow list --all',
        explanation: 'Shows all workflows including completed ones'
      },
      {
        description: 'Stop a running workflow',
        command: 'ollama-flow workflow stop workflow-001 --force',
        explanation: 'Immediately stops all tasks in a workflow'
      }
    ],
    tutorial: [
      'Workflows orchestrate multiple tasks and agents. Structure:',
      '',
      'Workflow Definition (JSON):',
      '{',
      '  "name": "Research and Analysis",',
      '  "description": "Multi-stage research workflow",',
      '  "agents": [',
      '    {"id": "researcher", "type": "researcher"},',
      '    {"id": "analyzer", "type": "analyst"}',
      '  ],',
      '  "tasks": [',
      '    {',
      '      "id": "research-task",',
      '      "type": "research",',
      '      "description": "Gather information",',
      '      "assignTo": "researcher"',
      '    },',
      '    {',
      '      "id": "analyze-task",',
      '      "type": "analysis",',
      '      "description": "Analyze findings",',
      '      "assignTo": "analyzer",',
      '      "depends": ["research-task"]',
      '    }',
      '  ]',
      '}',
      '',
      'Workflow Features:',
      '• Variable substitution: ${variable}',
      '• Conditional execution',
      '• Parallel task execution',
      '• Error handling and retries',
      '• Progress monitoring',
      '',
      'Best Practices:',
      '• Start with simple workflows',
      '• Use descriptive task names',
      '• Plan dependencies carefully',
      '• Test with --dry-run first'
    ],
    related: ['tasks', 'agents', 'templates']
  },
  {
    name: 'configuration',
    description: 'Configuring Claude-Flow settings',
    category: 'configuration',
    examples: [
      {
        description: 'Initialize default configuration',
        command: 'ollama-flow config init --template development',
        explanation: 'Creates a configuration file optimized for development'
      },
      {
        description: 'View current configuration',
        command: 'ollama-flow config show --diff',
        explanation: 'Shows only settings that differ from defaults'
      },
      {
        description: 'Update a setting',
        command: 'ollama-flow config set orchestrator.maxConcurrentAgents 20',
        explanation: 'Changes the maximum number of concurrent agents'
      },
      {
        description: 'Save configuration profile',
        command: 'ollama-flow config profile save production',
        explanation: 'Saves current settings as a named profile'
      },
      {
        description: 'Load configuration profile',
        command: 'ollama-flow config profile load development',
        explanation: 'Switches to a previously saved configuration profile'
      }
    ],
    tutorial: [
      'Configuration controls all aspects of Claude-Flow behavior.',
      '',
      'Main Configuration Sections:',
      '',
      '• orchestrator: Core system settings',
      '  - maxConcurrentAgents: How many agents can run simultaneously',
      '  - taskQueueSize: Maximum pending tasks',
      '  - healthCheckInterval: How often to check system health',
      '',
      '• terminal: Terminal integration settings',
      '  - type: Terminal type (auto, vscode, native)',
      '  - poolSize: Number of terminal sessions to maintain',
      '',
      '• memory: Memory management settings',
      '  - backend: Storage type (sqlite, markdown, hybrid)',
      '  - cacheSizeMB: Memory cache size',
      '  - retentionDays: How long to keep data',
      '',
      '• mcp: Model Context Protocol settings',
      '  - transport: Communication method (stdio, http)',
      '  - port: Network port for HTTP transport',
      '',
      'Configuration Files:',
      '• Global: ~/.ollama-flow/config.json',
      '• Project: ./ollama-flow.config.json',
      '• Profiles: ~/.ollama-flow/profiles/',
      '',
      'Environment Variables:',
      '• CLAUDE_FLOW_LOG_LEVEL: Override log level',
      '• CLAUDE_FLOW_MAX_AGENTS: Override agent limit',
      '• CLAUDE_FLOW_MCP_PORT: Override MCP port'
    ],
    related: ['profiles', 'environment', 'troubleshooting']
  },
  {
    name: 'monitoring',
    description: 'Monitoring system health and performance',
    category: 'advanced',
    examples: [
      {
        description: 'Check system status',
        command: 'ollama-flow status --watch',
        explanation: 'Continuously monitors system health and updates every few seconds'
      },
      {
        description: 'Start monitoring dashboard',
        command: 'ollama-flow monitor --interval 5',
        explanation: 'Opens a live dashboard with real-time metrics and graphs'
      },
      {
        description: 'View component-specific status',
        command: 'ollama-flow status --component orchestrator',
        explanation: 'Shows detailed status for a specific system component'
      },
      {
        description: 'Monitor in compact mode',
        command: 'ollama-flow monitor --compact --no-graphs',
        explanation: 'Simplified monitoring view without visual graphs'
      }
    ],
    tutorial: [
      'Claude-Flow provides comprehensive monitoring capabilities.',
      '',
      'Monitoring Commands:',
      '• status: Point-in-time system status',
      '• monitor: Live dashboard with continuous updates',
      '',
      'Key Metrics:',
      '• System Health: Overall status (healthy/degraded/unhealthy)',
      '• Resource Usage: CPU, memory, agent count',
      '• Component Status: Individual system components',
      '• Agent Activity: Active agents and their tasks',
      '• Task Queue: Pending and completed tasks',
      '• Performance Graphs: Historical trends',
      '',
      'Monitoring Best Practices:',
      '• Check status before starting large workflows',
      '• Monitor during heavy usage',
      '• Watch for resource exhaustion',
      '• Track task completion rates',
      '• Set up alerts for critical issues',
      '',
      'Troubleshooting with Monitoring:',
      '• High CPU: Too many concurrent tasks',
      '• High Memory: Large cache or memory leaks',
      '• Failed Tasks: Agent or system issues',
      '• Slow Performance: Resource constraints'
    ],
    related: ['status', 'performance', 'troubleshooting']
  },
  {
    name: 'sessions',
    description: 'Managing sessions and state persistence',
    category: 'advanced',
    examples: [
      {
        description: 'Save current session',
        command: 'ollama-flow session save "Development Session" --description "Working on API integration"',
        explanation: 'Saves all current agents, tasks, and memory state'
      },
      {
        description: 'List saved sessions',
        command: 'ollama-flow session list',
        explanation: 'Shows all saved sessions with creation dates and metadata'
      },
      {
        description: 'Restore a session',
        command: 'ollama-flow session restore session-001 --merge',
        explanation: 'Restores session state, merging with current state'
      },
      {
        description: 'Export session to file',
        command: 'ollama-flow session export session-001 backup.json --include-memory',
        explanation: 'Creates a portable backup including agent memory'
      },
      {
        description: 'Clean up old sessions',
        command: 'ollama-flow session clean --older-than 30 --dry-run',
        explanation: 'Shows what sessions would be deleted (older than 30 days)'
      }
    ],
    tutorial: [
      'Sessions capture the complete state of your Claude-Flow environment.',
      '',
      'What Sessions Include:',
      '• All active agents and their configurations',
      '• Current task queue and status',
      '• Agent memory and conversation history',
      '• System configuration snapshot',
      '',
      'Session Use Cases:',
      '• Save work-in-progress',
      '• Share team configurations',
      '• Backup before major changes',
      '• Reproduce issues for debugging',
      '• Switch between projects',
      '',
      'Session Management:',
      '• Automatic checksums for integrity',
      '• Compression for large sessions',
      '• Selective restore (agents only, tasks only)',
      '• Version compatibility checking',
      '',
      'Best Practices:',
      '• Save sessions before major changes',
      '• Use descriptive names and tags',
      '• Regular cleanup of old sessions',
      '• Export important sessions as backups',
      '• Test restore before relying on sessions'
    ],
    related: ['backup', 'state', 'persistence']
  },
  {
    name: 'repl',
    description: 'Using the interactive REPL mode',
    category: 'basic',
    examples: [
      {
        description: 'Start REPL mode',
        command: 'ollama-flow repl',
        explanation: 'Opens interactive command line with tab completion'
      },
      {
        description: 'REPL with custom history file',
        command: 'ollama-flow repl --history-file .my-history',
        explanation: 'Uses a specific file for command history'
      },
      {
        description: 'Skip welcome banner',
        command: 'ollama-flow repl --no-banner',
        explanation: 'Starts REPL in minimal mode'
      }
    ],
    tutorial: [
      'The REPL (Read-Eval-Print Loop) provides an interactive interface.',
      '',
      'REPL Features:',
      '• Tab completion for commands and arguments',
      '• Command history (up/down arrows)',
      '• Real-time connection status',
      '• Built-in help system',
      '• Command aliases and shortcuts',
      '',
      'Special REPL Commands:',
      '• help: Show available commands',
      '• status: Check system status',
      '• connect: Connect to orchestrator',
      '• history: View command history',
      '• clear: Clear screen',
      '• cd/pwd: Navigate directories',
      '',
      'REPL Tips:',
      '• Use tab completion extensively',
      '• Check connection status regularly',
      '• Use "help <command>" for detailed help',
      '• History is saved between sessions',
      '• Ctrl+C or "exit" to quit'
    ],
    related: ['completion', 'interactive', 'commands']
  },
  {
    name: 'troubleshooting',
    description: 'Diagnosing and fixing common issues',
    category: 'troubleshooting',
    examples: [
      {
        description: 'Check system health',
        command: 'ollama-flow status --component all',
        explanation: 'Comprehensive health check of all components'
      },
      {
        description: 'Enable debug logging',
        command: 'ollama-flow start --log-level debug',
        explanation: 'Start with verbose logging for debugging'
      },
      {
        description: 'Validate configuration',
        command: 'ollama-flow config validate ollama-flow.config.json --strict',
        explanation: 'Check configuration file for errors'
      },
      {
        description: 'Reset to defaults',
        command: 'ollama-flow config reset --confirm',
        explanation: 'Restore default configuration settings'
      }
    ],
    tutorial: [
      'Common issues and solutions:',
      '',
      'Connection Issues:',
      '• Problem: "Connection refused" errors',
      '• Solution: Ensure Claude-Flow is started with "ollama-flow start"',
      '• Check: MCP transport settings match between client and server',
      '',
      'Agent Issues:',
      '• Problem: Agents not spawning',
      '• Solution: Check agent limits in configuration',
      '• Check: Available system resources',
      '',
      'Task Issues:',
      '• Problem: Tasks stuck in pending state',
      '• Solution: Verify agent availability and task dependencies',
      '• Check: Task queue size limits',
      '',
      'Performance Issues:',
      '• Problem: Slow response times',
      '• Solution: Reduce concurrent agents or increase resources',
      '• Check: Memory usage and cache settings',
      '',
      'Configuration Issues:',
      '• Problem: Settings not taking effect',
      '• Solution: Validate configuration file syntax',
      '• Check: Environment variable overrides',
      '',
      'Debug Commands:',
      '• ollama-flow status: System health check',
      '• ollama-flow config validate: Configuration check',
      '• ollama-flow --verbose: Enable detailed logging',
      '• ollama-flow monitor: Real-time diagnostics'
    ],
    related: ['monitoring', 'configuration', 'debugging']
  }
];

function showMainHelp(): void {
  console.log(colors.cyan.bold('Claude-Flow Help System'));
  console.log('─'.repeat(50));
  console.log();
  
  console.log(colors.white('Claude-Flow is an advanced AI agent orchestration system.'));
  console.log(colors.white('Use this help system to learn about features and best practices.'));
  console.log();
  
  console.log(colors.yellow.bold('Quick Start:'));
  console.log(colors.gray('  ollama-flow help getting-started    # Beginner tutorial'));
  console.log(colors.gray('  ollama-flow help --interactive      # Interactive help mode'));
  console.log(colors.gray('  ollama-flow help <topic>            # Specific topic help'));
  console.log();
  
  console.log(colors.yellow.bold('Help Categories:'));
  
  const categories = {
    basic: 'Essential concepts and commands',
    workflow: 'Building and managing workflows',
    configuration: 'System configuration and profiles',
    advanced: 'Advanced features and monitoring',
    troubleshooting: 'Problem diagnosis and solutions'
  };
  
  for (const [category, description] of Object.entries(categories)) {
    console.log();
    console.log(colors.cyan.bold(`${category.toUpperCase()}:`));
    console.log(colors.white(`  ${description}`));
    
    const topics = HELP_TOPICS.filter(t => t.category === category);
    for (const topic of topics) {
      console.log(colors.gray(`    ${topic.name.padEnd(20)} ${topic.description}`));
    }
  }
  
  console.log();
  console.log(colors.gray('Use "ollama-flow help <topic>" for detailed information.'));
  console.log(colors.gray('Use "ollama-flow help --all" to see all topics.'));
}

function showAllTopics(): void {
  console.log(colors.cyan.bold('All Help Topics'));
  console.log('─'.repeat(50));
  
  const table = new Table()
    .header(['Topic', 'Category', 'Description'])
    .border(true);

  for (const topic of HELP_TOPICS) {
    table.push([
      colors.cyan(topic.name),
      colors.yellow(topic.category),
      topic.description
    ]);
  }
  
  table.render();
  
  console.log();
  console.log(colors.gray('Use "ollama-flow help <topic>" for detailed information.'));
}

async function showTopicHelp(topicName: string, options: any): Promise<void> {
  const topic = HELP_TOPICS.find(t => t.name === topicName);
  
  if (!topic) {
    console.log(colors.red(`Help topic '${topicName}' not found.`));
    console.log();
    
    // Suggest similar topics
    const similar = HELP_TOPICS.filter(t => 
      t.name.includes(topicName) || 
      t.description.toLowerCase().includes(topicName.toLowerCase())
    );
    
    if (similar.length > 0) {
      console.log(colors.gray('Did you mean:'));
      for (const suggestion of similar) {
        console.log(colors.cyan(`  ${suggestion.name}`));
      }
    } else {
      console.log(colors.gray('Use "ollama-flow help --all" to see all topics.'));
    }
    return;
  }
  
  console.log(colors.cyan.bold(`Help: ${topic.name}`));
  console.log('─'.repeat(50));
  console.log(colors.white(topic.description));
  console.log();
  
  if (options.tutorial && topic.tutorial) {
    console.log(colors.yellow.bold('Tutorial:'));
    console.log('─'.repeat(20));
    for (const line of topic.tutorial) {
      if (line.trim().startsWith('ollama-flow')) {
        console.log(colors.cyan(`  ${line}`));
      } else if (line.trim() === '') {
        console.log();
      } else {
        console.log(colors.white(line));
      }
    }
    console.log();
  }
  
  if (options.examples && topic.examples) {
    console.log(colors.yellow.bold('Examples:'));
    console.log('─'.repeat(20));
    for (const example of topic.examples) {
      console.log(colors.white.bold(`${example.description}:`));
      console.log(colors.cyan(`  ${example.command}`));
      if (example.explanation) {
        console.log(colors.gray(`  ${example.explanation}`));
      }
      console.log();
    }
  }
  
  if (!options.examples && !options.tutorial) {
    // Show both by default
    if (topic.tutorial) {
      console.log(colors.yellow.bold('Overview:'));
      console.log('─'.repeat(20));
      const overview = topic.tutorial.slice(0, 5);
      for (const line of overview) {
        if (line.trim() === '') {
          console.log();
        } else {
          console.log(colors.white(line));
        }
      }
      console.log();
      console.log(colors.gray('Use --tutorial for complete tutorial.'));
      console.log();
    }
    
    if (topic.examples) {
      console.log(colors.yellow.bold('Common Examples:'));
      console.log('─'.repeat(20));
      const commonExamples = topic.examples.slice(0, 3);
      for (const example of commonExamples) {
        console.log(colors.cyan(`  ${example.command}`));
        console.log(colors.gray(`    ${example.description}`));
      }
      if (topic.examples.length > 3) {
        console.log(colors.gray(`    ... and ${topic.examples.length - 3} more`));
      }
      console.log();
      console.log(colors.gray('Use --examples for all examples.'));
      console.log();
    }
  }
  
  if (topic.related && topic.related.length > 0) {
    console.log(colors.yellow.bold('Related Topics:'));
    console.log('─'.repeat(20));
    for (const related of topic.related) {
      console.log(colors.cyan(`  ollama-flow help ${related}`));
    }
    console.log();
  }
}

async function startInteractiveHelp(): Promise<void> {
  console.log(colors.cyan.bold('Interactive Help Mode'));
  console.log('─'.repeat(30));
  console.log();
  
  while (true) {
    const categories = [
      { name: 'Getting Started', value: 'getting-started' },
      { name: 'Agents', value: 'agents' },
      { name: 'Tasks', value: 'tasks' },
      { name: 'Workflows', value: 'workflows' },
      { name: 'Configuration', value: 'configuration' },
      { name: 'Monitoring', value: 'monitoring' },
      { name: 'Sessions', value: 'sessions' },
      { name: 'REPL Mode', value: 'repl' },
      { name: 'Troubleshooting', value: 'troubleshooting' },
      { name: 'Browse All Topics', value: 'all' },
      { name: 'Exit', value: 'exit' }
    ];
    
    const result = await Select.prompt({
      message: 'What would you like help with?',
      options: categories,
    });
    
    const choice = typeof result === 'string' ? result : result.value;
    
    if (choice === 'exit') {
      console.log(colors.gray('Goodbye!'));
      break;
    }
    
    console.log();
    
    if (choice === 'all') {
      showAllTopics();
    } else {
      await showTopicHelp(choice, { tutorial: true, examples: true });
    }
    
    console.log();
    console.log(colors.gray('Press Enter to continue...'));
    await new Promise(resolve => {
      const stdin = Deno.stdin;
      const buffer = new Uint8Array(1);
      stdin.read(buffer).then(() => resolve(undefined));
    });
    
    console.clear();
  }
}