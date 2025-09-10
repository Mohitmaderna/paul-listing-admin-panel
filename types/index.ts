import { Icons } from "@/components/icons";

/**
 * A navigation item.
 */
export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

/**
 * A navigation item with children.
 */
export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

/**
 * A navigation item with optional children.
 */
export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

/**
 * A footer item.
 */
export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

/**
 * A main navigation item.
 */
export type MainNavItem = NavItemWithOptionalChildren;

/**
 * A sidebar navigation item.
 */
export type SidebarNavItem = NavItemWithChildren;
