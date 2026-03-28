"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import Footer from "./components/Footer";

const wineCards = [
  {
    region: "Mosel, Germany",
    name: "Schloss Lieser Riesling Kabinett",
    vintage: "2021 Vintage",
    price: "$42.00",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVUtHD0ENaf43f8iVhdgUFFVWHVzf7TxomifKjPh-DjPMWirne2vw6mVxOGWj4MM6G6hvfAKpk-TFv1NurVQFT3Y5gBZ9hvaoYsLtvV-xCuA0BU45G-CeG8YgRGJZ1fjkgzvw8KiEWtLxavCFxg-rTDvZSzNVj2pvjyDKZd3tu5O3xSWnf5ZlZQ_Hg_XznAG_XsjL4MxClJMwGNvdIDp2t0N9E1u2DVWjn9MsCd9heiaTO1z-QWQ9-CnWznxeeRGQHS6VXkb00",
    href: "/catalog",
  },
  {
    region: "Burgundy, France",
    name: "Domaine D\u2019Eug\u00e9nie Clos-Vougeot",
    vintage: "2018 Vintage",
    price: "$385.00",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEnfZ34aT3GbEd00iw6TAj1zVwz-90pg-9S0wqjXy2tnDt4h6c_ckc_Ll0-qwPtUhu-37-Wd_yqj0rnPKivWrK2Rkmgww7SGtZmgY-vdhGApnH7iyNnRiEadM2A-1sCGSoK0PzwptBErjwP2trR7FRQwMz92TlhuNCNEj2dSx1WvdjHqrbLBbvJ5-DR4ORQPNDXIQbc_28qbbAUtF4zwighQ4ICbSklTsrkjSD03NSiz-3M520hmjL6syKS6vvJNaG_aZA_11e",
    href: "/catalog",
  },
  {
    region: "Bordeaux, France",
    name: "Ch\u00e2teau La Conseillante Pomerol",
    vintage: "2015 Vintage",
    price: "$210.00",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBv6RtOIwrO6E3hgvd0Htu0Q8I1FCspjkA50KWdHe3QpEVY_YPb3L7Cw_wYZm7wPGqJ9dHpP9t-V39lfrWDJ65xsFo7JaugUsV5g2bOGTD4j1QmAxDggGc-Bu3i1jh2xzYXClsp_8s35lCtmTknGpVZAyT1Nh2UfH7E_PGWtiiqejax82falmdLWQx70Qv_v_7oQGyIQ-O7spkif6aSQvZPUnF_VllFnryy2gSXMYCY-D8bIETMbBu9Ha5qjZWB1HKwTBY97roa",
    href: "/catalog",
  },
  {
    region: "Peloponnese, Greece",
    name: "Skouras \u2018Wild Ferment\u2019 Moschofilero",
    vintage: "2022 Vintage",
    price: "$28.00",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0FNFZESK-Bg56inJIrjSuAfVUWNR7Ye2E0nGwl0OYpG6Fphg87a9KsTx2VDrJw31tGJl_xCxPOI8_DlYAKhWZaz2JtiH6t1XOgnRhK_KkaVmbLrnU1FbO3u-eHznfrY3oe2pLw7Y8Dqqm0VTR3yVtrr2jtl6xHRhe5cLiu_5dDylK4rB0Iyu_s16IjOug6mYuZtuec7aYmOSwZ_9DTwYldS8ewSYAGrvWYOnf2OYC0oFQ8yRu8w9YMYNZa27oBo7yDr2xBeSS",
    href: "/catalog",
  },
];

const founders = [
  {
    name: "Noam Jacobi",
    bio: "Noam founded Vigneron Imports with a singular obsession: the purity of Riesling. His decades of experience in the cellars of Mosel and Rheingau have forged relationships that allow us access to vintages rarely seen outside of private family estates.",
    align: "right",
  },
  {
    name: "Al Hasson",
    bio: "With a background in fine-dining logistics and a palate refined by years of European exploration, Al oversees our operations. He ensures that every bottle, from the Grand Crus of Burgundy to the hidden gems of the Peloponnese, arrives in pristine condition.",
    align: "left",
  },
  {
    name: "Amir Scheinman",
    bio: "Amir is the storyteller of the trio. His passion lies in the \"Drink Now\" philosophy\u2014finding wines that bridge the gap between historic tradition and modern accessibility. He works closely with our producers to translate their artisan craft for the global connoisseur.",
    align: "right",
  },
];

