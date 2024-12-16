import { unstable_noStore as noStore } from "next/cache";
import { JobFilterParams } from "./shared.types";

export const fetchLocation = async () => {
  const response = await fetch("http://ip-api.com/json/?fields=country");
  const location = await response.json();
  return location.country;
};

export const fetchCountries = async () => {
  noStore();
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const result = await response.json();
    const countries = result.map((country: any) => country.name.common);
    return countries;
  } catch (error) {
    console.log(error);
  }
};

export const fetchJobs = async (filters: JobFilterParams) => {
  noStore();
  const { query, page } = filters;

  const headers = {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY ?? "",
    "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
  };

  const response = await fetch(
    `https://jsearch.p.rapidapi.com/search?query=${query}&page=${page}`,
    {
      headers,
    }
  );

  const result = await response.json();

  return result.data;
};