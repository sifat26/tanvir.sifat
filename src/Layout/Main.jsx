import { Outlet } from "react-router-dom";
import { useCursorFollower } from "../hooks/useCursorFollower";
import PortfolioChatbot from "../pages/Components/Chatbot/PortfolioChatbot";
import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/NavBar/Navbar";

const Main = () => {
  useCursorFollower();
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
