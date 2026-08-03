import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useCursorFollower } from "../hooks/useCursorFollower";
import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/NavBar/Navbar";

// Split out of the main bundle: the chatbot is a large, interaction-only
// feature that nothing above the fold depends on.
const PortfolioChatbot = lazy(() => import("../pages/Components/Chatbot/PortfolioChatbot"));

const Main = () => {
  useCursorFollower();
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
      <Suspense fallback={null}>
        <PortfolioChatbot />
      </Suspense>
    </div>
  );
};

export default Main;
