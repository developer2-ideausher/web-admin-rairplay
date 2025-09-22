"use client";
import {
  BellRing,
  House,
  Languages,
  ListMusic,
  ListVideo,
  LogOut,
  Megaphone,
  Users,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const navItems = [
  { label: "Home", icon: House, path: "/dashBoard" },
  { label: "Create Channel", icon: ListVideo, path: "/channel" },
  { label: "Language & Genre", icon: Languages, path: "/language&Genre" },

  { label: "Manage Songs", icon: ListMusic, path: "/manageSongs" },
  { label: "Manage Users", icon: Users, path: "/manageUsers" },
  { label: "Notifications", icon: BellRing, path: "/notifications" },
  { label: "Advertisements", icon: Megaphone, path: "/advertisements" },
  { label: "Logout", icon: LogOut, path: "/logout" },
];

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-col bg-primary pt-10 px-4 h-full shadow-lg gap-8">
      {/* Logo */}
      <div className="flex flex-row gap-1.5 w-full ml-1.5">
        <img src="/logo192.png" alt="logo" className="w-10 h-10" />
        <button
          onClick={() => router.push("/dashBoard")}
          className="text-txtgray inter text-2xl font-bold hover:text-white cursor-pointer transform transition-all duration-300 ease-in-out 
                    hover:scale-105 hover:shadow-2xl hover:bg-primary/90 "
        >
          Rairplay
        </button>
      </div>

      {/* Nav Items */}
      <div className="flex flex-col gap-5 items-start pl-4">
        {navItems.map(({ label, icon: Icon, path }) => {
          const isActive =
            pathname === path ||
            (label === "Home" && pathname === "/dashBoard");

          return (
            <div
              key={label}
              onClick={() => path && router.push(path)}
              className="flex flex-row gap-3 items-center group cursor-pointer transform transition-all duration-300 ease-in-out 
                    hover:scale-105 hover:shadow-2xl hover:bg-primary/90 "
            >
              <Icon
                className={`${
                  isActive
                    ? "text-white"
                    : "text-txtgray group-hover:text-white"
                }`}
                size={20}
              />
              <p
                className={`text-base font-semibold ${
                  isActive
                    ? "text-white"
                    : "text-txtgray group-hover:text-white"
                }`}
              >
                {label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
