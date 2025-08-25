import { useState, useEffect } from "react";
import "../styles/List.scss";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import Loader from "../components/Loader";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer"

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const { category } = useParams()

  const dispatch = useDispatch()
  const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    try {
      const response = await fetch(
          `http://localhost:3500/properties?category=${category}`,
          // `https://dream-nesxt.vercel.app/`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [category]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">{category} listings</h1>
      <div className="list">
        {listings?.map((item) => (
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

export default CategoryPage;
