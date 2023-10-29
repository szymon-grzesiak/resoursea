"use client";
import React, { ComponentPropsWithoutRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

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
  const [input, setInput] = useState("");
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
        value={input}
        onChange={(e) => setInput(e.target.value)}
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
