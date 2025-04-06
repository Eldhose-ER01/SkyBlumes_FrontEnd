import UserNav from '../Usernav/UserNav';
import Footer from '../Footer/Footer';
import { userApi } from '../../../configure/api';
import { FaCheck, FaTimes, FaClock, FaRupeeSign } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { destinationpoint } from '../../../configure/user';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

export default function Destinations() {
  const navigate = useNavigate();
  const location = useLocation();
  const districtName = location.state?.district;
  
  const [alldestinations, setAllDestinations] = useState([]);
  const state = alldestinations.length > 0 ? alldestinations[0].state.statename : '';

  const findDestinationPoint = async () => {
    try {
      const response = await destinationpoint(districtName);
      if (response.data.success) {
        setAllDestinations(response.data.destinations);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    findDestinationPoint();
  }, []);

  return (
    <>
      <UserNav />
      <div className="w-full flex justify-center">
        <div className="w-[93%] p-4">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Destinations<span className="text-green-600 pl-2">{state}</span> from <span className="text-green-600">{districtName}</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {alldestinations.map((destination) => (
              <div 
                key={destination.id} 
                className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer w-full flex flex-col h-full"
                onClick={() => navigate('/booking', { state: { destination } })}
              >
                <div className="p-4 flex-grow">
                  <Swiper
                    navigation
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination]}
                    className="h-64"
                  >
                    {destination.selectedImages.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img src={`${userApi}/Images/${image}`} alt="" className="w-full h-full object-cover rounded-md" />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <h2 className="text-2xl font-semibold text-gray-800 mt-4 mb-2">{destination.destination}</h2>
                  <p className="text-gray-600 mb-4 text-lg">{destination.description}</p>
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-700 mb-2 text-lg">Includes:</h3>
                    <ul className="space-y-1">
                      {destination.include.map((item, index) => (
                        <li key={index} className="flex items-center text-red-500 text-lg">
                          <FaCheck className="mr-2 text-green-600" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-700 mb-2 text-lg">Not Includes:</h3>
                    <ul className="space-y-1">
                      {destination.notIncludes.map((item, index) => (
                        <li key={index} className="flex items-center text-red-500 text-lg">
                          <FaTimes className="mr-2" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-red-600 text-lg">
                      <FaClock className="mr-2 text-green-500" />
                      <span>{destination.duration} Hours</span>
                    </div>
                    <div className="flex items-center text-black font-bold text-xl">
                      <FaRupeeSign className="mr-1" />
                      <span>{destination.ticketPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
