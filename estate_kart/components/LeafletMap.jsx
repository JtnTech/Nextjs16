// "use client";

// import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// import red from "@/assets/images/red.png";
// import green from "@/assets/images/green.png";

// const propertyIcon = new L.Icon({
//   iconUrl: red.src,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
// });

// const userIcon = new L.Icon({
//   iconUrl: green.src,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
// });
// console.log(red);
// console.log(green);
// export default function LeafletMap({ property }) {
//   const [coordinates, setCoordinates] = useState(null);
//   const [userCoordinates, setUserCoordinates] = useState(null);

//  useEffect(() => {
//   console.log("Property:", property);
//   console.log("Location:", property?.location);
//   console.log("Latitude:", property?.location?.latitude);
//   console.log("Longitude:", property?.location?.longitude);

//   if (property?.location?.latitude && property?.location?.longitude) {
//     setCoordinates([
//       Number(property.location.latitude),
//       Number(property.location.longitude),
//     ]);
//   }
// }, [property]);

//   if (!coordinates) return <div>No Location Available</div>;

//   return (
//     <MapContainer
//       center={[latitude, longitude]}
//       zoom={13}
//       className="w-full h-[400px]"
//     >
//       <TileLayer
//         attribution="&copy; OpenStreetMap contributors"
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />

//       {/* Property Marker */}
//       <Marker position={coordinates} icon={propertyIcon}>
//         <Popup>Property Location</Popup>
//       </Marker>

//       {/* User Marker */}
//       {userCoordinates && (
//         <Marker position={userCoordinates} icon={userIcon}>
//           <Popup>Your Current Location</Popup>
//         </Marker>
//       )}
//     </MapContainer>
//   );
// }




// "use client";

// import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// import red from "@/assets/images/red.png";
// import green from "@/assets/images/green.png";

// const propertyIcon = new L.Icon({
//   iconUrl: red.src,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
// });

// const userIcon = new L.Icon({
//   iconUrl: green.src,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
// });
// console.log(red);
// console.log(green);

// export default function LeafletMap({ property }) {
//   const [coordinates, setCoordinates] = useState(null);
//   const [userCoordinates, setUserCoordinates] = useState(null);

//   useEffect(() => {
//     console.log("Property:", property);
//     console.log("Location:", property?.location);
//     console.log("Latitude:", property?.location?.latitude);
//     console.log("Longitude:", property?.location?.longitude);

//     if (property?.location?.latitude && property?.location?.longitude) {
//       setCoordinates([
//         Number(property?.location?.latitude),
//         Number(property?.location?.longitude),
//       ]);
//     }
//   }, [property]);

//   if (!coordinates) return <div>No Location Available</div>;

//   return (
//     <MapContainer
//       /* FIXED: Replaced undefined [latitude, longitude] variables with the structured `coordinates` state array */
//       center={coordinates}
//       zoom={13}
//       className="w-full h-[400px]"
//     >
//       <TileLayer
//         attribution="&copy; OpenStreetMap contributors"
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />

//       {/* Property Marker */}
//       <Marker position={coordinates} icon={propertyIcon}>
//         <Popup>Property Location</Popup>
//       </Marker>

//       {/* User Marker */}
//       {userCoordinates && (
//         <Marker position={userCoordinates} icon={userIcon}>
//           <Popup>Your Current Location</Popup>
//         </Marker>
//       )}
//     </MapContainer>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import red from "@/assets/images/red.png";
import green from "@/assets/images/green.png";

const propertyIcon = new L.Icon({
  iconUrl: red.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const userIcon = new L.Icon({
  iconUrl: green.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
console.log(red);
console.log(green);

export default function LeafletMap({ property }) {
  const [coordinates, setCoordinates] = useState(null);
  const [userCoordinates, setUserCoordinates] = useState(null);

  useEffect(() => {
    console.log("Property:", property);
    console.log("Location:", property?.location);
    console.log("Latitude:", property?.location?.latitude);
    console.log("Longitude:", property?.location?.longitude);

    if (property?.location?.latitude && property?.location?.longitude) {
      setCoordinates([
        Number(property?.location?.latitude),
        Number(property?.location?.longitude),
      ]);
    }
  }, [property]);

  /* ADDED: This effect triggers the browser's prompt to ask the user for their location permission */
  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCoordinates([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  }, []);

  if (!coordinates) return <div>No Location Available</div>;

  return (
    <MapContainer
      /* FIXED: Replaced undefined [latitude, longitude] variables with the structured `coordinates` state array */
      center={coordinates}
      zoom={13}
      className="w-full h-[400px]"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Property Marker */}
      <Marker position={coordinates} icon={propertyIcon}>
        <Popup>Property Location</Popup>
      </Marker>

      {/* User Marker */}
      {userCoordinates && (
        <Marker position={userCoordinates} icon={userIcon}>
          <Popup>Your Current Location</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}