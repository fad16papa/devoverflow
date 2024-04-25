import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";

const RightSidebar = () => {
  const hotQuestions = [
    {
      _id: 1,
      title: "How to create a custom hook in React?",
    },
    {
      _id: 2,
      title: "What is the difference between == and === in JavaScript?",
    },
    {
      _id: 3,
      title: "How to use React Router?",
    },
    {
      _id: 4,
      title: "What is the difference between state and props in React?",
    },
    {
      _id: 5,
      title: "How to use Context API in React?",
    },
  ];

  const popularTags = [
    {
      _id: 1,
      name: "javascript",
      totalQuestions: 5,
    },
    {
      _id: 2,
      name: "react",
      totalQuestions: 5,
    },
    {
      _id: 3,
      name: "nextjs",
      totalQuestions: 5,
    },
    {
      _id: 4,
      name: "vue",
      totalQuestions: 2,
    },
    {
      _id: 5,
      name: "redux",
      totalQuestions: 10,
    },
  ];

  return (
    <section
      className="background-light900_dark200 light-border 
      custom-scrollbar sticky right-0 flex h-screen w-[350px] 
      flex-col overflow-y-auto border-l p-6 pt-36 
      shadow-light-300 dark:shadow-none max-xl:hidden"
    >
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question) => (
            <Link
              key={question._id}
              href={`{/questions/${question._id}}`}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="chevron right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
