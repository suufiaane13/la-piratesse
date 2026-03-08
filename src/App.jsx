import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import BookInfo from "./components/BookInfo";
import Summary from "./components/Summary";
import Characters from "./components/Characters";
import Themes from "./components/Themes";
import AuthorSection from "./components/AuthorSection";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <a href="#hero" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-gold focus:text-ink font-mono text-sm">
        Aller au contenu
      </a>
      <Header />
      <main>
        <HeroSection />
        <BookInfo />
        <AuthorSection />
        <Characters />
        <Summary />
        <Themes />
      </main>
      <Footer />
    </>
  );
}

export default App;
