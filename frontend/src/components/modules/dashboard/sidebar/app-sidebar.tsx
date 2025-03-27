/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import * as React from "react";
import {
  Home,
  LayoutDashboard,
  User,
  Users,
  CalendarCheck,
  Settings,
  GraduationCap,
  UserCheck,
  LucideIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { useUser } from "@/context/UserContext";
import { NavUser } from "./nav-user";
import { tutorInfo } from "@/services/TutorService";

const getSidebarItems = (role: "student" | "tutor" | "admin" | "guest") => {
  const commonItems = [
    { title: "Home", url: "/", icon: Home },
    { title: "Dashboard", url: `/${role}/dashboard`, icon: LayoutDashboard },
  ];

  const roleBasedItems: {
    [key in "student" | "tutor" | "admin" | "guest"]?: {
      title: string;
      url: string;
      icon: LucideIcon;
    }[];
  } = {
    student: [
      { title: "Profile", url: "/student/profile", icon: User },
      { title: "My Tutors", url: "/student/tutors", icon: GraduationCap },
      { title: "My Bookings", url: "/student/bookings", icon: CalendarCheck },
    ],
    tutor: [
      { title: "Profile", url: "/tutor/profile", icon: User },
      { title: "Students", url: "/tutor/students", icon: Users },
      { title: "Bookings", url: "/tutor/bookings", icon: CalendarCheck },
    ],
    admin: [
      { title: "Manage Users", url: "/admin/users", icon: UserCheck },
      {
        title: "Platform Settings",
        url: "/admin/settings",
        icon: Settings,
      },
    ],
    guest: [],
  };

  return [...commonItems, ...(roleBasedItems[role] || [])];
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, setIsLoading } = useUser();
  const role = user?.role as "student" | "tutor" | "admin" | "guest";
  const [tutorDetails, setTutorDetails] = React.useState<any>(null);
  const [sidebarItems, setSidebarItems] = React.useState(
    getSidebarItems("guest")
  );

  const loadingSet = React.useRef(false);

  React.useEffect(() => {
    if (!user && !loadingSet.current) {
      setIsLoading(true);
      loadingSet.current = true;
    }
  }, [user, setIsLoading]);

  React.useEffect(() => {
    if (role === "tutor") {
      tutorInfo()
        .then((data) => setTutorDetails(data.data))
        .catch((error) => console.error("Failed to fetch tutor info:", error));
    }
  }, [role]);

  React.useEffect(() => {
    setSidebarItems(getSidebarItems(role || "guest"));
  }, [role]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={sidebarItems} />
      </SidebarContent>

      {/* Footer: User Info & Logout */}
      <SidebarFooter>
        {role === "tutor" ? (
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
