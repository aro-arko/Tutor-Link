/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import * as React from "react";
import { Home, LayoutDashboard, Settings, LucideIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { useUser } from "@/context/UserContext";
import tutorInfo from "@/services/TutorService";

import { NavUser } from "./nav-user";

const getSidebarItems = (role: "student" | "tutor" | "admin" | "guest") => {
  const commonItems = [
    { title: "Home", url: "/", icon: Home },
    { title: "Dashboard", url: `/${role}/dashboard`, icon: LayoutDashboard },
    { title: "Settings", url: `/${role}/settings`, icon: Settings },
  ];

  const roleBasedItems: {
    [key in "student" | "tutor" | "admin" | "guest"]?: {
      title: string;
      url: string;
      icon: LucideIcon;
    }[];
  } = {
    student: [
      { title: "My Bookings", url: "/student/bookings", icon: LayoutDashboard },
      { title: "Tutors", url: "/student/tutors", icon: LayoutDashboard },
    ],
    tutor: [
      { title: "My Students", url: "/tutor/students", icon: LayoutDashboard },
      { title: "Schedule", url: "/tutor/schedule", icon: LayoutDashboard },
    ],
    admin: [
      { title: "Manage Users", url: "/admin/users", icon: LayoutDashboard },
      {
        title: "Platform Settings",
        url: "/admin/settings",
        icon: LayoutDashboard,
      },
    ],
    guest: [],
  };

  return [...commonItems, ...(roleBasedItems[role] || [])];
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  const role = user?.role as "student" | "tutor" | "admin";
  const [tutorDetails, setTutorDetails] = React.useState<any>(null);

  // Fetch tutor details if the role is "tutor"
  React.useEffect(() => {
    if (role === "tutor") {
      tutorInfo()
        .then((data) => setTutorDetails(data.data))
        .catch((error) => console.error("Failed to fetch tutor info:", error));
    }
  }, [role]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={getSidebarItems(role)} />
      </SidebarContent>

      {/* Footer: User Info & Logout */}
      <SidebarFooter>
        {role == "tutor" ? (
          <NavUser userDetails={tutorDetails} />
        ) : (
          // @ts-ignore
          <NavUser userDetails={user} />
        )}
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
