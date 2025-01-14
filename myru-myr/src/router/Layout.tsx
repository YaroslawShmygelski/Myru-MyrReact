import {Header} from "@components/organisms/Header/Header";
import {Outlet} from "react-router";

export const Layout = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    );
};
