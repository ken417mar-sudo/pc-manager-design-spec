# Spec 约束说明

本文档说明本仓库的**实现约束**：所有对界面、样式、组件的新增与修改必须遵守规范与 Token，Token 未覆盖时需用户确认并补充到规范内。

## 1. 完全按规范与 Token 实现

- **颜色、字体、圆角、间距、阴影、尺寸**：只使用 `tokens.css` 中已定义的 CSS 变量（如 `--color-*`、`--font-*`、`--radius-*` 等）。不在样式或组件中写死色值或与规范不一致的数值。
- **组件状态**（默认、悬停、激活、禁用等）：以 `spec.md` 与 `resources/component-states.json` 为准，实现时引用 Token。
- **切图与资源**：以 `spec.md` 切图清单与导出脚本为准；图标颜色通过 Token 控制（如 `currentColor` + CSS 变量）。

## 2. Token 未覆盖时的流程

当设计需要某属性而当前规范/Token **未覆盖**时：

1. **先向用户确认**：说明缺少的语义与建议取值（或命名），由用户确认后再实施。
2. **补充到规范内**：
   - 在 `tokens.css` 中新增变量并加注释；
   - 在 `spec.md` 对应章节补充说明；
   - 若为组件状态，在 `resources/component-states.json` 中补充。
3. **不得**在未获用户确认、未写入规范的前提下自行发明新 Token 或写死新数值。

## 3. 相关文件

| 用途           | 文件 |
|----------------|------|
| 规范正文与约束 | `spec.md` |
| Token 定义     | `tokens.css`、`tokens/design-tokens.css` |
| 组件状态       | `resources/component-states.json` |
| Cursor 规则    | `.cursor/rules/spec-and-tokens.mdc` |