const MAP_PINS = [
  {
    id: "mosel-saar",
    label: "Mosel & Saar",
    sublabel: "Germany",
    color: "bg-primary-container",
    dot: "#3c000b",
    pulse: true,
    // Positions tuned to the Europe map image
    top: "26%", left: "49%",
    producers: ["Carlo Schmitt", "Von Hövel", "Hermann Ludes"],
    wines: "Riesling Kabinett · GG · Gold Reserve · Feineherb",
  },
  {
    id: "nahe",
    label: "Nahe",
    sublabel: "Germany",
    color: "bg-primary-container",
    dot: "#3c000b",
    pulse: false,
    top: "32%", left: "47%",
    producers: ["Kruger Rumpf"],
    wines: "Pinot Rosé · Blanc de Noirs · SEKT Brut",
  },
  {
    id: "burgundy",
    label: "Burgundy & Chablis",
    sublabel: "France",
    color: "bg-[#630018]",
    dot: "#630018",
    pulse: false,
    top: "42%", left: "43%",
    producers: ["Marchand Grillot", "Pavelot", "Bitouzet-Prieur", "Meix-Foulot", "Pinson", "+ 6 more"],
    wines: "Village · 1er Cru · Grand Cru",
  },
  {
    id: "pomerol",
    label: "Pomerol",
    sublabel: "Bordeaux, France",
    color: "bg-[#630018]",
    dot: "#630018",
    pulse: false,
    top: "50%", left: "36%",
    producers: ["Chateau Rouget"],
    wines: "Pomerol 2015 · 2016 · 2018",
  },
  {
    id: "greece",
    label: "Peloponnese",
    sublabel: "Greece",
    color: "bg-[#A63744]",
    dot: "#A63744",
    pulse: false,
    top: "65%", left: "57%",
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
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: "center 30%" }}
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

            {/* Legend */}
            <div className="absolute bottom-3 left-3 md:bottom-6 md:left-6 bg-white/90 backdrop-blur px-3 md:px-5 py-2 md:py-3 rounded-lg shadow-xl border border-outline/10">
              <p className="font-label text-[8px] md:text-[10px] uppercase tracking-widest text-primary mb-1.5 md:mb-2 font-bold border-b border-primary/10 pb-1 md:pb-2">
                Portfolio Legend
              </p>
              <div className="space-y-1 md:space-y-2">
                {[
                  { color: "#3c000b", label: "German Estates" },
                  { color: "#630018", label: "French Domaines" },
                  { color: "#A63744", label: "Greek Terroirs" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-[9px] md:text-xs font-headline font-semibold">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
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
              collector&apos;s table with a meticulously vetted 100-bottle library.
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
                <button className="text-primary-container border-b border-primary-container pb-2">
                  All Regions
                </button>
                <button className="hover:text-primary-container transition-colors pb-2">
                  Riesling
                </button>
                <button className="hover:text-primary-container transition-colors pb-2">
                  Pinot Noir
                </button>
                <button className="hover:text-primary-container transition-colors pb-2">
                  Sparkling
                </button>
              </div>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-10 md:gap-y-16">
            {wineCards.map((wine, i) => (
              <FadeInSection key={wine.name} delay={i * 0.1}>
                <Link href={wine.href} className="group cursor-pointer block">
                  <div className="aspect-[3/4] bg-white rounded mb-6 flex items-center justify-center p-8 overflow-hidden editorial-shadow">
                    <motion.img
                      alt="Wine Bottle"
                      className="max-h-full object-contain"
                      src={wine.img}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] text-outline mb-2 block">
                    {wine.region}
                  </span>
                  <h3 className="font-headline text-sm md:text-xl font-bold text-tertiary group-hover:text-primary-container transition-colors">
                    {wine.name}
                  </h3>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-outline/10">
                    <span className="font-body text-sm text-on-surface-variant italic">
                      {wine.vintage}
                    </span>
                    <span className="font-label text-sm font-semibold text-tertiary">
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
