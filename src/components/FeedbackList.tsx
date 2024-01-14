import FeedbackItem from "./FeedbackItem";

const feedbackItems = [
  {
    upvoteCount: 499,
    badgeLetter: "H",
    companyName: "Helga",
    text: "test test test",
    daysAgo: 3,
  },
  {
    upvoteCount: 349,
    badgeLetter: "S",
    companyName: "Sofiia",
    text: "bla bla bla",
    daysAgo: 4,
  },
];

export default function FeedbackList() {
  return (
    <ol className="feedback-list">
      {feedbackItems.map((feedbackItem) => (
        <FeedbackItem
          feedbackItem={feedbackItem}
          key={feedbackItem.companyName}
        />
      ))}
    </ol>
  );
}
