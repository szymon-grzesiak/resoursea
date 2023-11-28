import React, { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import RenderTag from "../shared/RenderTag";
import Metric from "../shared/Metric";
import { extractAndTrimText, formatAndDivideNumbers, getTimestamp } from "@/lib/utils";

interface Props extends ComponentPropsWithoutRef<"div"> {
  clerkId?: string;
  _id: string;
  title: string;
  author: { _id: string; name: string; picture: string };
  upvotes: [];
  downvotes: [];
  createdAt: Date;
  question: { title: string; id: string };
}

const AnswerCard = ({
  clerkId,
  _id,
  question,
  title,
  author,
  upvotes,
  downvotes,
  createdAt,
}: Props) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/question/${question.id}#${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {question.title}
            </h3>
          </Link>
        </div>
        {/* If signed in add edit delete actions */}
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
      <p>{extractAndTrimText(title)}</p>
        <div className="flex-between mt-6 w-full flex-wrap gap-3">
          <Metric
            imgUrl={author.picture}
            alt="user"
            value={author.name}
            title={` - answered ${getTimestamp(createdAt)}`}
            href={`/profile/${clerkId}`}
            isAuthor
            textStyles="body-medium text-dark400_light700"
          />
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="votes"
            value={upvotes.length + downvotes.length}
            title=" Votes"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;
