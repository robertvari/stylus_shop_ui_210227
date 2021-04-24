import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./components/styles/main.scss"

function App() {
  return (
    <div className="App">
        <Navbar/>

        <div className={"content-container"}>
            <p>Content..</p>
        </div>

        <Footer/>
    </div>
  );
}

export default App;
