import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Menu from "../icons/menu";
import TurnPopup from "./c-turn";

export default function Header() {
  const [popup, setPopup] = useState(false);
  return (
    <>
      <button className="btn-menu" onClick={() => setPopup(true)}>
        <Menu />
      </button>
      <AnimatePresence>
        {popup && <TurnPopup setPopup={setPopup} />}
      </AnimatePresence>
    </>
  );
}

// <img src="imgs/logo-gunjop.svg" alt="" />
//       <span>{isOnline ? <Wifi /> : <OffWifi />}</span>
