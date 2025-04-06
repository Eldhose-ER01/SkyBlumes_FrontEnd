import UserNav from '../Usernav/UserNav';
import { useState,useEffect } from 'react';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { finddistrict } from '../../../configure/admin';
import { userApi } from '../../../configure/api';
export default function Userhome() {
    const [states, setStates] = useState([]);
  
const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate=useNavigate()




   const findDistrcitandstates = async () => {
      try {
        const response = await finddistrict();
        if (response.data.success) {
          setStates(response.data.finddistrict);
          
        }
      } catch (error) {
        console.log(error);
      }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = states.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(states.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);



    useEffect(() => {
        findDistrcitandstates();
      }, []);

  
  return (
    <>
      <UserNav />
  
      {/* Banner Section */}
      <div className="relative h-[45vh] sm:h-[70vh] md:h-[70vh] lg:h-screen">
        {/* Banner Image with Gradient Overlay */}
        <div className="absolute inset-0">
          <img
            src="../../../../public/static/Images/pexels-pixabay-147411.jpg"
            alt="Banner"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        {/* Centered Content and Booking Button */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white mt-6 sm:mt-0 text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Welcome to Our Service
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8">
            Discover the best experiences with us. Book now and enjoy exclusive offers!
          </p>
            <button className='w-52 bg-sky-400 hover:bg-red-600 hover:text-white  h-12 text-black font-semibold'onClick={()=>navigate("/selectstate")}>
              Book Now
          </button>
        </div>
      </div>

      {/* Cards Section */}
        {/* District Cards */}
<div className="container mx-auto px-4 py-12">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" onClick={()=>navigate("/selectstate")}>
    {currentItems.map((state) => (
      <div key={state.id} className="bg-white rounded-md shadow-xl flex flex-col h-full">
        <img
          src={`${userApi}/Images/${state.image}`}
          className="w-full h-48 object-cover overflow-hidden  rounded-md"
          alt={state.districtname}
        />
       
        <div className="p-4">
          <p className="text-gray-600">{state.districtdesc}</p>
        </div>
       
      </div>
    ))}
  </div>

  {/* Pagination remains the same */}
  <div className="flex justify-center mt-8 mb-12">
    <div className="flex space-x-2">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => paginate(index + 1)}
          className={`w-10 h-10 flex items-center justify-center rounded-md ${
            currentPage === index + 1
              ? "bg-black text-white"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  </div>
</div>

      <div>
        <Footer/>
      </div>
    </>
  );
}