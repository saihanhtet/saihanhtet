import Header from "./components/header/Header";

import "./App.css";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";

function App() {
  return (
    <>
      <Header />

      <main className="pages">
        <Home />
        <About />
        <Contact />
      </main>
    </>
  );
}

export default App;
