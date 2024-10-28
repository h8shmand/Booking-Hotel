import { Outlet } from "react-router-dom";
import Map from "./Map/Map";
import { useHotels } from "./context/HotelsProvider";
export default function HotelsLayout() {
  const { data } = useHotels();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map locationsToMark={data} />
    </div>
  );
}
