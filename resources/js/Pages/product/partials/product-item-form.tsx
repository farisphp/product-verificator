import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Category, Merchant, PageProps, Product, ProductItem } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, usePage } from "@inertiajs/react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { debounce } from "lodash";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const formSchema = z.object({
    serial_number: z
        .string()
        .min(2, "Serial number must be at least 2 characters"),
    manufacture_date: z.date({
        required_error: "A manufacture date is required.",
    }),
    sku: z.string().min(1, "SKU cannot be empty"),
    color: z.string().min(1, "Please select the color").optional(),
    size: z.string().min(1, "Please select the size").optional(),
});

export function ProductItemForm({
    onSuccess,
    item,
}: {
    onSuccess: () => void;
    item?: ProductItem;
}) {
    const {
        product: { data: product },
    } = usePage<
        PageProps<{
            product: { data: Product };
        }>
    >().props;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: undefined,
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const method = "post";
        const routeName = "products.items.store";
        const routeParams = { product: product.id };

        router[method](route(routeName, routeParams), values, {
            onSuccess: () => {
                onSuccess();
            },
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="serial_number"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Serial Number</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter serial number"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>SKU </FormLabel>
                            <FormControl>
                                <Input placeholder="Enter SKU" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="manufacture_date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Manufacture Date</FormLabel>
                            {/*<FormControl>
                                <Input
                                    {...field}
                                    type="date"
                                    placeholder="Enter SKU"
                                    value={field.value?.toString() || ""}
                                />
                            </FormControl>*/}
                            <Popover modal>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "pl-3 text-left font-normal",
                                                !field.value &&
                                                    "text-muted-foreground",
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                    // portal={false}
                                >
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() ||
                                            date < new Date("1900-01-01")
                                        }
                                        captionLayout="dropdown"
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Color</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select color" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {product?.colors?.map((color) => (
                                        <SelectItem
                                            value={color.value.toString()}
                                            key={`color-${color.value}`}
                                        >
                                            {color.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Size</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select size" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {product?.sizes?.map((size) => (
                                        <SelectItem
                                            value={size.value.toString()}
                                            key={`size-${size.value}`}
                                        >
                                            {size.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <DialogFooter>
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                    >
                        Submit
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
