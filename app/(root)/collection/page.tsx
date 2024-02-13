import QuestionCard from "@/components/cards/QuestionCard";
import Filters from "@/components/shared/Filter";
import LocalSearchBar from "@/components/shared/search/LocalSearchbar";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import { QuestionFilters } from "@/constants/filters";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";

export default async function Collection({ searchParams }: SearchParamsProps) {
  const { userId } = auth();
  if (!userId) {
    return null;
  }

  const result = await getSavedQuestions({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    clerkId: userId,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          className="flex-1"
          route="/collection"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
        />
        <Filters
          filters={QuestionFilters}
          className="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        {result?.questions?.length > 0 ? (
          result?.questions?.map((question: any) => (
            <QuestionCard
              key={question._id}
              clerkId={question.author.clerkId}
              _id={question._id}
              title={question.title}
              author={question.author}
              tags={question.tags}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There's no saved question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
          discussion. Our query could be the next big thing others learn from. Get
          involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
}
