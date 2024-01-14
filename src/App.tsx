import Container from "./components/Container";
import Footer from "./components/Footer";
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
