import { useContext, useEffect, useState } from "react";
import { FeedbackItemsContext } from "../context/FeedbackItemsProvider";
import { FeedbackItemType } from "./types";
import { URL } from "./constants";

export function useFeedbackItemsContext() {
  const feedbackItemsContext = useContext(FeedbackItemsContext);

  if (!feedbackItemsContext) {
    throw new Error(
      "use FeedbackItemsContext has to used within <FeedbackItemsContext.Provider>"
    );
  }

  return feedbackItemsContext;
}

export function useFeedbackItems() {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  return { feedbackItems, setFeedbackItems, isLoading, errorMessage };
}
