import type { TypographyProps } from "@/types/typography"
import { VARIANT_MAPPING, VARIANT_STYLES, COLOR_MAPPING, ALIGN_MAPPING } from "@/constants/typography"
import { cn } from "@/lib/utils"
import { createElement } from "react"

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
  const elementType = component || VARIANT_MAPPING[variant]

  const variantClass = VARIANT_STYLES[variant]
  const alignClass = ALIGN_MAPPING[align]
  const gutterClass = gutterBottom ? "mb-4" : ""
  const wrapClass = noWrap ? "whitespace-nowrap overflow-hidden text-ellipsis" : ""

  const combinedClassName = cn(variantClass, alignClass, gutterClass, wrapClass, className)

  const combinedStyle = {
    color: color !== "inherit" ? COLOR_MAPPING[color] : undefined,
    ...style,
  }

  return createElement(
    elementType,
    {
      className: combinedClassName,
      style: combinedStyle,
      ...props,
    },
    children,
  )
}
