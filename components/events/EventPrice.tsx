import { cn } from "@/lib/utils";

interface EventPriceProps extends React.HTMLAttributes<HTMLDivElement> {
  price: number;
  is_free: boolean;
}

export default function EventPrice({
  price,
  is_free,
  className,
}: EventPriceProps) {
  return (
    <div
      className={cn(
        "rounded-full bg-green-600 px-3 text-sm font-medium text-green-100",
        className,
      )}
    >
      {is_free ? "FREE" : `$${price}`}
    </div>
  );
}
