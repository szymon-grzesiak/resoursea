"use client";
import React, { ComponentPropsWithoutRef, useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Input } from "../ui/input";
import { cn, formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

interface Props extends ComponentPropsWithoutRef<"div"> {
  route: string;
  iconPosition: string;
  imgSrc: StaticImageData | string;
  placeholder: string;
}

const LocalSearchBar = ({
  route,
  iconPosition,
  imgSrc = "/assets/icons/search.svg",
  placeholder,
  className,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");
  console.log(query);

  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if(pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ['q']
          })
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search, route, pathname, router, searchParams, query]);

  return (
    <div
      className={cn(
        "background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4",
        className
      )}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none"
      />

      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearchBar;
function removeKeysFromQuertu(arg0: { params: string; keys: string[]; }) {
  throw new Error("Function not implemented.");
}

