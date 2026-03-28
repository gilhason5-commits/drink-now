"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { use } from "react";
import Footer from "../../components/Footer";

interface WineDetail {
  label: string;
  title: string;
  subtitle: string;
  price: string;
  salePrice?: string;
  volume: string;
  region: string;
  producer: string;
  classification: string;
  soil: string;
  description: string;
  profile: string;
  ageability: string;
  scores?: { score: string; critic: string }[];
  img: string;
  pairings: { icon: string; label: string }[];
}

// Bottle image pool — reused per category
const IMGS = {
  white: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVUtHD0ENaf43f8iVhdgUFFVWHVzf7TxomifKjPh-DjPMWirne2vw6mVxOGWj4MM6G6hvfAKpk-TFv1NurVQFT3Y5gBZ9hvaoYsLtvV-xCuA0BU45G-CeG8YgRGJZ1fjkgzvw8KiEWtLxavCFxg-rTDvZSzNVj2pvjyDKZd3tu5O3xSWnf5ZlZQ_Hg_XznAG_XsjL4MxClJMwGNvdIDp2t0N9E1u2DVWjn9MsCd9heiaTO1z-QWQ9-CnWznxeeRGQHS6VXkb00",
  red: "https://lh3.googleusercontent.com/aida-public/AB6AXuBv6RtOIwrO6E3hgvd0Htu0Q8I1FCspjkA50KWdHe3QpEVY_YPb3L7Cw_wYZm7wPGqJ9dHpP9t-V39lfrWDJ65xsFo7JaugUsV5g2bOGTD4j1QmAxDggGc-Bu3i1jh2xzYXClsp_8s35lCtmTknGpVZAyT1Nh2UfH7E_PGWtiiqejax82falmdLWQx70Qv_v_7oQGyIQ-O7spkif6aSQvZPUnF_VllFnryy2gSXMYCY-D8bIETMbBu9Ha5qjZWB1HKwTBY97roa",
  rose: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0FNFZESK-Bg56inJIrjSuAfVUWNR7Ye2E0nGwl0OYpG6Fphg87a9KsTx2VDrJw31tGJl_xCxPOI8_DlYAKhWZaz2JtiH6t1XOgnRhK_KkaVmbLrnU1FbO3u-eHznfrY3oe2pLw7Y8Dqqm0VTR3yVtrr2jtl6xHRhe5cLiu_5dDylK4rB0Iyu_s16IjOug6mYuZtuec7aYmOSwZ_9DTwYldS8ewSYAGrvWYOnf2OYC0oFQ8yRu8w9YMYNZa27oBo7yDr2xBeSS",
  sparkling: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEnfZ34aT3GbEd00iw6TAj1zVwz-90pg-9S0wqjXy2tnDt4h6c_ckc_Ll0-qwPtUhu-37-Wd_yqj0rnPKivWrK2Rkmgww7SGtZmgY-vdhGApnH7iyNnRiEadM2A-1sCGSoK0PzwptBErjwP2trR7FRQwMz92TlhuNCNEj2dSx1WvdjHqrbLBbvJ5-DR4ORQPNDXIQbc_28qbbAUtF4zwighQ4ICbSklTsrkjSD03NSiz-3M520hmjL6syKS6vvJNaG_aZA_11e",
};

const PAIRINGS_FISH = [
  { icon: "set_meal", label: "Grilled fish with lemon and herbs" },
  { icon: "restaurant", label: "Gefilte fish with horseradish" },
  { icon: "bakery_dining", label: "Green salad with vinaigrette" },
];
const PAIRINGS_MEAT = [
  { icon: "restaurant", label: "Roast chicken with root vegetables" },
  { icon: "set_meal", label: "Braised beef with mushrooms" },
  { icon: "bakery_dining", label: "Roast lamb with herbs" },
];

