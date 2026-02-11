# 电脑管家设计规范（Design Spec）

**仓库地址**：[https://github.com/ken417mar-sudo/pc-manager-design-spec](https://github.com/ken417mar-sudo/pc-manager-design-spec)

本仓库为**电脑管家桌面端**的设计规范交付物，按 design-spec 规范打包，包含设计说明、设计 Token、切图与字体资源，以及可独立打开的界面预览。

## 目录结构

```
电脑管家设计spec/
├── README.md           # 本说明
├── spec.md             # 设计规范正文（颜色、字体、圆角、切图清单等）
├── tokens.css          # 设计 Token（CSS 变量，可直接用于开发）
├── assets/
│   ├── fonts/          # 字体文件（HYQiHei 等）
│   └── slices/         # 切图资源（@2x / @3x PNG）
└── preview/            # 静态界面预览
    ├── index.html      # 在浏览器中打开可查看主界面还原
    └── app.css         # 预览用样式
```

## 使用方式

- **查看规范**：阅读根目录 `spec.md`。
- **接入开发**：在项目中引入 `tokens.css`，并按 `spec.md` 中的切图清单使用 `assets/slices/` 内资源。
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

本设计 spec 来自电脑管家桌面端项目，与主工程中的 `design-spec/` 及 Figma 变量/子图层保持一致。

## 仓库说明

代码已推送到 [ken417mar-sudo/pc-manager-design-spec](https://github.com/ken417mar-sudo/pc-manager-design-spec)。
