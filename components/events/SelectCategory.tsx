"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PlusIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Category } from "@/types";
import { createCategory, getAllCategories } from "@/lib/actions";

interface SelectCategoryProps {
  onChange: (value: string) => void;
  value: string;
}

export default function SelectCategory({
  onChange,
  value,
}: SelectCategoryProps) {
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  async function handleCreateCategoryClick() {
    try {
      const newCategory = await createCategory({ name: newCategoryName });

      if (newCategory) {
        setCategories((prevCategories) => [...prevCategories, newCategory]);
        setNewCategoryName("");
        setIsCreateCategoryOpen(false);
        toast.success(`Succesfully created category: ${newCategoryName}`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    async function getCategories() {
      try {
        const categories = await getAllCategories();
        setCategories([...categories]);
      } catch (err) {
        console.error(err);
      }
    }

    getCategories();
  }, []);

  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger>
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem key={category.category_id} value={category.name}>
              {category.name}
            </SelectItem>
          ))}
        <Dialog
          open={isCreateCategoryOpen}
          onOpenChange={setIsCreateCategoryOpen}
        >
          <DialogTrigger className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground">
            <PlusIcon className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center" />
            Create category
          </DialogTrigger>
          <DialogContent className="flex flex-col">
            <DialogHeader>
              <DialogTitle>Create a new category</DialogTitle>
              <DialogDescription>
                Describe your event as best as you can
              </DialogDescription>
            </DialogHeader>

            <Input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Funtivities..."
              maxLength={100}
            />

            <Button className="self-end" onClick={handleCreateCategoryClick}>
              Create
            </Button>
          </DialogContent>
        </Dialog>
      </SelectContent>
    </Select>
  );
}
