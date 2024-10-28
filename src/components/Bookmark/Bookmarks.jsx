import { Link } from "react-router-dom";
import { useBookmarks } from "../context/bookmarksProvider";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";
import { HiTrash } from "react-icons/hi";
export default function Bookmarks() {
  const { bookmarks, isLoading, deleteBookmark, currentBookmark } =
    useBookmarks();
  async function handleDelete(e, id) {
    e.preventDefault();
    await deleteBookmark(id);
  }
  if (isLoading) return <Loader />;
  return (
    <div className="bookmarkList">
      {bookmarks.map((item) => {
        return (
          <Link
            key={item.id}
            to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div
              className={`bookmarkItem ${
                item.id === currentBookmark?.id ? "current-bookmark" : ""
              }`}
            >
              <div>
                <ReactCountryFlag svg countryCode={item.countryCode} />
                &nbsp; <strong>{item.cityName}</strong> &nbsp;
                <span>{item.country}</span>
              </div>
              <button onClick={(e) => handleDelete(e, item.id)}>
                <HiTrash className="trash" />
              </button>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
