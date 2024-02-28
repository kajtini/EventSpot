import { UploadDropzone } from "@/lib/uploadthing";
import { XIcon } from "lucide-react";
import Image from "next/image";

interface UploadEventImageProps {
  imageURL?: string;
  onChange: (url: string) => void;
}

export default function UploadEventImage({
  imageURL,
  onChange,
}: UploadEventImageProps) {
  function removeImage() {
    return onChange("");
  }

  if (imageURL) {
    return (
      <div className="relative h-[30vh] w-full">
        <Image
          className="rounded-lg object-cover "
          alt="event image"
          src={imageURL}
          fill
        />

        <div
          className="absolute right-4 top-4 cursor-pointer rounded-full bg-background/80 p-1 backdrop-blur-3xl transition hover:bg-accent"
          onClick={removeImage}
        >
          <XIcon />
        </div>
      </div>
    );
  }

  return (
    <UploadDropzone
      className="border-border ut-button:bg-secondary ut-label:text-primary ut-upload-icon:text-muted-foreground"
      endpoint="eventImage"
      onClientUploadComplete={(res) => {
        console.log("Files: ", res[0].url);
        onChange(res[0].url);
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}
