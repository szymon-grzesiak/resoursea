import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const timeDifference = now.getTime() - createdAt.getTime(); // Use getTime() to get the timestamps

  // Define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (timeDifference < minute) {
    return `${Math.floor(timeDifference / 1000)} seconds ago`;
  } else if (timeDifference < hour) {
    return `${Math.floor(timeDifference / minute)} minutes ago`;
  } else if (timeDifference < day) {
    return `${Math.floor(timeDifference / hour)} hours ago`;
  } else if (timeDifference < week) {
    if (timeDifference / day < 7) {
      if (timeDifference / day < 2) {
        return `${Math.floor(timeDifference / day)} day ago`;
      } else {
        return `${Math.floor(timeDifference / day)} days ago`;
      }
    } else {
      return `${Math.floor(timeDifference / week)} weeks ago`;
    }
  } else if (timeDifference < month) {
    if (timeDifference / week < 2) {
      return `${Math.floor(timeDifference / week)} week ago`;
    } else {
      return `${Math.floor(timeDifference / week)} weeks ago`;
    }
  } else if (timeDifference < year) {
    if (timeDifference / month < 2) {
      return `${Math.floor(timeDifference / month)} month ago`;
    } else {
      return `${Math.floor(timeDifference / month)} months ago`;
    }
  } else {
    if (timeDifference / year < 2) {
      return `${Math.floor(timeDifference / year)} year ago`;
    } else {
      return `${Math.floor(timeDifference / year)} years ago`;
    }
  }
};

export const formatAndDivideNumbers = (num: number): string => {
  if (num >= 1000000) {
    const formattedNum = (num / 1000000).toFixed(1);
    return `${formattedNum}M`;
  } else if (num >= 1000) {
    const formattedNum = (num / 1000).toFixed(1);
    return `${formattedNum}K`;
  } else {
    return num.toString();
  }
};

export const getJoinedDate = (date: Date): string => {
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const joinedDate = `${month} ${year}`;

  return joinedDate;
};

export const extractAndTrimText = (str: any) => {
  var textOnly = str.replace(/<[^>]*>/g, "");
  textOnly = textOnly.replace(/[^a-zA-Z]/g, "");
  return textOnly.slice(0, 10);
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    {
      skipNull: true,
    },
  );
};
interface RemoveQueryParams {
  params: string;
  keysToRemove: string[];
}

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveQueryParams) => {
  const currentUrl = qs.parse(params);
  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  );
};
