# 仅按 spec 还原

本目录的界面**没有使用** `preview/index.html` 和 `preview/app.css`，而是仅根据以下内容从零还原：

- **spec.md** / **documentation/设计规范.md**：颜色、字体、圆角、间距、阴影、组件与区块尺寸、主界面文案说明
- **tokens.css**：CSS 变量
- **resources/layout.json**：完整尺寸与定位（含防御/卡片/弹窗/浏览器区）、默认文案（`copy`：顶栏、防御卡、弹窗卡、浏览器卡）
- **resources/component-states.json**：开关 on/off、导航激活等
- **resources/icons.json**：切图路径与命名
- **assets/**：字体与切图资源

刷新后与 `preview/` 的视觉效果已对齐（防御状态两行、三动作、弹窗统计与折线图与时间、浏览器分层图、开关交互）。  
在项目根目录执行 `npx serve .` 后访问：`http://localhost:端口/preview-from-spec/`。
