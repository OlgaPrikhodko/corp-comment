# CorpComment application

This is a website where people can give feedback to companies.

### Key Features:

- display feedback list from API;
- ability to add new feedback. It should contain hashtag with a company name;
- save feedback with API;
- show list of company names with feedbacks;
- show feedback list for chosen company name;
- ability to upvote feedback

### Main Components:

- FeedbackList: displays feedback list with details: feedbackText, companyName, upvoteCount, dayAgo.

- FeedbackForm: form that allows user to add feedback text with company name (#companyName).Form has limit symbols 150 and shows symbols that have left.

- HashtagList: list companies with feedback. Click on the company name and will display filtered feedback list for that company.

### Used Technologies:

- React
- TypeScript
- Context API with later refactoring to Zustand content manager
- @radix/icons

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
