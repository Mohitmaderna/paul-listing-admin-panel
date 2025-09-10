import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

/**
 * Represents a single item in the breadcrumb trail.
 */
type BreadCrumbType = {
  title: string;
  link: string;
};

/**
 * Props for the BreadCrumb component.
 */
type BreadCrumbPropsType = {
  /**
   * An array of breadcrumb items to be displayed.
   */
  items: BreadCrumbType[];
};

/**
 * A breadcrumb component that displays the user's current location in the application.
 * @param {BreadCrumbPropsType} props - The props for the component.
 * @returns {JSX.Element} The breadcrumb component.
 */
export default function BreadCrumb({ items }: BreadCrumbPropsType) {
  return (
    <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
      <Link
        href={"/dashboard"}
        className="overflow-hidden text-ellipsis whitespace-nowrap"
      >
        Dashboard
      </Link>
      {items?.map((item: BreadCrumbType, index: number) => (
        <React.Fragment key={item.title}>
          <ChevronRightIcon className="h-4 w-4" />
          <Link
            href={item.link}
            className={cn(
              "font-medium",
              index === items.length - 1
                ? "text-foreground pointer-events-none"
                : "text-muted-foreground",
            )}
          >
            {item.title}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
}
