import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { eventCategories } from "@/constants";

export default function CategoryFilter() {
  return (
    <Select>
      <SelectTrigger className="max-w-xs">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {eventCategories.map((category) => (
          <SelectItem key={category.id} value={category.name}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
