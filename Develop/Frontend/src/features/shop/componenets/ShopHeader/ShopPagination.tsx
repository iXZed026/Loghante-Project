"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
} from "react-icons/fa6";

import { cn } from "@/lib/utils/cn";

interface ShopPaginationProps {
  totalItems?: number;
  itemsPerPage?: number;
  className?: string;
}

const DEFAULT_TOTAL_ITEMS = 10;
const DEFAULT_ITEMS_PER_PAGE = 10;

function ShopPagination({
  totalItems = DEFAULT_TOTAL_ITEMS,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
  className,
}: ShopPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = useMemo(() => {
    const value = Number(searchParams.get("page") ?? 1);

    return Number.isInteger(value) && value > 0 ? value : 1;
  }, [searchParams]);

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const goToPage = useCallback(
    (page: number) => {
      const nextPage = Math.min(totalPages, Math.max(1, page));

      if (nextPage === safeCurrentPage) return;

      const params = new URLSearchParams(searchParams.toString());

      if (nextPage === 1) {
        params.delete("page");
      } else {
        params.set("page", String(nextPage));
      }

      const query = params.toString();

      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams, safeCurrentPage, totalPages],
  );

  const pages = useMemo(() => {
    const maxVisiblePages = 5;
    const half = Math.floor(maxVisiblePages / 2);

    let start = Math.max(1, safeCurrentPage - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    start = Math.max(1, end - maxVisiblePages + 1);

    return Array.from(
      { length: end - start + 1 },
      (_, index) => start + index,
    );
  }, [safeCurrentPage, totalPages]);

  if (totalItems <= 0 || itemsPerPage <= 0) return null;

  return (
    <nav
      aria-label="Product pagination"
      className={cn("flex flex-wrap items-center justify-center gap-2", className)}
    >
      <PaginationButton
        label="First page"
        disabled={safeCurrentPage === 1}
        onClick={() => goToPage(1)}
      >
        <FaAnglesLeft size={13} />
      </PaginationButton>

      <PaginationButton
        label="Previous page"
        disabled={safeCurrentPage === 1}
        onClick={() => goToPage(safeCurrentPage - 1)}
      >
        <FaAngleLeft size={15} />
      </PaginationButton>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          aria-label={`Page ${page}`}
          aria-current={page === safeCurrentPage ? "page" : undefined}
          onClick={() => goToPage(page)}
          className={cn(
            "flex size-10 items-center justify-center rounded-lg",
            "text-sm font-medium transition-colors duration-200",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-[var(--blue-color)]",
            page === safeCurrentPage
              ? "bg-blue-utility text-white"
              : "border border-[var(--blue-border-color)]",
            page !== safeCurrentPage &&
              "text-blue-utility hover:bg-[var(--blue-opacity-color)]",
          )}
        >
          {page}
        </button>
      ))}

      <PaginationButton
        label="Next page"
        disabled={safeCurrentPage === totalPages}
        onClick={() => goToPage(safeCurrentPage + 1)}
      >
        <FaAngleRight size={15} />
      </PaginationButton>

      <PaginationButton
        label="Last page"
        disabled={safeCurrentPage === totalPages}
        onClick={() => goToPage(totalPages)}
      >
        <FaAnglesRight size={13} />
      </PaginationButton>
    </nav>
  );
}

interface PaginationButtonProps {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function PaginationButton({
  label,
  disabled,
  onClick,
  children,
}: PaginationButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex size-10 items-center justify-center rounded-lg border",
        "border-[var(--blue-border-color)] text-blue-utility",
        "transition-colors duration-200",
        "hover:bg-[var(--blue-opacity-color)]",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-[var(--blue-color)]",
        "disabled:pointer-events-none disabled:opacity-40",
      )}
    >
      {children}
    </button>
  );
}

export default ShopPagination;
