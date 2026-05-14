# model-html-explainer

一个适用于 Claude Code / Codex 的技能，用来根据代码仓库和论文生成单文件暗色主题 HTML，讲解模型架构与训练流程。映射论文 claim 到具体代码行，追踪真实张量维度。

A Claude Code / Codex skill for generating single-file dark-theme HTML explainers from code repositories and papers. Maps paper claims to concrete code line references with real tensor dimensions.

## 目录 · Table of contents

- [v0.1 更新摘要 · v0.1 Release highlights](#toc-highlights)
- [这个 Skill 是做什么的 · What this does](#toc-what)
- [安装 · Installation](#toc-installation)
- [用法 · Usage](#toc-usage)
- [效果展示 · Gallery](#toc-gallery)
- [文档结构 · Documentation map](#toc-docs)
- [依赖要求 · Requirements](#toc-requirements)

<a id="toc-highlights"></a>
## v0.1 更新摘要 · v0.1 Release Highlights

- **初始版本**：支持给定仓库 + 论文生成单文件暗色主题 HTML。
  **Initial release**: generate a single-file dark-theme HTML from a code repository and a paper.

<a id="toc-what"></a>
## 这个 Skill 是做什么的 · What this does

给定一个代码仓库和一篇论文（arXiv URL 或 PDF），生成单文件暗色主题 HTML，逐一讲解模型及其训练流程：架构总览、数据流水线、训练策略、损失函数、评估，将论文中的每项 claim 映射到具体代码行，并用代表性数据集展示真实张量形状。

Given a code repository and a paper (arXiv URL or PDF), produce a single-file dark-theme HTML that walks through the model and its training pipeline — architecture overview, data pipeline, training strategy, loss functions, evaluation. Each paper claim maps to concrete code line references with real tensor dimensions.

**核心特性 / Key Features:**

- **零依赖**：单个 HTML 文件，CSS/JS 内联，无需 npm 或构建工具
- **代码映射**：每项 claim 对应到具体文件与行号
- **真实维度**：跳过 `[batch, seq, dim]` 占位符，给出具体数值
- **暗色主题**：架构图、流程图、代码块、表格，IntersectionObserver 滚动导航

- **Zero dependencies**: Single-file HTML with inline CSS/JS
- **Code mapping**: each claim links to concrete `file.py:N-M`
- **Real dimensions**: no placeholder shapes, actual tensor sizes
- **Dark theme**: arch diagrams, flow charts, code blocks, tables, scroll-spy nav

### 适合什么场景 / When to use this

适合 **model-html-explainer**：

Use **model-html-explainer** when you want:

- 快速理解一个不熟悉的模型仓库
- 将论文方法与代码实现对应起来
- 为团队生成模型架构文档
- 论文审稿时验证实现细节

- quickly understand an unfamiliar model repo
- map paper methods to actual code
- generate architecture docs for a team
- verify implementation details during paper review

<a id="toc-installation"></a>
## 安装 · Installation

仓库地址：**https://github.com/ZZhangsm/model-html-explainer**

### 方式一：把下面这段话发给 AI（推荐） / Option A: paste this prompt to an AI agent

把下面整段复制给 **Claude Code / Cursor / 任何有 shell 权限的 AI Agent**，由它执行命令完成安装。

Paste the block below to **Claude Code / Cursor / any AI agent with shell access** so it can run the install for you.

```text
帮我安装 model-html-explainer 这个 Claude Code / Codex skill。请按下面步骤做：

【Claude Code】
- 确保 ~/.claude/skills/ 目录存在（不存在就创建）
- 若 ~/.claude/skills/model-html-explainer 已存在且是旧副本，先删掉该目录或改用 git pull 更新
- 执行：git clone https://github.com/ZZhangsm/model-html-explainer.git ~/.claude/skills/model-html-explainer
- 验证：ls ~/.claude/skills/model-html-explainer/ 应至少能看到 README.md、SKILL.md、references/

【Codex】
- 确保 ~/.codex/skills/ 目录存在（不存在就创建）
- 若 ~/.codex/skills/model-html-explainer 已存在且是旧副本，先删掉该目录或改用 git pull 更新
- 执行：git clone https://github.com/ZZhangsm/model-html-explainer.git ~/.codex/skills/model-html-explainer
- 验证：ls ~/.codex/skills/model-html-explainer/ 应至少能看到 README.md、SKILL.md、references/

只帮我装我实际用的那一套（Claude Code 或 Codex），装好后告诉我已完成；之后我说「根据仓库和论文生成模型解释 HTML」等需求应能触发这个 skill。
```

### 方式二：手动命令行 / Option B: manual shell

**Claude Code**

```bash
mkdir -p ~/.claude/skills
git clone https://github.com/ZZhangsm/model-html-explainer.git ~/.claude/skills/model-html-explainer
```

**Codex**

```bash
mkdir -p ~/.codex/skills
git clone https://github.com/ZZhangsm/model-html-explainer.git ~/.codex/skills/model-html-explainer
```

若目标目录已存在，请先删除旧目录或进入该目录用 `git pull` 更新，再执行 `git clone`。

If the target folder already exists, remove the old tree or `git pull` inside it before cloning again.

### 本地已有源码时 / When you already have a git clone

在仓库的**父目录**执行（把路径换成你的实际位置）：

From the **parent directory** of your clone (adjust the path):

```bash
cp -r ./model-html-explainer ~/.claude/skills/
# 或 / or
cp -r ./model-html-explainer ~/.codex/skills/
```

### 调用 / Invoke

安装完成后在对话里使用：

Then invoke with:

```text
/model-html-explainer
```

<a id="toc-usage"></a>
## 用法 / Usage

```text
/model-html-explainer

> "结合代码库 https://github.com/xxx/xxx 和论文 https://arxiv.org/abs/xxx 生成解释的 HTML"
```

技能会：

The skill will:

1. **Phase 1（仓库结构分析）** — 识别模型定义、训练循环、数据加载等关键文件
2. **Phase 2（论文提取）** — 抽取架构描述、训练策略、损失公式、评估指标
3. **Phase 3（生成 HTML）** — 产出单文件暗色主题 HTML

1. **Phase 1 (repo structure)** — identify model definition, training loop, data loading
2. **Phase 2 (paper extraction)** — extract architecture, training strategy, loss, evaluation
3. **Phase 3 (HTML generation)** — produce single-file dark-theme output

<a id="toc-gallery"></a>
## 效果展示 · Gallery

<p>
  <a title="OpenOneRec Explainer" href="https://github.com/ZZhangsm/model-html-explainer/blob/main/docs/gallery/openonerec-hero.png"><img src="docs/gallery/openonerec-hero.png" width="80%" alt="OpenOneRec Explainer — hero section" /></a>
</p>

<a id="toc-docs"></a>
## 文档结构 · Documentation map

| 文件 File | 作用 Purpose |
|---|---|
| `README.md` | 仓库介绍 / Repo introduction |
| `SKILL.md` | 技能定义与执行策略 / Skill definition and workflow |
| `references/template.css` | 暗色主题样式（架构图、流程图、代码块、表格、响应式） / Dark-theme CSS (arch diagrams, flow charts, code blocks, tables, responsive layout) |
| `references/template.js` | IntersectionObserver 滚动导航高亮 / Scroll-spy nav highlighter |
| `docs/gallery/` | 效果截图 / Gallery screenshots |

<a id="toc-requirements"></a>
## 依赖要求 / Requirements

- [Claude Code](https://claude.ai/claude-code) 或任意将 skill 安装到 `~/.claude/skills/` 的兼容客户端；[OpenAI Codex](https://codex.ai) 使用 `~/.codex/skills/`
- 需要代码仓库访问权限（GitHub 或本地路径）
- 需要论文原文（arXiv URL 或本地 PDF）

- [Claude Code](https://claude.ai/claude-code) or any runner that loads skills from `~/.claude/skills/`; [OpenAI Codex](https://codex.ai) uses `~/.codex/skills/`
- Access to the code repository (GitHub or local path)
- The paper (arXiv URL or local PDF)
