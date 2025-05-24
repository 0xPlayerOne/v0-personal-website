import type { TypographyVariant, TypographyAlign, TypographyColor } from "@/types/typography"
import { SITE_HEADER_COLOR, SITE_SUBHEADER_COLOR, SITE_TEXT_COLOR } from "./colors"
import type { JSX } from "react"

export const VARIANT_MAPPING: Record<TypographyVariant, keyof JSX.IntrinsicElements> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  body1: "p",
  body2: "p",
  caption: "span",
  overline: "span",
}

export const VARIANT_STYLES: Record<TypographyVariant, string> = {
  h1: "text-4xl sm:text-5xl font-bold",
  h2: "text-3xl sm:text-4xl font-bold",
  h3: "text-lg sm:text-xl font-semibold",
  h4: "text-base sm:text-lg font-semibold",
  h5: "text-sm sm:text-base font-semibold",
  h6: "text-xs sm:text-sm font-semibold",
  body1: "text-base sm:text-lg",
  body2: "text-sm sm:text-base",
  caption: "text-xs sm:text-sm",
  overline: "text-xs uppercase tracking-wide",
}

export const COLOR_MAPPING: Record<TypographyColor, string> = {
  primary: SITE_HEADER_COLOR,
  secondary: SITE_SUBHEADER_COLOR,
  textPrimary: SITE_TEXT_COLOR,
  textSecondary: SITE_TEXT_COLOR,
  inherit: "inherit",
}

export const ALIGN_MAPPING: Record<TypographyAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
}
