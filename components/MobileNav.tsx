import { Menu } from "lucide-react";

import NavItems from "@/components/NavItems";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function MobileNav() {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="text-muted-foreground" />
          </Button>
        </SheetTrigger>
        <SheetContent className="py-20">
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
}
