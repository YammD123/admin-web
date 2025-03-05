"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

export default function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname();
  const params = useParams();
  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Dashboard",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "settings",
      active: pathname === `/${params.storeId}/settings`,
    },
    {
      href: `/${params.storeId}/banners`,
      label: "banners",
      active: pathname === `/${params.storeId}/banners`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "categories",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/products`,
      label: "products",
      active: pathname === `/${params.storeId}/products`,
    },
  ];
  return (
    <nav className={cn(`flex items-center space-x-4 lg:space-x-6`, className)}>
      {routes.map((route: any) => {
        return (
          <Link
            href={route.href}
            key={route.href}
            className={cn(
              `text-sm font-medium transition-colors hover:text-primary`,
              route.active
                ? "text-black dark:text-white"
                : "text-muted-foreground"
            )}
          >
            {route.label}
          </Link>
        );
      })}
    </nav>
  );
}
