import { useContext } from "react";
import { FeedbackItemsContext } from "../context/FeedbackItemsProvider";

export function useFeedbackItemsContext() {
  const feedbackItemsContext = useContext(FeedbackItemsContext);

  if (!feedbackItemsContext) {
    throw new Error(
      "use FeedbackItemsContext has to used within <FeedbackItemsContext.Provider>"
    );
  }

  return feedbackItemsContext;
}
