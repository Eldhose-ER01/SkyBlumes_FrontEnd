import { useState,useEffect } from 'react';
import { toast } from 'react-toastify'; // Add this import
import UserNav from '../Usernav/UserNav';
import Footer from '../Footer/Footer';
import { Bookingsdatas,WalletAmounts } from '../../../configure/user';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Booking() {
    const [exploringDate, setExploringDate] = useState('');
    const [peopleCount, setPeopleCount] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('');
    const Navigate = useNavigate();
    const location = useLocation();
    const destination = location.state?.destination;

    // Initialize bookingdata safely
    const [bookingdata, setBookingdata] = useState(destination || {});
    const [walletAmout,setWalletAmount]=useState([])
    // Calculate total amount
    const ticketPrice = bookingdata.ticketPrice || 1200;
    const totalAmount = ticketPrice * peopleCount;


const findwallet=async()=>{
  try {
    const response=await WalletAmounts()
    if(response.data.success){
      setWalletAmount(response.data.finddata)
    }
  } catch (error) {
    console.log(error);
    
  }
}

    const StartBooking = async () => {
      try {
        if (!paymentMethod) {
          toast.error("Please Select Payment Method");
          return;
        }
    
        if (!exploringDate) {
          toast.error("Please select a date");
          return;
        }
    
        const bookingDetails = {
          ...bookingdata,
          _id: bookingdata._id, // Make sure you're sending _id
          exploringDate,
          peopleCount,
          totalAmount,
          paymentMethod
        };
    
        const response = await Bookingsdatas(bookingDetails);
    
        if (response.data.url) {
          window.location.href = response.data.url;
        } else if (response.data.wallet) {
          toast.success("Booking Successful!");
          Navigate("/bookingsuccessfull");
        } else if (response.data.notamount) {
          toast.error(response.data.notamount);
        } else {
          toast.error(response.data.message || "Booking failed");
        }
      } catch (error) {
        console.error("Booking error:", error);
        toast.error("An error occurred during booking");
      }
    }
    useEffect(() => {
      findwallet()
    }, [])
    return (
        <>
            <div>
                <UserNav />
            </div>
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left side - Booking form (60% width) */}
                        <div className="lg:w-3/5">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h1 className="text-2xl font-bold text-gray-800 mb-6">Book Your Adventure</h1>
                                
                                <div className="space-y-6">
                                    {/* Location information */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                            <div className="p-2 border border-gray-300 rounded-md bg-gray-100">
                                                <p className="text-gray-800">{bookingdata.state?.statename || 'N/A'}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                                            <div className="p-2 border border-gray-300 rounded-md bg-gray-100">
                                                <p className="text-gray-800">{bookingdata.state?.districtname || 'N/A'}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                                            <div className="p-2 border border-gray-300 rounded-md bg-gray-100">
                                                <p className="text-gray-800">{bookingdata.destination || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>
        
                                    {/* Exploring time */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Exploring Time</label>
                                        <div className="p-2 border border-gray-300 rounded-md bg-gray-100">
                                            <p className="text-gray-800">{bookingdata.duration || 'N/A'}Hours</p>
                                        </div>
                                    </div>
        
                                    {/* Ticket price */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Price</label>
                                        <div className="p-2 border border-gray-300 rounded-md bg-gray-100">
                                            <p className="text-gray-800">₹{bookingdata.ticketPrice || 'N/A'}</p>
                                        </div>
                                    </div>
        
                                    {/* Date selection */}
                                    <div>
                                        <label htmlFor="exploringDate" className="block text-sm font-medium text-gray-700 mb-1">
                                            Choose Exploring Date
                                        </label>
                                        <input
                                            type="date"
                                            id="exploringDate"
                                            min={new Date().toISOString().split('T')[0]}
                                            value={exploringDate}
                                            onChange={(e) => setExploringDate(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>
        
                                    {/* People count */}
                                    <div>
                                        <label htmlFor="peopleCount" className="block text-sm font-medium text-gray-700 mb-1">
                                            Choose How Many People
                                        </label>
                                        <select
                                            id="peopleCount"
                                            value={peopleCount}
                                            onChange={(e) => setPeopleCount(parseInt(e.target.value))}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                                <option key={num} value={num}>
                                                    {num}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
        
                        {/* Right side - Summary and payment (40% width) */}
                        <div className="lg:w-2/5">
                            <div className='shadow-md p-6 sticky top-8 bg-white'>
                                <span className='text-green-500 font-semibold'>Wallet Amount:</span>₹{walletAmout.walletAmount}
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8 mt-3">
                                <h2 className="text-xl font-bold text-gray-800 mb-6">Booking Summary</h2>
                                
                                <div className="space-y-6">
                                    {/* Total amount */}
                                    <div className="border-b pb-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-medium text-gray-700">Total Amount</span>
                                            <span className="text-2xl font-bold text-gray-900">₹{totalAmount}</span>
                                        </div>
                                    </div>
        
                                    {/* Payment method */}
                                    <div>
                                        <h3 className="text-md font-medium text-gray-700 mb-3">Payment Method</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center">
                                                <input
                                                    id="wallet"
                                                    name="paymentMethod"
                                                    type="radio"
                                                    checked={paymentMethod === 'wallet'}
                                                    onChange={() => setPaymentMethod('wallet')}
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                />
                                                <label htmlFor="wallet" className="ml-3 block text-sm font-medium text-gray-700">
                                                    Wallet
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    id="online"
                                                    name="paymentMethod"
                                                    type="radio"
                                                    checked={paymentMethod === 'online'}
                                                    onChange={() => setPaymentMethod('online')}
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                />
                                                <label htmlFor="online" className="ml-3 block text-sm font-medium text-gray-700">
                                                    Online Payment
                                                </label>
                                            </div>
                                        </div>
                                    </div>
        
                                    {/* Booking button */}
                                    <button
                                        type="button"
                                        className="w-full bg-black hover:bg-green-400 hover:text-black text-white font-bold py-3 px-4 rounded-md transition duration-200 focus:outline-none"
                                        onClick={StartBooking}
                                    >
                                        Confirm Booking
                                    </button>
        
                                    {/* Additional info */}
                                    <div className="text-xs text-gray-500 mt-4">
                                        <p>By proceeding, you agree to our Terms of Service and Privacy Policy.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
}