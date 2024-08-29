// @ts-nocheck
"use server";

import Question from "@/database/question.model";
import Tag, { ITag } from "@/database/tag.model";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";
import { FilterQuery } from "mongoose";

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

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    const { searchQuery, filter, page = 1, pageSize = 9 } = params;

    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Question> = {};
    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }

    let sortOptions = {};

    switch (filter) {
      case "popular":
        sortOptions = { questions: 1 };
        break;
      case "recent":
        sortOptions = { createdOn: -1 };
        break;
      case "name":
        sortOptions = { name: 1 };
        break;
      case "old":
        sortOptions = { createdOn: 1 };
        break;
    }

    const totalTags = await Tag.countDocuments(query);

    const tags = await Tag.find(query)
      .collation({ locale: "en", strength: 2 })
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions);

    const isNext = totalTags > skipAmount + tags.length;

    return { tags, isNext };
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase();

    const { tagId, searchQuery, page = 1, pageSize = 2 } = params;

    const skipAmount = (page - 1) * pageSize;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        sort: { createdAt: -1 },
        skip: skipAmount,
        limit: pageSize + 1, // +1 to check if there is next page
      },
      populate: [
        {
          path: "tags",
          model: Tag,
          select: "_id name picture",
        },
        {
          path: "author",
          model: User,
          select: "_id clerkId name",
        },
      ],
    });

    if (!tag) {
      throw new Error("Tag not found");
    }

    const isNext = tag.questions.length > pageSize;

    const questions = tag.questions;

    return { tagTitle: tag.name, questions, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTopPopularTags() {
  try {
    connectToDatabase();

    const popularTags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
      { $sort: { numberOfQuestions: -1 } }, // desc order
      { $limit: 5 },
    ]);
    return popularTags;
  } catch (error) {
    console.log(error);
  }
}

// 2 wersja

// export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
//   try {
//     connectToDatabase();

//     const { tagId, page, pageSize, searchQuery } = params;

//     const tagFilter: FilterQuery<ITag> = { _id: tagId };

//     const getQuestions = await Tag.findById(tagId).populate({
//       path: "questions",
//       model: Question,
//       match: searchQuery
//         ? { title: { $regex: searchQuery, $options: "i" } }
//         : {},
//       populate: [
//         {
//           path: "tags",
//           model: Tag,
//         },
//         {
//           path: "author",
//           model: User,
//         },
//       ],
//     });

//     return getQuestions;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }
