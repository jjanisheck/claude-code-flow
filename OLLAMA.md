# Ollama-Flow Configuration

**IMPORTANT**: This is Ollama-Flow, an AI agent orchestration system that uses Ollama with Gemma 3n models for local AI execution.

## Prerequisites
Before using Ollama-Flow, ensure you have:
1. **Ollama installed**: `curl -fsSL https://ollama.ai/install.sh | sh`
2. **Gemma 3n model downloaded**: `ollama pull gemma3n:e2b`
3. **Ollama running**: `ollama serve`

## Build Commands
- `npm run build`: Build the project
- `npm run test`: Run the full test suite
- `npm run lint`: Run ESLint and format checks
- `npm run typecheck`: Run TypeScript type checking
- `./ollama-flow --help`: Show all available commands

## Ollama-Flow Complete Command Reference

### Core System Commands
- `./ollama-flow start [--ui] [--port 3000] [--host localhost]`: Start orchestration system with optional web UI
- `./ollama-flow status`: Show comprehensive system status
- `./ollama-flow monitor`: Real-time system monitoring dashboard
- `./ollama-flow config <subcommand>`: Configuration management (show, get, set, init, validate)

### Agent Management
- `./ollama-flow agent spawn <type> [--name <name>]`: Create AI agents (researcher, coder, analyst, etc.)
- `./ollama-flow agent list`: List all active agents
- `./ollama-flow spawn <type>`: Quick agent spawning (alias for agent spawn)

### Task Orchestration
- `./ollama-flow task create <type> [description]`: Create and manage tasks
- `./ollama-flow task list`: View active task queue
- `./ollama-flow workflow <file>`: Execute workflow automation files

### Memory Management
- `./ollama-flow memory store <key> <data>`: Store persistent data across sessions
- `./ollama-flow memory get <key>`: Retrieve stored information
- `./ollama-flow memory list`: List all memory keys
- `./ollama-flow memory export <file>`: Export memory to file
- `./ollama-flow memory import <file>`: Import memory from file
- `./ollama-flow memory stats`: Memory usage statistics
- `./ollama-flow memory cleanup`: Clean unused memory entries

### SPARC Development Modes
- `./ollama-flow sparc "<task>"`: Run orchestrator mode (default)
- `./ollama-flow sparc run <mode> "<task>"`: Run specific SPARC mode
- `./ollama-flow sparc tdd "<feature>"`: Test-driven development mode
- `./ollama-flow sparc modes`: List all 17 available SPARC modes

Available SPARC modes: orchestrator, coder, researcher, tdd, architect, reviewer, debugger, tester, analyzer, optimizer, documenter, designer, innovator, swarm-coordinator, memory-manager, batch-executor, workflow-manager

### Swarm Coordination
- `./ollama-flow swarm "<objective>" [options]`: Multi-agent swarm coordination
- `--strategy`: research, development, analysis, testing, optimization, maintenance
- `--mode`: centralized, distributed, hierarchical, mesh, hybrid
- `--max-agents <n>`: Maximum number of agents (default: 5)
- `--parallel`: Enable parallel execution
- `--monitor`: Real-time monitoring
- `--output <format>`: json, sqlite, csv, html

### MCP Server Integration
- `./ollama-flow mcp start [--port 3000] [--host localhost]`: Start MCP server
- `./ollama-flow mcp status`: Show MCP server status
- `./ollama-flow mcp tools`: List available MCP tools

### Ollama/Gemma Integration
- `./ollama-flow ollama spawn "task description"`: Spawn Ollama/Gemma instance for task
- `./ollama-flow ollama batch workflow.json`: Execute batch tasks with Ollama/Gemma
- Check Ollama status: `ollama list` and `ollama ps`

### Session Management
- `./ollama-flow session`: Manage terminal sessions
- `./ollama-flow repl`: Start interactive REPL mode

### Enterprise Features
- `./ollama-flow project <subcommand>`: Project management (Enterprise)
- `./ollama-flow deploy <subcommand>`: Deployment operations (Enterprise)
- `./ollama-flow cloud <subcommand>`: Cloud infrastructure management (Enterprise)
- `./ollama-flow security <subcommand>`: Security and compliance tools (Enterprise)
- `./ollama-flow analytics <subcommand>`: Analytics and insights (Enterprise)

### Project Initialization
- `./ollama-flow init`: Initialize Ollama-Flow project
- `./ollama-flow init --sparc`: Initialize with full SPARC development environment

## Quick Start Workflows

### Research Workflow
```bash
# Start a research swarm with distributed coordination
./ollama-flow swarm "Research modern web frameworks" --strategy research --mode distributed --parallel --monitor

# Or use SPARC researcher mode for focused research
./ollama-flow sparc run researcher "Analyze React vs Vue vs Angular performance characteristics"

# Store findings in memory for later use
./ollama-flow memory store "research_findings" "Key insights from framework analysis"
```

### Development Workflow
```bash
# Start orchestration system with web UI
./ollama-flow start --ui --port 3000

# Run TDD workflow for new feature
./ollama-flow sparc tdd "User authentication system with JWT tokens"

# Development swarm for complex projects
./ollama-flow swarm "Build e-commerce API with payment integration" --strategy development --mode hierarchical --max-agents 8 --monitor

# Check system status
./ollama-flow status
```

