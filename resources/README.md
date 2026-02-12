# resources

本目录存放设计规范的结构化数据，**从主工程摘出**，便于开发与 Figma 同步。

| 文件 | 说明 | 来源 |
|------|------|------|
| `layout.json` | 布局与主区域尺寸（含防御/卡片/弹窗/浏览器区定位）、默认文案（`copy`：顶栏、防御卡、弹窗卡、浏览器卡） | 主工程 `app.css` 与 preview 文案 |
| `icons.json` | 切图清单（Figma 节点 ID + 文件名）、资源路径 | 主工程 `scripts/export-slices.mjs` |
| `component-states.json` | 组件状态定义（导航激活、开关 on/off、卡片标题右、按钮） | 设计约定，与 preview 一致 |

与 `documentation/设计规范.md` 及 `tokens/design-tokens.css` 保持一致；主工程更新后可将对应内容同步回本目录。
