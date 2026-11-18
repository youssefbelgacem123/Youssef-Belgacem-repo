import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "badge inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide",
  {
    variants: {
      variant: {
        default: "border-green-800/20 bg-green-700/10 text-green-800",
        success: "border-emerald-700/20 bg-emerald-600/10 text-emerald-800",
        warning: "border-amber-700/20 bg-amber-600/10 text-amber-800",
        subtle: "border-slate-900/10 bg-slate-900/5 text-slate-700",
        sale: "border-orange-700/20 bg-orange-600/10 text-orange-800",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}
