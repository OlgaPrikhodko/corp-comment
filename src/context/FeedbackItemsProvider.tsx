import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import { FeedbackItemType } from "../lib/types";

const URL =
  "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks";

type FeedbackItemsContextType = {
  feedbackItems: FeedbackItemType[];
  setFeedbackItems: React.Dispatch<React.SetStateAction<FeedbackItemType[]>>;
  isLoading: boolean;
  errorMessage: string;
  handleAddToList: (text: string) => void;
  companyList: string[];
  handleSelectCompany: (company: string) => void;
};

export const FeedbackItemsContext =
  createContext<FeedbackItemsContextType | null>(null);

export default function FeedbackItemsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedCompany, setSelectedCompany] = useState("All");

  const filteredFeedbackList = useMemo(
    () =>
      selectedCompany === "All"
        ? feedbackItems
        : feedbackItems.filter(
            (feedback) => feedback.company === selectedCompany
          ),
    [selectedCompany, feedbackItems]
  );

  const companyList = useMemo(
    () => [
      "All",
      ...new Set(feedbackItems.map((feedback) => feedback.company)),
    ],
    [feedbackItems]
  );

  const handleSelectCompany = (company: string) => {
    setSelectedCompany(company);
  };

  const handleAddToList = async (text: string) => {
    const company = text
      .split(" ")
      .find((word) => word.includes("#"))
      ?.substring(1);

    if (!company) return;

    const newItem: FeedbackItemType = {
      id: new Date().getTime(),
      upvoteCount: 0,
      badgeLetter: company?.substring(0, 1).toUpperCase(),
      company,
      text,
      daysAgo: 0,
    };
    setFeedbackItems([...feedbackItems, newItem]);

    await fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });
  };

  useEffect(() => {
    const fetchFeedbackItems = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(URL);

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
        feedbackItems: filteredFeedbackList,
        setFeedbackItems,
        isLoading,
        errorMessage,
        handleAddToList,
        companyList,
        handleSelectCompany,
      }}
    >
      {children}
    </FeedbackItemsContext.Provider>
  );
}
