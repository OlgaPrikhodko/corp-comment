import { ChangeEvent, useState } from "react";
import { MAX_CHARS } from "../lib/constants";

export default function FeedbackForm() {
  const [text, setText] = useState("");

  const charsLeft = MAX_CHARS - text.length;

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;

    if (newText.length > MAX_CHARS) return;

    setText(event.target.value);
  };

  return (
    <form className="form">
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
