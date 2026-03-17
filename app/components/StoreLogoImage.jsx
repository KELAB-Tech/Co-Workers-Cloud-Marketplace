"use client";

export default function StoreLogoImage({ logoUrl, name, initials }) {
  if (!logoUrl) {
    return <span className="text-[#45C93E] font-bold text-sm">{initials}</span>;
  }

  return (
    <img
      src={logoUrl}
      alt={name}
      className="w-full h-full object-cover"
      onError={(e) => {
        e.target.style.display = "none";
        e.target.nextSibling?.style?.removeProperty("display");
      }}
    />
  );
}
