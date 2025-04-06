import {Routes,Route} from 'react-router-dom'
import AdminLogin from "../pages/Admin/AdminLogin"
import AdminDashboard from '../pages/Admin/AdminDashboard'
import UsersList from '../pages/Admin/UsersList'
import FindStateandDistrict from '../pages/Admin/FindStateandDistrict'
import EditStatesandDistrict from '../pages/Admin/EditStatesandDistrict'
import AddStatesAndDistrict from '../pages/Admin/AddStatesAndDistrict'
import Destinations from '../pages/Admin/Destinations'
import Finddestinations from '../pages/Admin/Finddestinations'
import ProtectedAdminRoute from './ProtectAdminRoute'
import Editdestination from '../pages/Admin/Editdestination'
import ViewBooking from '../pages/Admin/ViewBooking'
import Error404 from '../components/Error/Error404'
import Error500 from '../components/Error/Error500'
export default function Adminroutes() {
  return (
    <div>
      <Routes>
      <Route path="/*" element={<Error404 />} />
        <Route path='/login' element={<AdminLogin/>}/>
        <Route element={<ProtectedAdminRoute/>}>
  
        
        <Route path='/'element={<AdminDashboard/>}/>
        <Route path='/users'element={<UsersList/>}/>
        <Route path='/statesdistrict'element={<FindStateandDistrict/>}/>
        <Route path='/addstates'element={<AddStatesAndDistrict/>}/>
        <Route path='/editstates'element={<EditStatesandDistrict/>}/>
        <Route path='/destinations'element={<Destinations/>}/>
        <Route path='/finddestination'element={<Finddestinations/>}/>
        <Route path='/editdestination'element={<Editdestination/>}/>
        <Route path='/bookingview'element={<ViewBooking/>}/>
        </Route>
        <Route path="/error404" element={<Error404 />} />
        <Route path="/error500" element={<Error500 />} />
      </Routes>
    </div>
  )
}
