import { useMapEvents } from "react-leaflet";

export default function MapClick({ setPosition }: any) {

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      console.log(e)

      console.log(lat, lng);

      setPosition([lat, lng]);
    },
  });

  return null;
}