"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import Footer from "./components/Footer";

const wineCards = [
  {
    region: "Nahe, Germany",
    name: "Pinot Brut – SEKT",
    producer: "Kruger Rumpf",
    vintage: "NV",
    price: "₪165",
    score: null,
    type: "Sparkling",
    img: "/wines/kruger-rump-sekt.png",
    href: "/catalog/kruger-rump-sekt",
  },
  {
    region: "Nahe, Germany",
    name: "Blanc de Noirs Trocken",
    producer: "Kruger Rumpf",
    vintage: "2024",
    price: "₪155",
    score: null,
    type: "Rosé",
    img: "/wines/kruger-rump-blanc-de-noirs.png",
    href: "/catalog/kruger-rump-blanc-de-noirs",
  },
  {
    region: "Moulin-à-Vent, France",
    name: "Le Clos Monopole",
    producer: "Dom. Labruyère",
    vintage: "2014",
    price: "₪295",
    score: "17.5 Jancis",
    type: "Red",
    img: "/wines/labruyere-bottle-2.png",
    href: "/catalog/labruyere-clos-monopole-2014",
  },
  {
    region: "Moulin-à-Vent, France",
    name: "Bourgogne Gamay, Old Vines",
    producer: "Dom. Labruyère",
    vintage: "2021",
    price: "₪110",
    score: "16 Jancis",
    type: "Red",
    img: "/wines/labruyere-bottle-1.png",
    href: "/catalog/labruyere-gamay-2021",
  },
];

const founders = [
  {
    name: "Noam Jacobi",
    bio: "Noam founded Vigneron Imports with a singular obsession: the purity of Riesling. His decades of experience in the cellars of Mosel and Rheingau have forged relationships that allow us access to vintages rarely seen outside of private family estates.",
    align: "right",
  },
  {
    name: "Eyal Jacobi",
    bio: "With a background in fine-dining logistics and a palate refined by years of European exploration, Al oversees our operations. He ensures that every bottle, from the Grand Crus of Burgundy to the hidden gems of the Peloponnese, arrives in pristine condition.",
    align: "left",
  },
  {
    name: "Amir Scheinman",
    bio: "Amir is the storyteller of the trio. His passion lies in the \"Drink Now\" philosophy\u2014finding wines that bridge the gap between historic tradition and modern accessibility. He works closely with our producers to translate their artisan craft for the global connoisseur.",
    align: "right",
  },
];

// Pin positions are % of the visible 16:9 map container.
// The Europe map image spans roughly: left=10°W right=42°E, top=72°N bottom=30°N
// formula: left = (lon + 10) / 52 * 100   top = (72 - lat) / 42 * 100
const MAP_PINS = [
  {
    id: "mosel-saar",
    label: "Mosel & Saar",
    sublabel: "Germany",
    dot: "#3c000b",
    pulse: true,
    // Mosel: 7°E, 50°N  → left≈42%, top≈52%
    top: "52%", left: "42%",
    producers: ["Carlo Schmitt", "Von Hövel", "Hermann Ludes"],
    wines: "Riesling Kabinett · GG · Gold Reserve · Feineherb",
  },
  {
    id: "nahe",
    label: "Nahe",
    sublabel: "Germany",
    dot: "#3c000b",
    pulse: false,
    // Nahe: 8°E, 49.5°N → left≈44%, top≈53%
    top: "58%", left: "44%",
    producers: ["Kruger Rumpf"],
    wines: "Pinot Rosé · Blanc de Noirs · SEKT Brut",
  },
  {
    id: "burgundy",
    label: "Burgundy & Chablis",
    sublabel: "France",
    dot: "#630018",
    pulse: false,
    // Burgundy: 5°E, 47°N → left≈37%, top≈60%
    top: "60%", left: "37%",
    producers: ["Marchand Grillot", "Pavelot", "Bitouzet-Prieur", "Meix-Foulot", "Pinson", "+ 6 more"],
    wines: "Village · 1er Cru · Grand Cru",
  },
  {
    id: "pomerol",
    label: "Pomerol",
    sublabel: "Bordeaux, France",
    dot: "#630018",
    pulse: false,
    // Bordeaux: -0.5°E, 44.8°N → left≈27%, top≈65%
    top: "65%", left: "27%",
    producers: ["Chateau Rouget"],
    wines: "Pomerol 2015 · 2016 · 2018",
  },
  {
    id: "greece",
    label: "Peloponnese",
    sublabel: "Greece",
    dot: "#A63744",
    pulse: false,
    // Peloponnese: 22°E, 37.5°N → left≈71%, top≈82%
    top: "82%", left: "71%",
    producers: ["Kanakaris Winery"],
    wines: "Roditis · Malagousia",
  },
];

