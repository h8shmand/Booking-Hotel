import { useState } from "react";
export default function useGeoPositions() {
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [position, setPosition] = useState({});
  setIsLoadingLocation(true);
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      setPosition({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
      setIsLoadingLocation(false);
    },
    () => {
      toast.error("There was an issue to get your location!");
      setIsLoadingLocation(false);
    }
  );
  return { isLoadingLocation, position };
}
