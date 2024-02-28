"use client";

import { EraserIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function ClearFiltersBtn() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleClearClick() {
    const params = new URLSearchParams(searchParams);

    params.delete("category");
    params.delete("query");

    const newPathname = `${pathname}?${params.toString()}`;

    router.replace(newPathname, { scroll: false });
  }

  return (
    <Button onClick={handleClearClick}>
      <EraserIcon size={18} />
      <span className="ml-2">Clear filters</span>
    </Button>
  );
}
