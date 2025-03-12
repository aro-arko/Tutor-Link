"use client";

import * as React from "react";
import {
  Home,
  LayoutDashboard,
  Settings,
  LogOut,
  LucideIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { FaUserCircle } from "react-icons/fa";
import { useUser } from "@/context/UserContext";
import tutorInfo from "@/services/TutorService";
import { logout } from "@/services/AuthService";
import { protectedRoutes } from "@/constants";
import { usePathname, useRouter } from "next/navigation";

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
  const { user, setIsLoading } = useUser();
  const role = user?.role as "student" | "tutor" | "admin";
  const [tutorDetails, setTutorDetails] = React.useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Fetch tutor details if the role is "tutor"
  React.useEffect(() => {
    if (role === "tutor") {
      tutorInfo()
        .then((data) => setTutorDetails(data.data))
        .catch((error) => console.error("Failed to fetch tutor info:", error));
    }
  }, [role]);

  // Logout Function
  const handleLogout = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={getSidebarItems(role)} />
      </SidebarContent>

      {/* Footer: User Info & Logout */}
      <SidebarFooter>
        <div className="flex items-center justify-between p-4 border-t border-gray-200">
          {/* User Avatar & Name */}
          <div className="flex items-center gap-3">
            <FaUserCircle className="w-8 h-8 text-gray-500" />
            <div>
              <p className="text-sm font-medium">{tutorDetails?.name}</p>
              <p className="text-xs text-gray-500">
                {tutorDetails?.email || user?.email}
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            className="text-red-600 hover:text-red-800 transition"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
