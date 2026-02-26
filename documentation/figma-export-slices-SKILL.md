# Figma 切图导出（Skill 说明）

本项目的切图脚本来自 [figma-export-slices-skill](https://github.com/ken417mar-sudo/figma-export-slices-skill)，已打包进仓库，**以后切图统一用该脚本执行**。

## 前置条件

- **Figma Token**：在项目根目录创建 `.env`，写入 `FIGMA_TOKEN=你的token`；或运行命令时传入 `--token` / 环境变量。  
  （可复制 `.env.example` 为 `.env` 后填写，`.env` 已加入 `.gitignore`，不会提交。）

## 本仓库常用命令

**按现有清单导出（使用 `resources/icons.json`）：**

```bash
node scripts/export-slices.mjs \
  --file nyq9YWeE2nC9WoXXu2FfqD \
  --slices-file resources/icons.json \
  --out ./assets/slices \
  --scales 2,3
```

**仅导出某节点下、名称带 `icon/` 前缀的图层（如导航栏 768:364，正确尺寸 48×48）：**

```bash
node scripts/export-slices.mjs --discover --node-id 768-364 \
  --name-regex 'icon/' --format svg --scales 1 \
  --file nyq9YWeE2nC9WoXXu2FfqD --out ./assets/slices
```

导出文件名为自动英文命名（如 `icon-nav-device-status-slice@1x.svg`）。预览中按切图大小 48×48 显示，颜色仍用规范 Token。

**按名称规则发现并导出：**

```bash
node scripts/export-slices.mjs --discover --name-regex '/切图$' \
  --file nyq9YWeE2nC9WoXXu2FfqD --out ./assets/slices --scales 2,3
```

## 选项摘要

| 选项 | 说明 |
|------|------|
| `--file` | Figma 文件 Key（或 `FIGMA_FILE_KEY`） |
| `--token` | 个人 Access Token（或 `FIGMA_TOKEN` / `.env`） |
| `--slices-file` | 使用 JSON 清单（如 `resources/icons.json`） |
| `--discover` | 自动发现要导出的节点 |
| `--node-id` | 仅在该节点子树内发现（如 `768-364`） |
| `--name-regex` | 按名称匹配的正则 |
| `--out` | 输出目录，默认 `./slices` |
| `--scales` | 倍数，如 `2,3`，默认 `2,3` |
| `--format` | `png`（默认）或 `svg` |
| `--no-english` | 关闭自动英文命名 |

脚本会在输出目录生成 `slices-name-map.json`，并在 stdout 打印 `FIGMA_SLICES_NAME_MAP=...`，便于模型使用「Figma 图层名 ↔ 切图文件名」映射。

更多说明见上游 [README](https://github.com/ken417mar-sudo/figma-export-slices-skill#readme)。
