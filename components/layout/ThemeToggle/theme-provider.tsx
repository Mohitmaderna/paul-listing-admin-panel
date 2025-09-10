"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

/**
 * A theme provider component that wraps the application and provides the theme.
 * @param {ThemeProviderProps} props - The props for the component.
 * @returns {JSX.Element} The theme provider component.
 */
export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
