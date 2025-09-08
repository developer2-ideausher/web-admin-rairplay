"use client";
import {
  House,
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
  { label: "Manage Songs", icon: ListMusic, path: "/manageSongs" },
  { label: "Manage Users", icon: Users, path: "/manageUsers" },
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
        <p className="text-txtgray inter text-2xl font-bold hover:text-white">
          Rairplay
        </p>
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
              className="flex flex-row gap-3 items-center group cursor-pointer"
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
