import { useEffect, useState } from "react";
import createPopupClass from "../Utilities/customOverlay";

export default function useGoogleMapPopup({
  position,
  type,
  maps,
  map,
  events,
  title
}) {
  const [container, setContainer] = useState();
  useEffect(() => {
    const Popup = createPopupClass(maps);
    const content = document.createElement("div");
    const popup = new Popup(position, content);
    popup.setMap(map);
    setContainer(content);
  }, []);

  return container;
}
