// PRODUCT PHOTOGRAPHY ACCENT MAPPING DIRECTORY
export const PRODUCT_IMAGES = {
  airpods: "https://unsplash.com",
  keyboard: "https://unsplash.com",
  watch: "https://unsplash.com",
  mouse: "https://unsplash.com",
  default: "https://unsplash.com"
};

export const getRealDescription = (name) => {
  const t = name ? name.toLowerCase() : '';
  if (t.includes("airpod") || t.includes("buds")) {
    return "Active Noise Cancellation (ANC), 30 Hrs Playtime, Bluetooth v5.3.";
  }
  if (t.includes("keyboard")) {
    return "Mechanical Blue Switches, Rainbow Backlit, Anti-ghosting Keys.";
  }
  if (t.includes("watch")) {
    return "1.85\" AMOLED Display, BT Calling, Health Tracking, IP68 Waterproof.";
  }
  if (t.includes("mouse")) {
    return "Wireless Gaming Mouse, Ultra-Fast Sync, Adjustable 3200 DPI.";
  }
  return "Premium Quality Sports Footwear, Breathable Mesh Upper, Ergo Sole.";
};
