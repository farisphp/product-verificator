import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Guest from "@/layouts/guest";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    remember: z.boolean().default(false).optional(),
});

export default function Login({
    canResetPassword,
}: {
    canResetPassword: boolean;
}) {
    const [submitting, setSubmitting] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        router.post(route("login"), values, {
            onStart: () => setSubmitting(true),
            onFinish: () => setSubmitting(false),
            onError: (error) => {
                const formKeysZodType = formSchema.keyof();
                const keys = Object.keys(error) as z.infer<
                    typeof formKeysZodType
                >[];
                keys.filter((key) =>
                    Object.keys(form.getValues()).includes(key),
                ).forEach((key) => {
                    form.setError(key, { type: "custom", message: error[key] });
                });
            },
        });
    }

    return (
        <Guest>
            <Head title="Login" />
            <div className={cn("flex flex-col gap-6")}>
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">
                            Login to your accout
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="grid gap-6">
                                    <div className="grid gap-6">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="email"
                                                            placeholder="admin@example.com"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex items-center">
                                                        <FormLabel>
                                                            Passsword
                                                        </FormLabel>
                                                        {canResetPassword && (
                                                            <a
                                                                href={route(
                                                                    "password.request",
                                                                )}
                                                                className="ml-auto text-sm underline-offset-4 hover:underline"
                                                            >
                                                                Forgot your
                                                                password?
                                                            </a>
                                                        )}
                                                    </div>

                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="remember"
                                            render={({ field }) => (
                                                <FormItem className="flex items-center">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={
                                                                field.value
                                                            }
                                                            onCheckedChange={
                                                                field.onChange
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormLabel>
                                                        Remember me
                                                    </FormLabel>
                                                </FormItem>
                                            )}
                                        />
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            disabled={submitting}
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </Guest>
    );
}
