import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { useError } from "@/hooks/use-error";
import { PropsWithChildren, ReactNode } from "react";

export default function Authenticated({
    children,
    breadcrumbs,
}: PropsWithChildren<{
    header?: ReactNode;
    breadcrumbs?: { label: string; url?: string }[];
}>) {
    // const currentPage = breadcrumbs?.[breadcrumbs.length - 1];
    // const
    useError();

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href={route("dashboard")}>
                                        Dashboard
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {breadcrumbs?.map((breadcrumb, index) => (
                                    <>
                                        <BreadcrumbSeparator className="hidden md:block" />
                                        {index === breadcrumbs.length - 1 ? (
                                            <BreadcrumbPage>
                                                {breadcrumb.label}
                                            </BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink
                                                href={breadcrumb.url}
                                            >
                                                {breadcrumb.label}
                                            </BreadcrumbLink>
                                        )}
                                    </>
                                ))}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="px-4">
                        <ModeToggle />
                    </div>
                </header>
                <main className="p-4 pt-0">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    );
}
