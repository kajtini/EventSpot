"use client";

import { EditIcon, TrashIcon } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import DeleteEventDialog from "@/components/DeleteEventDialog";

interface EventOperationsProps {
  event_id: number;
  type: "card" | "page";
}

export default function EventOperations({
  event_id,
  type,
}: EventOperationsProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <div
        className={`flex
      ${type === "card" && "absolute right-4 top-4 z-10 flex-col rounded-lg bg-background/80 backdrop-blur-3xl"} 
      ${type === "page" && "flex-row items-center gap-2"}
      `}
      >
        <Button
          size={type === "card" ? "icon" : "default"}
          variant={type === "card" ? "ghost" : "outline"}
          className={`${type === "page" && "flex items-center gap-2"}`}
        >
          <EditIcon size={18} />
          <span className={`${type === "card" && "hidden"}`}>Edit</span>
        </Button>
        <Button
          size={type === "card" ? "icon" : "default"}
          className={`${type === "page" && " flex items-center gap-2"} text-red-500`}
          variant={type === "card" ? "ghost" : "outline"}
          onClick={() => setIsDeleteOpen(true)}
        >
          <TrashIcon size={18} />
          <span className={`${type === "card" && "hidden"}`}>Delete</span>
        </Button>
      </div>

      <DeleteEventDialog
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
        event_id={event_id}
      />
    </>
  );
}
