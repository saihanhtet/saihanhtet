import Header from "./components/header/Header";

import "./App.css";
import Home from "./components/home/Home";
import About from "./components/about/About";

function App() {
  return (
    <>
      <Header />

      <main className="pages">
        <Home />
        <About />
      </main>
    </>
  );
}

export default App;
