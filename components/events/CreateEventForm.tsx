"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
import UploadEventImage from "@/components/events/UploadEventImage";
import SelectCategory from "@/components/events/SelectCategory";
import { createEvent, updateEvent } from "@/lib/actions";

interface CreateEventFormProps {
  mode: "create" | "edit";
  formValues?: FormFields;
  event_id?: number;
}

interface FormFields {
  title: string;
  description: string;
  start_date: Date;
  end_date: Date;
  max_places: number;
  price: number;
  is_free: boolean;
  image_url: string;
  location: string;
  category: string;
}

export default function CreateEventForm({
  mode,
  formValues,
  event_id,
}: CreateEventFormProps) {
  const defaultValues =
    mode === "edit" && formValues
      ? { ...formValues }
      : {
          title: "",
          description: "",
          start_date: undefined,
          end_date: undefined,
          max_places: 0,
          price: 0,
          is_free: false,
          image_url: "",
          location: "",
          category: "",
        };

  const router = useRouter();
  const form = useForm<FormFields>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      if (mode === "create") {
        const eventId = await createEvent({ ...data });

        if (eventId) {
          form.reset();
          toast.success("Event has been created");

          router.push(`/events/${eventId}`);
        }
      }

      if (mode === "edit" && event_id) {
        const eventId = await updateEvent(event_id, data);

        if (eventId) {
          form.reset();
          toast.success("Event has been updated");
          router.push(`/events/${eventId}`);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const isFree = form.watch("is_free");
  const startDate = form.watch("start_date");
  const endDate = form.watch("end_date");

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

        <div className="flex items-center justify-between gap-5">
          <FormField
            rules={{
              required: {
                value: true,
                message: "Required",
              },
            }}
            name="location"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="1st Avenue, 3rd district" {...field} />
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
            name="category"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <SelectCategory
                    onChange={(value) => field.onChange(value)}
                    value={field.value}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row md:justify-between">
          <FormField
            rules={{
              required: {
                value: true,
                message: "Required",
              },
            }}
            name="start_date"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Start date</FormLabel>
                <FormControl>
                  <DatePicker
                    startDate={startDate}
                    endDate={endDate}
                    type="startDate"
                    date={field.value}
                    onSelect={(date) => form.setValue("start_date", date)}
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
            name="end_date"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>End date</FormLabel>
                <FormControl>
                  <DatePicker
                    startDate={startDate}
                    endDate={endDate}
                    type="endDate"
                    date={field.value}
                    onSelect={(date) => form.setValue("end_date", date)}
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
            name="max_places"
            render={({ field }) => (
              <FormItem className="flex-1">
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
                value: 0,
                message: "Value has to be more or equals 1",
              },
            }}
            name="price"
            render={({ field }) => (
              <FormItem className="flex-1">
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
          name="is_free"
          render={({ field }) => (
            <FormItem className="flex flex-row gap-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(event) => {
                    field.onChange(event);
                    form.resetField("price");
                  }}
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
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Main image</FormLabel>
              <FormControl>
                <UploadEventImage
                  imageURL={field.value}
                  onChange={(url) => form.setValue("image_url", url)}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center">
          {mode === "edit" && (
            <Button
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                router.push(`/events/${event_id}`);
              }}
            >
              Cancel
            </Button>
          )}
          <Button className="ml-auto" type="submit">
            {mode === "create" ? "Create" : "Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
