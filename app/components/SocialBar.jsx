import {
  Facebook,
  Instagram,
  Linkedin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";

export default function SocialBar() {
  return (
    <div className="hidden lg:flex flex-col gap-4 fixed top-1/2 -translate-y-1/2 right-4 z-50">
      {/* FACEBOOK */}
      <a
        href=" https://www.facebook.com/KelabCo"
        target="_blank"
        className="
          bg-white shadow-lg w-12 h-12 rounded-full flex items-center justify-center
          transition-all
          hover:bg-[linear-gradient(135deg,#000180_0%,#000069_25%,#45C93E_75%,#399334_100%)]
        "
      >
        <Facebook
          className="text-primary transition-all group-hover:text-white"
          size={22}
        />
      </a>

      {/* INSTAGRAM */}
      <a
        href="https://www.instagram.com/kelabco/"
        target="_blank"
        className="
          bg-white shadow-lg w-12 h-12 rounded-full flex items-center justify-center
          transition-all
          hover:bg-[linear-gradient(135deg,#000180_0%,#000069_25%,#45C93E_75%,#399334_100%)]
        "
      >
        <Instagram className="text-primary transition-all" size={22} />
      </a>

      {/* LINKEDIN */}
      <a
        href=" https://www.linkedin.com/company/kelab/posts/?feedView=all"
        target="_blank"
        className="
          bg-white shadow-lg w-12 h-12 rounded-full flex items-center justify-center 
          transition-all
          hover:bg-[linear-gradient(135deg,#000180_0%,#000069_25%,#45C93E_75%,#399334_100%)]
        "
      >
        <Linkedin className="text-primary transition-all" size={22} />
      </a>

      {/* WHATSAPP */}
      <a
        href="https://wa.me/573136715765"
        target="_blank"
        className="
          bg-white shadow-lg w-12 h-12 rounded-full flex items-center justify-center 
          transition-all
          hover:bg-[linear-gradient(135deg,#000180_0%,#000069_25%,#45C93E_75%,#399334_100%)]
        "
      >
        <Phone className="text-accent transition-all" size={22} />
      </a>
    </div>
  );
}
