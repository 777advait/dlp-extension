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
    <div className={cn("max-w-[95%] w-[400px] mx-auto py-8 px-6 ", className)}>
      {children}
    </div>
  );
}
