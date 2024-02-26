import Image from "next/image";

import { Button } from "@/components/ui/button";
import SearchEvent from "@/components/SearchEvent";
import CategoryFilter from "@/components/CategoryFilter";
import EventsList from "@/components/EventsList";
import hero from "@/public/hero.png";

export default function Home() {
  return (
    <>
      <section className="border-b bg-gradient-to-tl from-muted-foreground/5 to-background">
        <div className="container grid grid-cols-1 gap-10 py-14 md:grid-cols-2 md:py-32">
          <div className="flex flex-col items-start  gap-7 self-center text-start">
            <h1 className="max-w-xl text-balance text-4xl font-bold lg:text-6xl">
              EventSpot: Your Ticket to Local Excitement
            </h1>
            <p className="max-w-2xl text-balance text-lg leading-8 text-muted-foreground">
              Uncover the pulse of your city with EventSpot. From concerts to
              community gatherings, we bring you the best of whats happening
              nearby.
            </p>
            <Button size="lg">Create now!</Button>
          </div>
          <Image
            src={hero}
            alt="Hero image"
            className="max-h-[70vh] self-center object-contain 2xl:max-h-[50vh]"
            priority
          />
        </div>
      </section>

      <section className="container my-8 flex flex-col gap-5">
        <h2 className="max-w-sm text-balance text-2xl font-medium tracking-tighter md:text-4xl">
          Trust by Thousands of Events
        </h2>

        <div className="flex flex-col gap-3 md:flex-row">
          <SearchEvent />
          <CategoryFilter />
        </div>

        <EventsList />
      </section>
    </>
  );
}
