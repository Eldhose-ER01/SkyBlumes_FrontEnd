import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { findbookingdata } from '../../../configure/admin';
import { FaUsers } from "react-icons/fa6";
import { FaChartBar } from "react-icons/fa";

export default function AdminChart() {
  const [data, setData] = useState([]);
  const [online, setOnline] = useState(0);
  const [wallet, setWallet] = useState(0);
  const [cancel, setCancel] = useState(0);
  const [booked, setBooked] = useState(0);
  const [completed, setComplte] = useState(0);
  const [chartData, setChartData] = useState();
  const [chartbar, setchartbar] = useState();
  const [users, setusers] = useState(0);
  const [Revenue, setRevenue] = useState(0);
  const [totalbooks, settotal] = useState(0);
  const [destination, setDestination] = useState(0);

  const finddata = async () => {
    try {
      const response = await findbookingdata();
      if (response.data.success) 
        setData(response.data.bookingdata);

      settotal(response.data.complete);
      setusers(response.data.unique);
      setDestination(response.data.destination);
      setRevenue(response.data.total);

      const booked = response.data.bookingdata.filter((books) => {
        return books.status == "booked";
      });
      
      const cancel = response.data.bookingdata.filter((cancel) => {
        return cancel.status == "Cancelled";
      });

      const Completed = response.data.bookingdata.filter((Completed) => {
        return Completed.status == "Completed";
      });

      const onl = response.data.bookingdata.filter((da) => {
        return da.paymentMethod == "online";
      });
      const wal = response.data.bookingdata.filter((da) => {
        return da.paymentMethod == "wallet";
      });

      setCancel(cancel.length);
      setBooked(booked.length);
      setComplte(Completed.length);
      setOnline(onl.length);
      setWallet(wal.length);

      setChartData({
        series: [onl.length, wal.length],
        options: {
          chart: {
            type: "pie",
          },
          labels: ["Online", "Wallet"],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 300
              },
              legend: {
                position: "bottom"
              }
            }
          }]
        }
      });

      setchartbar({
        series: [booked.length, Completed.length, cancel.length],
        options: {
          chart: {
            type: "donut",
          },
          plotOptions: {
            pie: {
              startAngle: -90,
              endAngle: 270,
            },
          },
          dataLabels: {
            enabled: false,
          },
          fill: {
            type: "gradient",
          },
          labels: ["Booked", "Completed", "Cancelled"],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 300
              },
              legend: {
                position: "bottom"
              }
            }
          }]
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    finddata();
  }, []);

  return (
    <div className="w-full p-4">
      {/* Stats Cards - Responsive grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {/* Total Users Card */}
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <FaUsers className="text-4xl text-green-500 mr-4" />
          <div>
            <p className="text-gray-600 font-medium">Total Users</p>
            <p className="text-2xl font-semibold">{users.length}</p>
          </div>
        </div>

        {/* Total Destinations Card */}
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <FaChartBar className="text-4xl text-green-500 mr-4" />
          <div>
            <p className="text-gray-600 font-medium">Total Destinations</p>
            <p className="text-2xl font-semibold">{destination.length}</p>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <FaChartBar className="text-4xl text-orange-500 mr-4" />
          <div>
            <p className="text-gray-600 font-medium">Total Revenue</p>
            <p className="text-2xl font-semibold text-blue-600">₹{Revenue}</p>
          </div>
        </div>
      </div>

      {/* Charts - Responsive grid layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Payment Method Chart */}
        <div className="bg-white rounded-lg shadow p-4">
          {chartData && (
            <>
              <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="pie"
                height={350}
              />
              <p className="text-center text-xl font-medium mt-2">Payment Method</p>
            </>
          )}
        </div>

        {/* Order Status Chart */}
        <div className="bg-white rounded-lg shadow p-4">
          {chartbar && (
            <>
              <ReactApexChart
                options={chartbar.options}
                series={chartbar.series}
                type="donut"
                height={350}
              />
              <p className="text-center text-xl font-medium mt-2">Order Status</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}