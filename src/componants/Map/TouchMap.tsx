import { useMapEvents } from "react-leaflet";

export default function MapClick({ setPosition }: any) {

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;


      setPosition([lat, lng]);
    },
  });

  return null;
}