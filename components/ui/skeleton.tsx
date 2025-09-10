import { cn } from "@/lib/utils";

/**
 * A skeleton component that can be used to indicate a loading state.
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The props for the component.
 * @returns {JSX.Element} The skeleton component.
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  );
}

export { Skeleton };
