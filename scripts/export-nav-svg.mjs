/**
 * 从 Figma 指定节点（导航栏 768:364）导出子图层为 SVG，保存到 assets/slices，
 * 用于替换原有 PNG 导航图标。Token 可从 .env 的 FIGMA_TOKEN 或环境变量读取。
 *
 * 用法: node scripts/export-nav-svg.mjs  （需项目根 .env 中有 FIGMA_TOKEN）
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const loadEnv = async () => {
  const envPath = path.join(rootDir, ".env");
  try {
    const text = await fs.readFile(envPath, "utf8");
    for (const line of text.split("\n")) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
      if (m && process.env[m[1]] === undefined) {
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
      }
    }
  } catch {}
};

const FILE_KEY = "nyq9YWeE2nC9WoXXu2FfqD";
const NAV_FRAME_ID = "768:364";
const TOKEN = process.env.FIGMA_TOKEN;

// 与现有预览顺序一致：设备、特色、安全、清理、驱动、服务、商店
const NAV_NAMES = [
  "nav-device",
  "nav-feature",
  "nav-security",
  "nav-clean",
  "nav-driver",
  "nav-service",
  "nav-store",
];

const OUTPUT_DIR = path.resolve(__dirname, "../assets/slices");

/** 递归收集可导出为图的节点 ID（取每棵子树的一个代表节点） */
function collectExportableIds(node, ids = []) {
  if (!node) return ids;
  const children = node.children;
  if (!children || children.length === 0) {
    ids.push(node.id);
    return ids;
  }
  for (const child of children) {
    collectExportableIds(child, ids);
  }
  return ids;
}

async function fetchJson(url, token) {
  const res = await fetch(url, {
    headers: { "X-Figma-Token": token },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Figma API error ${res.status}: ${text}`);
  }
  return res.json();
}

async function downloadFile(url, targetPath) {
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Download failed ${res.status}: ${text}`);
  }
  const body = await res.text();
  await fs.writeFile(targetPath, body, "utf8");
}

async function main() {
  await loadEnv();
  const token = process.env.FIGMA_TOKEN || TOKEN;
  if (!token) {
    console.error("Missing FIGMA_TOKEN. Set in .env or env. Example: FIGMA_TOKEN=xxxx node scripts/export-nav-svg.mjs");
    process.exit(1);
  }
  const TOKEN_USE = token;

  // 1. 获取导航栏节点及其子节点
  const nodeIdParam = NAV_FRAME_ID.replace(":", "-");
  const nodesUrl = `https://api.figma.com/v1/files/${FILE_KEY}/nodes?ids=${encodeURIComponent(nodeIdParam)}&depth=3`;
  const nodesData = await fetchJson(nodesUrl, TOKEN_USE);
  const nodes = nodesData.nodes || {};
  const navNode = nodes[NAV_FRAME_ID]?.document ?? nodes[nodeIdParam]?.document;
  if (!navNode) {
    throw new Error(`Node ${NAV_FRAME_ID} not found. Response keys: ${Object.keys(nodes).join(", ")}`);
  }

  const children = navNode.children || [];
  if (children.length === 0) {
    throw new Error(`Node ${NAV_FRAME_ID} has no children.`);
  }

  // 2. 确定要导出的节点 ID：每个子节点若自身可导出则用自身，否则用其第一个可导出后代
  const exportIds = [];
  for (const child of children) {
    const ids = collectExportableIds(child, []);
    exportIds.push(ids.length > 0 ? ids[0] : child.id);
  }

  const idList = exportIds.slice(0, NAV_NAMES.length);
  const names = NAV_NAMES.slice(0, idList.length);
  if (idList.length === 0) {
    throw new Error("No exportable icon nodes found under navigation frame.");
  }

  // 3. 调用 Figma Images API 导出 SVG
  const idsParam = idList.join(",");
  const imagesUrl = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${encodeURIComponent(idsParam)}&format=svg`;
  const imagesData = await fetchJson(imagesUrl, TOKEN_USE);
  if (imagesData.err) {
    throw new Error(imagesData.err);
  }
  const imageUrls = imagesData.images || {};

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  for (let i = 0; i < idList.length; i++) {
    const id = idList[i];
    const name = names[i];
    const url = imageUrls[id] ?? imageUrls[id.replace(":", "-")];
    if (!url) {
      console.warn(`No SVG URL for ${id} (${name}), skipping.`);
      continue;
    }
    const filename = `${name}.svg`;
    const outPath = path.join(OUTPUT_DIR, filename);
    await downloadFile(url, outPath);
    console.log(`Saved ${filename}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
