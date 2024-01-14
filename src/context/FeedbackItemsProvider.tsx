import { ReactNode, createContext, useEffect, useState } from "react";
import { FeedbackItemType } from "../lib/types";

type FeedbackItemsContextType = {
  feedbackItems: FeedbackItemType[];
  setFeedbackItems: React.Dispatch<React.SetStateAction<FeedbackItemType[]>>;
  isLoading: boolean;
  errorMessage: string;
  handleAddToList: (text: string) => void;
};

export const FeedbackItemsContext = createContext<FeedbackItemsContextType>({});

export default function FeedbackItemsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddToList = (text: string) => {
    const companyName = text
      .split(" ")
      .find((word) => word.includes("#"))
      ?.substring(1);

    if (!companyName) return;

    const newItem: FeedbackItemType = {
      id: new Date().getTime(),
      upvoteCount: 0,
      badgeLetter: companyName?.substring(0, 1).toUpperCase(),
      companyName,
      text,
      daysAgo: 0,
    };
    setFeedbackItems([...feedbackItems, newItem]);
  };

  useEffect(() => {
    const fetchFeedbackItems = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        );

        if (!response.ok) throw new Error("Something went wrong.");

        const data = await response.json();
        setFeedbackItems(data.feedbacks);
      } catch (error) {
        setErrorMessage("Something went wrong.Please try again later.");
      }

      setIsLoading(false);
    };

    fetchFeedbackItems();
  }, []);

  return (
    <FeedbackItemsContext.Provider
      value={{
        feedbackItems,
        setFeedbackItems,
        isLoading,
        errorMessage,
        handleAddToList,
      }}
    >
      {children}
    </FeedbackItemsContext.Provider>
  );
}
