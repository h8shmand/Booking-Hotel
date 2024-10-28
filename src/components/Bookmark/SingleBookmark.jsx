import { useNavigate, useParams } from "react-router-dom";
import { useBookmarks } from "../context/bookmarksProvider";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";

export default function SingleBookmark() {
  const navigate = useNavigate();
  const { currentBookmark, isCurrentBookmarkLoading, getBookmark } =
    useBookmarks();
  const { id, lat, lng } = useParams();

  useEffect(() => {
    getBookmark(id);
  }, [id]);
  if (isCurrentBookmarkLoading || !currentBookmark) return <Loader />;
  return (
    <div className="currentBookmark">
      <button onClick={() => navigate(-1)} className="btn btn--back">
        &larr; Back
      </button>
      <h2>{currentBookmark.cityName}</h2>
      <div className={`bookmarkItem`}>
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
        &nbsp; <strong>{currentBookmark.cityName}</strong> &nbsp;
        <span>{currentBookmark.country}</span>
      </div>
    </div>
  );
}
