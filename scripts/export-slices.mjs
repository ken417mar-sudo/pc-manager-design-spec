import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const FILE_KEY = "nyq9YWeE2nC9WoXXu2FfqD";
const TOKEN = process.env.FIGMA_TOKEN;

if (!TOKEN) {
  console.error("Missing FIGMA_TOKEN. Example: FIGMA_TOKEN=xxxx node scripts/export-slices.mjs");
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_DIR = path.resolve(__dirname, "../assets/slices");

const slices = [
  { id: "603:1696", name: "logo" },
  { id: "603:1694", name: "nav-device" },
  { id: "603:1690", name: "nav-feature" },
  { id: "603:1686", name: "nav-security" },
  { id: "603:1682", name: "nav-clean" },
  { id: "603:1678", name: "nav-driver" },
  { id: "603:1674", name: "nav-service" },
  { id: "603:1670", name: "nav-store" },
  { id: "604:2916", name: "user-avatar" },
  { id: "603:2854", name: "tool-grid" },
  { id: "603:2859", name: "tool-dropdown" },
  { id: "603:2865", name: "tool-minimize" },
  { id: "603:2883", name: "tool-close" },
  { id: "603:1804", name: "defense-hero" },
  { id: "639:1559", name: "icon-scan" },
  { id: "639:1565", name: "icon-quarantine" },
  { id: "639:1571", name: "icon-trust" },
  { id: "604:2969", name: "icon-shield" },
  { id: "612:433", name: "toggle-on" },
  { id: "612:420", name: "toggle-off" },
  { id: "604:2976", name: "icon-popup" },
  { id: "603:1718", name: "browser-graphic" },
  { id: "603:1721", name: "icon-browser" },
  { id: "603:1725", name: "browser-ring-outer" },
  { id: "603:1726", name: "browser-ring-mid" },
  { id: "603:1727", name: "browser-ring-inner" },
  { id: "603:1728", name: "browser-center" },
  { id: "603:1730", name: "browser-shield" },
  { id: "603:1733", name: "browser-dot" },
  { id: "603:1734", name: "browser-home" },
  { id: "603:1738", name: "browser-default" },
  { id: "603:1741", name: "browser-search" },
  { id: "603:1747", name: "browser-tab" },
  { id: "603:1757", name: "line-chart" },
];

const fetchJson = async (url) => {
  const res = await fetch(url, {
    headers: { "X-Figma-Token": TOKEN },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Figma API error ${res.status}: ${text}`);
  }
  return res.json();
};

const downloadFile = async (url, targetPath) => {
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Download failed ${res.status}: ${text}`);
  }
  const arrayBuffer = await res.arrayBuffer();
  await fs.writeFile(targetPath, Buffer.from(arrayBuffer));
};

const exportScale = async (scale) => {
  const ids = slices.map((slice) => slice.id).join(",");
  const url = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${encodeURIComponent(ids)}&format=png&scale=${scale}`;
  const data = await fetchJson(url);
  if (data.err) {
    throw new Error(data.err);
  }
  const images = data.images || {};

  for (const slice of slices) {
    const imageUrl = images[slice.id];
    if (!imageUrl) {
      console.warn(`Missing image URL for ${slice.id} (${slice.name}) at ${scale}x`);
      continue;
    }
    const filename = `${slice.name}@${scale}x.png`;
    const outPath = path.join(OUTPUT_DIR, filename);
    await downloadFile(imageUrl, outPath);
    console.log(`Saved ${filename}`);
  }
};

const main = async () => {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await exportScale(2);
  await exportScale(3);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
