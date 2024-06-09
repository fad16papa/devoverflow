"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { CreateUserParams, UpdateUserParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.mode";

export async function getUserById(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createUser(userParam: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(userParam);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: any) {
  try {
    connectToDatabase();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // Delete user from database
    // Questions and answers will be deleted using cascade delete

    // get user quetions Ids and delete them
    // eslint-disable-next-line no-unused-vars
    const userQuestions = await Question.find({ author: user._id }).distinct(
      "_id"
    );

    // de;ete user questions
    await Question.deleteMany({ author: user._id });

    // TODO: delete user answers, comments etc.

    const deletedUser = await User.findOneAndDelete({ clerkId });

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