const wineData: Record<string, WineDetail> = {
  "carlo-schmitt-kabinett": {
    label: "Carlo Schmitt · Mosel",
    title: "2024 Köwericher Laurentiuslay",
    subtitle: "Kabinett",
    price: "₪110",
    salePrice: "₪93",
    volume: "750ml · 7.5% Alc/Vol",
    region: "Mosel, Germany",
    producer: "Carlo Schmitt",
    classification: "Kabinett",
    soil: "Blue Slate (Devonian)",
    description: "Carlo Schmitt is one of our favourite estates in the Mosel. This Kabinett — from the Köwericher Laurentiuslay vineyard — is a classic off-dry white with lively acidity and crystalline minerality. Joyful in the glass, and wonderful with food.",
    profile: "Aromas of green apple, lemon, white peach and wet stones. On the palate — light, delicately sweet, with vibrant acidity that cuts a beautiful line. Long and mineral.",
    ageability: "Excellent now and will keep beautifully for 5–8 more years, developing the petrol notes characteristic of aged Riesling.",
    scores: [{ score: "93", critic: "Drink Now Panel" }],
    img: IMGS.white,
    pairings: PAIRINGS_FISH,
  },
  "carlo-schmitt-feinherb": {
    label: "Carlo Schmitt · Mosel",
    title: "2024 Vom Schiefer",
    subtitle: "Riesling Feinherb",
    price: "₪130",
    volume: "750ml · 11% Alc/Vol",
    region: "Mosel, Germany",
    producer: "Carlo Schmitt",
    classification: "Feinherb (Off-Dry)",
    soil: "Slate",
    description: "\"Vom Schiefer\" — from the slate. A mineral, gently off-dry Riesling drawn directly from Carlo Schmitt's slate parcels. A perfect match for spiced fish, chopped liver and salads.",
    profile: "Clear and bright. Aromas of lemon, delicate petrol, white rose. On the palate — subtly sweet with lively acidity and direct minerality.",
    ageability: "Ready to drink now. Will keep well for 3–5 years.",
    img: IMGS.white,
    pairings: PAIRINGS_FISH,
  },
  "carlo-schmitt-herrenberg-gg": {
    label: "Carlo Schmitt · Mosel",
    title: "2024 Herrenberg",
    subtitle: "Riesling GG Trocken",
    price: "₪220",
    volume: "750ml · 12.5% Alc/Vol",
    region: "Mosel, Germany",
    producer: "Carlo Schmitt",
    classification: "Grosses Gewächs (GG)",
    soil: "Blue Slate",
    description: "The GG (Grosses Gewächs) is the highest classification for dry German Riesling. From the premier Herrenberg vineyard — a powerful, deep wine that will elevate any celebratory meal.",
    profile: "Light gold. Aromas of white peach, grapefruit, blossoms and stones. On the palate — dry, powerful, with lively acidity and a long mineral finish.",
    ageability: "Peak drinking 2026–2035. Excellent ageing potential.",
    img: IMGS.white,
    pairings: [
      { icon: "set_meal", label: "Baked fish with vegetables" },
      { icon: "restaurant", label: "Grilled chicken with mushrooms" },
      { icon: "bakery_dining", label: "Creamy pasta with vegetables" },
    ],
  },
  "carlo-schmitt-beerenauslese": {
    label: "Carlo Schmitt · Mosel",
    title: "2006 Longuicher Maximiner Herrenberg",
    subtitle: "BeerenAuslese 375ml",
    price: "₪250",
    salePrice: "₪210",
    volume: "375ml · 7% Alc/Vol",
    region: "Mosel, Germany",
    producer: "Carlo Schmitt",
    classification: "BeerenAuslese",
    soil: "Blue Slate",
    description: "A rare dessert wine from the outstanding 2006 vintage in the Mosel. BA is produced from grapes affected by Botrytis cinerea (noble rot), which concentrates the sugars. Sweet, rich and complex.",
    profile: "Deep gold. Aromas of honey, dried apricot, candied orange and rosemary. On the palate — sweet and rich with vibrant acidity providing perfect balance. Long, elegant finish.",
    ageability: "At its peak now through 2030+. A wine for special occasions.",
    img: IMGS.white,
    pairings: [
      { icon: "bakery_dining", label: "Crème brûlée and fresh fruits" },
      { icon: "restaurant", label: "Blue and aged cheeses" },
      { icon: "set_meal", label: "Apple cake and tarts" },
    ],
  },
  "hermann-ludes-feinherb": {
    label: "Hermann Ludes · Mosel",
    title: "2021 Thörnicher Ritsch",
    subtitle: "Riesling Feineherb",
    price: "₪160",
    salePrice: "₪132",
    volume: "750ml · 10.5% Alc/Vol",
    region: "Mosel, Germany",
    producer: "Hermann Ludes",
    classification: "Feineherb (Off-Dry)",
    soil: "Devonian Blue Slate",
    description: "Hermann Ludes is a unicorn estate we recently discovered in the Mosel. The Thörnicher Ritsch is a steep vineyard on blue slate, producing a Riesling that feels youthful and energetic even as it ages.",
    profile: "Delicate petrol, lemon, herbs and stones on the nose. Mineral with gentle sweetness that feels entirely natural. Lively acidity and a long finish.",
    ageability: "Ready to drink now and will keep beautifully for 5–10 more years.",
    img: IMGS.white,
    pairings: PAIRINGS_FISH,
  },
  "ludes-kabinett": {
    label: "Hermann Ludes · Mosel",
    title: "2014 Pölicher Held",
    subtitle: "Riesling Kabinett",
    price: "₪195",
    volume: "750ml · 8% Alc/Vol",
    region: "Mosel, Germany",
    producer: "Hermann Ludes",
    classification: "Kabinett",
    soil: "Devonian Blue Slate",
    description: "A mineral Riesling that tastes younger than its 2014 vintage. The blue slate of Pölicher Held gives the wine vibrant acidity and a mineral depth that reveals itself with time.",
    profile: "Clear, lemony, with apple blossoms and stones. On the palate — near-dry with delicate sweetness, lively acidity and direct minerality.",
    ageability: "Now through 2030. A Riesling that has proven itself.",
    img: IMGS.white,
    pairings: PAIRINGS_FISH,
  },
  "von-hovel-gold-reserve": {
    label: "Von Hövel · Saar",
    title: "2017 Scharzhofberger",
    subtitle: "Riesling Gold Reserve",
    price: "₪245",
    salePrice: "₪199",
    volume: "750ml · 9.5% Alc/Vol",
    region: "Saar, Germany",
    producer: "Von Hövel",
    classification: "Gold Reserve (Off-Dry)",
    soil: "Greywacke Slate",
    description: "Scharzhofberg — one of the most celebrated vineyards in the world. Von Hövel's Gold Reserve is the off-dry interpretation, coming directly from the estate cellars after years of ageing.",
    profile: "Gold. Aromas of honey, apricot, lemon and rock. On the palate — delicately sweet, with lively acidity and deep minerality. Long and elegant.",
    ageability: "At its peak now through 2028+.",
    img: IMGS.white,
    pairings: PAIRINGS_FISH,
  },
  "von-hovel-scharzhofberger-gg": {
    label: "Von Hövel · Saar",
    title: "2022 Scharzhofberger",
    subtitle: "Riesling GG",
    price: "₪320",
    volume: "750ml · 12% Alc/Vol",
    region: "Saar, Germany",
    producer: "Von Hövel",
    classification: "Grosses Gewächs (GG)",
    soil: "Greywacke Slate",
    description: "GG from Scharzhofberg — one of Germany's most prestigious vineyards. Rated 96 points by Falstaff. Dry, mineral, grand — and a perfect match for a festive meal.",
    profile: "Pale gold. Aromas of grapefruit, herbs, flint and flowers. On the palate — dry and powerful with sharp acidity and a very long mineral finish.",
    ageability: "Will age and develop for another 10–15 years. Peak drinking 2028–2038.",
    scores: [{ score: "96", critic: "Falstaff" }],
    img: IMGS.white,
    pairings: [
      { icon: "set_meal", label: "Grilled fish with vegetables" },
      { icon: "restaurant", label: "White asparagus with butter" },
      { icon: "bakery_dining", label: "Roast chicken with mushrooms" },
    ],
  },
  "kruger-rump-rose": {
    label: "Kruger Rumpf · Nahe",
    title: "2024 Rosé Pinot Noir",
    subtitle: "Trocken",
    price: "₪140",
    volume: "750ml · 12.5% Alc/Vol",
    region: "Nahe, Germany",
    producer: "Kruger Rumpf",
    classification: "Qualitätswein",
    soil: "Volcanic & Sandstone",
    description: "A dry, elegant rosé from Pinot Noir. Aromas of strawberry with the depth to match stuffed fish, grilled fish and even cold cuts. A joyful, refreshing wine.",
    profile: "Salmon pink. Aromas of strawberry, raspberry, flowers and stones. On the palate — dry, fresh, with pleasant acidity and a fruity finish.",
    ageability: "Ready to drink now. Best enjoyed in 2024–2025.",
    img: IMGS.rose,
    pairings: [
      { icon: "set_meal", label: "Stuffed and grilled fish" },
      { icon: "restaurant", label: "Cold cuts and starters" },
      { icon: "bakery_dining", label: "Light salads" },
    ],
  },
  "kruger-rump-blanc-de-noirs": {
    label: "Kruger Rumpf · Nahe",
    title: "2024 Blanc de Noirs",
    subtitle: "Trocken (Pinot Rosé)",
    price: "₪155",
    volume: "750ml · 12.5% Alc/Vol",
    region: "Nahe, Germany",
    producer: "Kruger Rumpf",
    classification: "Qualitätswein",
    soil: "Volcanic & Sandstone",
    description: "A rosé vinified as a white — 25% barrel aged. Pinot Noir with depth and body. Matches fish, salads and poultry beautifully.",
    profile: "Pale pink. Aromas of white peach, strawberry, delicate vanilla and flowers. On the palate — dry and full-bodied with a fine finish.",
    ageability: "Ready to drink now. 2024–2026.",
    img: IMGS.rose,
    pairings: [
      { icon: "set_meal", label: "Fish, salads, poultry" },
      { icon: "restaurant", label: "Vegetable risotto" },
      { icon: "bakery_dining", label: "Soft cheeses" },
    ],
  },
  "kruger-rump-sekt": {
    label: "Kruger Rumpf · Nahe",
    title: "NV Pinot Brut",
    subtitle: "SEKT",
    price: "₪165",
    salePrice: "₪140",
    volume: "750ml · 12% Alc/Vol",
    region: "Nahe, Germany",
    producer: "Kruger Rumpf",
    classification: "SEKT (German Sparkling)",
    soil: "Volcanic & Sandstone",
    description: "SEKT is German sparkling wine — a dry, energetic blanc de noirs from Pinot Noir. A perfect aperitif or companion to fish and the first courses of a holiday meal.",
    profile: "Fine bubbles. Aromas of green apple, lemon, brioche and flowers. On the palate — dry, with lively acidity and a long finish.",
    ageability: "Ready to drink now.",
    img: IMGS.sparkling,
    pairings: [
      { icon: "set_meal", label: "Any fish or seafood course" },
      { icon: "restaurant", label: "Soup and light starters" },
      { icon: "bakery_dining", label: "Vegetables and light poultry" },
    ],
  },
  "kanakaris-roditis": {
    label: "Kanakaris Winery · Greece",
    title: "2024 Roditis",
    subtitle: "High Altitude Vines",
    price: "₪120",
    volume: "750ml · 12% Alc/Vol",
    region: "Peloponnese, Greece",
    producer: "Kanakaris Winery",
    classification: "PGI Peloponnese",
    soil: "Sandy Loam (800–1100m)",
    description: "From Kanakaris Winery in northern Peloponnese, Greece. Roditis grown at 800–1100m altitude near the Gulf of Corinth. An elegant and surprising Greek white — perfect alongside fish, salads and poultry.",
    profile: "Clear and bright. Aromas of lemon, peach, flowers and stones. On the palate — light and refreshing with pleasant acidity.",
    ageability: "Ready to drink now. Best in 2024–2026.",
    img: IMGS.white,
    pairings: [
      { icon: "set_meal", label: "Fish and seafood" },
      { icon: "restaurant", label: "Greek salad with feta" },
      { icon: "bakery_dining", label: "Light chicken with lemon" },
    ],
  },
  "kanakaris-malagousia": {
    label: "Kanakaris Winery · Greece",
    title: "2024 Malagousia",
    subtitle: "High Altitude Vines",
    price: "₪130",
    volume: "750ml · 12.5% Alc/Vol",
    region: "Peloponnese, Greece",
    producer: "Kanakaris Winery",
    classification: "PGI Peloponnese",
    soil: "Sandy Loam (800–1100m)",
    description: "Malagousia is a rare and aromatic Greek variety being revived. From Kanakaris at high altitude — a powerful wine with a distinctive and fascinating character.",
    profile: "Pale gold. Aromas of mango, peach, tropical flowers and mint. On the palate — rich and full-bodied with pleasant acidity.",
    ageability: "Ready to drink now. Best in 2024–2026.",
    img: IMGS.white,
    pairings: [
      { icon: "set_meal", label: "Fish and seafood" },
      { icon: "restaurant", label: "Poultry with Eastern spices" },
      { icon: "bakery_dining", label: "Salads with vinaigrette" },
    ],
  },
  "vigneron-mancey-chardonnay": {
    label: "Les Vignerons de Mancey · Burgundy",
    title: "2023 Bourgogne Chardonnay",
    subtitle: "Les Essentielles",
    price: "₪110",
    salePrice: "₪95",
    volume: "750ml · 12.5% Alc/Vol",
    region: "Burgundy, France",
    producer: "Les Vignerons de Mancey",
    classification: "Bourgogne AOC",
    soil: "Limestone & Clay",
    description: "A delicate, unoaked Chardonnay from Burgundy — the perfect foundation for any holiday meal. Burgundian elegance at an accessible price.",
    profile: "Pale gold. Aromas of apple, pear, lemon and flowers. On the palate — light, clean, with pleasant acidity.",
    ageability: "Ready to drink now. 2023–2026.",
    img: IMGS.white,
    pairings: [
      { icon: "set_meal", label: "Salads, fish, poultry" },
      { icon: "restaurant", label: "Creamy risotto" },
      { icon: "bakery_dining", label: "Soft white cheeses" },
    ],
  },
  "bitouzet-meursault-corbin-2023": {
    label: "Bitouzet-Prieur · Volnay",
    title: "2023 Meursault",
    subtitle: "Les Corbin",
    price: "₪345",
    salePrice: "₪295",
    volume: "750ml · 13% Alc/Vol",
    region: "Burgundy, France",
    producer: "Bitouzet-Prieur",
    classification: "Meursault AOC",
    soil: "Limestone (Comblanchien)",
    description: "Classic Meursault from the traditional Burgundian school. 90 points from Burghound. Chardonnay at the height of its sophistication — ideal with grilled fish, poultry, mushrooms and vegetables.",
    profile: "Gold. Aromas of butter, hazelnut, apple, lemon and stones. On the palate — rich, with fine acidity and a long finish.",
    ageability: "Excellent now and will develop for another 5–8 years.",
    scores: [{ score: "90", critic: "Burghound" }],
    img: IMGS.white,
    pairings: [
      { icon: "set_meal", label: "Grilled fish with beurre blanc" },
      { icon: "restaurant", label: "Roast chicken with mushrooms" },
      { icon: "bakery_dining", label: "Root vegetables from the oven" },
    ],
  },
  "labruyere-gamay-2021": {
    label: "Dom. Labruyère · Moulin-à-Vent",
    title: "2021 Bourgogne Gamay",
    subtitle: "Old Vines",
    price: "₪110",
    salePrice: "₪95",
    volume: "750ml · 13% Alc/Vol",
    region: "Moulin-à-Vent, France",
    producer: "Dom. Labruyère",
    classification: "Bourgogne AOC",
    soil: "Granite & Sandy Loam",
    description: "Gamay from old vines at Labruyère — a fruity and inviting wine for any holiday meal. Relatively light, with the ripeness to complement poultry and braised meats.",
    profile: "Red-purple. Aromas of raspberry, strawberry, flowers and earth. On the palate — fruity, supple, with soft tannins and pleasant acidity.",
    ageability: "Ready to drink now. 2021–2026.",
    img: IMGS.red,
    pairings: PAIRINGS_MEAT,
  },
  "labruyere-clos-monopole-2014": {
    label: "Dom. Labruyère · Moulin-à-Vent",
    title: "2014 Moulin-à-Vent",
    subtitle: "Le Clos Monopole",
    price: "₪295",
    salePrice: "₪255",
    volume: "750ml · 13.5% Alc/Vol",
    region: "Moulin-à-Vent, France",
    producer: "Dom. Labruyère",
    classification: "Moulin-à-Vent AOC",
    soil: "Granite (Monopole)",
    description: "A grand and elegant wine from an exclusive single vineyard. At its peak now. Rated 17.5 by Jancis Robinson. Moulin-à-Vent at its finest — one of Beaujolais' greatest Crus.",
    profile: "Deep ruby. Aromas of cherry, plum, minerals and earth. On the palate — a grand, elegant wine with silky tannins and a long finish.",
    ageability: "At its peak now through 2030.",
    scores: [{ score: "17.5", critic: "Jancis Robinson" }],
    img: IMGS.red,
    pairings: PAIRINGS_MEAT,
  },
  "pierre-laurent-bourgogne-2023": {
    label: "Pierre Laurent · Burgundy",
    title: "2023 Bourgogne",
    subtitle: "Hautes Côtes de Nuits",
    price: "₪150",
    salePrice: "₪130",
    volume: "750ml · 13% Alc/Vol",
    region: "Burgundy, France",
    producer: "Pierre Laurent",
    classification: "Bourgogne Hautes Côtes de Nuits AOC",
    soil: "Limestone & Clay",
    description: "An elegant village-level Burgundy. Pinot Noir from the slopes of the Côte de Nuits — aromatic, delicate and well-suited to any holiday meal.",
    profile: "Ruby. Aromas of strawberry, cherry, flowers and earth. On the palate — elegant with fine tannins and pleasant acidity.",
    ageability: "Ready to drink now. 2023–2028.",
    img: IMGS.red,
    pairings: PAIRINGS_MEAT,
  },
  "meix-foulot-mercurey-2022": {
    label: "Dom. Meix-Foulot · Burgundy",
    title: "2022 Mercurey",
    subtitle: "Côte Chalonnaise",
    price: "₪170",
    salePrice: "₪150",
    volume: "750ml · 13% Alc/Vol",
    region: "Burgundy, France",
    producer: "Dom. Meix-Foulot",
    classification: "Mercurey AOC",
    soil: "Limestone & Clay",
    description: "Mercurey is one of the charming appellations of the Côte Chalonnaise — real Burgundy at a reasonable price. From Meix-Foulot — a reliable, long-established estate.",
    profile: "Ruby. Aromas of black cherry, plum, spice and earth. On the palate — rounded with ripe tannins and a long finish.",
    ageability: "Excellent now and will develop for 5–8 years.",
    img: IMGS.red,
    pairings: PAIRINGS_MEAT,
  },
  "lignier-chambolle-2022": {
    label: "Dom. Georges Lignier · Burgundy",
    title: "2022 Chambolle-Musigny",
    subtitle: "Village",
    price: "₪390",
    salePrice: "₪340",
    volume: "750ml · 13% Alc/Vol",
    region: "Burgundy, France",
    producer: "Domaine Georges Lignier",
    classification: "Chambolle-Musigny AOC",
    soil: "Limestone & Marl",
    description: "A powerful Chambolle-Musigny from Domaine Georges Lignier. 91 points from Atkin. Decant two hours before serving. Excellent with poultry, meats and mushrooms.",
    profile: "Deep ruby. Aromas of cherry, rose, spice and earth. On the palate — powerful with good structure, ripe tannins and a long finish.",
    ageability: "Decant 2 hours. Will develop over another 8–12 years.",
    scores: [{ score: "91", critic: "Atkin" }],
    img: IMGS.red,
    pairings: PAIRINGS_MEAT,
  },
  "pavelot-dominode-2019": {
    label: "Jean-Marc & Hugues Pavelot · Burgundy",
    title: "2019 Savigny-lès-Beaune",
    subtitle: "La Dominode 1er Cru",
    price: "₪355",
    salePrice: "₪320",
    volume: "750ml · 13% Alc/Vol",
    region: "Burgundy, France",
    producer: "Jean-Marc & Hugues Pavelot",
    classification: "Savigny 1er Cru",
    soil: "Limestone & Clay",
    description: "An elegant Burgundy at Premier Cru level. Rated 93 points by Burghound. A perfect match for poultry, braised meats and mushrooms.",
    profile: "Ruby. Aromas of strawberry, cherry, spice and flowers. On the palate — elegant with good structure and a long finish.",
    ageability: "At its peak now through 2030.",
    scores: [{ score: "93", critic: "Burghound" }],
    img: IMGS.red,
    pairings: PAIRINGS_MEAT,
  },
  "bitouzet-volnay-2022": {
    label: "Bitouzet-Prieur · Burgundy",
    title: "2022 Volnay",
    subtitle: "Village",
    price: "₪275",
    salePrice: "₪230",
    volume: "750ml · 13% Alc/Vol",
    region: "Burgundy, France",
    producer: "Bitouzet-Prieur",
    classification: "Volnay AOC",
    soil: "Limestone & Clay",
    description: "Volnay is known for its elegant, floral Pinot Noir — a feminine and refined Burgundy. From Bitouzet-Prieur, outstanding value for a genuine Burgundy.",
    profile: "Ruby. Aromas of raspberry, strawberry, rose, spice and earth. On the palate — elegant with fine tannins and a floral finish.",
    ageability: "Excellent now and will develop for 5–8 years.",
    img: IMGS.red,
    pairings: PAIRINGS_MEAT,
  },
  "chateau-rouget-2015": {
    label: "Château Rouget · Pomerol",
    title: "2015 Château Rouget",
    subtitle: "Pomerol",
    price: "₪395",
    salePrice: "₪365",
    volume: "750ml · 14% Alc/Vol",
    region: "Pomerol, France",
    producer: "Château Rouget",
    classification: "Pomerol AOC",
    soil: "Clay & Gravel",
    description: "The wine for a roast beef or a celebratory braised dish. Vintage 2015 — an outstanding year in Pomerol. Rich, ripe Merlot in its prime.",
    profile: "Deep ruby. Aromas of plum, black cherry, vanilla, chocolate and earth. On the palate — opulent and rich with ripe tannins and a very long finish.",
    ageability: "At its peak now through 2030.",
    scores: [{ score: "94", critic: "Falstaff" }],
    img: IMGS.red,
    pairings: [
      { icon: "restaurant", label: "Roast beef with root vegetables" },
      { icon: "set_meal", label: "Festive braised beef" },
      { icon: "bakery_dining", label: "Roast lamb with herbs" },
    ],
  },
  "chateau-rouget-2016": {
    label: "Château Rouget · Pomerol",
    title: "2016 Château Rouget",
    subtitle: "Pomerol",
    price: "₪385",
    salePrice: "₪355",
    volume: "750ml · 14% Alc/Vol",
    region: "Pomerol, France",
    producer: "Château Rouget",
    classification: "Pomerol AOC",
    soil: "Clay & Gravel",
    description: "The most elegant of the three Rouget vintages we carry. 2016 is a classically structured year in Bordeaux — refined, long and built for the table.",
    profile: "Deep ruby. Aromas of dark cherry, cassis, cedar and earth. On the palate — precise, structured, with fine tannins and a long finish.",
    ageability: "Excellent now and will continue developing through 2030+.",
    scores: [{ score: "92", critic: "Falstaff" }],
    img: IMGS.red,
    pairings: [
      { icon: "restaurant", label: "Roast beef with root vegetables" },
      { icon: "set_meal", label: "Festive braised beef" },
      { icon: "bakery_dining", label: "Roast lamb with herbs" },
    ],
  },
  "chateau-rouget-2018": {
    label: "Château Rouget · Pomerol",
    title: "2018 Château Rouget",
    subtitle: "Pomerol",
    price: "₪375",
    salePrice: "₪345",
    volume: "750ml · 14.5% Alc/Vol",
    region: "Pomerol, France",
    producer: "Château Rouget",
    classification: "Pomerol AOC",
    soil: "Clay & Gravel",
    description: "The most approachable of the three right now. 2018 was a warm, generous year — rich black fruit, plush texture and immediate pleasure.",
    profile: "Deep ruby. Aromas of black cherry, plum, chocolate and spice. On the palate — lush and generous with soft tannins.",
    ageability: "Best now through 2030.",
    scores: [{ score: "94", critic: "Falstaff" }],
    img: IMGS.red,
    pairings: [
      { icon: "restaurant", label: "Roast beef with root vegetables" },
      { icon: "set_meal", label: "Festive braised beef" },
      { icon: "bakery_dining", label: "Roast lamb with herbs" },
    ],
  },
  "marchand-gevrey-centenaire-2014": {
    label: "Marchand Grillot · Burgundy",
    title: "2014 Gevrey-Chambertin",
    subtitle: "Champerrier Centenaire",
    price: "₪430",
    salePrice: "₪380",
    volume: "750ml · 13% Alc/Vol",
    region: "Burgundy, France",
    producer: "Marchand Grillot",
    classification: "Gevrey-Chambertin AOC",
    soil: "Limestone & Clay",
    description: "Gevrey-Chambertin from the cool 2014 vintage. 100-year-old vines — Centenaire. A classic Burgundy of red fruit and food-friendly structure.",
    profile: "Ruby. Aromas of strawberry, cherry, spice and earth. On the palate — classic with fine Burgundian structure and a long finish.",
    ageability: "At its peak now through 2028.",
    scores: [{ score: "94", critic: "Atkin" }],
    img: IMGS.red,
    pairings: PAIRINGS_MEAT,
  },
};

