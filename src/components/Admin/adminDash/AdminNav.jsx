import { useNavigate } from "react-router-dom"
export default function AdminNav() {
    const navigate=useNavigate()
  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto">
        <span className="font-semibold text-xl hover:text-red-500  cursor-pointer" onClick={()=>navigate("/admin")}>Back to Dashboard</span>
      </div>
    </nav>
  )
}
