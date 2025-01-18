import {Header} from "@components/organisms/Header/Header";
import {Footer} from "@components/organisms/Footer/Footer";
import {Outlet} from "react-router";


export const Layout = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
};
