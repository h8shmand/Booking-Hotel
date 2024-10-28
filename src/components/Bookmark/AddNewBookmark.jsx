import axios from "axios";
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useBookmarks } from "../context/bookmarksProvider";

export default function AddNewBookmark() {
  const [country, setCountry] = useState("");
  const [cityName, setCityName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const [data, setData] = useState(null);
  const { createBookmark } = useBookmarks();
  async function handleAddBookmark(e) {
    e.preventDefault();
    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: country + " " + cityName,
    };
    await createBookmark(newBookmark);
    navigate("/bookmarks");
  }
  useEffect(() => {
    async function getLocationDetails() {
      try {
        const { data } = await axios.get(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        setData(data);
        console.log(data);

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getLocationDetails();
  }, [lat, lng]);
  return (
    <div>
      <h2>Add New Bookmark</h2>
      <form className="form">
        <div className="formControl">
          <label htmlFor="cityName">CityName</label>
          <input
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            type="text"
            name="cityName"
            id="cityName"
          />
        </div>
        <div className="formControl">
          <label htmlFor="country">Country</label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            name="country"
            id="country"
          />
          <ReactCountryFlag className="flag" svg countryCode={countryCode} />
        </div>
        <div className="buttons">
          <button
            className="btn btn--back"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            &larr; Back
          </button>
          <button className="btn btn--primary" onClick={handleAddBookmark}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
