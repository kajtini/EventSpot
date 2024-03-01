import { SignInButton, SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import { RadarIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import MobileNav from "@/components/MobileNav";
import NavItems from "@/components/NavItems";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/85 py-5 backdrop-blur-3xl">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <RadarIcon size={24} />
          <span className="text-xl font-medium">EventSpot</span>
        </Link>

        <SignedIn>
          <nav className="hidden md:block">
            <NavItems />
          </nav>
        </SignedIn>

        <div className="flex items-center gap-2">
          <SignedOut>
            <SignInButton>
              <Button>Sign in</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
