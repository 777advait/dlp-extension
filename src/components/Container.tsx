import { cn } from "@/lib/utils";
import React from "react";

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-[95%] px-6 py-8", className)}>
      {children}
    </div>
  );
}
