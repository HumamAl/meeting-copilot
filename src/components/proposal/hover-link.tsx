"use client";

interface HoverLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  defaultColor?: string;
  hoverColor?: string;
  target?: string;
  rel?: string;
}

export function HoverLink({
  href,
  children,
  className,
  defaultColor = "var(--muted-foreground)",
  hoverColor = "var(--primary)",
  target,
  rel,
}: HoverLinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      style={{ color: defaultColor, transition: "color 150ms" }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.color = hoverColor)
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.color = defaultColor)
      }
    >
      {children}
    </a>
  );
}
