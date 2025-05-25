import type React from "react"
import { cn } from "@/lib/utils"
import { SITE_HEADER_COLOR, SITE_SUBHEADER_COLOR, SITE_TEXT_COLOR } from "@/constants/colors"

interface TypographyProps {
  className?: string
  children: React.ReactNode
}

export function TypographyH1({
  className,
  children,
  ...props
}: TypographyProps & React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 className={cn("text-4xl sm:text-5xl font-bold", className)} style={{ color: SITE_HEADER_COLOR }} {...props}>
      {children}
    </h1>
  )
}

export function TypographyH2({
  className,
  children,
  ...props
}: TypographyProps & React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn("text-3xl sm:text-4xl font-bold", className)} style={{ color: SITE_HEADER_COLOR }} {...props}>
      {children}
    </h2>
  )
}

export function TypographyH3({
  className,
  children,
  ...props
}: TypographyProps & React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-lg sm:text-xl font-semibold", className)}
      style={{ color: SITE_SUBHEADER_COLOR }}
      {...props}
    >
      {children}
    </h3>
  )
}

export function TypographyP({
  className,
  children,
  ...props
}: TypographyProps & React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-base sm:text-lg", className)} style={{ color: SITE_TEXT_COLOR }} {...props}>
      {children}
    </p>
  )
}

export function TypographySmall({
  className,
  children,
  ...props
}: TypographyProps & React.HTMLAttributes<HTMLElement>) {
  return (
    <small className={cn("text-sm sm:text-base", className)} style={{ color: SITE_TEXT_COLOR }} {...props}>
      {children}
    </small>
  )
}

// Legacy Typography component for backward compatibility
export function Typography({
  variant = "body1",
  align = "left",
  color = "textPrimary",
  className = "",
  children,
  gutterBottom = false,
  ...props
}: any) {
  const alignClass = align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left"
  const gutterClass = gutterBottom ? "mb-4" : ""

  const colorMap = {
    primary: SITE_HEADER_COLOR,
    secondary: SITE_SUBHEADER_COLOR,
    textPrimary: SITE_TEXT_COLOR,
    textSecondary: SITE_TEXT_COLOR,
  }

  const style = { color: colorMap[color as keyof typeof colorMap] || SITE_TEXT_COLOR }

  if (variant === "h1") {
    return (
      <h1 className={cn("text-4xl sm:text-5xl font-bold", alignClass, gutterClass, className)} style={style} {...props}>
        {children}
      </h1>
    )
  }
  if (variant === "h2") {
    return (
      <h2 className={cn("text-3xl sm:text-4xl font-bold", alignClass, gutterClass, className)} style={style} {...props}>
        {children}
      </h2>
    )
  }
  if (variant === "h3") {
    return (
      <h3
        className={cn("text-lg sm:text-xl font-semibold", alignClass, gutterClass, className)}
        style={style}
        {...props}
      >
        {children}
      </h3>
    )
  }
  if (variant === "body2") {
    return (
      <p className={cn("text-sm sm:text-base", alignClass, gutterClass, className)} style={style} {...props}>
        {children}
      </p>
    )
  }

  return (
    <p className={cn("text-base sm:text-lg", alignClass, gutterClass, className)} style={style} {...props}>
      {children}
    </p>
  )
}
