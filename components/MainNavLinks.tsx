"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Dashboard", href: "/", adminOnly: false },
  { label: "Tickets", href: "/tickets", adminOnly: false },
  { label: "Users", href: "/users", adminOnly: true },
];

const MainNavLinks = ({ role }: { role?: string }) => {
  const currentPath = usePathname();

  return (
    <div style={{ display: "flex", gap: 10 }}>
      {links
        .filter((link) => !link.adminOnly || role === "ADMIN")
        .map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`navbar-link ${
              currentPath.includes(link.href) && "current"
            }`}
          >
            {link.label}
          </Link>
        ))}
    </div>
  );
};

export default MainNavLinks;
