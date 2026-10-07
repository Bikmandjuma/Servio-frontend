export const business = {
  phone: "0795020004",
  phoneDisplay: "+250 795 020 004",
  whatsapp: "250795020004",
  email: "servio.rw@gmail.com",
  location: "CHIC Building, Downtown Kigali",
  tagline: "fast. easy. reliable.",
};

export const whatsappLink = (message = "Hello Servio, I'm interested in your business solutions.") =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
