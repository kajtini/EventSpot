"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { headerLinks } from "@/constants";

export default function NavItems() {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col gap-5 md:flex-row md:justify-between md:gap-10">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li
            className={`${isActive && "font-medium text-primary"}`}
            key={link.route}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
}
