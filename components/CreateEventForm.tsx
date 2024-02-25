"use client";

import { SubmitHandler, useForm } from "react-hook-form";

import DatePicker from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { UploadDropzone } from "@/lib/uploadthing";
import { UploadIcon } from "lucide-react";
import { useRef } from "react";
import UploadEventImage from "@/components/UploadEventImage";

interface FormFields {
  title: string;
  description: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  maxPlaces: number;
  price: number | null;
  isFree: boolean;
  imageURL: string;
}

export default function CreateEventForm() {
  const form = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {};

  const isFree = form.watch("isFree");
  const startDate = form.watch("startDate");
  const endDate = form.watch("endDate");

  return (
    <Form {...form}>
      <form className="space-y-7" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          rules={{
            required: {
              value: true,
              message: "Required",
            },
          }}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Programming conference" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          rules={{
            required: {
              value: true,
              message: "Required",
            },
          }}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="On 21st of july you are going to be able to experience the best..."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-5 md:flex-row md:justify-between">
          <FormField
            rules={{
              required: {
                value: true,
                message: "Required",
              },
            }}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start date</FormLabel>
                <FormControl>
                  <DatePicker
                    startDate={startDate}
                    endDate={endDate}
                    type="startDate"
                    date={field.value}
                    onSelect={(date) => form.setValue("startDate", date)}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            rules={{
              required: {
                value: true,
                message: "Required",
              },
            }}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End date</FormLabel>
                <FormControl>
                  <DatePicker
                    startDate={startDate}
                    endDate={endDate}
                    type="endDate"
                    date={field.value}
                    onSelect={(date) => form.setValue("endDate", date)}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-between gap-5">
          <FormField
            rules={{
              required: {
                value: true,
                message: "Required",
              },
              min: {
                value: 1,
                message: "Value has to be more or equals 1",
              },
            }}
            name="maxPlaces"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max places</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="250" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            rules={{
              required: {
                value: isFree ? false : true,
                message: "Required",
              },
              min: {
                value: 1,
                message: "Value has to be more or equals 1",
              },
            }}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    disabled={isFree}
                    {...field}
                    type="number"
                    placeholder="$199.99"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          rules={{}}
          name="isFree"
          render={({ field }) => (
            <FormItem className="flex flex-row gap-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Event is free</FormLabel>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          rules={{
            required: {
              value: true,
              message: "Event image is required",
            },
          }}
          name="imageURL"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Main image</FormLabel>
              <FormControl>
                <UploadEventImage
                  imageURL={field.value}
                  onChange={(url) => form.setValue("imageURL", url)}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}
