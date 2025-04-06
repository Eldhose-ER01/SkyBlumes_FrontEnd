import { Outlet,Navigate } from "react-router-dom";

const ProtectedRoute=()=>{
    const user=localStorage.getItem("usertoken")
    return user?<Outlet />: <Navigate to="/login"/>
}
export default ProtectedRoute