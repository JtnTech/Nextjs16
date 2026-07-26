// "use client";

// import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// import Spinner from "./Spinner";

// // Marker Images
// import red from "@/assets/images/red.png";
// import green from "@/assets/images/green.png";

// // Create Custom Marker Icon
// const propertyIcon = new L.Icon({
//   iconUrl: red.src,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// const userIcon = new L.Icon({
//   iconUrl: green.src,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });
// const PropertyMap = ({ property }) => {
//   // Stores loading state
//   const [loading, setLoading] = useState(true);

//   // Stores map coordinates
//   const [coordinates, setCoordinates] = useState(null);

//   // Runs whenever property changes
//   useEffect(() => {
//     if (property?.location?.lat && property?.location?.lng) {
//       setCoordinates([property.location.lat, property.location.lng]);

//       setLoading(false);
//     }
//   }, [property]);

//   // Show spinner while loading
//   if (loading) {
//     return (
//       <div className="h-[400px] flex items-center justify-center">
//         <Spinner />
//       </div>
//     );
//   }

//   // If coordinates are missing
//   if (!coordinates) {
//     return (
//       <div className="h-[400px] flex items-center justify-center">
//         No Location Available
//       </div>
//     );
//   }

//   return (
//     <MapContainer center={coordinates} zoom={13} className="w-full h-[400px]">
//       <TileLayer
//         attribution="&copy; OpenStreetMap contributors"
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />

//       {/* Property Marker */}
//       <Marker position={coordinates} icon={propertyIcon}>
//         <Popup>Property Location</Popup>
//       </Marker>

//       {/* User Marker */}
//       <Marker position={userCoordinates} icon={userIcon}>
//         <Popup>Your Current Location</Popup>
//       </Marker>
//     </MapContainer>
//   );
// };

// export default PropertyMap;




"use client";

import dynamic from "next/dynamic";
import Spinner from "./Spinner";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] flex items-center justify-center">
      <Spinner />
    </div>
  ),
});

export default function PropertyMap({ property }) {
  return <LeafletMap property={property} />;
}