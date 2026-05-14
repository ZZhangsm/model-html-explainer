---
name: model-html-explainer
description: >-
  Given a code repository and a paper (URL or PDF), generate a self-contained
  HTML document that explains the model — architecture, data pipeline, training
  strategy, loss functions, evaluation. Dark-theme layout with arch diagrams,
  side-by-side cards, scroll-spy navigation.
---

# Model Training Explainer

**Domain:** code-to-doc, paper-to-HTML, model architecture explanation, training pipeline visualization

**Summary.** Given a GitHub/local repo and a paper reference (arXiv URL or PDF), produce a single-file dark-theme HTML that walks through the model and its training pipeline — architecture overview, data pipeline (if relevant), training strategy, loss functions, evaluation — mapping paper claims to concrete code line references with real tensor dimensions from a representative dataset.

**Strategy:**
1. **Read repo structure** — identify key files (model definition, training loop, utilities, data loading). Extract forward-pass shapes, loss formulations, training phases, evaluation entry points. Pick one concrete dataset/example and trace its dimensions through the entire pipeline.
2. **Read paper/source** — extract architecture description, training strategy (phases, schedules, multi-task), loss formulation, evaluation metrics, key design claims. Map each claim to a specific code location (`file.py:N-M`).
3. **Generate HTML** — single self-contained file with embedded CSS. Template structure: Overview with architecture high-level cards → Data pipeline (if the model has notable preprocessing — conditional section, skip if trivial) → One section per training stage with arch diagram + dimension table + loss code + config table → Evaluation + metrics → Key design summary. Use dark-theme palette, `.arch`/`.flow` CSS classes for diagrams, `.card`/`.note` for callouts, syntax-highlighted code blocks, nav bar with IntersectionObserver scroll-spy responsive to `<hz<section id="...">`.
4. **AVOID:** external dependencies (CSS, JS, fonts); markdown or non-HTML output; placeholder tensor dimensions or line references; describing files without reading them first; generic architecture descriptions that could apply to any model.
