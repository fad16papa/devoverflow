"use server";

import { connectToDatabase } from "../mongoose";

export async function createQuestion(params: any) {
  // Create a new question
  // eslint-disable-next-line no-empty
  try {
    connectToDatabase();
  } catch (error) {}
}
