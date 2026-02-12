# 电脑管家桌面端 — 设计规范（来自 Figma 变量 + 子图层）

> 说明：节点为 `603:2797`（870×600）。已更新 `/切图` 清单与导出脚本。

## 颜色（Colors）
- 文本/强调色文字：`#000000`
- 文本/一级文字：`#333333`
- 文本/二级文字：`#666666`
- 文本/三级文字：`#999999`
- 文本/禁用文字：`#bebebe`
- 文本/按钮文字：`#ffffff`
- 背景/主题色：`#335eff`
- 背景/一级卡片：`#ffffff`
- 背景/蓝色20：`#4d72ff33`
- 背景/蓝色80：`#4d72ffcc`
- 描边/一级卡片：`#0000001a`
- 其他/分割线：`#eeeeee`
- 图标/一级图标：`#333333`
- 图标/二级图标：`#808080`
- 侧边栏背景（补充）：`#f6f6f6`

## 字体（Typography）
- 展示型标题2：`HYQiHei` / 20 / 650 / line-height 100
- 二级内容：`Microsoft YaHei` / 14 / 400 / line-height 22
- 三级内容：`HYQiHei` / 12 / 550 / line-height 20

字体文件：
- `src/renderer/assets/fonts/HYQiHei_65S.ttf`
- `src/renderer/assets/fonts/HYQiHei_55S.ttf`

## 圆角（Radius）
- 2 / 6 / 8 / 12 / 16 / 20 / 1000

## 间距（Spacing）
- 44

## 阴影（Shadow）
- 主容器阴影：`0 6 12 0 rgba(51, 64, 81, 0.08)`

## 待补充
- 若需 1x 素材可在导出脚本中追加 scale=1

## 组件与区块尺寸（界面还原用）
以下数值来自 `preview/app.css`，便于仅按 spec 还原时与预览一致。完整数据见 `resources/layout.json`。

- **侧栏**：宽 80px，内边距 24px 16px，左上下圆角 2px；logo 30×36；导航项 48×48、图标 24×24、间距 6px；激活态背景 `--color-bg-primary`。
- **顶栏**：高 64px，内边距 20px 25px；操作区 gap 16px；工具栏图标 16×16、图标间距 20px；登录区 gap 6px、文案 14px/22px、三级色；分割线 1×14px、`--color-divider`。
- **防御卡片**（374×460，left 60 top 20）：
  - 标题栏：相对卡片 (1,0) 宽 372 高 40，内边距 0 12px；标题 12px/550、三级色、图标 14×14、gap 6。
  - 开关：36×18、圆角 9px；关 `--color-text-disabled`，开 `--color-bg-theme`；滑块 14×14、距左/上 2px、开时 translateX(18px)、transition 0.2s ease。
  - 主图区：相对卡片 (1,40) 宽 372 高 254；图 height 254、object-fit contain。
  - 状态文案区：相对卡片 (127,294) 120×58，字体 HYQiHei 20/650、居中、强调色。
  - 操作区：相对卡片 (0,404) 宽 374 高 20，gap 44、padding 0 30；项 12/550、一级色、图标 16×16、项内 gap 8。
- **通用卡片标题**：相对卡片 (-1,-1) 280×40、内边距 0 12；左：图标 14×14、gap 6、三级色；右：主题色。
- **弹窗卡片**：统计文案 (16,40) 12px/400、强调色；折线图区 (16,74) 248×94，图 (8,1) 232×92；时间行 (16,182) 宽 248、space-between、12/550、二级色。
- **浏览器保护卡片**：图区 (1,30) 278×191；内层切图绝对定位见 `resources/layout.json` → `browserGraphic.children`（ring-outer/mid/inner、center、shield、dot×3、home、default、search、tab 的 left/top/width/height）。

## 主界面文案（还原用）
见 `resources/layout.json` → `copy`：顶栏「登录」；防御卡片标题「安全防御系统运行中」、状态两行「安全防御系统」「未见异常」、三动作「手动查杀」「隔离区」「信任区」及对应图标；弹窗卡「弹窗防护中」「管理」、统计句、时间三格；浏览器卡「浏览器保护中」「管理」。

## `/切图` 切图清单（按节点）
> 导出脚本会按以下节点导出 PNG 2x/3x 并保存到本仓库 `assets/slices/`（主工程中为 `src/renderer/assets/slices/`）。完整节点 ID 与脚本见 `scripts/export-slices.mjs` 与 `resources/icons.json`。

- `603:1696` logo/切图 → `logo@2x.png`, `logo@3x.png`
- `603:1692` icon/导航/设备状态/切图 → `nav-device@2x.png`, `nav-device@3x.png`
- `603:1688` icon/导航/特色功能/切图 → `nav-feature@2x.png`, `nav-feature@3x.png`
- `603:1684` icon/导航/安全防护/切图 → `nav-security@2x.png`, `nav-security@3x.png`
- `603:1680` icon/导航/空间清理/切图 → `nav-clean@2x.png`, `nav-clean@3x.png`
- `603:1676` icon/导航/原厂驱动/切图 → `nav-driver@2x.png`, `nav-driver@3x.png`
- `603:1672` icon/导航/联想服务/切图 → `nav-service@2x.png`, `nav-service@3x.png`
- `603:1668` icon/导航/软件商店/切图 → `nav-store@2x.png`, `nav-store@3x.png`
- `604:2916` icon/头像/切图 → `user-avatar@2x.png`, `user-avatar@3x.png`
- `603:2854` icon/工具栏/切图 → `tool-grid@2x.png`, `tool-grid@3x.png`
- `603:2859` icon/下拉/切图 → `tool-dropdown@2x.png`, `tool-dropdown@3x.png`
- `603:2865` icon/最小化/切图 → `tool-minimize@2x.png`, `tool-minimize@3x.png`
- `603:2883` icon/关闭/切图 → `tool-close@2x.png`, `tool-close@3x.png`
- `603:1804` image/正常状态图/切图 → `defense-hero@2x.png`, `defense-hero@3x.png`
- `603:1805` 防御配图 → `defense-hero-inner@2x.png`, `defense-hero-inner@3x.png`
- `603:1781` icon/查杀图标/切图 → `icon-scan@2x.png`, `icon-scan@3x.png`
- `603:1788` icon/隔离图标/切图 → `icon-quarantine@2x.png`, `icon-quarantine@3x.png`
- `603:1798` icon/信任图标/切图 → `icon-trust@2x.png`, `icon-trust@3x.png`
- `604:2969` icon/安全防护/切图 → `icon-shield@2x.png`, `icon-shield@3x.png`
- `604:2976` icon/弹窗拦截/切图 → `icon-popup@2x.png`, `icon-popup@3x.png`
- `603:1718` image/保护状态/切图 → `browser-graphic@2x.png`, `browser-graphic@3x.png`
- `603:1721` icon/浏览器/切图 → `icon-browser@2x.png`, `icon-browser@3x.png`

额外非 `/切图` 但用于还原的资源：

- `603:1757` 折线图/折线区域 → `line-chart@2x.png`, `line-chart@3x.png`

## 导出脚本
本仓库已包含主工程的切图导出脚本，输出目录为本仓库 `assets/slices/`。

运行方式（在**本仓库**根目录）：

```bash
FIGMA_TOKEN=你的token node scripts/export-slices.mjs
```

或在主工程中（输出到主工程 `src/renderer/assets/slices/`）：

```bash
FIGMA_TOKEN=你的token npm run export:slices
```
