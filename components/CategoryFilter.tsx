"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { eventCategories } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Add created_at for event

export default function CategoryFilter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleSelectClick(category: string) {
    const params = new URLSearchParams(searchParams);

    if (category && category !== "All") {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    const newPathname = `${pathname}?${params.toString()}`;

    router.replace(newPathname, { scroll: false });
  }

  return (
    <Select
      onValueChange={(value) => handleSelectClick(value)}
      defaultValue={searchParams.get("category")?.toString() || "All"}
    >
      <SelectTrigger className="max-w-xs">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All">All</SelectItem>
        {eventCategories.map((category) => (
          <SelectItem key={category.id} value={category.name}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
