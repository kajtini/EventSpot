"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

interface EventsPaginationProps {
  currentPage: number;
  eventsNum: number;
  limit: number;
}

export default function EventsPagination({
  currentPage,
  eventsNum,
  limit,
}: EventsPaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  if (eventsNum <= limit) {
    return null;
  }
  const totalPages = Math.ceil(eventsNum / limit);

  function handlePageChange(page: number) {
    const params = new URLSearchParams(searchParams);

    if (page && page !== 1) {
      params.set("page", `${page}`);
    } else {
      params.delete("page");
    }

    const newPathname = `${pathname}?${params.toString()}`;

    router.push(newPathname, { scroll: false });
  }

  return (
    <div className="mx-auto flex items-center justify-center gap-5">
      <Button
        disabled={currentPage - 1 < 1}
        variant="ghost"
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </Button>
      <span>
        {currentPage}/{totalPages}
      </span>
      <Button
        disabled={currentPage + 1 > totalPages}
        variant="ghost"
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
}