### Analysis Workflow
```bash
# Analyze codebase performance
./ollama-flow sparc run analyzer "Identify performance bottlenecks in current codebase"

# Data analysis swarm
./ollama-flow swarm "Analyze user behavior patterns from logs" --strategy analysis --mode mesh --parallel --output sqlite

# Store analysis results
./ollama-flow memory store "performance_analysis" "Bottlenecks identified in database queries"
```

### Maintenance Workflow
```bash
# System maintenance with safety controls
./ollama-flow swarm "Update dependencies and security patches" --strategy maintenance --mode centralized --monitor

# Security review
./ollama-flow sparc run reviewer "Security audit of authentication system"

# Export maintenance logs
./ollama-flow memory export maintenance_log.json
```

## Integration Patterns

### Memory-Driven Coordination
Use Memory to coordinate information across multiple SPARC modes and swarm operations:

```bash
# Store architecture decisions
./ollama-flow memory store "system_architecture" "Microservices with API Gateway pattern"

# All subsequent operations can reference this decision
./ollama-flow sparc run coder "Implement user service based on system_architecture in memory"
./ollama-flow sparc run tester "Create integration tests for microservices architecture"
```

### Multi-Stage Development
Coordinate complex development through staged execution:

```bash
# Stage 1: Research and planning
./ollama-flow sparc run researcher "Research authentication best practices"
./ollama-flow sparc run architect "Design authentication system architecture"

# Stage 2: Implementation
./ollama-flow sparc tdd "User registration and login functionality"
./ollama-flow sparc run coder "Implement JWT token management"

# Stage 3: Testing and deployment
./ollama-flow sparc run tester "Comprehensive security testing"
./ollama-flow swarm "Deploy authentication system" --strategy maintenance --mode centralized
```

### Enterprise Integration
For enterprise environments with additional tooling:

```bash
# Project management integration
./ollama-flow project create "authentication-system"
./ollama-flow project switch "authentication-system"

# Security compliance
./ollama-flow security scan
./ollama-flow security audit

# Analytics and monitoring
./ollama-flow analytics dashboard
./ollama-flow deploy production --monitor
```

## Advanced Batch Tool Patterns

### TodoWrite Coordination
Always use TodoWrite for complex task coordination:

```javascript
TodoWrite([
  {
    id: "architecture_design",
    content: "Design system architecture and component interfaces",
    status: "pending",
    priority: "high",
    dependencies: [],
    estimatedTime: "60min",
    assignedAgent: "architect"
  },
  {
    id: "frontend_development", 
    content: "Develop React components and user interface",
    status: "pending",
    priority: "medium",
    dependencies: ["architecture_design"],
    estimatedTime: "120min",
    assignedAgent: "frontend_team"
  }
]);
```

### Task and Memory Integration
Launch coordinated agents with shared memory:

```javascript
// Store architecture in memory
Task("System Architect", "Design architecture and store specs in Memory");

// Other agents use memory for coordination
Task("Frontend Team", "Develop UI using Memory architecture specs");
Task("Backend Team", "Implement APIs according to Memory specifications");
```

## Ollama/Gemma Configuration

### Environment Variables
Configure Ollama/Gemma integration using these environment variables:
```bash
export OLLAMA_MODEL="gemma3n:e2b"          # or gemma3n:e4b for larger model
export OLLAMA_HOST="localhost:11434"        # Ollama server host
export OLLAMA_TEMPERATURE="0.7"             # Generation temperature (0-2)
export OLLAMA_NUM_CTX="8192"                # Context length
export OLLAMA_FLOW_MODE="full"              # Development mode
```

### Ollama Commands
```bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Pull Gemma 3n models
ollama pull gemma3n:e2b    # 2B effective parameters (5B total)
ollama pull gemma3n:e4b    # 4B effective parameters (8B total)

# Start Ollama server
ollama serve

# Check running models
ollama ps

# List available models
ollama list
```

### Ollama-Flow Usage Examples
```bash
# Spawn Ollama/Gemma instance for coding task
./ollama-flow ollama spawn "Create a REST API for user management"

# Use specific model
./ollama-flow ollama spawn "Build a calculator app" --model gemma3n:e4b

# Dry run to see what would be executed
./ollama-flow ollama spawn "Create a todo app" --dry-run

# SPARC mode examples
./ollama-flow sparc run code "Implement user authentication"
./ollama-flow sparc tdd "Create a shopping cart feature"
./ollama-flow sparc run architect "Design microservices architecture"
```

## Code Style Preferences
- Use ES modules (import/export) syntax
- Destructure imports when possible
- Use TypeScript for all new code
- Follow existing naming conventions
- Add JSDoc comments for public APIs
- Use async/await instead of Promise chains
- Prefer const/let over var

## Workflow Guidelines
- Always run typecheck after making code changes
- Run tests before committing changes
- Use meaningful commit messages
- Create feature branches for new functionality
- Ensure all tests pass before merging

## Important Notes
- **Use TodoWrite extensively** for all complex task coordination
- **Leverage Task tool** for parallel agent execution on independent work
- **Store all important information in Memory** for cross-agent coordination
- **Use batch file operations** whenever reading/writing multiple files
- **Check .ollama/commands/** for detailed command documentation
- **All swarm operations include automatic batch tool coordination**
- **Monitor progress** with TodoRead during long-running operations
- **Enable parallel execution** with --parallel flags for maximum efficiency

This configuration ensures optimal use of Claude Code's batch tools for swarm orchestration and parallel task execution with full Ollama-Flow capabilities.
