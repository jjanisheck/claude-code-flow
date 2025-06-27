# 🌊 Ollama-Flow: AI Agent Orchestration for Local Models

<div align="center">

[![🌟 Star on GitHub](https://img.shields.io/github/stars/ruvnet/ollama-flow?style=for-the-badge&logo=github&color=gold)](https://github.com/ruvnet/ollama-flow)
[![📦 NPX Ready](https://img.shields.io/npm/v/ollama-flow?style=for-the-badge&logo=npm&color=blue&label=v1.0.72)](https://www.npmjs.com/package/ollama-flow)
[![⚡ Ollama Ready](https://img.shields.io/badge/Ollama-Gemma%203n-green?style=for-the-badge&logo=ollama)](https://github.com/ruvnet/ollama-flow)
[![🦕 Multi-Runtime](https://img.shields.io/badge/Runtime-Node%20%7C%20Deno-blue?style=for-the-badge&logo=javascript)](https://github.com/ruvnet/ollama-flow)
[![⚡ TypeScript](https://img.shields.io/badge/TypeScript-Full%20Support-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![🛡️ MIT License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge&logo=opensourceinitiative)](https://opensource.org/licenses/MIT)

</div>

## 🙏 **Based on Claude-Flow by Reuven**

**Ollama-Flow** is a fork of the brilliant [Claude-Flow](https://github.com/ruvnet/claude-code-flow) created by **Reuven (@ruvnet)**. This project adapts Reuven's genius orchestration platform to work with local Ollama/Gemma models instead of Claude API.

**All credit for the original architecture, SPARC methodology, and orchestration concepts goes to Reuven.** This adaptation simply replaces the Claude backend with Ollama/Gemma 3n for local AI execution.

> 🌟 **Please star the original**: [Claude-Flow by Reuven](https://github.com/ruvnet/claude-code-flow) - The foundation that made this possible!

## 🎯 **Transform Your Development Workflow with Local AI**

**Ollama-Flow** brings Reuven's revolutionary AI agent orchestration platform to local models. Coordinate **multiple Gemma 3n agents** simultaneously, manage complex workflows, and build sophisticated applications with local AI-powered development.

> 🔥 **One command to rule them all**: `npx ollama-flow@latest init --sparc` - Deploy a full local AI agent coordination system in seconds!


## 🚀 **What's New in Ollama-Flow Adaptation**

### 🎯 **Local AI Integration**
- **✅ Ollama Backend**: Complete replacement of Claude API with local Ollama/Gemma 3n models
- **✅ Model Selection**: Support for `gemma3n:e2b` (2B effective) and `gemma3n:e4b` (4B effective) models  
- **✅ Local Execution**: No API keys required - everything runs locally with Ollama
- **✅ Extended Context**: Configurable context lengths up to 32K tokens for large projects
- **✅ Temperature Control**: Fine-tuned generation settings for different development tasks

### 🔧 **Enhanced SPARC Integration** (Reuven's Original Design)
- **✅ SPARC Methodology**: Preserves Reuven's brilliant 17-mode SPARC system
- **✅ Gemma Prompts**: Optimized prompts specifically designed for Gemma 3n models
- **✅ Memory Coordination**: Maintains original memory-first approach for agent coordination
- **✅ Agent Orchestration**: Full preservation of Reuven's multi-agent swarm architecture
- **✅ Local Processing**: All SPARC modes now execute via local Ollama instead of Claude API

### 🚀 **Developer Experience** 
- **✅ Zero API Costs**: Completely local execution with no external API dependencies
- **✅ Privacy First**: All code and data stays on your machine
- **✅ Offline Capable**: Works without internet after initial model download
- **✅ Ollama Integration**: Seamless integration with Ollama's model management
- **✅ Reuven's UX**: Preserves the excellent developer experience from Claude-Flow

---

## ⚡ **Quick Start** 

### 🛠️ **Prerequisites**
```bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Download Gemma 3n model
ollama pull gemma3n:e2b

# Start Ollama server
ollama serve
```

### 🚀 **Instant Setup**
```bash
# Install and initialize with SPARC development environment
npx ollama-flow@latest init --sparc

# Use the local wrapper (created by init)
./ollama-flow start --ui --port 3000

# Run SPARC commands with local Gemma
./ollama-flow sparc "build a REST API"
```

### 🎛️ **SPARC Development Modes** (Reuven's 17 Specialized Agents)
```bash
# List all available SPARC modes
./ollama-flow sparc modes

# Run specific development workflows with Gemma
./ollama-flow sparc run coder "implement user authentication"
./ollama-flow sparc run architect "design microservice architecture"  
./ollama-flow sparc tdd "create test suite for API"

# Use different Gemma models for different tasks
./ollama-flow ollama spawn "complex architecture task" --model gemma3n:e4b
./ollama-flow ollama spawn "quick code fix" --model gemma3n:e2b
```

## 🏗️ **Core Features**

### 🤖 **Multi-Agent Orchestration**
- **Parallel Execution**: Run up to 10 agents concurrently with BatchTool
- **Smart Coordination**: Intelligent task distribution and load balancing
- **Memory Sharing**: Persistent knowledge bank across all agents
- **Real-time Monitoring**: Live dashboard for agent status and progress

### 🧠 **SPARC Development Framework**
- **17 Specialized Modes**: Architect, Coder, TDD, Security, DevOps, and more
- **Workflow Orchestration**: Complete development lifecycle automation
- **Interactive & Non-interactive**: Flexible execution modes
- **Boomerang Pattern**: Iterative development with continuous refinement

### 📊 **Advanced Monitoring & Analytics**
- **System Health Dashboard**: Real-time metrics and performance tracking
- **Task Coordination**: Dependency management and conflict resolution
- **Terminal Pool Management**: Efficient resource utilization
- **Coverage Reports**: Comprehensive test and code coverage analysis

---

## 🛠️ **Installation & Setup**

### **Method 1: Quick Start with NPX (Recommended)**
```bash
# Initialize with full SPARC environment
npx ollama-flow@latest init --sparc

# This creates:
# ✓ Local ./ollama-flow wrapper script
# ✓ .ollama/ directory with configuration
# ✓ OLLAMA.md (project instructions for Ollama/Gemma)
# ✓ .roomodes (17 pre-configured SPARC modes)
# ✓ Swarm command documentation

# Start using immediately
./ollama-flow start --ui --port 3000
```

### **Method 2: Global Installation**
```bash
# Install globally
npm install -g ollama-flow

# Initialize anywhere
ollama-flow init --sparc

# Use directly
ollama-flow start --ui
```

### **Method 3: Local Project Installation**
```bash
# Add to project
npm install ollama-flow --save-dev

# Initialize
npx ollama-flow init --sparc

# Use with local wrapper
./ollama-flow start --ui
```

---

## 🎮 **Usage Examples**

### 🚀 **Basic Operations**
```bash
# Check system status
./ollama-flow status

# Start orchestration with Web UI
./ollama-flow start --ui --port 3000

# Check MCP server status
./ollama-flow mcp status

# Manage agents
./ollama-flow agent spawn researcher --name "DataBot"
./ollama-flow agent info agent-123
./ollama-flow agent terminate agent-123
```

### 🔥 **Advanced Workflows**

#### **Multi-Agent Development**
```bash
# Deploy swarm for full-stack development
./ollama-flow swarm "Build e-commerce platform" \
  --strategy development \
  --max-agents 5 \
  --parallel \
  --monitor

# BatchTool parallel development
batchtool run --parallel \
  "./ollama-flow sparc run architect 'design user auth'" \
  "./ollama-flow sparc run code 'implement login API'" \
  "./ollama-flow sparc run tdd 'create auth tests'" \
  "./ollama-flow sparc run security-review 'audit auth flow'"
```

#### **SPARC Development Modes**
```bash
# Complete development workflow
./ollama-flow sparc run ask "research best practices for microservices"
./ollama-flow sparc run architect "design scalable architecture"
./ollama-flow sparc run code "implement user service"
./ollama-flow sparc run tdd "create comprehensive test suite"
./ollama-flow sparc run integration "integrate all services"
./ollama-flow sparc run devops "setup CI/CD pipeline"
```

#### **Memory & Coordination**
```bash
# Store and query project knowledge
./ollama-flow memory store requirements "User auth with JWT"
./ollama-flow memory store architecture "Microservice design patterns"
./ollama-flow memory query auth

# Task coordination
./ollama-flow task create research "Market analysis for AI tools"
./ollama-flow task workflow examples/development-pipeline.json
```

---

## 📋 **Available Commands**

### **Core Commands**
| Command | Description | Example |
|---------|-------------|---------|
| `init` | Initialize project with Ollama/Gemma integration | `./ollama-flow init --sparc` |
| `start` | Start orchestration system | `./ollama-flow start --ui` |
| `status` | Show system health and metrics | `./ollama-flow status` |
| `agent` | Manage AI agents and hierarchies | `./ollama-flow agent spawn researcher` |
| `swarm` | Advanced multi-agent coordination | `./ollama-flow swarm "Build API" --parallel` |

### **SPARC Development Modes**
| Mode | Purpose | Example |
|------|---------|---------|
| `architect` | System design and architecture | `./ollama-flow sparc run architect "design API"` |
| `code` | Code development and implementation | `./ollama-flow sparc run code "user authentication"` |
| `tdd` | Test-driven development | `./ollama-flow sparc run tdd "payment system"` |
| `security-review` | Security auditing and analysis | `./ollama-flow sparc run security-review "auth flow"` |
| `integration` | System integration and testing | `./ollama-flow sparc run integration "microservices"` |
| `devops` | Deployment and CI/CD | `./ollama-flow sparc run devops "k8s deployment"` |

### **Memory & Coordination**
| Command | Description | Example |
|---------|-------------|---------|
| `memory store` | Store information in knowledge bank | `./ollama-flow memory store key "value"` |
| `memory query` | Search stored information | `./ollama-flow memory query "authentication"` |
| `task create` | Create and manage tasks | `./ollama-flow task create research "AI trends"` |
| `monitor` | Real-time system monitoring | `./ollama-flow monitor --dashboard` |

### **Enterprise Commands**
| Command | Description | Example |
|---------|-------------|---------|
| `project` | Project lifecycle management | `./ollama-flow project create "API Project" --type web-app` |
| `deploy` | Deployment automation & strategies | `./ollama-flow deploy create "v1.2.0" --strategy blue-green` |
| `cloud` | Multi-cloud infrastructure management | `./ollama-flow cloud resources create "web-server" compute` |
| `security` | Security scanning & compliance | `./ollama-flow security scan "Vulnerability Check" ./src` |
| `analytics` | Performance analytics & insights | `./ollama-flow analytics insights --timerange 7d` |
| `audit` | Enterprise audit logging | `./ollama-flow audit report compliance --framework SOC2` |

---

## 🏗️ **Architecture Overview**

### **Multi-Layer Agent System**
```
┌─────────────────────────────────────────────────────────┐
│                 BatchTool Orchestrator                  │
├─────────────────────────────────────────────────────────┤
│  Agent 1    Agent 2    Agent 3    Agent 4    Agent 5   │
│ Architect │   Coder   │   TDD    │ Security │  DevOps   │
├─────────────────────────────────────────────────────────┤
│              Shared Memory Bank & Coordination          │
├─────────────────────────────────────────────────────────┤
│         Terminal Pool & Resource Management             │
├─────────────────────────────────────────────────────────┤
│              Ollama/Gemma Integration Layer             │
└─────────────────────────────────────────────────────────┘
```

### **Key Components**
- **🎛️ Orchestrator**: Central coordination and task distribution
- **🤖 Agent Pool**: Specialized AI agents for different domains
- **🧠 Memory Bank**: Persistent knowledge sharing across agents
- **📊 Monitor**: Real-time metrics and health monitoring
- **🔗 MCP Server**: Model Context Protocol for tool integration

---

## 🧪 **Testing & Quality Assurance**

### **Comprehensive Test Coverage**
```bash
# Run full test suite
npm test

# Run specific test categories
npm run test:unit        # Unit tests
npm run test:integration # Integration tests
npm run test:e2e         # End-to-end tests

# Generate coverage reports
npm run test:coverage

# Lint and typecheck
npm run lint
npm run typecheck
```

### **Quality Metrics (v1.0.72)**
- **✅ Project-Focused**: OLLAMA.md explicitly guides building user applications
- **✅ Clear Instructions**: No confusion about modifying ollama-flow itself
- **✅ Real Examples**: All documentation shows building actual applications
- **✅ NPM Publishing**: Fully compatible with npx and global installation
- **✅ Cross-Platform**: Windows, Mac, and Linux support

---

## 📚 **Documentation & Resources**

### **Getting Started**
- [🚀 Quick Start Guide](./docs/quick-start.md)
- [⚙️ Configuration Options](./docs/configuration.md)
- [🤖 Agent Management](./docs/agents.md)
- [🧠 SPARC Development](./docs/sparc-modes.md)

### **Advanced Topics**
- [🔧 BatchTool Integration](./docs/batchtool.md)
- [📊 Monitoring & Analytics](./docs/monitoring.md)
- [🔗 MCP Server Setup](./docs/mcp-integration.md)
- [🔒 Security Best Practices](./docs/security.md)

### **API Reference**
- [📖 Command Reference](./docs/commands.md)
- [🎛️ Configuration Schema](./docs/config-schema.md)
- [🔌 Plugin Development](./docs/plugins.md)
- [🛠️ Troubleshooting](./docs/troubleshooting.md)

---

## 🤝 **Contributing**

We welcome contributions! Here's how to get started:

### **Development Setup**
```bash
# Clone the repository
git clone https://github.com/ruvnet/ollama-flow.git
cd ollama-flow

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Link for local development
npm link
```

### **Contributing Guidelines**
- 🐛 **Bug Reports**: Use GitHub issues with detailed reproduction steps
- 💡 **Feature Requests**: Propose new features with use cases
- 🔧 **Pull Requests**: Follow our coding standards and include tests
- 📚 **Documentation**: Help improve docs and examples

---

## 📄 **License**

MIT License - see [LICENSE](./LICENSE) for details.

---

## 🎉 **Acknowledgments**

- **🌟 Reuven (@ruvnet)**: Creator of the original [Claude-Flow](https://github.com/ruvnet/claude-code-flow) - the genius orchestration platform that this project is based on. All core concepts, SPARC methodology, and architectural brilliance belong to Reuven.
- **Ollama Team**: For the amazing local model infrastructure that makes this adaptation possible
- **Google**: For the powerful Gemma 3n models that provide local AI capabilities
- **Node.js Team**: For the excellent JavaScript runtime
- **Open Source Community**: For contributions and feedback
- **SPARC Methodology**: Reuven's structured development approach that revolutionizes AI-assisted coding

---

<div align="center">

### **🚀 Ready to transform your development workflow?**

```bash
npx ollama-flow@latest init --sparc
```

**Join thousands of developers already using Ollama-Flow!**

[![GitHub](https://img.shields.io/badge/GitHub-ruvnet/ollama--flow-blue?style=for-the-badge&logo=github)](https://github.com/ruvnet/ollama-flow)
[![NPM](https://img.shields.io/badge/NPM-ollama--flow-red?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/ollama-flow)
[![Discord](https://img.shields.io/badge/Discord-Join%20Community-purple?style=for-the-badge&logo=discord)](https://discord.gg/ollama-flow)

---

**Based on Claude-Flow by [rUv](https://github.com/ruvnet) | Powered by Ollama & Gemma 3n**

</div>
