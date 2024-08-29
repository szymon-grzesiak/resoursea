"use client";

import React from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

const handleClick = () => {
  return toast("Please log in", {
    description: "You must be logged in to perform this action",
  });
};

const BlockAccess = () => {
  return (
    <Button
      onClick={handleClick}
      className="primary-gradient min-h-[46px] px-4 py-3 text-light-900"
    >
      Ask a Question
    </Button>
  );
};

export default BlockAccess;
