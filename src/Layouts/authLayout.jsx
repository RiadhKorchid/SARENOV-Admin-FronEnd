import { Navigate, Outlet } from "react-router-dom"
import illustration from "../assets/illustration.png"
import { useStateContext } from "../contexts/authContext";
const AuthLayout = () => {

    const { token } = useStateContext()
    if (token) {
        return <Navigate to="/services" />
    }
    return (
        <>

            <section className="auth-layout">
                <div className="auth-outlet">
                    <Outlet />
                </div>
                <div className="illustration">
                    <img src={illustration} alt="" />
                </div>
            </section>

        </>);
}

export default AuthLayout;