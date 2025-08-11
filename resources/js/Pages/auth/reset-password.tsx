import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import GuestLayout from "@/layouts/guest";
import { zodResolver } from "@hookform/resolvers/zod";
import { Head, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
    .object({
        token: z.string(),
        email: z.string().email(),
        password: z.string().min(8).max(30),
        password_confirmation: z.string(),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Password confirmation invalid",
        path: ["password_confirmation"],
    });

export default function ResetPassword({
    token,
    email,
    status,
}: {
    token: string;
    email: string;
    status?: string;
}) {
    const [submitting, setSubmitting] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            token: token,
            email: email,
            password: "",
            password_confirmation: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        router.post(route("password.store"), values, {
            onStart: () => {
                setSubmitting(true);
            },
            onFinish: () => {
                setSubmitting(false);
                form.reset({
                    password: "",
                    password_confirmation: "",
                });
            },
            // onError: (error) => {
            //     const formKeysZodType = formSchema.keyof();
            //     const keys = Object.keys(error) as z.infer<
            //         typeof formKeysZodType
            //     >[];
            //     keys.filter((key) =>
            //         Object.keys(form.getValues()).includes(key),
            //     ).forEach((key) => {
            //         form.setError(key, { type: "custom", message: error[key] });
            //     });
            // }
        });
    }

    useEffect(() => {
        if (status) toast.success(status);
    }, [status]);

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <div className="flex flex-col gap-6">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">
                            Reset Password
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
                                            // disabled
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
                                                    <FormLabel>
                                                        Passsword
                                                    </FormLabel>
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
                                            name="password_confirmation"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Passsword Confirmation
                                                    </FormLabel>
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
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            disabled={submitting}
                                        >
                                            Reset Password
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}
