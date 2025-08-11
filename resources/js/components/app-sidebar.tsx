import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import { usePage } from "@inertiajs/react";
import {
    AudioWaveform,
    Building,
    Command,
    GalleryVerticalEnd,
    LayoutDashboard,
    Package,
    Settings2,
    Users2,
} from "lucide-react";
import * as React from "react";

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Goods",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        { title: "Dashboard", url: "dashboard", icon: LayoutDashboard },
        {
            title: "Merchants",
            url: "merchants",
            icon: Building,
        },
        {
            title: "Products",
            url: "products",
            icon: Package,
        },

        {
            title: "Settings",
            url: "settings",
            icon: Settings2,
        },
    ],
};

const navAdmin = [
    {
        title: "Dashboard",
        url: "dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Merchants",
        url: "merchants",
        icon: Building,
    },
    {
        title: "Products",
        url: "products",
        icon: Package,
    },
    {
        title: "Users",
        url: "users",
        icon: Users2,
    },
    {
        title: "Settings",
        url: "settings",
        icon: Settings2,
    },
];

const adminTeam = {
    name: "Product Verificator",
    logo: GalleryVerticalEnd,
    plan: "Super Admin",
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const user = usePage().props.auth.user;

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher
                    teams={user.is_admin ? [adminTeam] : data.teams}
                    viewOnly={user.is_admin}
                />
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={user.is_admin ? navAdmin : data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser
                    user={{
                        name: user.name,
                        email: user.email,
                        avatar: `https://ui-avatars.com/api/?name=${user.name}`,
                    }}
                />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
