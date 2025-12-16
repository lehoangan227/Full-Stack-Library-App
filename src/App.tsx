import "./App.scss";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <div className="body-container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