const defaultWine: WineDetail = {
  label: "Drink Now · Wine Selection",
  title: "Featured Vintage",
  subtitle: "Estate Selection",
  price: "See catalog",
  volume: "750ml",
  region: "Europe",
  producer: "Estate Producer",
  classification: "Estate",
  soil: "Limestone",
  description: "A boutique wine handpicked from our portfolio. Visit drinknow.co.il or contact us for full tasting notes and availability.",
  profile: "Aromas of fruit, flowers and minerality. On the palate — balanced with a long finish.",
  ageability: "Ready to drink now.",
  img: IMGS.white,
  pairings: PAIRINGS_FISH,
};

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const wine = wineData[slug] ?? defaultWine;

  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-screen-2xl mx-auto">
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 flex items-center gap-2 text-xs font-label uppercase tracking-widest text-outline"
      >
        <Link href="/" className="hover:text-primary-container transition-colors">Home</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <Link href="/catalog" className="hover:text-primary-container transition-colors">Catalog</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-on-surface">{wine.region}</span>
      </motion.div>

      {/* Product Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative"
        >
          <div className="bg-surface-container-low p-12 lg:p-20 flex justify-center items-center overflow-hidden">
            <motion.img
              alt={wine.title}
              className="h-[600px] w-auto object-contain"
              src={wine.img}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-container opacity-5 -z-10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 space-y-8"
        >
          <header>
            <div className="font-label text-sm uppercase tracking-[0.2em] text-primary-container mb-4">{wine.label}</div>
            <h1 className="font-headline text-5xl md:text-7xl text-tertiary font-bold leading-[1.1] mb-6 tracking-tighter">
              {wine.title} <br />
              <span className="italic font-normal">{wine.subtitle}</span>
            </h1>
            <div className="flex items-baseline gap-4">
              {wine.salePrice ? (
                <>
                  <span className="font-headline text-3xl text-primary-container">{wine.salePrice}</span>
                  <span className="font-body text-lg text-outline line-through">{wine.price}</span>
                </>
              ) : (
                <span className="font-headline text-3xl text-primary-container">{wine.price}</span>
              )}
              <span className="font-label text-sm text-outline uppercase tracking-widest">{wine.volume}</span>
            </div>
          </header>

          <div className="space-y-6 max-w-2xl">
            <p className="font-body text-lg leading-relaxed text-on-surface-variant">{wine.description}</p>
            <div className="grid grid-cols-2 gap-8 bg-surface-container-low p-6">
              {[
                { label: "Region", value: wine.region },
                { label: "Producer", value: wine.producer },
                { label: "Classification", value: wine.classification },
                { label: "Soil Type", value: wine.soil },
              ].map((item) => (
                <div key={item.label}>
                  <span className="block font-label text-[10px] uppercase tracking-widest text-outline mb-1">{item.label}</span>
                  <span className="block font-body font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <a
              href="https://www.drinknow.co.il"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex bg-primary-container text-on-primary px-12 py-5 font-label uppercase tracking-widest text-sm font-semibold items-center gap-3 hover:bg-primary transition-colors duration-300"
            >
              Order at drinknow.co.il
              <span className="material-symbols-outlined text-lg">open_in_new</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bento Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-32 grid grid-cols-1 md:grid-cols-12 gap-8"
      >
        <section className="md:col-span-8 bg-surface-container-low p-12 lg:p-16">
          <h2 className="font-headline text-3xl mb-12 tracking-tight">The Tasting Notes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="font-label text-xs uppercase tracking-widest text-primary-container font-bold">The Profile</h3>
              <p className="font-body text-on-surface-variant leading-relaxed">{wine.profile}</p>
            </div>
            <div className="space-y-4">
              <h3 className="font-label text-xs uppercase tracking-widest text-primary-container font-bold">Ageing Potential</h3>
              <p className="font-body text-on-surface-variant leading-relaxed">{wine.ageability}</p>
            </div>
          </div>
          {wine.scores && wine.scores.length > 0 && (
            <div className="mt-16 pt-8 bg-surface p-8 grid grid-cols-3 gap-4">
              {wine.scores.map((item) => (
                <div key={item.critic} className="text-center">
                  <span className="block font-headline text-4xl text-primary italic">{item.score}</span>
                  <span className="block font-label text-[10px] uppercase text-outline">{item.critic}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="md:col-span-4 bg-primary text-on-primary p-12 flex flex-col justify-between">
          <div>
            <h2 className="font-headline text-3xl mb-8 italic">Food Pairings</h2>
            <ul className="space-y-6">
              {wine.pairings.map((pairing) => (
                <li key={pairing.label} className="flex gap-4">
                  <span className="material-symbols-outlined text-outline-variant">{pairing.icon}</span>
                  <span className="font-body text-sm leading-snug">{pairing.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </motion.div>

      {/* Back */}
      <div className="mt-16">
        <Link href="/catalog" className="inline-flex items-center gap-3 text-primary-container font-label text-sm uppercase tracking-widest group hover:gap-5 transition-all duration-300">
          <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
          Back to Catalog
        </Link>
      </div>

      <div className="mt-16"><Footer /></div>
    </main>
  );
}
