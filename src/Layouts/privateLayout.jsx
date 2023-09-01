import { Navigate, Outlet } from "react-router-dom"
import SideBar from "../Components/SideBar";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import { useStateContext } from "../contexts/authContext";

const PrivateLayout = () => {

    const { token } = useStateContext()
    if (!token) {
        return <Navigate to="/login" />
    }

    return (
        <>
            <section className="private-routes-section">
                <section className="left-section">
                    <SideBar />
                </section>
                <section className="rigth-section">
                    <Nav />
                    <section className="main-section">
                        <Outlet />
                    </section>
                    <Footer />
                </section>
            </section>

        </>);
}

export default PrivateLayout;