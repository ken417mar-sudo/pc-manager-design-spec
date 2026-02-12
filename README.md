# 电脑管家设计规范（Design Spec）

**仓库地址**：[https://github.com/ken417mar-sudo/pc-manager-design-spec](https://github.com/ken417mar-sudo/pc-manager-design-spec)

本仓库为**电脑管家桌面端**的设计规范交付物，按 design-spec 规范打包，包含设计说明、设计 Token、切图与字体资源，以及可独立打开的界面预览。

## 目录结构

```
电脑管家设计spec/
├── README.md           # 本说明
├── spec.md             # 设计规范正文（与 documentation/设计规范.md 一致）
├── tokens.css          # 设计 Token（与 tokens/design-tokens.css 一致，可直接用于开发）
├── documentation/      # 设计文档
│   ├── 设计规范.md     # 设计规范正文
│   └── 更新说明.md     # 版本与结构说明
├── resources/          # 结构化设计数据
│   ├── layout.json     # 布局与主区域尺寸
│   ├── icons.json      # 图标清单与路径
│   ├── component-states.json  # 组件状态定义
│   └── README.md       # 资源说明
├── tokens/
│   └── design-tokens.css  # 设计 Token（CSS 变量）
├── scripts/
│   └── export-slices.mjs  # Figma 切图导出脚本（从主工程摘出，输出到 assets/slices）
├── assets/
│   ├── fonts/          # 字体文件（HYQiHei 等）
│   └── slices/         # 切图资源（@2x / @3x PNG）
└── preview/            # 静态界面预览
    ├── index.html      # 在浏览器中打开可查看主界面还原
    └── app.css         # 预览用样式
```

## 使用方式

- **查看规范**：阅读根目录 `spec.md` 或 `documentation/设计规范.md`。
- **结构化数据**：`resources/` 下为 layout、icons、组件状态等 JSON，可与主工程或 Figma 同步。
- **接入开发**：在项目中引入 `tokens.css`（或 `tokens/design-tokens.css`），并按 `spec.md` 中的切图清单使用 `assets/slices/` 内资源。
- **界面预览**：用浏览器直接打开 `preview/index.html`（建议用本地 HTTP 服务，避免部分浏览器对 `file://` 字体与路径的限制），或使用：

  ```bash
  npx serve .
  ```
  然后访问 `http://localhost:3000/preview/`。

## 规范说明

- 设计稿节点为 `603:2797`（870×600）。
- 颜色、字体、圆角、间距、阴影等以 `spec.md` 与 `tokens.css` 为准。
- 切图已按 2x/3x 导出至 `assets/slices/`，命名与 `spec.md` 中清单一致。

## 版本与来源

本设计 spec 内容**从主工程摘出并补充**（主工程路径：`Codex/管家测试`），与主工程中的 `design-spec/`、`docs/`、`scripts/`、`src/renderer/styles/` 及 Figma 变量/子图层保持一致。详见 `documentation/更新说明.md`。

## 仓库说明

代码已推送到 [ken417mar-sudo/pc-manager-design-spec](https://github.com/ken417mar-sudo/pc-manager-design-spec)。
