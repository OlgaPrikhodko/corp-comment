import { create } from "zustand";
import { FeedbackItemType } from "../lib/types";
import { URL } from "../lib/constants";

type Store = {
  feedbackItems: FeedbackItemType[];
  isLoading: boolean;
  errorMessage: string;
  selectedCompany: string;
  getCompanyList: () => string[];
  getFilteredFeedbackList: () => FeedbackItemType[];
  addItemToList: (text: string) => void;
  selectCompany: (company: string) => void;
  fetchFeedbackItems: () => void;
};

export const useFeedbackItemsStore = create<Store>((set, get) => ({
  feedbackItems: [],
  isLoading: false,
  errorMessage: "",
  selectedCompany: "All",
  getCompanyList: () => {
    return [
      "All",
      ...new Set(get().feedbackItems.map((feedback) => feedback.company)),
    ];
  },
  getFilteredFeedbackList: () => {
    const state = get();

    return state.selectedCompany === "All"
      ? state.feedbackItems
      : state.feedbackItems.filter(
          (feedback) => feedback.company === state.selectedCompany
        );
  },
  addItemToList: async (text: string) => {
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
    set((state) => ({
      feedbackItems: [...state.feedbackItems, newItem],
    }));
    await fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });
  },

  selectCompany: (company: string) => {
    set(() => ({
      selectedCompany: company,
    }));
  },

  fetchFeedbackItems: async () => {
    set(() => ({ isLoading: true }));

    try {
      const response = await fetch(URL);

      if (!response.ok) throw new Error("Something went wrong.");

      const data = await response.json();
      set(() => ({ feedbackItems: data.feedbacks }));
    } catch (error) {
      set(() => ({
        errorMessage: "Something went wrong.Please try again later.",
      }));
    }
    set(() => ({ isLoading: false }));
  },
}));
