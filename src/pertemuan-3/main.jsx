import { createRoot } from "react-dom/client";
import LatihanTailwind from "./LatihanTailwind";
import './tailwind.css';
import HitungGajiForm from "./HitungGajiForm";

createRoot(document.getElementById("root"))
    .render(
        <div>
        {/* <LatihanTailwind/> */} 
            <HitungGajiForm />
        </div>
    )