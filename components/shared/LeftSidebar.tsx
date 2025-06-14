"use client";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SignedOut, useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

const LeftSidebar = () => {
  const pathname = usePathname();
  const { userId } = useAuth();

  const handleClick = () => {
    return toast("Please log in", {
      description: "You must be logged in to perform this action",
    });
  };

  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 z-20 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-28 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;

          // TODO -> profile/:id
          if (item.route === "/profile" || item.route === "/collection") {
            if (userId) {
              if (item.route === "/profile") {
                item.route = `${item.route}/${userId}`;
              }
            } else {
              return (
                <Button
                  onClick={handleClick}
                  key={item.route}
                  className={cn(
                    isActive
                      ? "primary-gradient rounded-lg text-light-900"
                      : "text-dark300_light900",
                    "flex items-center justify-start gap-4 bg-transparent p-4"
                  )}
                >
                  <Image
                    src={item.imgURL}
                    alt={item.label}
                    width={20}
                    height={20}
                    className={cn(isActive ? "" : "invert-colors")}
                  />
                  <p
                    className={cn(
                      isActive ? "base-bold" : "base-medium",
                      "max-lg:hidden"
                    )}
                  >
                    {item.label}
                  </p>
                </Button>
              );
            }
          }

          return (
            <Link
              key={item.route}
              href={item.route}
              className={cn(
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark300_light900",
                "flex items-center justify-start gap-4 bg-transparent p-4"
              )}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={cn(isActive ? "" : "invert-colors")}
              />
              <p
                className={cn(
                  isActive ? "base-bold" : "base-medium",
                  "max-lg:hidden"
                )}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href="/sign-in">
            <Button
              className="small-medium btn-secondary 
                        min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
            >
              <Image
                src="/assets/icons/account.svg"
                alt="login"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden">
                Log In
              </span>
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button
              className="small-medium light-border-2 btn-tertiary 
                        text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
            >
              <Image
                src="/assets/icons/sign-up.svg"
                alt="sign up"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="max-lg:hidden">Sign up</span>{" "}
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};

export default LeftSidebar;
