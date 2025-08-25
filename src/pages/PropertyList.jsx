import "../styles/List.scss";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react";
import { setPropertyList } from "../redux/state";
import Loader from "../components/Loader";
import Footer from "../components/Footer"

const PropertyList = () => {
  const [loading, setLoading] = useState(true)
  const user = useSelector((state) => state.user)
  const propertyList = user?.propertyList;
  console.log(user)

  const dispatch = useDispatch()
  const getPropertyList = async () => {


    try {
      const response = await fetch(`http://localhost:3500/users/${user._id}/properties`, {     
 // const response = await fetch(`https://dream-nesxt.vercel.app/users/${user._id}/properties`, {
        method: "GET"
      })
    
      const data = await response.json()
      console.log(data)
      dispatch(setPropertyList(data))
      setLoading(false)
    } catch (err) {
      console.log("Fetch all properties failed", err.message)
    }
  }

  useEffect(() => {
    getPropertyList()
  }, [])

  return loading ? <Loader /> : (
    <>
      <Navbar />
      <h1 className="title-list">Your Property List</h1>
      <div className="list">
        {propertyList?.map((item) => (
          <ListingCard
            key={item._id}
            listingId={item._id}
            creator={item.creator}
            listingPhotoPaths={item.listingPhotoPaths}
            city={item.city}
            province={item.province}
            country={item.country}
            category={item.category}
            type={item.type}
            price={item.price}
            booking={item.booking}
          />
        ))}
      </div>

      <Footer />
    </>
  );
};

export default PropertyList;
