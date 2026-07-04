"use client";

import React from "react";
import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";

// =============================================================================
// DynamicIcon — Renders a lucide-react icon by name string
// Used to map icon names from the config file to actual components.
// =============================================================================

interface DynamicIconProps extends LucideProps {
  name: string;
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<LucideProps>>)[name];

  if (!IconComponent) {
    // Fallback to a generic circle icon if the name doesn't match
    return <LucideIcons.Circle {...props} />;
  }

  return <IconComponent {...props} />;
}
