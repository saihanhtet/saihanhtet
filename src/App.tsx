import Header from "./components/header/Header";

import "./App.css";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Skill from "./components/skill/Skill";
import Works from "./components/works/Works";
import Education from "./components/education/Education";

function App() {
  return (
    <>
      <Header />

      <main className="pages">
        <Home />
        <About />
        <Skill />
        <Education />
        <Works />
        <Contact />
      </main>
    </>
  );
}

export default App;
