import { useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import Loader from "../Loader/Loader";
import { useHotels } from "../context/HotelsProvider";
import { useEffect } from "react";

export default function SingleHotel() {
  const { id } = useParams();
  const { getHotel, currentHotel, isCurrentHotelLoading } = useHotels();
  useEffect(() => {
    console.log(typeof getHotel);

    getHotel(id);
  }, [id]);
  if (isCurrentHotelLoading || !currentHotel) return <Loader />;
  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{currentHotel.name}</h2>
        <div>
          {currentHotel.number_of_reviews} reviews &bull;{" "}
          {currentHotel.smart_location}
        </div>
        <img src={currentHotel.xl_picture_url} alt={currentHotel.name} />
      </div>
    </div>
  );
}
