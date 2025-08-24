import { Outlet } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/NavBar/Navbar";
import { HelmetProvider } from "react-helmet-async";

const Main = () => {
    return (
        <HelmetProvider>
            <div>
                <Navbar></Navbar>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
        </HelmetProvider>
    );
};

export default Main;