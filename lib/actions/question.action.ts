"use server";

import Question from "@/database/question.mode";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tag.model";

export async function createQuestion(params: any) {
  // Create a new question
  // eslint-disable-next-line no-empty
  try {
    connectToDatabase();

    const { title, content, tags, author } = params;

    // Create a new question
    const question = await Question.create({ title, content, author });

    const tagDocuments = [];

    // create tags or get them if they already existed
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: tagDocuments },
    });

    // create an interaction record for the user's ask_question action
  } catch (error) {}
}
