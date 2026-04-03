import { createRoot } from "react-dom/client";
import "./tailwind.css"; //
import TicketBookingForm from "./TicketBookingForm"; 

const root = createRoot(document.getElementById("root"));

root.render(
  <div>
    <TicketBookingForm />
  </div>
);