"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { SearchParams } from "./shared.types";
import Answer from "@/database/answer.model";
import User from "@/database/user.model";
import Tag from "@/database/tag.model";

const SearchableTypes = ["question", "answer", "user", "tag"];

export async function globalSearch(params: SearchParams) {
  try {
    await connectToDatabase();

    const { query, type } = params;
    const regexQuery = { $regex: query, $options: "i" };

    let result = [];

    const modelsAndTypes = [
      { model: Question, searchField: "title", type: "question" },
      { model: Answer, searchField: "content", type: "answer" },
      { model: User, searchField: "name", type: "user" },
      { model: Tag, searchField: "name", type: "tag" },
    ];

    const typeLower = type?.toLowerCase();

    if (!typeLower || !SearchableTypes.includes(typeLower)) {
      // SEARCH ACROSS EVERYTHING

      for(const {model, searchField, type} of modelsAndTypes) {
        const queryResults = await model.find({ [searchField]: regexQuery }).limit(2);

        result.push(...queryResults.map((item) => ({
          title: type === 'answer' ? `Answers containing ${query}` : item[searchField],
          type,
          id: type === 'user' ? item.clerkid : type === 'answer' ? item.question : item._id
        })))
        }
    } else {
      // SEARCH IN THE SPECIFIED MODEL TYPE
      const modelInfo = modelsAndTypes.find((item) => item.type === typeLower);

        if(!modelInfo) {
            throw new Error("Invalid search type");
        }

        const queryResults = await modelInfo.model.find({ [modelInfo.searchField]: regexQuery }).limit(8);

        result = queryResults.map((item) => ({
            title: type === 'answer' ? `Answers containing ${query}` : item[modelInfo.searchField],
            type,
            id: type === 'user' ? item.clerkid : type === 'answer' ? item.question : item._id
        }))
    }

    return JSON.stringify(result);
  } catch (error) {
    console.error("Error fetching global result ", error);
    throw error;
  }
}
