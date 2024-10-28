import { Children, createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const HotelContext = createContext(null);

export default function HotelsProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const date = JSON.parse(searchParams.get("date"));
  const options = JSON.parse(searchParams.get("options"));
  const isOptionsNull = !Boolean(options && true);
  console.log();
  const [currentHotel, setCurrentHotel] = useState(null);
  const [isCurrentHotelLoading, setIsCurrentHotelLoading] = useState(false);
  const { data, isLoading } = useFetch(
    "http://localhost:5000/hotels",
    `q=${destination || ""}&accommodates_gte=${
      isOptionsNull ? 1 : options.room
    }`
  );
  async function getHotel(id) {
    try {
      setIsCurrentHotelLoading(true);
      const { data } = await axios.get(`http://localhost:5000/hotels/${id}`);
      setCurrentHotel(data);
      setIsCurrentHotelLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsCurrentHotelLoading(false);
    }
  }
  return (
    <HotelContext.Provider
      value={{ data, isLoading, currentHotel, isCurrentHotelLoading, getHotel }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export function useHotels() {
  return useContext(HotelContext);
}
