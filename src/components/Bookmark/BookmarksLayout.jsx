import { Outlet } from "react-router-dom";
import { useBookmarks } from "../context/bookmarksProvider";
import Map from "../Map/Map";

export default function BookmarksLayout() {
  const { bookmarks } = useBookmarks();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map locationsToMark={bookmarks} />
    </div>
  );
}
