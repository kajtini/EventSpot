import { clerkClient } from "@clerk/nextjs";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface EventHostInfoProps {
  author_id: string;
}

export default async function EventHostInfo({ author_id }: EventHostInfoProps) {
  const { firstName, lastName, imageUrl } =
    await clerkClient.users.getUser(author_id);

  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8">
        <AvatarImage alt="Event host image" src={imageUrl} />
        <AvatarFallback>KK</AvatarFallback>
      </Avatar>

      <span>Hosted by, {firstName}</span>
    </div>
  );
}
