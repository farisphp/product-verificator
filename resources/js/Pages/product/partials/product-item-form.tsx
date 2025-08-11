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
import { Category, Merchant, PageProps, Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, usePage } from "@inertiajs/react";
import { debounce } from "lodash";
import { PlusIcon } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(2).max(50),
    brand: z.string().min(2).max(50),
    category: z.string().min(1).max(50),
    material: z.string().nullable(),
    description: z.string().nullable(),
    colors: z
        .array(z.object({ label: z.string().min(1, "Color cannot be empty") }))
        .nullable(),
    sizes: z
        .array(z.object({ label: z.string().min(1, "Size cannot be empty") }))
        .nullable(),
});

export function ProductItemForm({
    onSuccess,
    product,
}: {
    onSuccess: () => void;
    product?: Product;
}) {
    const { categories, merchants, auth } = usePage<
        PageProps<{
            categories: { data: Category[] };
            merchants: { data: Merchant[] };
        }>
    >().props;
    let params = new URLSearchParams(window.location.search);

    let schema = auth.user.is_admin ? adminSchema : formSchema;
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: product
            ? {
                  ...product,
                  category: product.category.id.toString(),
                  // @ts-ignore
                  merchantId: product.merchant_id.toString(),
              }
            : {
                  name: "",
                  brand: "",
                  colors: [],
                  sizes: [],
              },
    });

    const category = form.watch("category");

    const {
        fields: colorFields,
        append: appendColor,
        remove: removeColor,
    } = useFieldArray({
        control: form.control,
        name: "colors",
    });

    const {
        fields: sizeFields,
        append: appendSize,
        remove: removeSize,
    } = useFieldArray({
        control: form.control,
        name: "sizes",
    });

    function onSubmit(values: z.infer<typeof schema>) {
        const method = product ? "put" : "post";
        const routeName = product ? "products.update" : "products.store";
        const routeParams = product ? { product: product.id } : {};

        router[method](
            route(routeName, routeParams),
            // @ts-ignore
            { ...values, merchant_id: values?.merchantId },
            {
                onSuccess: () => {
                    onSuccess?.();
                },
            },
        );
    }

    function searchCategory(value: string) {
        const routeName = product ? "products.show" : "products";
        const routeParams = product ? { product: product.id } : {};
        router.get(
            route(routeName, routeParams),
            {
                search: params.get("search"),
                searchCategory: value,
            },
            { only: ["categories"], preserveState: true },
        );
    }

    function searchMerchant(value: string) {
        const routeName = product ? "products" : "products.show";
        const routeParams = product ? { product: product.id } : {};
        router.get(
            route(routeName, routeParams),
            {
                search: params.get("search"),
                searchCategory: params.get("searchCategory"),
                searchMerchant: value,
            },
            { only: ["merchants"], preserveState: true },
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {auth.user.is_admin ? (
                    <FormField
                        control={form.control}
                        // @ts-ignore
                        name="merchantId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Merchant</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={
                                        field.value as string | undefined
                                    }
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select merchant" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <Input
                                            placeholder="Search merchant"
                                            className="mb-2 mt-0.5"
                                            defaultValue={
                                                params.get("searchMerchant") ||
                                                ""
                                            }
                                            onChange={debounce(
                                                (input) =>
                                                    searchMerchant(
                                                        input.target.value,
                                                    ),
                                                150,
                                            )}
                                        />
                                        {merchants.data.map((merchant) => (
                                            <SelectItem
                                                value={merchant.id.toString()}
                                                key={`cat-${merchant.id}`}
                                            >
                                                {merchant.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ) : null}

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Product name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Brand</FormLabel>
                            <FormControl>
                                <Input placeholder="Brand name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <Input
                                        placeholder="Search or create category"
                                        className="mb-2 mt-0.5"
                                        defaultValue={
                                            params.get("searchCategory") || ""
                                        }
                                        onChange={debounce(
                                            (input) =>
                                                searchCategory(
                                                    input.target.value,
                                                ),
                                            150,
                                        )}
                                    />
                                    {categories.data.length === 0 &&
                                    params.get("searchCategory") ? (
                                        <SelectItem
                                            value={
                                                params.get("searchCategory")!
                                            }
                                            key={`cat-${params.get("searchCategory")}`}
                                        >
                                            {params.get("searchCategory")}
                                        </SelectItem>
                                    ) : null}
                                    {categories.data.map((cat) => (
                                        <SelectItem
                                            value={cat.id.toString()}
                                            key={`cat-${cat.id}`}
                                        >
                                            {cat.name}
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
                    name="material"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Material</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Product's material"
                                    value={field.value || ""}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder="Product's description"
                                    value={field.value || ""}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Dynamic Colors Field */}
                <div className="space-y-2">
                    <FormLabel>Available Colors</FormLabel>
                    {colorFields.map((field, index) => (
                        <div key={field.id} className="flex space-x-2">
                            <FormField
                                control={form.control}
                                name={`colors.${index}`}
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <Input
                                                placeholder="Enter color"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="button"
                                variant="outline"
                                className="border-destructive text-destructive"
                                onClick={() => removeColor(index)}
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => appendColor("")}
                    >
                        <PlusIcon /> Add Color
                    </Button>
                </div>

                {/* Dynamic Sizes Field */}
                <div className="space-y-2">
                    <FormLabel>Available Sizes</FormLabel>
                    {sizeFields.map((field, index) => (
                        <div key={field.id} className="flex space-x-2">
                            <FormField
                                control={form.control}
                                name={`sizes.${index}`}
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <Input
                                                placeholder="Enter size"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="button"
                                variant="outline"
                                className="border-destructive text-destructive"
                                onClick={() => removeSize(index)}
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => appendSize("")}
                    >
                        <PlusIcon /> Add Size
                    </Button>
                </div>

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
