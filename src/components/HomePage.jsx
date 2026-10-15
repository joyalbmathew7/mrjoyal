import { useState, useEffect } from "react";
import TyreCarousel from "./TyreCarousel";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const PHONE_DISPLAY = "+91 9778171305";
const PHONE_LINK = "tel:+919778171305";

const NAV_LINKS = [
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/services", label: "Services" },
  { to: "/why-us", label: "Why us" },
  { to: "/contact", label: "Contact" },
];

const TABS = [
  { id: "all", label: "All" },
  { id: "sales", label: "Tyre sales" },
  { id: "repair", label: "Repairs" },
  { id: "maintenance", label: "Maintenance" },
];

const SERVICES = [
  {
    id: "tyres",
    icon: "🛞",
    title: "New tyres & fitting",
    category: "sales",
    description:
      "Premium and budget tyres for cars, SUVs and motorbikes, fitted with precision.",
    highlights: ["Top brands available", "Free valve replacement", "Precision mounting"],
  },
  {
    id: "repair",
    icon: "🔧",
    title: "Puncture & patch repairs",
    category: "repair",
    description:
      "Fast tubeless puncture repairs and radial patch fixes to get you back on the road safely.",
    highlights: ["Done in under 20 minutes", "Pressure check included", "Leak testing"],
  },
  {
    id: "balancing",
    icon: "⚖️",
    title: "Computerized wheel balancing",
    category: "maintenance",
    description:
      "Remove steering vibration and prevent uneven tyre wear with digital balancing.",
    highlights: ["Digital calibration", "Vibration diagnostics", "Weight optimization"],
  },
  // {
  //   id: "alignment",
  //   icon: "🔄",
  //   title: "3D wheel alignment",
  //   category: "maintenance",
  //   description:
  //     "Laser-guided alignment for better stability, fuel efficiency and longer tyre life.",
  //   highlights: ["3D laser accuracy", "Full suspension check", "Printed report"],
  // },
  {
    id: "inspection",
    icon: "🛠️",
    title: "Tyre health check & rotation",
    category: "maintenance",
    description:
      "Tread depth, pressure and structural checks to catch problems before a blowout.",
    highlights: ["Tread depth check", "Rotation service", "Free advice"],
  },
  {
    id: "emergency",
    icon: "🚨",
    title: "Roadside assistance",
    category: "repair",
    description: "Emergency tyre swap and flat tyre help when you are stranded nearby.",
    highlights: ["Quick response", "On-site tyre change", "Spare mounting"],
  },
];

const ABOUT_POINTS = [
  { title: "Genuine, certified brands", desc: "Verified tyres with manufacturer warranty." },
  { title: "Honest, clear pricing", desc: "Upfront estimates before any work starts." },
  { title: "Modern machines", desc: "3D wheel aligners and dynamic balancers." },
];

const WHY_US = [
  { icon: "🤝", title: "Customer first", text: "We explain tyre problems clearly before starting work." },
  { icon: "⭐", title: "Certified standards", text: "Trained mechanics using calibrated alignment systems." },
  { icon: "💰", title: "Fair rates", text: "Fair pricing across all major tyre brands and repairs." },
  { icon: "⚡", title: "Express service", text: "Short waiting time so you can get on with your day." },
];

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2";

