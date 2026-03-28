import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full pt-16 pb-8 bg-surface-container-low mt-24">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-screen-2xl mx-auto px-8">
        {/* Brand */}
        <div className="space-y-6">
          <div className="text-xl font-headline font-black text-primary">Drink Now</div>
          <p className="font-body text-sm text-tertiary opacity-70 leading-relaxed">
            Boutique wine importers specialising in the wines of Germany and Burgundy. We handpick the finest bottles directly from the estates.
          </p>
          <div className="flex space-x-4">
            <span className="material-symbols-outlined text-primary cursor-pointer hover:opacity-100 opacity-60 transition-all">
              local_bar
            </span>
            <span className="material-symbols-outlined text-primary cursor-pointer hover:opacity-100 opacity-60 transition-all">
              public
            </span>
            <span className="material-symbols-outlined text-primary cursor-pointer hover:opacity-100 opacity-60 transition-all">
              history
            </span>
          </div>
        </div>

        {/* Discovery */}
        <div>
          <h4 className="font-label text-xs uppercase tracking-[0.2em] text-primary font-bold mb-6">
            Explore
          </h4>
          <ul className="space-y-4 font-body text-sm text-tertiary opacity-70">
            {[
              { label: "Wine Catalog", href: "/catalog" },
              { label: "Our Wineries", href: "/wineries" },
              { label: "Holiday Bundles", href: "/bundles" },
              { label: "Shipping Policy", href: "#" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="hover:text-primary-container hover:opacity-100 transition-all"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-label text-xs uppercase tracking-[0.2em] text-primary font-bold mb-6">
            Contact
          </h4>
          <ul className="space-y-4 font-body text-sm text-tertiary opacity-70">
            <li className="flex items-start space-x-3">
              <span className="material-symbols-outlined text-xs mt-1">location_on</span>
              <span>
                P.O. Box 301<br />
                Kefar Hess, 4069200
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="material-symbols-outlined text-xs">mail</span>
              <a href="mailto:hello@drinknow.co.il" className="hover:text-primary-container transition-colors">
                hello@drinknow.co.il
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <span className="material-symbols-outlined text-xs">language</span>
              <a
                href="https://www.drinknow.co.il"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-container transition-colors"
              >
                drinknow.co.il
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-label text-xs uppercase tracking-[0.2em] text-primary font-bold mb-6">
            Newsletter
          </h4>
          <p className="font-body text-xs text-tertiary opacity-70 mb-4">
            Join our mailing list for updates on new arrivals and special offers.
          </p>
          <div className="relative">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full bg-white border border-outline/20 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary-container transition-colors"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-primary-container">
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-8 pt-16 mt-16 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-body text-xs text-tertiary opacity-50">
          © 2024 Drink Now LTD. All Rights Reserved.
        </p>
        <div className="flex space-x-8">
          {["Integrity", "Heritage", "Craft"].map((word) => (
            <span
              key={word}
              className="text-[10px] font-label uppercase tracking-widest text-primary opacity-40"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
