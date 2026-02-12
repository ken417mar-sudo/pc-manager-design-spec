# resources

本目录存放设计规范的结构化数据，**从主工程摘出**，便于开发与 Figma 同步。

| 文件 | 说明 | 来源 |
|------|------|------|
| `layout.json` | 布局与主区域尺寸（app-shell、侧栏、顶栏、防御卡片、右侧列等） | 主工程 `src/renderer/styles/app.css` |
| `icons.json` | 切图清单（Figma 节点 ID + 文件名）、资源路径 | 主工程 `scripts/export-slices.mjs` |
| `component-states.json` | 组件状态定义（导航、开关、按钮等） | 设计约定 |

与 `documentation/设计规范.md` 及 `tokens/design-tokens.css` 保持一致；主工程更新后可将对应内容同步回本目录。
