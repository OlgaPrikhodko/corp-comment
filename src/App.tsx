import Container from "./components/layout/Container";
import Footer from "./components/layout/Footer";
import HashtagList from "./components/HashtagList";
import FeedbackItemsProvider from "./context/FeedbackItemsProvider";

function App() {
  return (
    <div className="app">
      <FeedbackItemsProvider>
        <Footer />
        <Container />
        <HashtagList />
      </FeedbackItemsProvider>
    </div>
  );
}

export default App;
