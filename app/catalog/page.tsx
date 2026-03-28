"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";

type WineType = "Red" | "White" | "Sparkling" | "Rosé" | "Dessert";

interface Wine {
  slug: string;
  vintage: string;
  name: string;
  producer: string;
  region: string;
  type: WineType;
  price: string;
  salePrice?: string;
  score?: string;
  pairing?: string;
}

const wines: Wine[] = [
  // ── GERMANY & GREECE ───────────────────────────────────────────────────────
  { slug: "carlo-schmitt-kabinett", vintage: "2024", name: "Köwericher Laurentiuslay Kabinett", producer: "Carlo Schmitt", region: "Mosel, DE", type: "White", price: "₪110", salePrice: "₪93", pairing: "Spiced fish, gefilte fish, chopped liver" },
  { slug: "carlo-schmitt-feinherb", vintage: "2024", name: "Vom Schiefer Riesling Feinherb", producer: "Carlo Schmitt", region: "Mosel, DE", type: "White", price: "₪130", pairing: "Spiced fish, gefilte fish, vinaigrette salads" },
  { slug: "carlo-schmitt-herrenberg-gg", vintage: "2024", name: "Herrenberg Riesling GG Trocken", producer: "Carlo Schmitt", region: "Mosel, DE", type: "White", price: "₪220", pairing: "Grilled fish, poultry, mushrooms" },
  { slug: "carlo-schmitt-beerenauslese", vintage: "2006", name: "Longuicher Maximiner Herrenberg BeerenAuslese", producer: "Carlo Schmitt", region: "Mosel, DE", type: "Dessert", price: "₪250", salePrice: "₪210", pairing: "Cream desserts, apples, cheese" },
  { slug: "hermann-ludes-feinherb", vintage: "2021", name: "Thörnicher Ritsch Riesling Feineherb", producer: "Hermann Ludes", region: "Mosel, DE", type: "White", price: "₪160", salePrice: "₪132", pairing: "Spiced fish, gefilte fish, poultry, salads" },
  { slug: "ludes-kabinett", vintage: "2014", name: "Pölicher Held Riesling Kabinett", producer: "Hermann Ludes", region: "Mosel, DE", type: "White", price: "₪195", pairing: "Spiced fish, gefilte fish, poultry, salads" },
  { slug: "von-hovel-gold-reserve", vintage: "2017", name: "Scharzhofberger Riesling Gold Reserve", producer: "Von Hövel", region: "Saar, DE", type: "White", price: "₪245", salePrice: "₪199", pairing: "Fish, poultry, asparagus" },
  { slug: "von-hovel-scharzhofberger-gg", vintage: "2022", name: "Scharzhofberger Riesling GG", producer: "Von Hövel", region: "Saar, DE", type: "White", price: "₪320", score: "96 Falstaff", pairing: "Fish, poultry, asparagus" },
  { slug: "kruger-rump-rose", vintage: "2024", name: "Rosé Pinot Noir Trocken", producer: "Kruger Rumpf", region: "Nahe, DE", type: "Rosé", price: "₪140", pairing: "Stuffed fish, grilled fish" },
  { slug: "kruger-rump-blanc-de-noirs", vintage: "2024", name: "Blanc de Noirs Trocken", producer: "Kruger Rumpf", region: "Nahe, DE", type: "Rosé", price: "₪155", pairing: "Fish, salads, poultry" },
  { slug: "kruger-rump-sekt", vintage: "NV", name: "Pinot Brut – SEKT", producer: "Kruger Rumpf", region: "Nahe, DE", type: "Sparkling", price: "₪165", salePrice: "₪140", pairing: "Fish, vegetables, poultry, soup" },
  { slug: "kanakaris-roditis", vintage: "2024", name: "Roditis – High Altitude Vines", producer: "Kanakaris Winery", region: "Peloponnese, GR", type: "White", price: "₪120", pairing: "Fish, salads, poultry" },
  { slug: "kanakaris-malagousia", vintage: "2024", name: "Malagousia – High Altitude Vines", producer: "Kanakaris Winery", region: "Peloponnese, GR", type: "White", price: "₪130", pairing: "Fish, salads, poultry" },

  // ── CÔTE DE NUITS — Domaine Marchand Grillot ───────────────────────────────
  { slug: "marchand-bourgogne-2022", vintage: "2022", name: "Bourgogne, Pasquier des Chênes", producer: "Marchand Grillot", region: "Côte de Nuits, FR", type: "Red", price: "₪175", salePrice: "₪150", score: "89-90 Jasper Morris", pairing: "Poultry, light meats, mushrooms" },
  { slug: "marchand-bourgogne-2020", vintage: "2020", name: "Bourgogne, Pasquier des Chênes", producer: "Marchand Grillot", region: "Côte de Nuits, FR", type: "Red", price: "₪185", salePrice: "₪158", score: "88 Jasper Morris", pairing: "Poultry, light meats, mushrooms" },
  { slug: "marchand-chambolle-2022", vintage: "2022", name: "Chambolle-Musigny", producer: "Marchand Grillot", region: "Côte de Nuits, FR", type: "Red", price: "₪330", salePrice: "₪285", score: "91 Jasper Morris", pairing: "Poultry, mushrooms, lamb" },
  { slug: "marchand-gevrey-jouise-2022", vintage: "2022", name: "Gevrey-Chambertin, En Jouise", producer: "Marchand Grillot", region: "Côte de Nuits, FR", type: "Red", price: "₪295", salePrice: "₪255", pairing: "Roast meats, game, mushrooms" },
  { slug: "marchand-gevrey-jouise-2021", vintage: "2021", name: "Gevrey-Chambertin, En Jouise", producer: "Marchand Grillot", region: "Côte de Nuits, FR", type: "Red", price: "₪295", salePrice: "₪255", score: "92 Jasper Morris", pairing: "Roast meats, game, mushrooms" },
  { slug: "marchand-gevrey-creot-2022", vintage: "2022", name: "Gevrey-Chambertin, Creot", producer: "Marchand Grillot", region: "Côte de Nuits, FR", type: "Red", price: "₪310", salePrice: "₪270", pairing: "Roast meats, game, mushrooms" },
  { slug: "marchand-gevrey-creot-2021", vintage: "2021", name: "Gevrey-Chambertin, Creot", producer: "Marchand Grillot", region: "Côte de Nuits, FR", type: "Red", price: "₪310", salePrice: "₪270", score: "91 Jasper Morris", pairing: "Roast meats, game, mushrooms" },
  { slug: "marchand-gevrey-centenaire-2018", vintage: "2018", name: "Gevrey-Chambertin, Champerrier Centenaire", producer: "Marchand Grillot", region: "Côte de Nuits, FR", type: "Red", price: "₪370", salePrice: "₪325", pairing: "Roast beef, game, aged cheese" },
  { slug: "marchand-gevrey-centenaire-2017", vintage: "2017", name: "Gevrey-Chambertin, Champerrier Centenaire (100yr vines)", producer: "Marchand Grillot", region: "Côte de Nuits, FR", type: "Red", price: "₪295", score: "93 Jasper Morris", pairing: "Roast beef, game, aged cheese" },
  { slug: "marchand-gevrey-centenaire-2014", vintage: "2014", name: "Gevrey-Chambertin, Champerrier Centenaire (100yr vines)", producer: "Marchand Grillot", region: "Côte de Nuits, FR", type: "Red", price: "₪430", salePrice: "₪380", score: "94 Atkin", pairing: "Roast beef, game, aged cheese" },
  { slug: "marchand-gevrey-perriere-2020", vintage: "2020", name: "Gevrey-Chambertin 1er Cru, La Perrière", producer: "Marchand Grillot", region: "Côte de Nuits, FR", type: "Red", price: "₪455", salePrice: "₪395", score: "92 Jasper Morris", pairing: "Roast meats, game, mushrooms" },
  { slug: "marchand-gevrey-perriere-2011", vintage: "2011", name: "Gevrey-Chambertin 1er Cru, La Perrière", producer: "Marchand Grillot", region: "Côte de Nuits, FR", type: "Red", price: "₪680", salePrice: "₪595", score: "91 CellarTracker", pairing: "Roast meats, game, mushrooms" },
  { slug: "marchand-gevrey-chapelle-2021", vintage: "2021", name: "Gevrey-Chambertin 1er Cru, Petite Chapelle", producer: "Marchand Grillot", region: "Côte de Nuits, FR", type: "Red", price: "₪515", salePrice: "₪450", score: "93 Jasper Morris", pairing: "Game, roast meats, truffles" },
  { slug: "marchand-ruchottes-2021", vintage: "2021", name: "Ruchottes-Chambertin Grand Cru", producer: "Marchand Grillot", region: "Côte de Nuits, FR", type: "Red", price: "₪1,450", salePrice: "₪1,250", score: "94-96 Jasper Morris", pairing: "Game, roast meats, truffles" },

  // ── CÔTE DE NUITS — Domaine Jean Chauvenet ────────────────────────────────
  { slug: "chauvenet-nsg-vv-2022", vintage: "2022", name: "Nuits-Saint-Georges V.V.", producer: "Domaine Jean Chauvenet", region: "Côte de Nuits, FR", type: "Red", price: "₪280", salePrice: "₪240", score: "91 Burghound", pairing: "Roast meats, mushrooms, aged cheese" },
  { slug: "chauvenet-nsg-bousselots-2022", vintage: "2022", name: "Nuits-Saint-Georges 1er Cru, Aux Bousselots", producer: "Domaine Jean Chauvenet", region: "Côte de Nuits, FR", type: "Red", price: "₪395", salePrice: "₪340", score: "92 Burghound", pairing: "Roast meats, mushrooms, aged cheese" },
  { slug: "chauvenet-vosne-2023", vintage: "2023", name: "Vosne-Romanée, Aux Raviolles", producer: "Domaine Jean Chauvenet", region: "Côte de Nuits, FR", type: "Red", price: "₪345", salePrice: "₪295", pairing: "Poultry, mushrooms, light game" },

  // ── CÔTE DE NUITS — Domaine Georges Lignier ───────────────────────────────
  { slug: "lignier-chambolle-2022", vintage: "2022", name: "Chambolle-Musigny", producer: "Domaine Georges Lignier", region: "Côte de Nuits, FR", type: "Red", price: "₪390", salePrice: "₪340", score: "91 Atkin", pairing: "Poultry, mushrooms, lamb" },

  // ── CÔTE DE NUITS — Pierre Laurent Vigneron ───────────────────────────────
  { slug: "pierre-laurent-bourgogne-2023", vintage: "2023", name: "Bourgogne Hautes Côtes de Nuits", producer: "Pierre Laurent", region: "Côte de Nuits, FR", type: "Red", price: "₪150", salePrice: "₪130", score: "89 CellarTracker", pairing: "Poultry, light meats, mushrooms" },

  // ── CÔTE DE NUITS / BEAUNE — Bachey Legros ────────────────────────────────
  { slug: "bachey-bourgogne-blanc-2023", vintage: "2023", name: "Bourgogne Saint Martin (Blanc)", producer: "Bachey Legros", region: "Côte de Beaune, FR", type: "White", price: "₪160", salePrice: "₪140", score: "86 Atkin", pairing: "Shellfish, salads, light fish" },
  { slug: "bachey-chassagne-2023", vintage: "2023", name: "Chassagne-Montrachet Village", producer: "Bachey Legros", region: "Côte de Beaune, FR", type: "White", price: "₪345", salePrice: "₪295", score: "91 Jasper Morris", pairing: "Grilled fish, shellfish, poultry" },
  { slug: "bachey-chassagne-morgeot-2023", vintage: "2023", name: "Chassagne-Montrachet 1er Cru, Morgeot Petits Clos V.V.", producer: "Bachey Legros", region: "Côte de Beaune, FR", type: "White", price: "₪525", salePrice: "₪460", score: "92 CellarTracker", pairing: "Grilled fish, shellfish, white meats" },
  { slug: "bachey-santenay-2022", vintage: "2022", name: "Santenay, Champs Claude V.V.", producer: "Bachey Legros", region: "Côte de Beaune, FR", type: "Red", price: "₪200", salePrice: "₪175", score: "91 Atkin", pairing: "Poultry, braised meats, mushrooms" },
  { slug: "bachey-santenay-1er-2022", vintage: "2022", name: "Santenay 1er Cru, Clos Rousseau V.V.", producer: "Bachey Legros", region: "Côte de Beaune, FR", type: "Red", price: "₪265", salePrice: "₪230", score: "94 Atkin", pairing: "Roast meats, mushrooms, aged cheese" },

  // ── CÔTE DE BEAUNE — Domaine Edmond Cornu ─────────────────────────────────
  { slug: "cornu-bourgogne-pn-2023", vintage: "2023", name: "Bourgogne Pinot Noir", producer: "Domaine Edmond Cornu", region: "Côte de Beaune, FR", type: "Red", price: "₪150", salePrice: "₪130", score: "87 Jasper Morris", pairing: "Poultry, light meats, mushrooms" },

  // ── CÔTE DE BEAUNE — Domaine Jean-Marc & Hugues Pavelot ───────────────────
  { slug: "pavelot-savigny-2022", vintage: "2022", name: "Savigny-lès-Beaune", producer: "Pavelot", region: "Côte de Beaune, FR", type: "Red", price: "₪190", salePrice: "₪175", score: "88 Burghound", pairing: "Dark cherry, red fruits, poultry" },
  { slug: "pavelot-savigny-2021", vintage: "2021", name: "Savigny-lès-Beaune", producer: "Pavelot", region: "Côte de Beaune, FR", type: "Red", price: "₪198", salePrice: "₪180", score: "88 Burghound", pairing: "Aromatic, elegant — poultry, mushrooms" },
  { slug: "pavelot-savigny-2016", vintage: "2016", name: "Savigny-lès-Beaune", producer: "Pavelot", region: "Côte de Beaune, FR", type: "Red", price: "₪215", salePrice: "₪195", score: "88 Burghound", pairing: "Poultry, mushrooms, aged cheese" },
  { slug: "pavelot-savigny-2013", vintage: "2013", name: "Savigny-lès-Beaune", producer: "Pavelot", region: "Côte de Beaune, FR", type: "Red", price: "₪195", salePrice: "₪175", score: "89.5 CellarTracker", pairing: "Mature stage — ideal for aged wine lovers" },
  { slug: "pavelot-laviers-2021", vintage: "2021", name: "Savigny-lès-Beaune 1er Cru, Les Laviers", producer: "Pavelot", region: "Côte de Beaune, FR", type: "Red", price: "₪285", salePrice: "₪255", score: "91 Burghound", pairing: "Roast poultry, mushrooms, light game" },
  { slug: "pavelot-laviers-2020", vintage: "2020", name: "Savigny-lès-Beaune 1er Cru, Les Laviers", producer: "Pavelot", region: "Côte de Beaune, FR", type: "Red", price: "₪295", salePrice: "₪265", score: "91 Burghound", pairing: "Roast poultry, mushrooms, light game" },
  { slug: "pavelot-gravains-2019", vintage: "2019", name: "Savigny-lès-Beaune 1er Cru, Aux Gravains", producer: "Pavelot", region: "Côte de Beaune, FR", type: "Red", price: "₪310", salePrice: "₪280", score: "92 Burghound", pairing: "Roast meats, mushrooms, game" },
  { slug: "pavelot-gravains-2018", vintage: "2018", name: "Savigny-lès-Beaune 1er Cru, Aux Gravains", producer: "Pavelot", region: "Côte de Beaune, FR", type: "Red", price: "₪315", salePrice: "₪285", score: "92 Burghound", pairing: "Roast meats, mushrooms, game" },
  { slug: "pavelot-gravains-2017", vintage: "2017", name: "Savigny-lès-Beaune 1er Cru, Aux Gravains", producer: "Pavelot", region: "Côte de Beaune, FR", type: "Red", price: "₪320", salePrice: "₪290", score: "91 Burghound", pairing: "Decant 3 hrs — roast meats, game" },
  { slug: "pavelot-dominode-2020", vintage: "2020", name: "Savigny-lès-Beaune 1er Cru, La Dominode", producer: "Pavelot", region: "Côte de Beaune, FR", type: "Red", price: "₪330", salePrice: "₪298", score: "92 Burghound", pairing: "Estate flagship — roast meats, game" },
  { slug: "pavelot-dominode-2019", vintage: "2019", name: "Savigny-lès-Beaune 1er Cru, La Dominode", producer: "Pavelot", region: "Côte de Beaune, FR", type: "Red", price: "₪355", salePrice: "₪320", score: "93 Burghound", pairing: "Estate flagship — roast meats, game" },
  { slug: "pavelot-dominode-2018", vintage: "2018", name: "Savigny-lès-Beaune 1er Cru, La Dominode", producer: "Pavelot", region: "Côte de Beaune, FR", type: "Red", price: "₪365", salePrice: "₪330", score: "93 Burghound", pairing: "Warm vintage — richer style, roast meats" },
  { slug: "pavelot-dominode-2017", vintage: "2017", name: "Savigny-lès-Beaune 1er Cru, La Dominode", producer: "Pavelot", region: "Côte de Beaune, FR", type: "Red", price: "₪380", salePrice: "₪340", score: "92 Burghound", pairing: "Drink now — roast meats, mushrooms" },
  { slug: "pavelot-dominode-2014", vintage: "2014", name: "Savigny-lès-Beaune 1er Cru, La Dominode", producer: "Pavelot", region: "Côte de Beaune, FR", type: "Red", price: "₪398", salePrice: "₪360", score: "93 Burghound", pairing: "Excellent now — roast meats, game" },

  // ── CÔTE DE BEAUNE — Domaine Bitouzet-Prieur ──────────────────────────────
  { slug: "bitouzet-bourgogne-chard-2023", vintage: "2023", name: "Bourgogne Chardonnay", producer: "Bitouzet-Prieur", region: "Volnay, FR", type: "White", price: "₪160", salePrice: "₪140", score: "90 Atkin", pairing: "Shellfish, salads, grilled fish" },
  { slug: "bitouzet-bourgogne-chard-2022", vintage: "2022", name: "Bourgogne Chardonnay", producer: "Bitouzet-Prieur", region: "Volnay, FR", type: "White", price: "₪160", salePrice: "₪140", score: "91 CellarTracker", pairing: "Shellfish, salads, grilled fish" },
  { slug: "bitouzet-bourgogne-pn-2023", vintage: "2023", name: "Bourgogne Pinot Noir", producer: "Bitouzet-Prieur", region: "Volnay, FR", type: "Red", price: "₪145", salePrice: "₪125", score: "90 Atkin", pairing: "Poultry, light meats, mushrooms" },
  { slug: "bitouzet-meursault-corbin-2023", vintage: "2023", name: "Meursault, Les Corbin", producer: "Bitouzet-Prieur", region: "Volnay, FR", type: "White", price: "₪345", salePrice: "₪295", score: "90 Burghound", pairing: "Grilled fish, poultry, mushrooms" },
  { slug: "bitouzet-meursault-corbin-2022", vintage: "2022", name: "Meursault, Les Corbin", producer: "Bitouzet-Prieur", region: "Volnay, FR", type: "White", price: "₪345", salePrice: "₪295", score: "90 Jasper Morris", pairing: "Grilled fish, poultry, mushrooms" },
  { slug: "bitouzet-meursault-charmes-2023", vintage: "2023", name: "Meursault 1er Cru, Charmes", producer: "Bitouzet-Prieur", region: "Volnay, FR", type: "White", price: "₪560", salePrice: "₪485", score: "92 Burghound", pairing: "Decant 2 hrs — grilled fish, white meats, truffles" },
  { slug: "bitouzet-meursault-charmes-2022", vintage: "2022", name: "Meursault 1er Cru, Charmes", producer: "Bitouzet-Prieur", region: "Volnay, FR", type: "White", price: "₪550", salePrice: "₪475", score: "92 Jasper Morris", pairing: "Decant 2 hrs — grilled fish, white meats, truffles" },
  { slug: "bitouzet-meursault-santenos-2022", vintage: "2022", name: "Meursault 1er Cru, Santenots", producer: "Bitouzet-Prieur", region: "Volnay, FR", type: "White", price: "₪520", salePrice: "₪450", score: "92 Jasper Morris", pairing: "Grilled fish, white meats, mushrooms" },
  { slug: "bitouzet-volnay-2022", vintage: "2022", name: "Volnay", producer: "Bitouzet-Prieur", region: "Volnay, FR", type: "Red", price: "₪275", salePrice: "₪230", score: "90 Jasper Morris", pairing: "Poultry, mushrooms, light meats" },
  { slug: "bitouzet-volnay-2023", vintage: "2023", name: "Volnay", producer: "Bitouzet-Prieur", region: "Volnay, FR", type: "Red", price: "₪275", salePrice: "₪240", score: "16 Jancis Robinson", pairing: "Poultry, mushrooms, light meats" },
  { slug: "bitouzet-volnay-2020-half", vintage: "2020", name: "Volnay (375ml)", producer: "Bitouzet-Prieur", region: "Volnay, FR", type: "Red", price: "₪168", salePrice: "₪145", score: "90 Burghound", pairing: "Poultry, mushrooms (half bottle)" },
  { slug: "bitouzet-volnay-pitures-2020", vintage: "2020", name: "Volnay 1er Cru, Pitures", producer: "Bitouzet-Prieur", region: "Volnay, FR", type: "Red", price: "₪375", salePrice: "₪330", score: "17 Jancis Robinson", pairing: "Roast poultry, mushrooms, light game" },
  { slug: "bitouzet-volnay-clos-chenes-2022", vintage: "2022", name: "Volnay 1er Cru, Clos des Chênes", producer: "Bitouzet-Prieur", region: "Volnay, FR", type: "Red", price: "₪440", salePrice: "₪380", score: "93 Jasper Morris", pairing: "Estate flagship — game, roast meats" },
  { slug: "bitouzet-volnay-clos-chenes-2021", vintage: "2021", name: "Volnay 1er Cru, Clos des Chênes", producer: "Bitouzet-Prieur", region: "Volnay, FR", type: "Red", price: "₪450", salePrice: "₪390", score: "92 Burghound", pairing: "Estate flagship — game, roast meats" },

  // ── CÔTE CHALONNAISE & BEAUJOLAIS — Dom. Labruyère ────────────────────────
  { slug: "labruyere-gamay-2022", vintage: "2022", name: "Bourgogne Gamay, Old Vines", producer: "Dom. Labruyère", region: "Moulin-à-Vent, FR", type: "Red", price: "₪110", salePrice: "₪95", score: "16/20 Jancis Robinson", pairing: "Poultry, charcuterie, light meats" },
  { slug: "labruyere-gamay-2021", vintage: "2021", name: "Bourgogne Gamay, Old Vines", producer: "Dom. Labruyère", region: "Moulin-à-Vent, FR", type: "Red", price: "₪110", salePrice: "₪95", score: "16/20 Jancis Robinson", pairing: "Poultry, charcuterie, light meats" },
  { slug: "labruyere-gamay-2018", vintage: "2018", name: "Bourgogne Gamay, Old Vines", producer: "Dom. Labruyère", region: "Moulin-à-Vent, FR", type: "Red", price: "₪115", salePrice: "₪99", pairing: "Poultry, charcuterie, light meats" },
  { slug: "labruyere-coeur-2014", vintage: "2014", name: "Moulin-à-Vent, Coeur de Terroirs", producer: "Dom. Labruyère", region: "Moulin-à-Vent, FR", type: "Red", price: "₪165", salePrice: "₪145", score: "16.5/20 Jancis Robinson", pairing: "Mineral, red fruits — poultry, meats" },
  { slug: "labruyere-coeur-2015", vintage: "2015", name: "Moulin-à-Vent, Coeur de Terroirs", producer: "Dom. Labruyère", region: "Moulin-à-Vent, FR", type: "Red", price: "₪165", salePrice: "₪145", score: "16.5/20 Jancis Robinson", pairing: "Warm vintage — dark cherry, poultry, meats" },
  { slug: "labruyere-coeur-2020", vintage: "2020", name: "Moulin-à-Vent, Coeur de Terroirs", producer: "Dom. Labruyère", region: "Moulin-à-Vent, FR", type: "Red", price: "₪155", salePrice: "₪135", score: "90 Burghound", pairing: "Elegant, drink now — poultry, meats" },
  { slug: "labruyere-carquelin-2018", vintage: "2018", name: "Moulin-à-Vent, Le Carquelin", producer: "Dom. Labruyère", region: "Moulin-à-Vent, FR", type: "Red", price: "₪195", salePrice: "₪170", score: "91 Verte Vin", pairing: "Ripe, full — roast meats, mushrooms" },
  { slug: "labruyere-carquelin-2020", vintage: "2020", name: "Moulin-à-Vent, Le Carquelin", producer: "Dom. Labruyère", region: "Moulin-à-Vent, FR", type: "Red", price: "₪190", salePrice: "₪165", pairing: "Full, balanced — roast meats, mushrooms" },
  { slug: "labruyere-clos-monopole-2014", vintage: "2014", name: "Moulin-à-Vent, Le Clos Monopole", producer: "Dom. Labruyère", region: "Moulin-à-Vent, FR", type: "Red", price: "₪295", salePrice: "₪255", score: "17.5 Jancis Robinson", pairing: "Flagship — game, aged meats, mushrooms" },
  { slug: "labruyere-clos-monopole-2017", vintage: "2017", name: "Moulin-à-Vent, Le Clos Monopole", producer: "Dom. Labruyère", region: "Moulin-à-Vent, FR", type: "Red", price: "₪285", salePrice: "₪245", score: "92 Wine Spectator", pairing: "Flagship — game, aged meats, mushrooms" },

  // ── CÔTE CHALONNAISE — Dom. Meix-Foulot ───────────────────────────────────
  { slug: "meix-foulot-aligote-2023", vintage: "2023", name: "Bourgogne Aligoté", producer: "Dom. Meix-Foulot", region: "Mercurey, FR", type: "White", price: "₪104", salePrice: "₪90", score: "87 Burghound", pairing: "Aperitif, shellfish, light salads" },
  { slug: "meix-foulot-aligote-2022", vintage: "2022", name: "Bourgogne Aligoté", producer: "Dom. Meix-Foulot", region: "Mercurey, FR", type: "White", price: "₪104", salePrice: "₪90", score: "88 CellarTracker", pairing: "Aperitif, shellfish, light salads" },
  { slug: "meix-foulot-mercurey-blanc-2022", vintage: "2022", name: "Mercurey Blanc", producer: "Dom. Meix-Foulot", region: "Mercurey, FR", type: "White", price: "₪175", salePrice: "₪160", score: "88 Burghound", pairing: "Grilled fish, poultry, mushrooms" },
  { slug: "meix-foulot-mercurey-2023", vintage: "2023", name: "Mercurey Rouge", producer: "Dom. Meix-Foulot", region: "Mercurey, FR", type: "Red", price: "₪165", salePrice: "₪145", pairing: "Poultry, braised meats, mushrooms" },
  { slug: "meix-foulot-mercurey-2022", vintage: "2022", name: "Mercurey Rouge", producer: "Dom. Meix-Foulot", region: "Mercurey, FR", type: "Red", price: "₪170", salePrice: "₪150", score: "89 Burghound", pairing: "Poultry, braised meats, mushrooms" },
  { slug: "meix-foulot-saumonts-2023", vintage: "2023", name: "Mercurey 1er Cru, Les Saumonts", producer: "Dom. Meix-Foulot", region: "Mercurey, FR", type: "Red", price: "₪225", salePrice: "₪195", pairing: "Roast meats, mushrooms, game" },
  { slug: "meix-foulot-saumonts-2022", vintage: "2022", name: "Mercurey 1er Cru, Les Saumonts", producer: "Dom. Meix-Foulot", region: "Mercurey, FR", type: "Red", price: "₪225", salePrice: "₪195", score: "91 Burghound", pairing: "Roast meats, mushrooms, game" },
  { slug: "meix-foulot-montaigu-2023", vintage: "2023", name: "Mercurey 1er Cru, Clos Château de Montaigu Monopole", producer: "Dom. Meix-Foulot", region: "Mercurey, FR", type: "Red", price: "₪245", salePrice: "₪210", score: "93 Burghound", pairing: "Estate flagship — game, roast meats" },

  // ── MÂCONNAIS — Les Vignerons de Mancey ───────────────────────────────────
  { slug: "vigneron-mancey-chardonnay", vintage: "2023", name: "Bourgogne Chardonnay, Les Essentielles", producer: "Les Vignerons de Mancey", region: "Burgundy, FR", type: "White", price: "₪110", salePrice: "₪95", pairing: "Salads, fish, poultry" },

  // ── CHABLIS — Dom. Pinson ──────────────────────────────────────────────────
  { slug: "pinson-chablis-2023", vintage: "2023", name: "Chablis", producer: "Dom. Pinson", region: "Chablis, FR", type: "White", price: "₪155", salePrice: "₪135", score: "89 Burghound", pairing: "Oysters, shellfish, grilled fish" },
  { slug: "pinson-chablis-mademoiselle-2022", vintage: "2022", name: "Chablis, Cuvée Mademoiselle", producer: "Dom. Pinson", region: "Chablis, FR", type: "White", price: "₪180", salePrice: "₪158", score: "90 Jasper Morris", pairing: "Oysters, shellfish, grilled fish" },
  { slug: "pinson-chablis-mont-milieu-2022", vintage: "2022", name: "Chablis 1er Cru, Mont de Milieu", producer: "Dom. Pinson", region: "Chablis, FR", type: "White", price: "₪255", salePrice: "₪225", score: "93 Burghound", pairing: "Grilled fish, shellfish, asparagus" },
  { slug: "pinson-chablis-montmain-2022", vintage: "2022", name: "Chablis 1er Cru, Montmain", producer: "Dom. Pinson", region: "Chablis, FR", type: "White", price: "₪255", salePrice: "₪215", score: "92 Burghound", pairing: "Mineral, floral — fish, poultry" },
  { slug: "pinson-chablis-vaillon-2022", vintage: "2022", name: "Chablis 1er Cru, Vaillon", producer: "Dom. Pinson", region: "Chablis, FR", type: "White", price: "₪255", salePrice: "₪215", score: "92 Burghound", pairing: "Crisp, mineral — fish, poultry" },
  { slug: "pinson-chablis-le-clos-2022", vintage: "2022", name: "Chablis Grand Cru, Le Clos", producer: "Dom. Pinson", region: "Chablis, FR", type: "White", price: "₪410", salePrice: "₪360", score: "94 Burghound", pairing: "Grilled fish, white meats, truffles" },
  { slug: "pinson-chablis-authentique-2022", vintage: "2022", name: "Chablis Grand Cru, Le Clos Cuvée Authentique", producer: "Dom. Pinson", region: "Chablis, FR", type: "White", price: "₪465", salePrice: "₪410", score: "94 Atkin", pairing: "Estate flagship — fish, white meats, truffles" },
  { slug: "pinson-chablis-authentique-2021", vintage: "2021", name: "Chablis Grand Cru, Le Clos Cuvée Authentique", producer: "Dom. Pinson", region: "Chablis, FR", type: "White", price: "₪465", salePrice: "₪410", score: "94 Atkin", pairing: "Estate flagship — fish, white meats, truffles" },

  // ── BORDEAUX — Château Rouget ──────────────────────────────────────────────
  { slug: "chateau-rouget-2015", vintage: "2015", name: "Château Rouget", producer: "Château Rouget", region: "Pomerol, FR", type: "Red", price: "₪395", salePrice: "₪365", score: "94 Falstaff", pairing: "Roast beef, braised meats, truffles" },
  { slug: "chateau-rouget-2016", vintage: "2016", name: "Château Rouget", producer: "Château Rouget", region: "Pomerol, FR", type: "Red", price: "₪385", salePrice: "₪355", score: "92 Falstaff", pairing: "The most elegant of the three — roast meats" },
  { slug: "chateau-rouget-2018", vintage: "2018", name: "Château Rouget", producer: "Château Rouget", region: "Pomerol, FR", type: "Red", price: "₪375", salePrice: "₪345", score: "94 Falstaff", pairing: "Most approachable now — roast meats, menus" },
];

