"use server";

import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetTopInteractedTagsParams } from "./shared.types";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const tags = await Question.find({ author: userId })
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .distinct("tags");

    const newTags: any = [];

    for (const tagId of tags) {
      const tag = await Tag.findById(tagId).populate({
        path: "questions",
        model: Question,
      });
      newTags.push(tag);
    }

    // Teraz newTags powinno zawierać tablicę tagów z pełnymi informacjami
    return newTags.slice(0, 3);
  } catch (error) {
    console.log(error);
    throw error;
  }
}