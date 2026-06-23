import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { Booking } from "@/components/sections/Booking";
import { Contact } from "@/components/sections/Contact";
import { services, site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: site.name,
  description: site.description,
  areaServed: site.location.region,
  address: {
    "@type": "PostalAddress",
    name: site.location.studio,
    streetAddress: `${site.location.street}, ${site.location.suite}`,
    addressLocality: site.location.city,
    addressRegion: site.location.state,
    postalCode: site.location.zip,
    addressCountry: "US",
  },
  telephone: site.phoneDisplay,
  email: site.email,
  priceRange: "$$",
  sameAs: [site.instagramUrl, site.booksyUrl],
  makesOffer: services.map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: s.name, description: s.description },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Testimonials />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
