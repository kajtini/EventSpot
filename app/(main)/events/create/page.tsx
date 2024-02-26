import CreateEventForm from "@/components/CreateEventForm";

export default function CreateEventPage() {
  return (
    <div className="container my-8 flex max-w-xl flex-col gap-3 md:gap-5">
      <h2 className="max-w-sm text-balance text-2xl font-medium tracking-tighter md:text-4xl">
        Create your event
      </h2>

      <CreateEventForm />
    </div>
  );
}
