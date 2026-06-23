// Central configuration for S-Tier. Swap these placeholder values with the
// barber's real details (Booksy URL, phone, social handles, photography).

export const site = {
  name: "S-Tier",
  tagline: "Precision Cuts. Elevated Style.",
  description:
    "Premium barber services at Sola Salon Studios in Tustin, specializing in clean fades, modern styles, and personalized grooming experiences.",
  location: {
    studio: "Sola Salon Studios",
    street: "2801 El Camino Real",
    suite: "Studio #8",
    city: "Tustin",
    state: "CA",
    zip: "92782",
    full: "Sola Salon Studios, 2801 El Camino Real, Studio #8, Tustin, 92782",
    region: "Tustin, California",
    short: "Tustin, CA",
  },
  // Replace with the real Booksy page URL.
  booksyUrl: "https://booksy.com/",
  // Replace with the real contact details.
  phoneDisplay: "(949) 000-0000",
  phoneHref: "tel:+19490000000",
  smsHref: "sms:+19490000000",
  email: "nikoonavid@yahoo.com",
  instagramHandle: "@thatbarber_g",
  instagramUrl: "https://www.instagram.com/thatbarber_g/",
  mapsUrl:
    "https://maps.google.com/?q=Sola+Salon+Studios%2C+2801+El+Camino+Real%2C+Studio+%238%2C+Tustin%2C+92782",
} as const;

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export type Service = {
  name: string;
  duration: string;
  description: string;
  price: string;
  group: "popular" | "other";
};

export const services: Service[] = [
  {
    name: "SKIN/ZERO Haircut Fade/Taper/Mullet, etc.",
    duration: "1 hr",
    description:
      "Any style fade or taper down to skin/zero. Sharp blending and detailed finish.",
    price: "$45",
    group: "popular",
  },
  {
    name: "Haircut not down to Zero/Skin",
    duration: "45 min",
    description:
      "Basic haircut not taken down to zero, bald, or skin. Clean shape with precision detailing.",
    price: "$40.00",
    group: "popular",
  },
  {
    name: "Kids Cut - Ages 12 and under",
    duration: "45 min",
    description:
      "For kids ages 12 and under. Patient, clean, and age-appropriate styling.",
    price: "$32",
    group: "popular",
  },
  {
    name: "Scissor Cut",
    duration: "1 hr",
    description:
      "Shears used all around. Great for longer hair types and layered or textured looks.",
    price: "$50",
    group: "other",
  },
  {
    name: "Buzz Cut - 1 size clip all over",
    duration: "30 min",
    description:
      "One size clip all over with no fade or taper. Minimal, clean, and efficient.",
    price: "$30",
    group: "other",
  },
  {
    name: "Beard trim",
    duration: "30 min",
    description:
      "Beard length can be trimmed and shaped using clippers, trimmers, and/or scissors.",
    price: "$20",
    group: "other",
  },
  {
    name: "Face shave",
    duration: "45 min",
    description:
      "Comfortable straight razor shave with hot lather shave cream and hot towels.",
    price: "$45",
    group: "other",
  },
  {
    name: "Head shave",
    duration: "45 min",
    description:
      "Comfortable straight razor head shave with hot lather shave cream and hot towels.",
    price: "$45",
    group: "other",
  },
];

export type Testimonial = {
  quote: string;
  author: string;
  detail: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Easily the best fade I've ever had. The attention to detail is on another level — every line is intentional.",
    author: "Marcus R.",
    detail: "Skin Fade",
  },
  {
    quote:
      "Walked in needing a reset, walked out feeling like the sharpest version of myself. The whole experience feels premium.",
    author: "Devin L.",
    detail: "Hair + Beard Package",
  },
  {
    quote:
      "It's an art form. You can tell he genuinely cares about the craft and about the people in his chair.",
    author: "Anthony C.",
    detail: "Haircut",
  },
  {
    quote:
      "Consistent every single time. Clean shop, great conversation, and a cut that holds its shape for weeks.",
    author: "Jordan M.",
    detail: "Beard Trim",
  },
];

export type GalleryImage = {
  src: string;
  alt: string;
  span: "tall" | "wide" | "square";
};

// Placeholder photography (Unsplash). Replace with the barber's own work
// or wire up an Instagram feed later.
export const galleryImages: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=80",
    alt: "Close-up of a sharp skin fade haircut",
    span: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80",
    alt: "Barber detailing a modern textured cut",
    span: "square",
  },
  {
    src: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80",
    alt: "Precision line-up and edge work",
    span: "square",
  },
  {
    src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=900&q=80",
    alt: "Clean modern men's hairstyle with texture",
    span: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=900&q=80",
    alt: "Detailed beard sculpt and shape-up",
    span: "square",
  },
  {
    src: "https://images.unsplash.com/photo-1593702288056-7927b442d984?auto=format&fit=crop&w=900&q=80",
    alt: "Barber tools and grooming detail shot",
    span: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=900&q=80",
    alt: "Finished modern fade from the side",
    span: "square",
  },
  {
    src: "https://images.unsplash.com/photo-1614608997588-8d8a3c4c8a36?auto=format&fit=crop&w=900&q=80",
    alt: "Styling and finishing a fresh cut",
    span: "wide",
  },
];

export const portraitImage = {
  src: "https://images.unsplash.com/photo-1622296089863-eb7fc530daa8?auto=format&fit=crop&w=1000&q=80",
  alt: "Portrait of the S-Tier barber at work",
};

export const heroImage = {
  src: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=2000&q=80",
  alt: "Dramatic low-light barbershop scene",
};
