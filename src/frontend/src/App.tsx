import {
  ChevronDown,
  Clock,
  Facebook,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Scissors,
  Sparkles,
  Star,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

// ── helpers ──────────────────────────────────────────────────────────────────
function useFadeInSections() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.1 },
    );
    const els = document.querySelectorAll(".fade-in-section");
    for (const el of els) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
}

function useScrollNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ── Nav ───────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "Services", id: "services" },
  { label: "Gallery", id: "gallery" },
  { label: "About", id: "about" },
  { label: "Reviews", id: "reviews" },
  { label: "Booking", id: "booking" },
  { label: "Contact", id: "contact" },
];

function Navbar() {
  const scrolled = useScrollNav();
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <button
          type="button"
          onClick={() => scrollTo("home")}
          className="flex items-center gap-3 group"
          data-ocid="nav.link"
        >
          <div className="w-10 h-10 rounded-full border-2 border-gold flex items-center justify-center bg-background/50">
            <Scissors className="w-5 h-5 text-gold" />
          </div>
          <div className="hidden sm:block text-left">
            <div className="font-serif text-gold text-base font-bold leading-tight tracking-wide">
              Good Look Zone
            </div>
            <div className="text-muted-foreground text-[10px] tracking-widest uppercase">
              Signature Salon
            </div>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <button
              type="button"
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="text-foreground/80 hover:text-gold text-[12px] tracking-widest uppercase transition-colors duration-200 font-medium"
              data-ocid="nav.link"
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollTo("booking")}
            className="hidden md:block btn-gold text-xs"
            data-ocid="nav.primary_button"
          >
            Book Appointment
          </button>
          <button
            type="button"
            className="lg:hidden text-gold p-1"
            onClick={() => setOpen(!open)}
            data-ocid="nav.toggle"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-background/98 backdrop-blur-md border-t border-border px-4 pb-4">
          {NAV_LINKS.map((l) => (
            <button
              type="button"
              key={l.id}
              onClick={() => {
                scrollTo(l.id);
                setOpen(false);
              }}
              className="block w-full text-left py-3 text-foreground/80 hover:text-gold text-sm tracking-widest uppercase border-b border-border/50 last:border-0 transition-colors"
              data-ocid="nav.link"
            >
              {l.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              scrollTo("booking");
              setOpen(false);
            }}
            className="btn-gold w-full mt-4 text-center"
            data-ocid="nav.primary_button"
          >
            Book Appointment
          </button>
        </div>
      )}
    </header>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-start overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-barbershop.dim_1920x1080.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 w-full">
        <div className="max-w-xl fade-in-section visible">
          <div className="text-gold text-xs tracking-[0.3em] uppercase mb-4 font-medium">
            Kumbakonam's Finest Barber Shop
          </div>
          <h1
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-gold leading-tight tracking-wide mb-6"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
          >
            Precision.
            <br />
            Style.
            <br />
            Confidence.
          </h1>
          <p className="text-muted-foreground text-base md:text-lg mb-10 leading-relaxed">
            Experience premium grooming at Good Look Zone – where every cut is a
            masterpiece crafted by expert barbers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => scrollTo("booking")}
              className="btn-gold"
              data-ocid="hero.primary_button"
            >
              Book Appointment
            </button>
            <a
              href="tel:+918012803144"
              className="btn-ghost-gold flex items-center justify-center gap-2"
              data-ocid="hero.secondary_button"
            >
              <Phone className="w-4 h-4" />
              Call: +91 8012803144
            </a>
            <a
              href="https://wa.me/918012803144"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold px-6 py-3 rounded-sm tracking-wider uppercase text-sm transition-all duration-300 hover:bg-[#128C7E]"
              data-ocid="hero.whatsapp_button"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollTo("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-7 h-7" />
      </button>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function About() {
  const stats = [
    { value: "4.9★", label: "Rating" },
    { value: "700+", label: "Reviews" },
    { value: "2", label: "Expert Barbers" },
    { value: "10+", label: "Years Experience" },
  ];

  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-5xl mx-auto px-6 md:px-8 text-center">
        <div className="fade-in-section">
          <div className="section-subheading">Who We Are</div>
          <h2 className="section-heading">About Us</h2>
          <div className="gold-divider" />
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-6">
            Good Look Zone – Signature Salon has been the trusted grooming
            destination in Kumbakonam for over a decade. Our expert barbers{" "}
            <span className="text-gold font-semibold">Ganapathy</span> and{" "}
            <span className="text-gold font-semibold">Shanmugam</span> bring
            unparalleled skill and artistry to every service. We combine
            traditional barbering techniques with modern styles to give you a
            look that commands confidence.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed max-w-3xl mx-auto mb-16">
            Step into our premium salon and experience the difference — clean,
            precise, and always on trend. Located in the heart of Anna Nagar,
            Kumbakonam, we're your one-stop destination for all grooming needs.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="service-card text-center">
                <div className="font-serif text-4xl font-bold text-gold mb-2">
                  {s.value}
                </div>
                <div className="text-muted-foreground text-sm tracking-widest uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Services ──────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: Scissors,
    name: "Classic Haircut",
    description:
      "Precision cut tailored to your face shape, styled to perfection by our expert barbers.",
    price: "₹150",
  },
  {
    icon: Sparkles,
    name: "Fade & Taper",
    description:
      "Modern fade and taper cuts with sharp lines and immaculate blending technique.",
    price: "₹200",
  },
  {
    icon: User,
    name: "Beard Styling",
    description:
      "Expert beard shaping, trimming and definition for a polished, confident look.",
    price: "₹100",
  },
  {
    icon: Star,
    name: "Clean Shave",
    description:
      "Traditional hot towel clean shave with premium products for the smoothest finish.",
    price: "₹80",
  },
  {
    icon: Sparkles,
    name: "Luxury Facial",
    description:
      "Rejuvenating facial treatment with premium products to refresh and revitalize your skin.",
    price: "₹350",
  },
  {
    icon: Star,
    name: "Grooming Package",
    description:
      "The complete experience: Haircut + Beard Styling + Luxury Facial. Best value!",
    price: "₹550",
    tag: "Best Value",
  },
];

function Services() {
  return (
    <section
      id="services"
      className="py-24"
      style={{ background: "oklch(0.14 0.006 240)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16 fade-in-section">
          <div className="section-subheading">What We Offer</div>
          <h2 className="section-heading">Our Signature Services</h2>
          <div className="gold-divider" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.name}
                className="service-card fade-in-section"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {s.tag && (
                  <div className="inline-block bg-gold text-background text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
                    {s.tag}
                  </div>
                )}
                <div className="w-12 h-12 rounded-full border border-gold/30 bg-gold/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                  {s.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {s.description}
                </p>
                <div className="font-serif text-2xl font-bold text-gold">
                  {s.price}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Gallery ───────────────────────────────────────────────────────────────────
const GALLERY_IMAGES = [
  {
    src: "/assets/generated/before-after-haircut.dim_800x600.jpg",
    alt: "Before & After Haircut Transformation",
  },
  {
    src: "/assets/generated/beard-styling.dim_800x600.jpg",
    alt: "Expert Beard Styling",
  },
  {
    src: "/assets/generated/barber-tools.dim_800x600.jpg",
    alt: "Premium Barber Tools",
  },
  {
    src: "/assets/generated/salon-interior.dim_800x600.jpg",
    alt: "Salon Interior & Ambience",
  },
  {
    src: "/assets/generated/hero-barbershop.dim_1920x1080.jpg",
    alt: "Expert Barbers at Work",
  },
  {
    src: "/assets/generated/before-after-haircut.dim_800x600.jpg",
    alt: "Haircut Transformation",
  },
];

function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16 fade-in-section">
          <div className="section-subheading">Our Work</div>
          <h2 className="section-heading">Our Gallery</h2>
          <div className="gold-divider" />
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 fade-in-section">
          {GALLERY_IMAGES.map((img, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static list
            <div key={i} className="gallery-item break-inside-avoid mb-4">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full object-cover"
              />
              <div className="gallery-overlay">
                <div className="text-gold/90 font-serif text-sm tracking-widest text-center px-4">
                  {img.alt}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Reviews ───────────────────────────────────────────────────────────────────
const REVIEWS = [
  {
    name: "Rajesh K.",
    initials: "RK",
    text: "Best haircut in Kumbakonam! Ganapathy sir is extremely skilled. Very clean salon with great ambience. Highly recommend!",
    stars: 5,
    service: "Classic Haircut",
  },
  {
    name: "Arun M.",
    initials: "AM",
    text: "Shanmugam sir's beard styling is unmatched. I've been coming here for 3 years and the consistency is incredible.",
    stars: 5,
    service: "Beard Styling",
  },
  {
    name: "Karthik S.",
    initials: "KS",
    text: "Premium experience at very affordable prices. The grooming package is totally worth it — felt like a new person!",
    stars: 5,
    service: "Grooming Package",
  },
  {
    name: "Vijay R.",
    initials: "VR",
    text: "The fade cut here is perfect every time. Clean, precise lines and great attention to detail. Best barbers in town!",
    stars: 5,
    service: "Fade & Taper",
  },
  {
    name: "Senthil P.",
    initials: "SP",
    text: "The luxury facial is absolutely rejuvenating. Premium products and professional technique. Will definitely return!",
    stars: 5,
    service: "Luxury Facial",
  },
  {
    name: "Murugan T.",
    initials: "MT",
    text: "Such a professional setup. Both barbers are extremely knowledgeable. The hot towel shave experience was amazing!",
    stars: 5,
    service: "Clean Shave",
  },
];

function Reviews() {
  return (
    <section
      id="reviews"
      className="py-24"
      style={{ background: "oklch(0.14 0.006 240)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16 fade-in-section">
          <div className="section-subheading">What Clients Say</div>
          <h2 className="section-heading">Client Testimonials</h2>
          <div className="gold-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <div
              key={r.name}
              className="service-card fade-in-section"
              style={{ transitionDelay: `${i * 0.1}s` }}
              data-ocid={`reviews.item.${i + 1}`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
                  <span className="font-serif text-gold font-bold text-sm">
                    {r.initials}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">{r.name}</div>
                  <div className="text-muted-foreground text-xs tracking-wide">
                    {r.service}
                  </div>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {Array.from({ length: r.stars }).map((_, si) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static stars
                  <Star key={si} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                "{r.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Booking ───────────────────────────────────────────────────────────────────
const SERVICE_OPTIONS = [
  "Classic Haircut – ₹150",
  "Fade & Taper – ₹200",
  "Beard Styling – ₹100",
  "Clean Shave – ₹80",
  "Luxury Facial – ₹350",
  "Grooming Package – ₹550",
];

const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
];

function Booking() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    barber: "Any",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello! I'd like to book an appointment at Good Look Zone.

*Name:* ${form.name}
*Phone:* ${form.phone}
*Service:* ${form.service}
*Date:* ${form.date}
*Time:* ${form.time}
*Barber:* ${form.barber}

Please confirm my appointment. Thank you!`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/918012803144?text=${encoded}`, "_blank");
  };

  const inputClass =
    "w-full bg-input border border-border text-foreground px-4 py-3 rounded-sm text-sm placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors";
  const selectClass = `${inputClass} cursor-pointer`;
  const labelClass =
    "block text-muted-foreground text-xs tracking-widest uppercase mb-2";

  return (
    <section id="booking" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16 fade-in-section">
          <div className="section-subheading">Reserve Your Spot</div>
          <h2 className="section-heading">Book Your Session</h2>
          <div className="gold-divider" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Form */}
          <div className="fade-in-section service-card">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="booking-name" className={labelClass}>
                    Full Name
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                    className={inputClass}
                    data-ocid="booking.input"
                  />
                </div>
                <div>
                  <label htmlFor="booking-phone" className={labelClass}>
                    Phone Number
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    required
                    className={inputClass}
                    data-ocid="booking.input"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="booking-service" className={labelClass}>
                  Service
                </label>
                <select
                  id="booking-service"
                  value={form.service}
                  onChange={(e) => handleChange("service", e.target.value)}
                  required
                  className={selectClass}
                  data-ocid="booking.select"
                >
                  <option value="">Select a service</option>
                  {SERVICE_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="booking-date" className={labelClass}>
                    Preferred Date
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    value={form.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className={inputClass}
                    data-ocid="booking.input"
                  />
                </div>
                <div>
                  <label htmlFor="booking-time" className={labelClass}>
                    Preferred Time
                  </label>
                  <select
                    id="booking-time"
                    value={form.time}
                    onChange={(e) => handleChange("time", e.target.value)}
                    required
                    className={selectClass}
                    data-ocid="booking.select"
                  >
                    <option value="">Select a time</option>
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="booking-barber" className={labelClass}>
                  Preferred Barber
                </label>
                <select
                  id="booking-barber"
                  value={form.barber}
                  onChange={(e) => handleChange("barber", e.target.value)}
                  className={selectClass}
                  data-ocid="booking.select"
                >
                  <option value="Any">Any Available Barber</option>
                  <option value="Ganapathy">Ganapathy</option>
                  <option value="Shanmugam">Shanmugam</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn-gold w-full flex items-center justify-center gap-2 py-4 text-base"
                data-ocid="booking.submit_button"
              >
                <MessageCircle className="w-5 h-5" />
                Book via WhatsApp
              </button>
            </form>
          </div>

          {/* Image */}
          <div className="fade-in-section h-full">
            <div className="gallery-item h-full min-h-[400px] lg:min-h-[550px] rounded-[10px] overflow-hidden">
              <img
                src="/assets/generated/salon-interior.dim_800x600.jpg"
                alt="Good Look Zone Salon Interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent flex items-end p-8">
                <div>
                  <div className="font-serif text-gold text-2xl font-bold mb-2">
                    Good Look Zone
                  </div>
                  <div className="text-foreground/80 text-sm">
                    Nachiya Towers, Kumbakonam
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section
      id="contact"
      className="py-24"
      style={{ background: "oklch(0.14 0.006 240)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16 fade-in-section">
          <div className="section-subheading">Get in Touch</div>
          <h2 className="section-heading">Find Us</h2>
          <div className="gold-divider" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6 fade-in-section">
            <div className="service-card">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <div className="text-foreground font-semibold mb-1">
                    Address
                  </div>
                  <div className="text-muted-foreground text-sm leading-relaxed">
                    Nachiya Towers, 8/1A Dr Besant Rd,
                    <br />
                    Anna Nagar, Kumbakonam,
                    <br />
                    Tamil Nadu 612001
                  </div>
                </div>
              </div>
            </div>

            <div className="service-card">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <div className="text-foreground font-semibold mb-1">
                    Phone / WhatsApp
                  </div>
                  <a
                    href="tel:+918012803144"
                    className="text-gold hover:text-gold-hover text-sm transition-colors"
                    data-ocid="contact.link"
                  >
                    +91 8012803144
                  </a>
                </div>
              </div>
            </div>

            <div className="service-card">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <div className="text-foreground font-semibold mb-3">
                    Business Hours
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm gap-8">
                      <span className="text-muted-foreground">
                        Monday – Saturday
                      </span>
                      <span className="text-foreground font-medium">
                        9:00 AM – 9:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between text-sm gap-8">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="text-foreground font-medium">
                        9:00 AM – 7:00 PM
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => scrollTo("booking")}
              className="btn-gold w-full text-center"
              data-ocid="contact.primary_button"
            >
              Book Appointment Now
            </button>
          </div>

          {/* Google Maps */}
          <div className="fade-in-section">
            <div className="rounded-[10px] overflow-hidden border border-border h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.396!2d79.3867!3d10.9622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5526c21e3d4d41%3A0x4f78cf8b4f7c4d4c!2sNachiya%20Towers%2C%208%2F1A%2C%20Dr%20Besant%20Rd%2C%20Anna%20Nagar%2C%20Kumbakonam%2C%20Tamil%20Nadu%20612001!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Good Look Zone Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "goodlookzone";

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full border-2 border-gold flex items-center justify-center">
                <Scissors className="w-5 h-5 text-gold" />
              </div>
              <div>
                <div className="font-serif text-gold font-bold text-base">
                  Good Look Zone
                </div>
                <div className="text-muted-foreground text-[10px] tracking-widest uppercase">
                  Signature Salon
                </div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
              Premium grooming experience in the heart of Kumbakonam.
            </p>
            <div className="text-gold text-xs font-semibold tracking-wide uppercase">
              Best Salon in Kumbakonam
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-semibold text-sm tracking-widest uppercase mb-5">
              Quick Links
            </h4>
            <nav className="space-y-3">
              {NAV_LINKS.map((l) => (
                <button
                  type="button"
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className="block text-muted-foreground hover:text-gold text-sm transition-colors"
                  data-ocid="footer.link"
                >
                  {l.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-foreground font-semibold text-sm tracking-widest uppercase mb-5">
              Contact
            </h4>
            <div className="space-y-3">
              <p className="text-muted-foreground text-sm leading-relaxed">
                Nachiya Towers, 8/1A Dr Besant Rd,
                <br />
                Anna Nagar, Kumbakonam,
                <br />
                Tamil Nadu 612001
              </p>
              <a
                href="tel:+918012803144"
                className="text-gold hover:text-gold-hover text-sm transition-colors block"
                data-ocid="footer.link"
              >
                +91 8012803144
              </a>
              <p className="text-muted-foreground text-xs">
                Mon–Sat: 9:00 AM – 9:00 PM
                <br />
                Sun: 9:00 AM – 7:00 PM
              </p>
            </div>
          </div>

          {/* Follow */}
          <div>
            <h4 className="text-foreground font-semibold text-sm tracking-widest uppercase mb-5">
              Follow Us
            </h4>
            <div className="flex gap-3 mb-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-background transition-all duration-300"
                data-ocid="footer.link"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-background transition-all duration-300"
                data-ocid="footer.link"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/918012803144"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300"
                data-ocid="footer.link"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
            <button
              type="button"
              onClick={() => scrollTo("booking")}
              className="btn-gold text-xs px-4 py-2"
              data-ocid="footer.primary_button"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border py-6 px-6 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>
            © {year} Good Look Zone – Signature Salon, Kumbakonam. All rights
            reserved.
          </div>
          <div>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-hover transition-colors"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Floating Buttons ──────────────────────────────────────────────────────────
function FloatingButtons() {
  return (
    <>
      <a
        href="https://wa.me/918012803144"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
        aria-label="Chat on WhatsApp"
        data-ocid="whatsapp.button"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>

      <button
        type="button"
        onClick={() => scrollTo("booking")}
        className="fixed bottom-6 left-6 z-50 btn-gold shadow-lg text-xs px-5 py-3"
        data-ocid="sticky.primary_button"
      >
        Book Now
      </button>
    </>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  useFadeInSections();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Reviews />
        <Booking />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
