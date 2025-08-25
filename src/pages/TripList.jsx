import { useEffect, useState } from "react";
import "../styles/List.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setTripList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer"
import { useParams, useLocation, useNavigate } from "react-router-dom";

import ConverterPage from "../components/ConverterPage";

const TripList = () => {
  
  function onToken(token){
    console.log(token)
    }

  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null); 
  const userId = useSelector((state) => state.user._id);
  const tripList = useSelector((state) => state.user.tripList);
  const customerId = useSelector((state) => state?.user?._id)
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const booked = location.state?.booked;



  const getTripList = async () => {
    
    try {
      const response = await fetch(
       `http://localhost:3500/users/${userId}/trips`,
      //  `https://dream-nesxt.vercel.app/users/${userId}/trips`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setTripList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Trip List failed!", err.message);
    }
  };

  useEffect(() => {
    getTripList();
  }, []);

  useEffect(() => {
    if (booked) {
      // Clear the state so refreshes don't keep the banner
      navigate(`/${userId}/trips`, { replace: true, state: {} });
    }
  }, [booked, navigate, userId]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      {booked && (
        <div style={{
          background: "#e6ffed",
          border: "1px solid #b7eb8f",
          color: "#135200",
          padding: "12px 16px",
          borderRadius: 6,
          margin: "16px",
        }}>
          Booking successful! Your trip has been added below.
        </div>
      )}
      <h1 className="title-list">Your Trip List</h1>
      <div className="list">
        {tripList?.map(({ listing, checkIn, checkOut, totalPrice }) => (
          <ListingCard
            key={listing?._id}
            listingId={listing?._id}
            creator={listing?.creator}
            listingPhotoPaths={listing?.listingPhotoPaths}
            city={listing?.city}
            province={listing?.province}
            country={listing?.country}
            category={listing?.category}
            startDate={new Date(checkIn).toDateString()}
            endDate={new Date(checkOut).toDateString()}
            totalPrice={totalPrice}
            booking={true}
          />
        ))}
      </div>
     
     <ConverterPage/>
      
      <Footer />
    </>
  );
};

export default TripList;