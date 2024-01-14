import { ChangeEvent, useState } from "react";
import { MAX_CHARS } from "../../lib/constants";
import { useFeedbackItemsContext } from "../../lib/hooks";

export default function FeedbackForm() {
  const { handleAddToList } = useFeedbackItemsContext();
  const [text, setText] = useState("");

  const charsLeft = MAX_CHARS - text.length;

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;

    if (newText.length > MAX_CHARS) return;

    setText(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddToList(text);
    setText(" ");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <textarea
        value={text}
        onChange={handleChange}
        id="feedback-textarea"
        placeholder="Enter your feedback"
        spellCheck={false}
      />

      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the company
      </label>

      <div>
        <p className="u-italic">{charsLeft}</p>
        <button>Submit</button>
      </div>
    </form>
  );
}