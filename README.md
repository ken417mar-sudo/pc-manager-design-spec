# 电脑管家设计规范（Design Spec）

**仓库地址**：[https://github.com/ken417mar-sudo/pc-manager-design-spec](https://github.com/ken417mar-sudo/pc-manager-design-spec)

本仓库为**电脑管家桌面端**的设计规范交付物，按 design-spec 规范打包，包含设计说明、设计 Token、切图与字体资源，以及可独立打开的界面预览。

## 目录结构

```
电脑管家设计spec/
├── README.md           # 本说明
├── spec.md             # 设计规范正文（唯一规范源：颜色/字体/切图/导出）
├── tokens.css          # 设计 Token（唯一 token 源，可直接用于开发）
├── documentation/      # 设计文档
│   ├── 设计规范.md     # 规范入口（指向 spec.md）
│   ├── SPEC-CONSTRAINTS.md  # Spec 约束说明（Token 未覆盖时流程）
│   ├── 更新说明.md     # 版本与结构说明
│   └── figma-export-slices-SKILL.md  # 切图脚本用法（figma-export-slices-skill）
├── resources/          # 结构化设计数据
│   ├── layout.json     # 布局与主区域尺寸、默认文案（copy）
│   ├── icons.json      # 图标清单与路径
│   ├── component-states.json  # 组件状态定义
│   └── README.md       # 资源说明
├── tokens/
│   └── design-tokens.css  # 引用根目录 tokens.css（兼容用）
├── scripts/
│   ├── export-slices.mjs   # Figma 切图导出（来自 figma-export-slices-skill，统一用此脚本）
│   └── export-nav-svg.mjs  # 仅导航栏 SVG 导出（可选）
├── .cursor/rules/      # Cursor 规则（Spec 与 Token 约束，alwaysApply）
├── .vscode/
│   └── tasks.json      # 预览任务（在 Cursor 内打开）
├── assets/
│   ├── fonts/          # 字体文件（HYQiHei 等）
│   └── slices/         # 切图资源（@2x / @3x PNG）
└── preview-from-spec/  # 仅按 spec 还原的静态预览（layout/copy/icons/tokens）
    ├── index.html      # 在浏览器中打开可查看主界面还原
    ├── spec-only.css   # 还原用样式
    └── README.md       # 说明
```

## Spec 约束（新增/修改必守）

**所有新增与修改必须完全按规范与 Token 实现。** 详见 `spec.md` 开头的「Spec 约束」与 `.cursor/rules/spec-and-tokens.mdc`。若某属性 Token 未覆盖，需**用户单独确认**后再补充到 `tokens.css` / `spec.md` / `resources/component-states.json`，不得自行发明新值。

## 使用方式

- **查看规范**：阅读根目录 **`spec.md`**（完整规范与切图清单）；`documentation/设计规范.md` 为入口说明。
- **结构化数据**：`resources/` 下为 layout、icons、组件状态等 JSON，可与主工程或 Figma 同步。
- **接入开发**：引入根目录 **`tokens.css`**（推荐）；若路径需用 `tokens/` 目录可引用 `tokens/design-tokens.css`（其引用根目录 tokens.css），并按 `spec.md` 中的切图清单使用 `assets/slices/` 内资源。
- **切图导出**：**以后切图统一用** `scripts/export-slices.mjs`（来自 [figma-export-slices-skill](https://github.com/ken417mar-sudo/figma-export-slices-skill)）。Token 放在项目根目录 `.env` 的 `FIGMA_TOKEN`（可复制 `.env.example` 为 `.env` 后填写，`.env` 已加入 .gitignore）。示例：`node scripts/export-slices.mjs --file nyq9YWeE2nC9WoXXu2FfqD --slices-file resources/icons.json --out ./assets/slices --scales 2,3`。更多用法见 `documentation/figma-export-slices-SKILL.md`。
- **界面预览（推荐在 Cursor 内）**：按 `Cmd+Shift+P` →「运行任务」→ 选择 **「预览（先启动服务，再在 Cursor 内打开）」**，即可在 Cursor 内置 Simple Browser 中查看。若页面未加载出，可再运行一次「预览：在 Cursor 内打开」。以后预览均在 Cursor 内完成即可。

## 规范说明

- 设计稿节点为 `603:2797`（870×600）。
- 颜色、字体、圆角、间距、阴影等以 `spec.md` 与 `tokens.css` 为准。
- 切图已按 2x/3x 导出至 `assets/slices/`，命名与 `spec.md` 中清单一致。

## 版本与来源

本设计 spec 内容**从主工程摘出并补充**（主工程路径：`Codex/管家测试`），与主工程中的 `design-spec/`、`docs/`、`scripts/`、`src/renderer/styles/` 及 Figma 变量/子图层保持一致。详见 `documentation/更新说明.md`。

## 仓库说明

代码已推送到 [ken417mar-sudo/pc-manager-design-spec](https://github.com/ken417mar-sudo/pc-manager-design-spec)。
