import { useParams } from "react-router-dom";
import "../styles/List.scss"
import { useSelector,useDispatch  } from "react-redux";
import { setListings } from "../redux/state";
import { useEffect, useState } from "react";
import Loader from "../components/Loader"
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer"


const SearchPage = ({searchResults}) => {
  
  const [loading, setLoading] = useState(true)
  const { search } = useParams()
  const listings = useSelector((state) => state.listings)
  
  const dispatch = useDispatch()

  const getSearchListings = async () => {
    try {
      const response = await fetch(`http://localhost:3500/properties/search/${search}`, {
        // const response = await fetch(`https://dream-nesxt.vercel.app/properties/search/${search}`, {
        method: "GET"
      })

      const data = await response.json()
      dispatch(setListings({ listings: data }))
      setLoading(false)
    } catch (err) {
      console.log("Fetch Search List failed!", err.message)
    }
  }

  useEffect(() => {
    getSearchListings()
  }, [search])
  
  return loading ? <Loader /> : (
    <>
      <Navbar />
      <h1 className="title-list">{search}</h1>
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
}

export default SearchPage;

export async function getServerSideProps(){
  const searchResults = await fetch(`https://dream-nesxt.vercel.app/`)
  .then(
    (res) => res.json()
  );

  return {
    props: {
      searchResults,
    },
  };
}