import { model, models, Schema, Document } from "mongoose";
import User from "./user.model";
import Question from "./question.model";

export interface IAnswer extends Document {
  author: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  createdAt: Date;
  content: string;
}

const AnswerSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: User, required: true },
  question: { type: Schema.Types.ObjectId, ref: Question, required: true },
  upvotes: [{ type: Schema.Types.ObjectId, ref: User }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: User }],
  createdAt: { type: Date, default: Date.now },
  content: { type: String, required: true },
});

const Answer = models.Answer || model("Answer", AnswerSchema);

export default Answer;
