import React,{useState, useEffect}from 'react'
import { useSelector } from "react-redux";
import { DateRange } from "react-date-range";
import StripeCheckout from 'react-stripe-checkout';
import { useParams,useNavigate } from 'react-router-dom';

const StripePage = () => {
  
  const customerId = useSelector((state) => state?.user?._id)
  const listingroom = useSelector((state) => state?.user?._id)
  function onToken(token){
    console.log(token)
    }
    const navigate = useNavigate()
   
    const [loading, setLoading] = useState(true);

  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24);
  const getListingDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3500/properties/${listingId}`,
        // `https://dream-nesxt.vercel.app/`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      setListing(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listing Details Failed", err.message);
    }
  };
  
  useEffect(() => {
    getListingDetails();
  }, []);

  console.log(listing)
  
  async function onToken(token){
    try {
      const bookingForm = {
        user: customerId,
        listing: listingId,
        checkIn: new Date(dateRange[0].startDate).toISOString(),
        checkOut: new Date(dateRange[0].endDate).toISOString(),
        guests: 1,
        totalPrice: listing.price * Math.max(1, dayCount),
        token
      }

      const response = await fetch(`https://dream-nesxt.vercel.app/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingForm)
      })

      if (response.ok) {
        navigate(`/${customerId}/trips`)
      }
    } catch (err) {
      console.log("Submit Booking Failed.", err.message)
    }
  console.log(token)
  }
  
  
  
  const handleSubmit = async () => {}
  
  return (
    <div style ={{textAlign: 'center', marginTop: '15rem'}} onClick={handleSubmit}>
       <StripeCheckout 
        amount={(listing?.price ? listing.price * Math.max(1, dayCount) * 100 : 0)}
        token={onToken}
        
        currency='USD'
        stripeKey="pk_test_51PsppnISCf6RR6ChEPMTT0M0DTfRdPYTUuuqNJw7GYNv7g6QDFBwtQgp8w5HHuoAg1mFqNqovsGEbjPKKydM877000c9bmuuEz"
          ></StripeCheckout>    
    </div>
  )
}

export default StripePage
