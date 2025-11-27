import "./App.scss";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <>
      <Header />
      <div className="body-container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default App;
