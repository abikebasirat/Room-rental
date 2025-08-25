import "../styles/List.scss";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer"

const WishList = () => {
  const wishList = useSelector((state) => state.user.wishList);

  return (
    <>
      <Navbar />
      <h1 className="title-list">Your Wish List</h1>
      <div className="list">
        {wishList?.map((item) => (
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

export default WishList;