function TerroirMap() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
        <FadeInSection className="text-center mb-10 md:mb-16">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-tertiary mb-4">
            The Terroir Map
          </h2>
          <p className="font-body text-on-surface-variant max-w-2xl mx-auto text-sm md:text-base">
            Tap a pin to explore our exclusive partnerships across Europe&apos;s most revered wine regions.
          </p>
        </FadeInSection>

        <FadeInSection>
          <div
            className="relative w-full rounded-xl overflow-hidden shadow-2xl border border-outline/10"
            style={{ aspectRatio: "16/9" }}
          >
            {/* Map image */}
            <img
              alt="Map of Europe"
              className="absolute inset-0 w-full h-full object-cover object-center"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkVpfqdV-aQRhvAQESBHUOvltJfSjhtk8E24RP8NGZ9-XgLbJW_aRuSPOciRPFqKXSo_XPJPc_KY-c08Ofxb84gUovQudbAy5kosjbfH4zi_2YsGBq3WAMKl5_zCsNz6riyxb7cN-MKJ6PbEZzf7pH7IQVU5miexMnm0TDoBSmZ9ps6Lh_AGGzJX8nrPkJpK3Ck3LGELq9FqFsR2W9Olmt8XbIPR2vMubXpkxeZSvqS_BM6fn342pbkR6RjKJ50znlkuvmQy1C"
            />
            <div className="absolute inset-0 bg-primary/5 mix-blend-multiply" />

            {/* Click-away overlay */}
            {active && (
              <div className="absolute inset-0 z-10" onClick={() => setActive(null)} />
            )}

            {/* Pins */}
            {MAP_PINS.map((pin) => (
              <div
                key={pin.id}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ top: pin.top, left: pin.left }}
                onClick={(e) => { e.stopPropagation(); setActive(active === pin.id ? null : pin.id); }}
              >
                {/* Dot */}
                <div className="relative flex items-center justify-center">
                  {pin.pulse && (
                    <span
                      className="absolute w-5 h-5 rounded-full opacity-60 animate-ping"
                      style={{ backgroundColor: pin.dot }}
                    />
                  )}
                  <span
                    className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full block ring-2 ring-white shadow-lg relative z-10 transition-transform hover:scale-125"
                    style={{ backgroundColor: pin.dot }}
                  />
                </div>

                {/* Tooltip */}
                {active === pin.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute z-30 bottom-full mb-2 left-1/2 -translate-x-1/2 w-44 md:w-56 bg-white/97 backdrop-blur rounded-lg shadow-2xl border border-outline/10 p-3 pointer-events-none"
                  >
                    <p className="font-headline font-bold text-primary-container text-sm leading-tight">{pin.label}</p>
                    <p className="font-label text-[10px] uppercase tracking-widest text-outline mb-2">{pin.sublabel}</p>
                    <div className="border-t border-outline/10 pt-2 space-y-1">
                      {pin.producers.map((p) => (
                        <p key={p} className="font-body text-xs text-tertiary font-medium">{p}</p>
                      ))}
                    </div>
                    <p className="font-body text-[10px] text-outline italic mt-2">{pin.wines}</p>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white" />
                  </motion.div>
                )}
              </div>
            ))}

          </div>

          {/* Mobile region list */}
          <div className="md:hidden mt-6 grid grid-cols-1 gap-2">
            {MAP_PINS.map((pin) => (
              <button
                key={pin.id}
                onClick={() => setActive(active === pin.id ? null : pin.id)}
                className="flex items-start gap-3 text-left p-3 rounded-lg bg-surface-container-low border border-outline/10 active:bg-surface-container"
              >
                <span className="w-2.5 h-2.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: pin.dot }} />
                <div>
                  <p className="font-headline font-bold text-sm text-tertiary">{pin.label} <span className="text-outline font-normal">· {pin.sublabel}</span></p>
                  <p className="font-body text-xs text-on-surface-variant mt-0.5">{pin.producers.slice(0,3).join(" · ")}</p>
                </div>
              </button>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

function FadeInSection({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const [libraryFilter, setLibraryFilter] = useState("All Regions");
  const filteredLibrary = libraryFilter === "All Regions"
    ? wineCards
    : wineCards.filter(w => w.type === libraryFilter);

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-surface">
        <div className="absolute inset-0 z-0">
          <img
            alt="Sun-drenched vineyard"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_UHDo3FiCDzV5cBitdKSap1AfLYkURKHw0Y_DsyelTFkySBcTzDOyhlE8__B6IoMzBTXlRk6B27iNvCMHqsVZe6hvFaDW0mBoSRpOjZNuwUhr6abVhCLoSviHl9kJnSAHCS9tWWl2qhKKi66QTYp87C76fql4OiqdCfZikw-oJIXObKV6xNhx09RvBunr_tzR8cFmM5Ycaq77qzYETXNFin77gnhHnlImRAbvtqqg5jkWsrzvhTQC-SH4Ufm11Fn_USWDiI0D"
          />
          <div className="absolute inset-0 hero-gradient" />
        </div>

        <div className="max-w-screen-2xl mx-auto px-8 w-full relative z-10">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-label text-xs uppercase tracking-[0.4em] text-primary-container mb-6 block font-semibold"
            >
              Exclusively Curated Portfolios
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-headline text-6xl md:text-8xl font-black text-primary leading-[1.05] tracking-tight mb-8"
            >
              The Art of <br />
              Fine Wine <br />
              <span className="italic font-normal">Selection.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="font-body text-xl text-on-surface max-w-xl leading-relaxed mb-10 opacity-90"
            >
              Experience the expertise of{" "}
              <span className="font-semibold text-primary-container">Drink Now</span>. We
              bridge the gap between historic European estates and the modern
              collector&apos;s table.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap gap-6"
            >
              <Link
                href="/catalog"
                className="bg-primary-container text-on-primary px-10 py-5 rounded font-label text-sm uppercase tracking-widest shadow-2xl hover:bg-primary transition-all duration-300 flex items-center group active:scale-95"
              >
                Explore the Catalog
                <span className="material-symbols-outlined ml-3 transition-transform group-hover:translate-x-1">
                  arrow_right_alt
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-bounce">
          <span className="text-[10px] font-label uppercase tracking-widest font-bold">
            Scroll
          </span>
          <span className="material-symbols-outlined">expand_more</span>
        </div>
      </section>

      {/* Wine Library Grid */}
      <section className="py-24 bg-surface-container-low" id="catalog">
        <div className="max-w-screen-2xl mx-auto px-8">
          <FadeInSection>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h2 className="font-headline text-4xl font-bold text-tertiary mb-4 tracking-tight">
                  The Library
                </h2>
                <p className="font-body text-on-surface-variant max-w-md">
                  Selections from our current 100-bottle catalog, chosen for immediate
                  character and aging potential.
                </p>
              </div>
              <div className="flex space-x-8 font-label text-xs uppercase tracking-widest text-outline">
                {["All Regions", "Riesling", "Pinot Noir", "White"].map(filter => (
                  <button
                    key={filter}
                    onClick={() => setLibraryFilter(filter)}
                    className={`transition-colors pb-2 ${
                      libraryFilter === filter
                        ? "text-primary-container border-b border-primary-container"
                        : "hover:text-primary-container"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-10 md:gap-y-16">
            {filteredLibrary.map((wine, i) => (
              <FadeInSection key={wine.name} delay={i * 0.1}>
                <Link href={wine.href} className="group cursor-pointer block">
                  <div className="aspect-[3/4] bg-transparent mb-6 flex items-center justify-center p-4 overflow-hidden">
                    <motion.img
                      alt="Wine Bottle"
                      className="h-full w-auto object-contain mix-blend-multiply drop-shadow-xl"
                      src={wine.img}
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] text-outline mb-1 block">
                    {wine.region}
                  </span>
                  <p className="font-body text-xs text-on-surface-variant mb-1">{wine.producer}</p>
                  <h3 className="font-headline text-sm md:text-lg font-bold text-tertiary group-hover:text-primary-container transition-colors leading-snug">
                    {wine.name}
                  </h3>
                  {wine.score && (
                    <span className="inline-block mt-1.5 font-label text-[9px] uppercase tracking-wider text-primary-container border border-primary-container/30 px-1.5 py-0.5 rounded-full">
                      {wine.score}
                    </span>
                  )}
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-outline/10">
                    <span className="font-body text-xs text-on-surface-variant italic">
                      {wine.vintage}
                    </span>
                    <span className="font-label text-sm font-semibold text-primary-container">
                      {wine.price}
                    </span>
                  </div>
                </Link>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection className="mt-20 text-center">
            <Link
              href="/catalog"
              className="inline-flex items-center space-x-3 text-primary-container font-label uppercase text-sm tracking-widest group"
            >
              <span>View Full 100-Wine Catalog</span>
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">
                arrow_right_alt
              </span>
            </Link>
          </FadeInSection>
        </div>
      </section>

      {/* Terroir Map */}
      <TerroirMap />

      {/* Founders */}
      <section className="py-32 bg-surface">
        <div className="max-w-screen-2xl mx-auto px-8">
          <FadeInSection className="text-center mb-16">
            <h2 className="font-headline text-5xl md:text-6xl font-extrabold text-tertiary tracking-tight">
              The Visionaries <br className="hidden md:block" />
              Behind the Pour
            </h2>
            <div className="h-1 w-24 bg-primary-container mx-auto mt-8" />
          </FadeInSection>

          <div className="flex flex-col space-y-12">
            {founders.map((founder, i) => (
              <FadeInSection key={founder.name} delay={i * 0.15}>
                <div
                  className={`flex flex-col group ${
                    founder.align === "right"
                      ? "md:flex-row md:justify-end"
                      : "md:flex-row md:justify-start"
                  }`}
                >
                  <div
                    className={`${
                      founder.align === "right" ? "text-left md:text-right" : "text-left"
                    } md:w-3/4 lg:w-2/3`}
                  >
                    <h3 className="font-headline font-bold text-3xl text-tertiary mb-6 transition-colors group-hover:text-primary-container">
                      {founder.name}
                    </h3>
                    <p className="font-body text-xl leading-relaxed text-on-surface-variant">
                      {founder.bio}
                    </p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
