"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import { Input } from "@/components/ui/input";

export default function SearchEvent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChange = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }

    const newPathname = `${pathname}?${params.toString()}`;

    router.replace(newPathname, { scroll: false });
  }, 300);

  return (
    <Input
      onChange={(e) => handleChange(e.target.value)}
      defaultValue={searchParams.get("query")?.toString()}
      placeholder="Nextjs conference..."
    />
  );
}
