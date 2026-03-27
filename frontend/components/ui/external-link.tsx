"use client"

import * as React from "react"

type ExternalLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

const EXTERNAL_PROTOCOL = /^(https?:)?\/\//i
const ALLOWED_URI_PROTOCOL = /^(https?:|mailto:|tel:)/i

export function ExternalLink({ href = "", rel, target, ...props }: ExternalLinkProps) {
  const trimmedHref = href.trim()
  const isRelative = trimmedHref.startsWith("/") || trimmedHref.startsWith("#")
  const isAllowedProtocol = ALLOWED_URI_PROTOCOL.test(trimmedHref)
  const safeHref = isRelative || isAllowedProtocol ? trimmedHref : "#"
  const isExternal = EXTERNAL_PROTOCOL.test(safeHref)
  const opensNewTab = isExternal

  return (
    <a
      href={safeHref}
      target={target ?? (opensNewTab ? "_blank" : undefined)}
      rel={rel ?? (opensNewTab ? "noopener noreferrer" : undefined)}
      {...props}
    />
  )
}
