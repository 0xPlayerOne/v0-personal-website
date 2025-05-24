import type React from "react"
import { SITE_HEADER_COLOR, SITE_SUBHEADER_COLOR, SITE_TEXT_COLOR } from "@/constants/colors"

type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "body2" | "caption" | "overline"

type TypographyAlign = "left" | "center" | "right" | "justify"

type TypographyColor = "primary" | "secondary" | "textPrimary" | "textSecondary" | "inherit"

interface TypographyProps {
  variant?: TypographyVariant
  align?: TypographyAlign
  color?: TypographyColor
  component?: keyof JSX.IntrinsicElements
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
  gutterBottom?: boolean
  noWrap?: boolean
}

const variantMapping: Record<TypographyVariant, keyof JSX.IntrinsicElements> = {
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

const variantStyles: Record<TypographyVariant, string> = {
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

const colorMapping: Record<TypographyColor, string> = {
  primary: SITE_HEADER_COLOR,
  secondary: SITE_SUBHEADER_COLOR,
  textPrimary: SITE_TEXT_COLOR,
  textSecondary: SITE_TEXT_COLOR,
  inherit: "inherit",
}

const alignMapping: Record<TypographyAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
}

export function Typography({
  variant = "body1",
  align = "left",
  color = "textPrimary",
  component,
  className = "",
  style = {},
  children,
  gutterBottom = false,
  noWrap = false,
  ...props
}: TypographyProps) {
  const Component = component || variantMapping[variant]

  const variantClass = variantStyles[variant]
  const alignClass = alignMapping[align]
  const gutterClass = gutterBottom ? "mb-4" : ""
  const wrapClass = noWrap ? "whitespace-nowrap overflow-hidden text-ellipsis" : ""

  const combinedClassName = [variantClass, alignClass, gutterClass, wrapClass, className].filter(Boolean).join(" ")

  const combinedStyle = {
    color: color !== "inherit" ? colorMapping[color] : undefined,
    ...style,
  }

  return (
    <Component className={combinedClassName} style={combinedStyle} {...props}>
      {children}
    </Component>
  )
}
