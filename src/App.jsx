import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import User from "./routes/UserRoutes"
import Admin from "./routes/AdminRoutes"
import {Toaster} from 'react-hot-toast'
import { ToastContainer } from 'react-toastify';

function App() {
  

  return (
    <>
       <ToastContainer 
        position="top-center"
        reverseOrder={false}
         />

     <Toaster
  position="top-center"
  reverseOrder={false}
/>
     <Router>
      <Routes>
        <Route path="/*" element={<User/>}/>
        <Route path="/admin/*"element={<Admin/>}/>
      </Routes>
     </Router>
       
    </>
  )
}

export default App
