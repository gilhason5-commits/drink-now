"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Footer from "../components/Footer";

function FadeInSection({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const bundles = [
  {
    id: "seder-5plus1",
    badge: "5+1 Intro Deal",
    badgeDark: false,
    name: "The Seder Night",
    nameEn: "Holiday Bundle",
    desc: "A wine selection suited for every course of the Passover meal — enjoyable for wine lovers and the aunt who asked for just a small pour alike. Includes a complimentary bottle from the Greek estate you should know.",
    bottles: "6 Bottles (5+1 Gift)",
    price: "₪592",
    salePrice: "₪490",
    payLink: "https://pay.sumit.co.il/3cndvs/su5at5/",
    wines: [
      { vintage: "2024", name: "Kruger Rumpf – Rosé Pinot Noir Trocken", type: "Dry Rosé", pairing: "Stuffed fish, grilled fish" },
      { vintage: "2024", name: "Carlo Schmitt – Vom Schiefer Riesling Feinherb", type: "Off-Dry White", pairing: "Spiced fish, gefilte fish, chopped liver" },
      { vintage: "2023", name: "Les Vignerons de Mancey – Bourgogne Chardonnay", type: "Dry White", pairing: "Salads, fish, poultry" },
      { vintage: "2021", name: "Dom. Labruyère – Bourgogne Gamay Old Vines (x2)", type: "Fruity Red", pairing: "Poultry, braised meats" },
      { vintage: "2024", name: "Kanakaris – Roditis High Altitude (Gift!)", type: "Dry White", pairing: "Fish, salads, poultry" },
    ],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwvXn7zwOk0PS0sPVSn-Lpz7VOFNmd60FE1iCYmrMQiGA2gvGnVoKrWafo0KcJbqJiHcYc4kXJQ_C8ZKpY2Cw4BJWpXOfG9k9wD_quz1hBvEHSB3OlclYZd60oWQOZx8b-Yq1PT3bfiVXepJEg6muO9-bKvEIUEF7fEVtqHYrV_Jojfu3QqZQANoFeuBbR4p5RLDqmGQyyQDDFz6qP34NfWG_8Ix9bP4CmV5wQ_MChSFddmhZvIXXDwKpDRDvGWr6RuGN0SLl8",
    dark: false,
  },
  {
    id: "yassas-rose",
    badge: "Light & Fresh",
    badgeDark: false,
    name: "Yassas Rosé Six-Pack",
    nameEn: "Greek & German",
    desc: "From the slopes of Aeghialeia in the northern Peloponnese, Kanakaris Winery brings crisp whites from vineyards at 800–1100m elevation. Alongside them, two quality rosés from the German estate Kruger Rumpf.",
    bottles: "6 Bottles",
    price: "₪547",
    salePrice: "₪457",
    payLink: "https://www.drinknow.co.il",
    wines: [
      { vintage: "2024", name: "Kanakaris – Malagousia High Altitude (x2)", type: "Dry White", pairing: "Fish, salads, poultry" },
      { vintage: "2024", name: "Kanakaris – Roditis High Altitude (x2)", type: "Dry White", pairing: "Fish, salads, poultry" },
      { vintage: "2024", name: "Kruger Rumpf – Rosé Pinot Noir Trocken", type: "Dry Rosé", pairing: "Stuffed fish, grilled fish" },
      { vintage: "2024", name: "Kruger Rumpf – Blanc de Noirs Trocken", type: "Dry Rosé", pairing: "Fish, salads, poultry" },
    ],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2YXwdkVU0t7g8XUHc02lQNTFGx4vFzeJwDE0pcqcC6PMrjWYDpvaGhESDFy5DX0ebTYjV017A4toX7YwQVmC9-y1Ku4_6K7TbMiW1UNlYqkKnoUX482mnKYYAqKm42ZIrRGkKuC1EHUsOxy-O-DeCCe2Izy6uTK0WiwjP1N9nrh6IYlALn89jXAS5O8JJcjVzZuhUI8W9hyu3l1IHfdTXTt7rxl1QkmkUvUmS5Xe2mhEhXtgHt2-kcdIMuRwp2acY_WD_k4fQ",
    dark: false,
  },
  {
    id: "uncle-france",
    badge: "Elevated",
    badgeDark: false,
    name: "The French Uncle",
    nameEn: "Burgundy & Germany",
    desc: "A wine selection for every course of the holiday meal, and for the French uncle who loves to tell you about the cellar he once had in Provence. A diverse range with a touch of sophistication — including a sparkling and a Burgundy red.",
    bottles: "6 Bottles",
    price: "₪948",
    salePrice: "₪790",
    payLink: "https://www.drinknow.co.il",
    wines: [
      { vintage: "2024", name: "Kruger Rumpf – Blanc de Noirs Trocken", type: "Dry Rosé", pairing: "Fish, salads, poultry" },
      { vintage: "NV", name: "Kruger Rumpf – Pinot Brut SEKT", type: "White Sparkling", pairing: "Fish, vegetables, poultry, soup" },
      { vintage: "2020", name: "Hermann Ludes – Thörnicher Ritsch Riesling Feineherb", type: "Off-Dry White", pairing: "Spiced fish, gefilte fish, chopped liver" },
      { vintage: "2024", name: "Carlo Schmitt – Herrenberg Riesling GG Trocken", type: "Premium Dry White", pairing: "Grilled fish, poultry, mushrooms" },
      { vintage: "2023", name: "Pierre Laurent – Bourgogne Hautes Côtes de Nuits", type: "Elegant Red", pairing: "Poultry, braised meats, mushrooms" },
      { vintage: "2022", name: "Dom. Meix-Foulot – Mercurey", type: "Elegant Red", pairing: "Poultry, braised meats, mushrooms" },
    ],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyTcJq7LerxC1fnZ2IYCgXv3_NP3BmZSuyxBuosZpvk-sMOaxT-TGplfdw0MJqNBlK5Ax_M-hCoQardYdw_0GknEz8ThNlToFCqQXtdybDFtK62y__ZBR8u8JOVxpqFzv9lrnohxhSayv5eRuxO7qX5zGIlfqP8xqXc4oGUB6iBY_t4lPBIZgvcslto8kxzni2TvalpoNlPq3oZI0dnZbVWZH4Hr8vpc57uEZaTDsLOd4kMNyQhsOd6j6Yeyss1_8OtDBn6t_z",
    dark: false,
  },
  {
    id: "connoisseur",
    badge: "PREMIUM",
    badgeDark: true,
    name: "The Connoisseur",
    nameEn: "Collector's Selection",
    desc: "A selection that elevates the holiday table. Includes aged and premium wines with an emphasis on bottles that have received high scores from critics we trust — Falstaff, Burghound, Jancis Robinson.",
    bottles: "7 Bottles",
    price: "₪1,785",
    salePrice: "₪1,485",
    payLink: "https://www.drinknow.co.il",
    wines: [
      { vintage: "2022", name: "Dom. Georges Lignier – Chambolle-Musigny", type: "Red", pairing: "Poultry, meat, mushrooms", score: "91 Atkin" },
      { vintage: "2022", name: "Von Hövel – Scharzhofberger Riesling GG", type: "Dry White", pairing: "Fish, poultry, asparagus", score: "96 Falstaff" },
      { vintage: "2014", name: "Hermann Ludes – Pölicher Held Riesling Kabinett", type: "Near-Dry White", pairing: "Spiced fish, gefilte fish, poultry" },
      { vintage: "2023", name: "Bitouzet Prieuré – Meursault Les Corbin", type: "Dry White", pairing: "Grilled fish, poultry, mushrooms", score: "90 Burghound" },
      { vintage: "2019", name: "Jean-Marc Pavelot – Savigny 1er Cru La Dominode", type: "Elegant Red", pairing: "Poultry, braised meats, mushrooms", score: "93 Burghound" },
      { vintage: "2014", name: "Dom. Labruyère – Moulin-à-Vent Le Clos Monopole", type: "Elegant Red", pairing: "Poultry, braised meats, mushrooms", score: "17.5 Jancis" },
    ],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVCavaoSuE1PvgCXqrd1vhTaidbRHR7WWfrMHnPgoH_KPD4fvSAZTusgLXw2jkLLU90JfCm83WpLpz8G5RrtBYVugxKELlmdj92nJ3FPyL1PF-k4A_sxOYMOaHhk1OxjUUZYg95QSlU_2CWdBi0YPW3HTyOXtzbdY4FOE0ElMdBJgjNdhVbazCGiSR0JFZMUDKBaGpzyCi0pzyHsa5Q0EN1A",
    dark: true,
  },
];

const saleWines = [
  { vintage: "2024", name: "Carlo Schmitt – Köwericher Laurentiuslay Kabinett", type: "White", price: "₪110", sale: "₪93", pairing: "Spiced fish, gefilte fish, chopped liver" },
  { vintage: "2021", name: "Hermann Ludes – Thörnicher Ritsch Feinherb", type: "White", price: "₪160", sale: "₪132", pairing: "Holiday fish, poultry, salads" },
  { vintage: "NV", name: "Kruger Rumpf – Pinot Brut SEKT", type: "Sparkling", price: "₪165", sale: "₪140", pairing: "Fish, soup, starters" },
  { vintage: "2022", name: "Bitouzet Prieuré – Volnay", type: "Red", price: "₪275", sale: "₪228", pairing: "Outstanding value for an elegant Burgundy" },
  { vintage: "2015", name: "Château Rouget – Pomerol", type: "Red", price: "₪395", sale: "₪355", pairing: "Roast beef, festive braised meats" },
  { vintage: "2014", name: "Marchand Grillot – Gevrey-Chambertin Centenaire", type: "Red", price: "₪430", sale: "₪365", pairing: "Classic Burgundy with food" },
  { vintage: "2017", name: "Von Hövel – Scharzhofberger Gold Reserve", type: "White", price: "₪245", sale: "₪199", pairing: "Off-dry, fish, poultry" },
  { vintage: "2006", name: "Carlo Schmitt – Longuicher BeerenAuslese 375ml", type: "Dessert", price: "₪250", sale: "₪210", pairing: "Cream desserts, apples, cheese" },
];

export default function BundlesPage() {
  return (
    <main className="pt-32 pb-24">
      {/* Header */}
      <header className="max-w-screen-2xl mx-auto px-8 mb-24">
        <FadeInSection>
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 border-b border-outline-variant/20 pb-12">
            <div className="max-w-2xl">
              <span className="font-label text-xs tracking-[0.1em] text-primary-container font-semibold block mb-4 uppercase">
                Passover in the Shelter Sale · Passover 2026
              </span>
              <h1 className="text-6xl md:text-8xl font-headline font-bold text-tertiary leading-tight -tracking-[0.02em]">
                Holiday <br />
                <span className="italic font-normal">Bundles.</span>
              </h1>
            </div>
            <div className="max-w-sm text-right">
              <p className="text-on-surface-variant font-body leading-relaxed italic text-lg">
                &ldquo;Important — to add another bundle or bottle, press &lsquo;Back&rsquo; and it will appear in your cart.&rdquo;
              </p>
            </div>
          </div>
        </FadeInSection>
      </header>

      {/* Bundle Cards */}
      <section className="max-w-screen-2xl mx-auto px-8 space-y-24">
        {bundles.map((bundle, i) => (
          <FadeInSection key={bundle.id} delay={i * 0.05}>
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
              {/* Image */}
              <div className={`lg:col-span-5 relative group ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="absolute -inset-3 bg-surface-container-low rounded-xl -z-10 transition-transform group-hover:scale-[1.02]" />
                <div className="relative overflow-hidden rounded h-full min-h-[360px]">
                  <motion.img
                    className="w-full h-full object-cover"
                    src={bundle.img}
                    alt={bundle.name}
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className={`absolute top-6 left-6 px-4 py-2 font-label text-xs tracking-widest font-bold ${bundle.badgeDark ? "bg-primary-container text-on-primary" : "bg-white text-primary"}`}>
                    {bundle.badge}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`lg:col-span-7 flex flex-col justify-between ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="space-y-6">
                  <div>
                    <p className="font-label text-xs uppercase tracking-widest text-outline mb-2">{bundle.nameEn}</p>
                    <h2 className="text-4xl font-headline font-bold text-tertiary mb-4">{bundle.name}</h2>
                    <p className="text-on-surface-variant text-lg leading-relaxed font-body">{bundle.desc}</p>
                  </div>

                  {/* Wine list */}
                  <div className="bg-surface-container-low p-6 rounded space-y-3">
                    <p className="font-label text-[10px] uppercase tracking-widest text-outline mb-4">
                      Bundle Contents
                    </p>
                    {bundle.wines.map((w, wi) => (
                      <div key={wi} className="flex items-start gap-4">
                        <span className="font-headline text-primary font-bold italic text-sm w-10 shrink-0 mt-0.5">{w.vintage}</span>
                        <div className="flex-1">
                          <span className="font-body text-sm text-tertiary font-medium">{w.name}</span>
                          {"score" in w && w.score && (
                            <span className="ml-2 font-label text-[9px] uppercase tracking-wider text-primary-container border border-primary-container/30 px-1.5 py-0.5 rounded-full">
                              {w.score}
                            </span>
                          )}
                          <p className="font-label text-[10px] text-outline mt-0.5">{w.type} · {w.pairing}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price + CTA */}
                <div className={`mt-8 p-8 rounded ${bundle.dark ? "bg-primary text-on-primary" : "bg-surface-container-low"}`}>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className={`block font-label text-[10px] uppercase tracking-widest mb-1 ${bundle.dark ? "text-on-primary/60" : "text-outline"}`}>
                        {bundle.bottles}
                      </span>
                      <div className="flex items-baseline gap-3">
                        <span className={`text-3xl font-headline font-bold ${bundle.dark ? "text-on-primary" : "text-primary-container"}`}>
                          {bundle.salePrice}
                        </span>
                        <span className={`line-through text-sm font-body ${bundle.dark ? "text-on-primary/40" : "text-outline"}`}>
                          {bundle.price}
                        </span>
                      </div>
                    </div>
                    <a
                      href={bundle.payLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-8 py-4 font-label uppercase tracking-widest text-xs font-bold transition-all active:translate-y-[2px] ${
                        bundle.dark
                          ? "bg-on-primary text-primary hover:bg-primary-container hover:text-on-primary"
                          : "bg-primary-container text-on-primary hover:bg-primary"
                      }`}
                    >
                      Order Now →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        ))}
      </section>

      {/* Individual Sale Wines */}
      <section className="max-w-screen-2xl mx-auto px-8 mt-32">
        <FadeInSection>
          <div className="mb-12">
            <span className="font-label text-xs uppercase tracking-[0.2em] text-outline mb-4 block">Holiday Sale</span>
            <h2 className="font-headline text-4xl font-bold text-tertiary mb-4">Individual Bottles at Special Prices</h2>
            <p className="text-on-surface-variant font-body">A selection of wines we love, at holiday sale prices.</p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {saleWines.map((w, i) => (
            <FadeInSection key={w.name} delay={i * 0.06}>
              <div className="bg-surface-container-low p-6 rounded flex flex-col justify-between h-full group hover:bg-surface-container transition-colors">
                <div>
                  <span className="font-headline font-bold text-primary italic text-sm block mb-2">{w.vintage}</span>
                  <h3 className="font-headline font-bold text-tertiary mb-2 group-hover:text-primary-container transition-colors leading-snug">
                    {w.name}
                  </h3>
                  <span className="font-label text-[10px] uppercase tracking-widest text-outline bg-surface-container-highest px-2 py-0.5 rounded-full">
                    {w.type}
                  </span>
                  <p className="font-body text-xs text-on-surface-variant mt-3 leading-relaxed">{w.pairing}</p>
                </div>
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-outline/10">
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline font-bold text-primary-container">{w.sale}</span>
                    <span className="text-xs text-outline line-through font-body">{w.price}</span>
                  </div>
                  <a
                    href="https://www.drinknow.co.il"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-label text-[10px] uppercase tracking-widest text-primary-container border border-primary-container/30 px-3 py-1.5 hover:bg-primary-container hover:text-on-primary transition-all"
                  >
                    Order
                  </a>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-screen-2xl mx-auto px-8 mt-24">
        <FadeInSection>
          <div className="bg-surface-container-highest p-12 md:p-24 grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { icon: "verified", title: "Personal Curation", desc: "Every bottle is handpicked directly from the estate, with a personal relationship with the winemakers." },
              { icon: "local_shipping", title: "Nationwide Delivery", desc: "Fast, careful delivery across all of Israel — heat-protected and handled with care." },
              { icon: "description", title: "Guidance & Pairings", desc: "Every bundle arrives with pairing recommendations for the holiday meal and detailed notes on each wine." },
            ].map((b) => (
              <div key={b.title} className="space-y-4">
                <span className="material-symbols-outlined text-primary-container text-4xl">{b.icon}</span>
                <h4 className="font-headline font-bold text-xl">{b.title}</h4>
                <p className="text-on-surface-variant font-body text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </FadeInSection>
      </section>

      <Footer />
    </main>
  );
}
