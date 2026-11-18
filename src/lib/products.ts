export type Category =
  | "laptops"
  | "cpu"
  | "gpu"
  | "motherboard"
  | "ram"
  | "storage"
  | "psu"
  | "case"
  | "cooling";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  brand: string;
  price: number;
  oldPrice?: number;
  stock: number;
  image: string;
  summary: string;
  specs: string[];
  details: Record<string, string>;
  socket?: string;
  formFactor?: string;
  supportedFormFactors?: string[];
  wattage?: number;
  powerDraw?: number;
};

const photos = {
  laptop1: "/products/laptop-1.jpg",
  laptop2: "/products/laptop-2.jpg",
  laptop3: "/products/laptop-3.jpg",
  laptop4: "/products/laptop-4.jpg",
  gpu: "/products/gpu.jpg",
  cpu: "/products/cpu.jpg",
  motherboard: "/products/motherboard.jpg",
  ram: "/products/ram.jpg",
  storage: "/products/storage.jpg",
  psu: "/products/psu.jpg",
  case: "/products/case.jpg",
  cooling: "/products/cooling.jpg",
  pc: "/products/pc-build.jpg",
  desk: "/products/workspace.jpg",
};

const componentImages: Partial<Record<Category, string>> = {
  cpu: photos.cpu,
  gpu: photos.gpu,
  motherboard: photos.motherboard,
  ram: photos.ram,
  storage: photos.storage,
  psu: photos.psu,
  case: photos.case,
  cooling: photos.cooling,
};

const makePart = (
  id: string,
  name: string,
  category: Category,
  brand: string,
  price: number,
  image: string,
  specs: string[],
  details: Record<string, string>,
  compatibility: Pick<
    Product,
    "socket" | "formFactor" | "supportedFormFactors" | "wattage" | "powerDraw"
  > = {},
  oldPrice?: number,
): Product => ({
  id,
  slug: id,
  name,
  category,
  brand,
  price,
  oldPrice,
  stock: 5 + (id.charCodeAt(0) % 18),
  image: componentImages[category] ?? image,
  summary: specs.join(" · "),
  specs,
  details,
  ...compatibility,
});