const typeBadge: Record<WineType, string> = {
  Red: "bg-primary-container/10 text-primary-container",
  White: "bg-surface-container-highest text-tertiary",
  Sparkling: "bg-secondary-container text-on-secondary-container",
  Rosé: "bg-[#fdbcbb]/40 text-secondary",
  Dessert: "bg-[#ffdada]/60 text-primary",
};

function FadeInRow({ wine, index }: { wine: Wine; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <motion.tr
      ref={ref}
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.02, ease: "easeOut" }}
      className={`group cursor-pointer transition-colors duration-200 ${
        index % 2 === 1 ? "bg-surface-container-low/30" : ""
      } hover:bg-surface-container-low`}
    >
      <td className="px-8 py-6 font-headline font-bold text-primary italic">
        {wine.vintage}
      </td>
      <td className="px-8 py-6">
        <Link
          href={`/catalog/${wine.slug}`}
          className="font-headline text-lg text-tertiary group-hover:text-primary-container transition-colors"
        >
          {wine.name}
        </Link>
        {wine.score && (
          <span className="ml-3 font-label text-[10px] uppercase tracking-wider text-outline border border-outline/30 px-2 py-0.5 rounded-full">
            {wine.score}
          </span>
        )}
      </td>
      <td className="px-8 py-6 text-on-surface-variant">{wine.producer}</td>
      <td className="px-8 py-6 text-on-surface-variant">{wine.region}</td>
      <td className="px-8 py-6 text-center">
        <span
          className={`px-3 py-1 text-[10px] font-label uppercase tracking-widest rounded-full ${typeBadge[wine.type]}`}
        >
          {wine.type}
        </span>
      </td>
      <td className="px-8 py-6 text-right tabular-nums">
        {wine.salePrice ? (
          <span className="flex flex-col items-end">
            <span className="font-body font-semibold text-primary-container">{wine.salePrice}</span>
            <span className="font-body text-xs text-outline line-through">{wine.price}</span>
          </span>
        ) : (
          <span className="font-body font-medium text-primary">{wine.price}</span>
        )}
      </td>
      <td className="px-4 py-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <Link href={`/catalog/${wine.slug}`}>
          <span className="material-symbols-outlined text-primary-container">arrow_forward</span>
        </Link>
      </td>
    </motion.tr>
  );
}

