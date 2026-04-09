import { Outlet } from "react-router-dom";
import PortfolioChatbot from "../pages/Components/Chatbot/PortfolioChatbot";
import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/NavBar/Navbar";

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
      <PortfolioChatbot />
    </div>
  );
};

export default Main;