export const products: Product[] = [
  ...[
    ["forge-14-pro", "ForgeBook 14 Pro", "NovaTech", 1299, 1449, photos.laptop1, ["Ryzen 7 8845HS", "32GB DDR5", "1TB NVMe"], "14.5″ OLED · 120Hz"],
    ["forge-16-studio", "ForgeBook 16 Studio", "NovaTech", 1799, undefined, photos.laptop2, ["Core Ultra 7 155H", "32GB DDR5", "RTX 4060"], "16″ QHD+ · 165Hz"],
    ["pulse-15", "Pulse 15 Gaming", "Vector", 1499, 1599, photos.laptop3, ["Ryzen 7 7840HS", "16GB DDR5", "RTX 4070"], "15.6″ FHD · 144Hz"],
    ["summit-air-13", "Summit Air 13", "Summit", 999, undefined, photos.laptop4, ["Core Ultra 5 125H", "16GB LPDDR5X", "512GB NVMe"], "13.5″ 2.8K · 90Hz"],
    ["pulse-17-max", "Pulse 17 Max", "Vector", 2199, 2399, photos.laptop2, ["Core i9-14900HX", "32GB DDR5", "RTX 4080"], "17.3″ QHD · 240Hz"],
    ["forge-15-creator", "ForgeBook 15 Creator", "NovaTech", 1399, undefined, photos.laptop1, ["Ryzen 9 8945HS", "32GB DDR5", "1TB NVMe"], "15.6″ OLED · 120Hz"],
    ["summit-pro-16", "Summit Pro 16", "Summit", 1899, 2049, photos.laptop4, ["Core Ultra 9 185H", "32GB LPDDR5X", "RTX 4070"], "16″ 3.2K OLED · 120Hz"],
    ["pulse-14-go", "Pulse 14 Go", "Vector", 1199, undefined, photos.laptop3, ["Ryzen 7 8840U", "16GB DDR5", "1TB NVMe"], "14″ WUXGA · 120Hz"],
  ].map(([id, name, brand, price, oldPrice, image, specs, display]) => ({
    id: id as string,
    slug: id as string,
    name: name as string,
    category: "laptops" as const,
    brand: brand as string,
    price: price as number,
    oldPrice: oldPrice as number | undefined,
    stock: 3 + (String(id).length % 12),
    image: image as string,
    summary: `${(specs as string[]).join(" · ")} · ${display as string}`,
    specs: [...(specs as string[]), display as string],
    details: {
      Processor: (specs as string[])[0],
      Memory: (specs as string[])[1],
      Graphics: (specs as string[])[2],
      Display: display as string,
      Warranty: "2-year BG's Store warranty",
    },
  })),
  makePart("cpu-ryzen-7800x3d", "Ryzen 7 7800X3D", "cpu", "AMD", 429, photos.pc, ["8 cores · 16 threads", "4.2 / 5.0 GHz", "AM5"], { Socket: "AM5", Cores: "8", "Base / boost": "4.2 / 5.0 GHz", TDP: "120W" }, { socket: "AM5", powerDraw: 120 }, 469),
  makePart("cpu-ryzen-7600", "Ryzen 5 7600", "cpu", "AMD", 229, photos.pc, ["6 cores · 12 threads", "Up to 5.1 GHz", "AM5"], { Socket: "AM5", Cores: "6", "Base / boost": "3.8 / 5.1 GHz", TDP: "65W" }, { socket: "AM5", powerDraw: 65 }),
  makePart("cpu-ryzen-9700x", "Ryzen 7 9700X", "cpu", "AMD", 369, photos.pc, ["8 cores · 16 threads", "Up to 5.5 GHz", "AM5"], { Socket: "AM5", Cores: "8", "Base / boost": "3.8 / 5.5 GHz", TDP: "65W" }, { socket: "AM5", powerDraw: 65 }),
  makePart("cpu-core-i5-14600k", "Core i5-14600K", "cpu", "Intel", 319, photos.pc, ["14 cores · 20 threads", "Up to 5.3 GHz", "LGA1700"], { Socket: "LGA1700", Cores: "14", "Base / boost": "3.5 / 5.3 GHz", TDP: "125W" }, { socket: "LGA1700", powerDraw: 125 }),
  makePart("cpu-core-i7-14700k", "Core i7-14700K", "cpu", "Intel", 429, photos.pc, ["20 cores · 28 threads", "Up to 5.6 GHz", "LGA1700"], { Socket: "LGA1700", Cores: "20", "Base / boost": "3.4 / 5.6 GHz", TDP: "125W" }, { socket: "LGA1700", powerDraw: 125 }),
  makePart("gpu-rtx-4070-super", "GeForce RTX 4070 SUPER", "gpu", "NVIDIA", 649, photos.gpu, ["12GB GDDR6X", "DLSS 3.5", "220W"], { Memory: "12GB GDDR6X", Interface: "PCIe 4.0", "Power draw": "220W" }, { powerDraw: 220 }, 699),
  makePart("gpu-rtx-4060", "GeForce RTX 4060", "gpu", "NVIDIA", 329, photos.gpu, ["8GB GDDR6", "DLSS 3.5", "115W"], { Memory: "8GB GDDR6", Interface: "PCIe 4.0", "Power draw": "115W" }, { powerDraw: 115 }),
  makePart("gpu-rtx-4080-super", "GeForce RTX 4080 SUPER", "gpu", "NVIDIA", 1099, photos.gpu, ["16GB GDDR6X", "DLSS 3.5", "320W"], { Memory: "16GB GDDR6X", Interface: "PCIe 4.0", "Power draw": "320W" }, { powerDraw: 320 }),
  makePart("gpu-rx-7800-xt", "Radeon RX 7800 XT", "gpu", "AMD", 529, photos.gpu, ["16GB GDDR6", "FSR 3", "263W"], { Memory: "16GB GDDR6", Interface: "PCIe 4.0", "Power draw": "263W" }, { powerDraw: 263 }),
  makePart("gpu-rx-7900-gre", "Radeon RX 7900 GRE", "gpu", "AMD", 599, photos.gpu, ["16GB GDDR6", "FSR 3", "260W"], { Memory: "16GB GDDR6", Interface: "PCIe 4.0", "Power draw": "260W" }, { powerDraw: 260 }),
  makePart("mb-b650-tomahawk", "MAG B650 Tomahawk WiFi", "motherboard", "MSI", 219, photos.pc, ["AM5 socket", "ATX", "DDR5 · Wi-Fi 6E"], { Socket: "AM5", Format: "ATX", Memory: "DDR5", Wireless: "Wi-Fi 6E" }, { socket: "AM5", formFactor: "ATX" }),
  makePart("mb-b650-aorus-elite", "B650 AORUS Elite AX", "motherboard", "Gigabyte", 199, photos.pc, ["AM5 socket", "ATX", "DDR5 · Wi-Fi 6E"], { Socket: "AM5", Format: "ATX", Memory: "DDR5", Wireless: "Wi-Fi 6E" }, { socket: "AM5", formFactor: "ATX" }),
  makePart("mb-b650m-pro", "B650M Pro RS WiFi", "motherboard", "ASRock", 159, photos.pc, ["AM5 socket", "Micro-ATX", "DDR5 · Wi-Fi 6E"], { Socket: "AM5", Format: "Micro-ATX", Memory: "DDR5", Wireless: "Wi-Fi 6E" }, { socket: "AM5", formFactor: "Micro-ATX" }),
  makePart("mb-z790-aorus", "Z790 AORUS Elite AX", "motherboard", "Gigabyte", 269, photos.pc, ["LGA1700 socket", "ATX", "DDR5 · Wi-Fi 6E"], { Socket: "LGA1700", Format: "ATX", Memory: "DDR5", Wireless: "Wi-Fi 6E" }, { socket: "LGA1700", formFactor: "ATX" }),
  makePart("mb-z790-tuf", "TUF Gaming Z790-Plus", "motherboard", "ASUS", 249, photos.pc, ["LGA1700 socket", "ATX", "DDR5 · Wi-Fi 6"], { Socket: "LGA1700", Format: "ATX", Memory: "DDR5", Wireless: "Wi-Fi 6" }, { socket: "LGA1700", formFactor: "ATX" }),
  makePart("ram-vengeance-32", "Vengeance 32GB DDR5-6000", "ram", "Corsair", 119, photos.pc, ["32GB (2×16GB)", "DDR5-6000", "CL30"], { Capacity: "32GB", Type: "DDR5", Speed: "6000 MT/s", Latency: "CL30" }),
  makePart("ram-flare-32", "Flare X5 32GB DDR5-6000", "ram", "G.Skill", 109, photos.pc, ["32GB (2×16GB)", "DDR5-6000", "AMD EXPO"], { Capacity: "32GB", Type: "DDR5", Speed: "6000 MT/s", Latency: "CL30" }),
  makePart("ram-fury-32", "Fury Beast 32GB DDR5-5600", "ram", "Kingston", 99, photos.pc, ["32GB (2×16GB)", "DDR5-5600", "CL36"], { Capacity: "32GB", Type: "DDR5", Speed: "5600 MT/s", Latency: "CL36" }),
  makePart("ram-dominator-64", "Dominator Titanium 64GB", "ram", "Corsair", 239, photos.pc, ["64GB (2×32GB)", "DDR5-6400", "CL32"], { Capacity: "64GB", Type: "DDR5", Speed: "6400 MT/s", Latency: "CL32" }),
  makePart("ram-ripjaws-32", "Ripjaws S5 32GB DDR5", "ram", "G.Skill", 104, photos.pc, ["32GB (2×16GB)", "DDR5-6000", "Low profile"], { Capacity: "32GB", Type: "DDR5", Speed: "6000 MT/s", Latency: "CL30" }),
  makePart("ssd-990-pro-2tb", "990 PRO 2TB NVMe", "storage", "Samsung", 169, photos.pc, ["2TB · PCIe 4.0", "Read 7,450 MB/s", "5-year warranty"], { Capacity: "2TB", Interface: "PCIe 4.0 x4", "Read speed": "7,450 MB/s" }),
  makePart("ssd-sn850x-2tb", "Black SN850X 2TB", "storage", "WD_BLACK", 159, photos.pc, ["2TB · PCIe 4.0", "Read 7,300 MB/s", "Heatsink ready"], { Capacity: "2TB", Interface: "PCIe 4.0 x4", "Read speed": "7,300 MB/s" }),
  makePart("ssd-p3-plus-1tb", "P3 Plus 1TB NVMe", "storage", "Crucial", 79, photos.pc, ["1TB · PCIe 4.0", "Read 5,000 MB/s", "5-year warranty"], { Capacity: "1TB", Interface: "PCIe 4.0 x4", "Read speed": "5,000 MB/s" }),
  makePart("ssd-980-pro-1tb", "980 PRO 1TB NVMe", "storage", "Samsung", 99, photos.pc, ["1TB · PCIe 4.0", "Read 7,000 MB/s", "Heatsink included"], { Capacity: "1TB", Interface: "PCIe 4.0 x4", "Read speed": "7,000 MB/s" }),
  makePart("ssd-firecuda-4tb", "FireCuda 530 4TB", "storage", "Seagate", 379, photos.pc, ["4TB · PCIe 4.0", "Read 7,300 MB/s", "High endurance"], { Capacity: "4TB", Interface: "PCIe 4.0 x4", "Read speed": "7,300 MB/s" }),
  makePart("psu-rm850e", "RM850e 850W Gold", "psu", "Corsair", 139, photos.pc, ["850W · 80+ Gold", "Fully modular", "ATX 3.0"], { Output: "850W", Efficiency: "80+ Gold", Modular: "Fully modular" }, { wattage: 850 }),
  makePart("psu-focus-750", "FOCUS GX-750 750W", "psu", "Seasonic", 119, photos.pc, ["750W · 80+ Gold", "Fully modular", "10-year warranty"], { Output: "750W", Efficiency: "80+ Gold", Modular: "Fully modular" }, { wattage: 750 }),
  makePart("psu-bequiet-1000", "Straight Power 12 1000W", "psu", "be quiet!", 219, photos.pc, ["1000W · 80+ Platinum", "Fully modular", "ATX 3.0"], { Output: "1000W", Efficiency: "80+ Platinum", Modular: "Fully modular" }, { wattage: 1000 }),
  makePart("psu-pure-power-850", "Pure Power 12 M 850W", "psu", "be quiet!", 149, photos.pc, ["850W · 80+ Gold", "Fully modular", "ATX 3.0"], { Output: "850W", Efficiency: "80+ Gold", Modular: "Fully modular" }, { wattage: 850 }),
  makePart("psu-cx650", "CX650 650W Bronze", "psu", "Corsair", 79, photos.pc, ["650W · 80+ Bronze", "Quiet 120mm fan", "5-year warranty"], { Output: "650W", Efficiency: "80+ Bronze", Modular: "Non-modular" }, { wattage: 650 }),
  makePart("case-north", "North Mesh Mid Tower", "case", "Fractal Design", 149, photos.pc, ["ATX · Micro-ATX · Mini-ITX", "Mesh front", "2× 140mm fans"], { Format: "Mid tower", "Supported boards": "ATX, Micro-ATX, Mini-ITX", Fans: "2 included" }, { supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"] }),
  makePart("case-h5-flow", "H5 Flow RGB", "case", "NZXT", 119, photos.pc, ["ATX · Micro-ATX · Mini-ITX", "High-airflow mesh", "3× RGB fans"], { Format: "Mid tower", "Supported boards": "ATX, Micro-ATX, Mini-ITX", Fans: "3 included" }, { supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"] }),
  makePart("case-4000d", "4000D Airflow", "case", "Corsair", 99, photos.pc, ["ATX · Micro-ATX · Mini-ITX", "Tempered glass", "2× AirGuide fans"], { Format: "Mid tower", "Supported boards": "ATX, Micro-ATX, Mini-ITX", Fans: "2 included" }, { supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"] }),
  makePart("case-pop-mini", "Pop Mini Air", "case", "Fractal Design", 89, photos.pc, ["Micro-ATX · Mini-ITX", "Compact airflow", "2× 120mm fans"], { Format: "Micro tower", "Supported boards": "Micro-ATX, Mini-ITX", Fans: "2 included" }, { supportedFormFactors: ["Micro-ATX", "Mini-ITX"] }),
  makePart("case-lancool-216", "LANCOOL 216", "case", "Lian Li", 109, photos.pc, ["E-ATX · ATX · Micro-ATX", "High airflow", "2× 160mm fans"], { Format: "Mid tower", "Supported boards": "E-ATX, ATX, Micro-ATX, Mini-ITX", Fans: "2 included" }, { supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"] }),
  makePart("cooler-peerless-assassin", "Peerless Assassin 120 SE", "cooling", "Thermalright", 45, photos.pc, ["Dual tower air cooler", "2× 120mm PWM", "AM5 · LGA1700"], { Type: "Dual-tower air", Fans: "2 × 120mm", Sockets: "AM5, LGA1700" }),
  makePart("cooler-ak620", "AK620 Zero Dark", "cooling", "DeepCool", 69, photos.pc, ["Dual tower air cooler", "2× 120mm PWM", "AM5 · LGA1700"], { Type: "Dual-tower air", Fans: "2 × 120mm", Sockets: "AM5, LGA1700" }),
  makePart("cooler-liquid-240", "Liquid Freezer III 240", "cooling", "ARCTIC", 99, photos.pc, ["240mm liquid cooler", "PWM pump", "AM5 · LGA1700"], { Type: "240mm AIO", Radiator: "240mm", Sockets: "AM5, LGA1700" }),
  makePart("cooler-kraken-360", "Kraken 360 RGB", "cooling", "NZXT", 189, photos.pc, ["360mm liquid cooler", "LCD pump display", "AM5 · LGA1700"], { Type: "360mm AIO", Radiator: "360mm", Sockets: "AM5, LGA1700" }),
  makePart("cooler-pure-rock-2", "Pure Rock 2 FX", "cooling", "be quiet!", 49, photos.pc, ["Single tower air cooler", "120mm PWM", "AM5 · LGA1700"], { Type: "Single-tower air", Fan: "1 × 120mm", Sockets: "AM5, LGA1700" }),
];

export const categoryLabels: Record<Category, string> = {
  laptops: "Laptops",
  cpu: "Processors",
  gpu: "Graphics cards",
  motherboard: "Motherboards",
  ram: "Memory",
  storage: "Storage",
  psu: "Power supplies",
  case: "Cases",
  cooling: "Cooling",
};

export const categoryOrder: Category[] = [
  "cpu",
  "motherboard",
  "ram",
  "gpu",
  "storage",
  "psu",
  "case",
  "cooling",
];

export const componentCategories = categoryOrder.map((category) => ({
  category,
  label: categoryLabels[category],
  href: `/shop/${category}`,
}));

export const featuredBuilds = [
  {
    preset: "starter",
    name: "The Forge Starter",
    description: "A fast, balanced 1440p gaming build.",
    image: photos.pc,
    price: 1918,
    tags: ["1440p ready", "8-core CPU", "32GB DDR5"],
  },
  {
    preset: "creator",
    name: "Creator Studio",
    description: "Big memory and graphics for demanding work.",
    image: photos.desk,
    price: 2862,
    tags: ["4K workflows", "64GB DDR5", "Quiet cooling"],
  },
  {
    preset: "compact",
    name: "Compact Power",
    description: "Small footprint, no compromise on play.",
    image: photos.gpu,
    price: 1358,
    tags: ["Micro-ATX", "Ray tracing", "Wi-Fi 6E"],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}