export default function CatalogPage() {
  const [typeFilter, setTypeFilter] = useState("All Varieties");
  const [sortBy, setSortBy] = useState("Latest Release");
  const [search, setSearch] = useState("");

  const filtered = wines
    .filter((w) => {
      const matchType = typeFilter === "All Varieties" || w.type === typeFilter;
      const matchSearch =
        search === "" ||
        w.name.toLowerCase().includes(search.toLowerCase()) ||
        w.producer.toLowerCase().includes(search.toLowerCase()) ||
        w.region.toLowerCase().includes(search.toLowerCase());
      return matchType && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "Price (High-Low)") {
        const pa = parseFloat((a.salePrice ?? a.price).replace(/[^0-9.]/g, ""));
        const pb = parseFloat((b.salePrice ?? b.price).replace(/[^0-9.]/g, ""));
        return pb - pa;
      }
      if (sortBy === "Vintage (Oldest)") {
        const aY = a.vintage === "NV" ? 9999 : parseInt(a.vintage);
        const bY = b.vintage === "NV" ? 9999 : parseInt(b.vintage);
        return aY - bY;
      }
      if (sortBy === "Region (A-Z)") return a.region.localeCompare(b.region);
      return 0;
    });

  return (
    <main className="pt-32 pb-24 max-w-screen-2xl mx-auto px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16"
      >
        <span className="font-label text-xs uppercase tracking-[0.2em] text-outline mb-4 block">
          Curated Selection
        </span>
        <h1 className="font-headline text-5xl md:text-6xl font-black text-primary mb-6 tracking-tight">
          The Wine Catalog
        </h1>
        <p className="max-w-2xl text-lg text-on-surface-variant font-body leading-relaxed">
          Boutique wines handpicked from Germany, Burgundy, Chablis, Bordeaux and Greece. Every bottle with a story, every appellation with character.
        </p>
      </motion.div>

      {/* Filter Bento */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <div className="col-span-2 lg:col-span-2 bg-surface-container-low p-4 md:p-6 rounded">
          <label className="font-label text-[10px] uppercase tracking-widest text-outline mb-2 block">
            Quick Search
          </label>
          <div className="relative">
            <input
              className="w-full bg-transparent border-b border-outline-variant py-3 pr-10 focus:outline-none focus:border-primary-container font-body placeholder:text-outline/50 transition-colors"
              placeholder="Search by name, producer or region..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="material-symbols-outlined absolute right-0 top-3 text-outline">search</span>
          </div>
        </div>

        <div className="bg-surface-container-low p-6 rounded">
          <label className="font-label text-[10px] uppercase tracking-widest text-outline mb-2 block">
            Variety
          </label>
          <select
            className="w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary-container font-body text-sm"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            {["All Varieties", "Red", "White", "Rosé", "Sparkling", "Dessert"].map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="bg-surface-container-low p-6 rounded">
          <label className="font-label text-[10px] uppercase tracking-widest text-outline mb-2 block">
            Sort By
          </label>
          <select
            className="w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary-container font-body text-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {["Latest Release", "Price (High-Low)", "Vintage (Oldest)", "Region (A-Z)"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Count */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="font-label text-xs uppercase tracking-widest text-outline mb-8"
      >
        {filtered.length} {filtered.length === 1 ? "wine" : "wines"} shown
      </motion.p>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-outline/10">
              {["Vintage", "Wine", "Producer", "Region", "Type", "Price", ""].map((h) => (
                <th
                  key={h}
                  className={`px-8 py-4 font-label text-[10px] uppercase tracking-widest text-outline text-left ${
                    h === "Price" ? "text-right" : ""
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((wine, i) => (
              <FadeInRow key={wine.slug} wine={wine} index={i} />
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-24 text-on-surface-variant font-body">
            No wines match your search.
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((wine, i) => (
          <Link key={wine.slug} href={`/catalog/${wine.slug}`}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.02 }}
              className="bg-surface-container-low rounded p-4 flex items-start justify-between gap-3 active:bg-surface-container"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-headline font-bold text-primary italic text-sm">{wine.vintage}</span>
                  <span className={`px-2 py-0.5 text-[9px] font-label uppercase tracking-widest rounded-full ${typeBadge[wine.type]}`}>
                    {wine.type}
                  </span>
                </div>
                <p className="font-headline font-bold text-tertiary text-base leading-snug truncate">{wine.name}</p>
                <p className="font-body text-xs text-outline mt-0.5">{wine.producer} · {wine.region}</p>
                {wine.score && (
                  <span className="inline-block mt-1 font-label text-[9px] uppercase tracking-wider text-primary-container border border-primary-container/30 px-1.5 py-0.5 rounded-full">
                    {wine.score}
                  </span>
                )}
              </div>
              <div className="shrink-0 text-right">
                {wine.salePrice ? (
                  <>
                    <p className="font-body font-semibold text-primary-container">{wine.salePrice}</p>
                    <p className="font-body text-xs text-outline line-through">{wine.price}</p>
                  </>
                ) : (
                  <p className="font-body font-medium text-primary">{wine.price}</p>
                )}
                <span className="material-symbols-outlined text-primary-container text-sm mt-1 block">arrow_forward</span>
              </div>
            </motion.div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-24 text-on-surface-variant font-body">
            No wines match your search.
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
