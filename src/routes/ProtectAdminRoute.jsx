import { Outlet,Navigate } from "react-router-dom";
const ProtectedAdminRoute=()=>{
    const admin=localStorage.getItem("admintoken")
    return admin?<Outlet />: <Navigate to="/admin/login"/>
}
export default ProtectedAdminRoute