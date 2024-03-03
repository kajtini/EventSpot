"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/types";
import { getAllCategories } from "@/lib/actions";

// Add created_at for event

export default function CategoryFilter() {
  const [categories, setCategories] = useState<Category[]>([]);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    async function getCategories() {
      try {
        const categories = await getAllCategories();
        setCategories([...categories]);
      } catch (err) {
        console.error(err);
      }
    }

    getCategories();
  }, []);

  function handleSelectClick(category: string) {
    const params = new URLSearchParams(searchParams);

    if (category && category !== "All") {
      if (!!params.get("page")) {
        params.delete("page");
      }

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
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem key={category.category_id} value={category.name}>
              {category.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}
