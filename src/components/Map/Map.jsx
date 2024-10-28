import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useHotels } from "../context/HotelsProvider";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function Map({ locationsToMark }) {
  const [mapCenter, setMapCenter] = useState([50, 3]);
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);
  /************************ */
  function handleGetLocation() {
    setIsLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setMapCenter([pos.coords.latitude, pos.coords.longitude]);
        setIsLoadingLocation(false);
      },
      () => {
        toast.error("There was an issue to get your location!");
        setIsLoadingLocation(false);
      }
    );
  }
  return (
    <MapContainer
      className="mapContainer"
      center={mapCenter}
      zoom={8}
      scrollWheelZoom={true}
    >
      <button className="getLocation" onClick={handleGetLocation}>
        {isLoadingLocation ? "Loading..." : "Use your location"}
      </button>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />
      <ClickDetector />
      <ChangeCenter position={mapCenter} />
      {locationsToMark &&
        locationsToMark.map((item) => {
          return (
            <Marker key={item.id} position={[item.latitude, item.longitude]}>
              <Popup>{item.name}</Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
}
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  map.setZoom(15);
}

function ClickDetector() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) =>
      navigate(`/bookmarks/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });

  return null;
}
