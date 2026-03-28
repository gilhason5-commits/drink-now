"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Footer from "../components/Footer";

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

export default function WineriesPage() {
  return (
    <main>
      {/* Hero */}
      <header className="relative h-[88vh] flex items-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <img
            alt="Luxury wine cellar"
            className="w-full h-full object-cover opacity-60 scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoUJ7q06gO7wsrvNSJj0QuP6XGdXqQRDgaCec7PruAKYBv6QLHqRMF40-zF0YdusdLvX8bV2OFhnDhTMYqH87bm32TmC8GmIKzIH58RA225yJUayRf-xOmVSBZ9FM85zvUUFeQZADRT7II10bVOXkGzGj_RuAYS9EfoH4OfKSc1f50jOuH0YNGNPbNUp6t0eg-jatpRnrGr2vFO08znQl9h2Zig8GdC4--KSxZKuzamJqPuVTnBgGNoD79-QhzBrZckr70PUJR"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-background" />
        </div>

        <div className="relative z-10 max-w-screen-2xl mx-auto px-8 w-full pt-20">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-label text-sm uppercase tracking-[0.2em] text-on-primary/80 mb-6 block"
            >
              The Terroir Series
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-headline text-6xl md:text-8xl text-on-primary mb-8 leading-[1.1] tracking-tight"
            >
              Our Wineries
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="font-body text-xl md:text-2xl text-on-primary/90 max-w-xl leading-relaxed"
            >
              A curated selection of the world&apos;s most prestigious estates, defined
              by heritage, land, and soul.
            </motion.p>
          </div>
        </div>

        {/* Region nav */}
        <div className="absolute bottom-0 left-0 w-full bg-surface/40 backdrop-blur-md border-t border-outline-variant/20">
          <div className="max-w-screen-2xl mx-auto px-8 py-6 flex gap-12 overflow-x-auto">
            {[
              { href: "#germany", label: "01. Germany" },
              { href: "#france", label: "02. France" },
              { href: "#greece", label: "03. Greece" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-label text-xs uppercase tracking-widest text-primary hover:text-primary-container transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      <div className="space-y-32 py-32">
        {/* German Estates */}
        <section className="max-w-screen-2xl mx-auto px-8" id="germany">
          <FadeInSection>
            <div className="grid md:grid-cols-12 gap-12 items-end mb-20">
              <div className="md:col-span-5">
                <h2 className="font-headline text-4xl md:text-5xl text-tertiary mb-6">
                  German Estates
                </h2>
                <p className="font-body text-lg text-on-surface-variant mb-4">
                  Focus: Mosel, Rheingau, and Pfalz
                </p>
                <div className="h-px w-24 bg-primary-container" />
              </div>
              <div className="md:col-span-7">
                <img
                  alt="Mosel River Valley"
                  className="w-full h-64 object-cover rounded-xl editorial-shadow"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGYWlHu5bJDNzW5RqLA2SFNi-dO_Y8pEG1l46MAyNNsfkWNYlnrmlYHxaj5xI1e9XXml6tp3-RqLuoT_G9XRdNh5CsuUB_Wr4i38vqW4lyhHueIbwAY2yMExZlyOAPUe4gNe1VXkzVUemoSP48euO2uVjp6rTLvWJslKxkRrh74CcJH7VEq7iD0DjSCZejAIBMwqO7GDZ8cQlbprI3Nhz9kl7RRJlztlj6kMFn7ENbIn5ssCCdrJTjtE_W655ESp_WRgbtAvkX"
                />
              </div>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-2 gap-16">
            <FadeInSection delay={0.1}>
              <article className="bg-surface-container-low p-10 flex flex-col items-start space-y-8 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary-container flex items-center justify-center text-on-primary font-headline text-xl">
                    KR
                  </div>
                  <h3 className="font-headline text-2xl">Kruger Rumpf</h3>
                </div>
                <p className="font-body text-on-surface-variant leading-relaxed">
                  Hailing from the Nahe region, the Rumpf family has been crafting wines
                  since 1708. Their philosophy centers on the unique slate soils of the
                  lower Nahe, producing Rieslings with crystalline precision and vibrating
                  acidity that mirror the rugged river valley.
                </p>
                <Link
                  href="/catalog"
                  className="group flex items-center gap-2 font-label text-sm uppercase tracking-wider text-primary-container font-semibold hover:gap-4 transition-all"
                >
                  View Catalog{" "}
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
              </article>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <article className="bg-surface-container p-10 flex flex-col items-start space-y-8 rounded-lg mt-0 md:mt-16">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary flex items-center justify-center text-on-primary font-headline text-xl">
                    SL
                  </div>
                  <h3 className="font-headline text-2xl">Schloss Lieser</h3>
                </div>
                <p className="font-body text-on-surface-variant leading-relaxed">
                  Thomas Haag&apos;s work at Schloss Lieser has elevated this estate to
                  the pinnacle of the Mosel. Working with steep, blue slate slopes, they
                  create wines of ethereal lightness and deep complexity, preserving the
                  heritage of one of Germany&apos;s most historic castles.
                </p>
                <Link
                  href="/catalog"
                  className="group flex items-center gap-2 font-label text-sm uppercase tracking-wider text-primary-container font-semibold hover:gap-4 transition-all"
                >
                  View Catalog{" "}
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
              </article>
            </FadeInSection>
          </div>
        </section>

        {/* French Domaines */}
        <section className="bg-surface-container-low py-32" id="france">
          <div className="max-w-screen-2xl mx-auto px-8">
            <FadeInSection>
              <div className="flex flex-col md:flex-row gap-16 items-center mb-24">
                <div className="md:w-1/2 order-2 md:order-1">
                  <div className="relative">
                    <img
                      alt="Burgundy Vineyard"
                      className="w-full aspect-[4/5] object-cover rounded-xl editorial-shadow"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTf8jlXEppU7YAFaUh7thSXm-1ySPNxNX6IvD53NdIjneRM_OpYXFY1X5WTuFcDPrv6oPugMhKGigIjQz-gwcAVe9qvV9h3FEI0RhdoP4jL08hmPfOQxqv33qGI8J81jAeocZAUiHAVXXQQ34NxIz0P0BTj8bcFjafVo0KHi7G9LI3JA5coEdGlPe7HtrPwz1InLLZykpX1xkNkwLxpSNfKZvnkBjPmUehZwFJRaiilmWj2VtUk4-GIypr5g2Kj25bU4jP5dt0"
                    />
                    <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-background p-4 hidden lg:block">
                      <img
                        alt="French limestone soil"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVe0NnwQVdGziLVtLvbKMclnjH7_oi1lk4jN4hFri3hcgM0XaJWpgSmXY55oP41_S0F6YeT6ZpLO5mvCEdOa1ipCSoAf_p_Uf2BQqiHDTNgts2a0K0YV1o_Qda06-BFOx4EnvP-kiXt1d8F1LaXN82UBWEUohSw3vWAjb1mN_rTbuEGVFz84vwawmuPc42QE2lldpGYIcKUilQ7sMj54DxVyxo1-BA5t90C9Qbtqmp1NX3DpJde3Oie3FOlanGWiJZgNP_4wAZ"
                      />
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2 order-1 md:order-2">
                  <h2 className="font-headline text-4xl md:text-5xl text-tertiary mb-6">
                    French Domaines
                  </h2>
                  <p className="font-body text-lg text-on-surface-variant mb-12">
                    Focus: Burgundy and Bordeaux (Pomerol)
                  </p>
                  <div className="space-y-16">
                    <div className="border-l-2 border-primary-container pl-8">
                      <h3 className="font-headline text-2xl mb-4">
                        Domaine de la Roman&eacute;e-Conti
                      </h3>
                      <p className="font-body text-on-surface-variant mb-6">
                        The definitive name in Burgundy. Their commitment to biodynamic
                        farming and minimal intervention in the legendary limestone-rich
                        soils produces Pinot Noir of incomparable depth and legendary
                        status.
                      </p>
                      <Link
                        href="/catalog"
                        className="inline-block px-8 py-3 bg-primary-container text-on-primary text-xs uppercase tracking-widest hover:bg-primary transition-all"
                      >
                        Explore the Domaine
                      </Link>
                    </div>
                    <div className="border-l-2 border-outline pl-8">
                      <h3 className="font-headline text-2xl mb-4">
                        Ch&acirc;teau La Conseillante
                      </h3>
                      <p className="font-body text-on-surface-variant mb-6">
                        A jewel of Pomerol. This historic estate captures the elegance of
                        Merlot and Cabernet Franc grown on unique clay and gravel soils,
                        resulting in wines noted for their violet aromas and velvet
                        texture.
                      </p>
                      <Link
                        href="/catalog"
                        className="inline-block px-8 py-3 outline outline-1 outline-outline text-primary-container text-xs uppercase tracking-widest hover:bg-surface-container transition-all"
                      >
                        Explore the Ch&acirc;teau
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* Greek Terroirs */}
        <section className="max-w-screen-2xl mx-auto px-8" id="greece">
          <FadeInSection>
            <div className="relative p-12 md:p-24 bg-[#191919] overflow-hidden rounded">
              <div className="absolute top-0 right-0 w-1/2 h-full hidden md:block">
                <img
                  alt="Greek Vineyard"
                  className="w-full h-full object-cover opacity-40"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwYM1AguhTZHuWD7TQDppKb6Llf4dBGg2J6uVQSlgkKcltk00k28toIByjhjqgvf512K1AXg_VT6Hkm9e1pHIMu7tyoOGFf8JBrv2Pj2CsVsrGSyJ3iDonT73RzEOZw3PrwuK5ubn39ssJpMa3l4CBSl77zStS6zaUvU094tHAG4mVmRtZLmCZulFfGrOj6aBiN3WB0mosamDurXepSxRpusBSJs_sVgd5UyDm6frNrIm6x_mYOz04EdcVRmeOm4G5DHuAz4TU"
                />
              </div>
              <div className="relative z-10 md:w-1/2">
                <h2 className="font-headline text-4xl md:text-5xl text-[#FCF9F0] mb-8">
                  Greek Terroirs
                </h2>
                <p className="font-body text-lg text-[#FCF9F0]/70 mb-12">
                  Focus: High-altitude Peloponnese
                </p>
                <div className="bg-[#FCF9F0]/5 backdrop-blur-sm border border-[#FCF9F0]/10 p-8">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 bg-[#FCF9F0] text-primary flex items-center justify-center font-headline text-2xl">
                      S
                    </div>
                    <h3 className="font-headline text-3xl text-[#FCF9F0]">Skouras</h3>
                  </div>
                  <p className="font-body text-[#FCF9F0]/80 leading-relaxed mb-8">
                    George Skouras established this domain in 1986 in the heart of the
                    Peloponnese. By blending indigenous Agiorgitiko with international
                    varieties at altitudes of up to 1,000 meters, Skouras creates wines
                    that capture the soul of the Mediterranean with a modern, sophisticated
                    touch.
                  </p>
                  <Link
                    href="/catalog"
                    className="inline-flex items-center gap-3 text-[#FCF9F0] border-b border-[#FCF9F0]/40 pb-1 font-label text-sm tracking-widest uppercase hover:border-[#FCF9F0] transition-all"
                  >
                    Discover Skouras{" "}
                    <span className="material-symbols-outlined">north_east</span>
                  </Link>
                </div>
              </div>
            </div>
          </FadeInSection>
        </section>
      </div>

      {/* Dark Footer */}
      <footer className="bg-[#191919] w-full py-16 px-8 mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-screen-2xl mx-auto">
          <div className="text-xl font-headline text-[#FCF9F0]">Drink Now</div>
          <div className="flex flex-wrap justify-center gap-8">
            {["Privacy Policy", "Terms of Service", "Shipping Info", "Contact Us"].map(
              (item) => (
                <Link
                  key={item}
                  href="#"
                  className="font-body text-xs tracking-wider uppercase text-[#FCF9F0]/50 hover:text-[#FCF9F0] transition-opacity"
                >
                  {item}
                </Link>
              )
            )}
          </div>
          <div className="font-body text-xs tracking-wider uppercase text-[#FCF9F0]">
            &copy; 2024 Drink Now. All Rights Reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
