import { useMap } from "react-leaflet";
import { useEffect } from "react";

export default function FlyToLocation({ position }: any) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 10); // يتحرك للموقع مع animation
    }
  }, [position]);

  return null;
}