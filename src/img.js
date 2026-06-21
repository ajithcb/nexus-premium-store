// OFFLINE SOURCE MAPPING FILE
const B = "https://unsplash.com";
export const IMGS = {
  p: B + "photo-1588444837495-c6cfeb53f32d?w=400",
  k: B + "photo-1618384887929-16ec33fab9ef?w=400",
  w: B + "photo-1523275335684-37898b6baf30?w=400",
  m: B + "photo-1615663245857-ac93bb7c39e7?w=400",
  s: B + "photo-1542291026-7eec264c27ff?w=400"
};

export const getD = (n) => {
  const t = n ? n.toLowerCase() : "";
  if (t.includes("airpod")) return "ANC, v5.3.";
  if (t.includes("keyboard")) return "RGB Backlit.";
  if (t.includes("watch")) return "AMOLED Screen.";
  if (t.includes("mouse")) return "Wireless DPI.";
  return "Premium Mesh Sole.";
};