function Home() {
  const [activeTab, setActiveTab] = useState("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const filteredServices =
    activeTab === "all" ? SERVICES : SERVICES.filter((s) => s.category === activeTab);

  const closeMenu = () => setMenuOpen(false);

useEffect(() => {
  if (pathname === "/") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.getElementById(pathname.slice(1))?.scrollIntoView({ behavior: "smooth" });
}, [pathname]);
  return (
    <div className="min-h-screen scroll-smooth bg-sky-50 pb-20 text-slate-700 antialiased md:pb-0">
      {/* ===== Header ===== */}
      <header className="sticky top-0 z-40 border-b border-sky-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className={`flex items-center gap-3 rounded-lg ${focusRing}`}>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 text-xl text-white shadow-sm">
              🛞
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-extrabold text-slate-900">
                Bharat<span className="text-sky-600">Tyres</span>
              </span>
              <span className="block text-xs text-slate-500">Service & care</span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-sky-50 hover:text-sky-700 ${focusRing}`}
              >
                {l.label}
                 </Link>
              
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={PHONE_LINK}
              className={`hidden items-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-sky-700 sm:inline-flex ${focusRing}`}
            >
              📞 <span className="hidden lg:inline">{PHONE_DISPLAY}</span>
              <span className="lg:hidden">Call now</span>
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border border-sky-200 bg-white text-xl text-sky-700 md:hidden ${focusRing}`}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav
            id="mobile-menu"
            aria-label="Mobile"
            className="border-t border-sky-100 bg-white px-4 pb-4 pt-2 md:hidden"
          >
            <ul className="space-y-1">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={closeMenu}
                    className={`block rounded-xl px-4 py-3 text-base font-semibold text-slate-700 hover:bg-sky-50 ${focusRing}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      <main id="top">
        {/* ===== Hero ===== */}
        <section className="relative overflow-hidden bg-gradient-to-b from-sky-100 via-sky-50 to-white">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-24">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-1.5 text-sm font-semibold text-sky-700 shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                Open today, quick turnaround
              </p>

              <h1 className="mt-5 text-3xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl lg:leading-[1.1]">
                Precision tyre care for a safer drive
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                Your local workshop for new tyres, 3D laser alignment, computerized balancing and
                fast puncture repairs.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/services"
                  className={`inline-flex min-h-[48px] items-center justify-center rounded-xl bg-sky-600 px-7 py-3 text-base font-bold text-white shadow-md shadow-sky-600/20 transition hover:bg-sky-700 ${focusRing}`}
                >
                  View services
                </Link>
                <Link
                  to="/contact"
                  className={`inline-flex min-h-[48px] items-center justify-center rounded-xl border border-sky-300 bg-white px-7 py-3 text-base font-bold text-sky-700 transition hover:bg-sky-50 ${focusRing}`}
                >
                  Visit the workshop
                </Link>
              </div>

              <dl className="mt-10 grid max-w-lg grid-cols-3 gap-3 sm:gap-6">
                {[
                  { v: "100%", l: "Quality tested" },
                  { v: "15+ yrs", l: "Experience" },
                  { v: "4.9 ★", l: "Customer rating" },
                ].map((m) => (
                  <div key={m.l} className="rounded-2xl border border-sky-100 bg-white p-3 text-center shadow-sm sm:p-4">
                    <dt className="sr-only">{m.l}</dt>
                    <dd className="text-xl font-extrabold text-sky-700 sm:text-2xl">{m.v}</dd>
                    <p className="mt-0.5 text-xs text-slate-500">{m.l}</p>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative lg:col-span-5">
            <div className="mx-auto max-w-md lg:max-w-none">
              <img
                src="/tyre-images/compressor.jpeg"
                alt="Belt-driven reciprocating air compressor in the workshop"
                className="h-64 w-full rounded-3xl object-cover shadow-xl ring-4 ring-white sm:h-96 lg:h-[420px]"
              />

              <div className="relative z-10 -mt-10 mx-3 flex items-start gap-3 rounded-2xl border border-sky-100 bg-white p-4 shadow-lg sm:mx-5 sm:gap-4 sm:p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-xl">
                  ⚙️
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold leading-snug text-slate-900 sm:text-base">
                    Belt-driven reciprocating air compressor
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
                    Electric-powered, multi-cylinder piston compressor on a horizontal storage tank. Its
                    high-pressure output and large tank suit demanding workshop work, such as inflating
                    truck and lorry tyres.
                  </p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* ===== About ===== */}
        <section id="about" className="scroll-mt-20 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative">
              <img
                src="./tyre-images/WhatsApp Image 2026-10-14 at 9.28.47 AM (2).jpeg"
                alt="Tyres and workshop at Bharat Tyres"
                loading="lazy"
                className="h-72 w-full rounded-3xl border border-sky-100 object-cover shadow-lg sm:h-[420px] lg:h-[480px]"
              />
              <div className="absolute right-4 top-4 rounded-2xl border border-sky-100 bg-white/95 px-4 py-3 text-center shadow-md">
                <p className="text-xl font-extrabold text-sky-600">Quick</p>
                <p className="text-xs font-semibold text-slate-500">Turnaround time</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-bold text-sky-600">About Bharat Tyres</p>
              <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-4xl">
                Dedicated to keeping you moving safely
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                We offer tyre solutions for every vehicle type. Whether you need new tyres, an
                emergency puncture repair or a routine wheel balance, our experienced technicians
                work with modern equipment.
              </p>

              <ul className="mt-6 space-y-3">
                {ABOUT_POINTS.map((item) => (
                  <li
                    key={item.title}
                    className="flex gap-4 rounded-2xl border border-sky-100 bg-sky-50/60 p-4"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-500 font-bold text-white">
                      ✓
                    </span>
                    <div>
                      <h3 className="font-bold text-slate-900">{item.title}</h3>
                      <p className="mt-0.5 text-sm text-slate-600">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ===== Gallery ===== */}
        <section id="gallery" className="scroll-mt-20 bg-sky-100/70 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <TyreCarousel />
          </div>
        </section>

        {/* ===== Services ===== */}
        <section id="services" className="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-5 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-bold text-sky-600">What we do</p>
                <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-4xl">
                  Complete tyre & wheel care
                </h2>
              </div>

              {/* Filter tabs: scrollable on small screens */}
              <div
                role="tablist"
                aria-label="Filter services"
                className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
              >
                {TABS.map((tab) => {
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveTab(tab.id)}
                      className={`min-h-[44px] shrink-0 whitespace-nowrap rounded-full border px-5 text-sm font-bold transition ${focusRing} ${
                        active
                          ? "border-sky-600 bg-sky-600 text-white shadow-sm"
                          : "border-sky-200 bg-white text-slate-600 hover:border-sky-400 hover:text-sky-700"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {filteredServices.map((service) => (
                <article
                  key={service.id}
                  className="group flex flex-col justify-between rounded-2xl border border-sky-100 bg-white p-6 shadow-sm transition hover:border-sky-300 hover:shadow-lg hover:shadow-sky-200/50 sm:p-7"
                >
                  <div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-3xl transition group-hover:bg-sky-500">
                      {service.icon}
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-slate-900 sm:text-xl">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{service.description}</p>

                    <ul className="mt-5 space-y-2 border-t border-sky-100 pt-4">
                      {service.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-sm text-slate-600">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to="/contact"
                    className={`mt-6 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-sky-50 px-4 text-sm font-bold text-sky-700 transition hover:bg-sky-100 ${focusRing}`}
                  >
                    Book this service
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Why us ===== */}
        <section id="why-us" className="scroll-mt-20 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <p className="text-sm font-bold text-sky-600">Why drive to us</p>
              <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-4xl">
                Honest advice and reliable workmanship
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                We recommend only what your vehicle needs, with no pushy upselling. Your safety on
                the road comes first.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {WHY_US.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-sky-100 bg-sky-50/60 p-5 transition hover:border-sky-300"
                >
                  <span className="text-3xl" aria-hidden="true">{item.icon}</span>
                  <h3 className="mt-3 font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Contact ===== */}
        <section id="contact" className="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-sky-600 to-sky-500 p-6 text-white shadow-xl sm:p-10 lg:p-14">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div>
                <h2 className="text-2xl font-extrabold sm:text-4xl">
                  Visit us or call for a quick quote
                </h2>
                <p className="mt-3 max-w-md text-sky-50">
                  Drop in for an inspection, tyre fitting or an emergency puncture repair.
                </p>

                <ul className="mt-7 space-y-5">
                  {[
                    { icon: "📍", t: "Location", d: "Bharat Tyres, Enadimangalam, Pathanamthitta District, Kerala" },
                    { icon: "📞", t: "Phone", d: `${PHONE_DISPLAY} (Mon to Sat)` },
                    { icon: "🕒", t: "Working hours", d: "Monday to Saturday, 8:30 AM to 7:30 PM" },
                  ].map((row) => (
                    <li key={row.t} className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20 text-xl">
                        {row.icon}
                      </span>
                      <div>
                        <h3 className="font-bold">{row.t}</h3>
                        <p className="mt-0.5 text-sm text-sky-50">{row.d}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-white p-6 text-slate-700 shadow-lg sm:p-8">
                <h3 className="text-xl font-bold text-slate-900">Get directions or call us</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Open Google Maps for directions, or call the workshop directly.
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href="https://goo.gl/maps/Gt7kseUW7WwF6YYp7?g_st=aw"
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 font-bold text-white transition hover:bg-sky-700 ${focusRing}`}
                  >
                    🧭 Open in Google Maps
                  </a>
                  <a
                    href={PHONE_LINK}
                    className={`inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-sky-300 bg-sky-50 px-5 font-bold text-sky-700 transition hover:bg-sky-100 ${focusRing}`}
                  >
                    📞 Call the workshop
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ===== Footer ===== */}
      <footer className="border-t border-sky-100 bg-white px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Bharat Tyres. All rights reserved.
          </p>
          <Link to="/" className={`rounded-lg px-2 py-1 text-sm font-semibold text-sky-700 hover:underline ${focusRing}`}>
            Back to top ↑
          </Link>
        </div>
      </footer>

      {/* ===== Mobile sticky action bar ===== */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-sky-100 bg-white/95 p-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md gap-3">
          <a
            href={PHONE_LINK}
            className={`flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-sky-600 font-bold text-white ${focusRing}`}
          >
            📞 Call
          </a>
          <Link to="/contact"
            className={`flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl border border-sky-300 bg-sky-50 font-bold text-sky-700 ${focusRing}`}
          >
            📍 Location
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;