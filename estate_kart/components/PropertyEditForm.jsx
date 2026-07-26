"use client";
import { FaLocationCrosshairs } from "react-icons/fa6";

import {
  FaHome,
  FaBuilding,
  FaFileAlt,
  FaMapMarkerAlt,
  FaRoad,
  FaCity,
  FaMap,
  FaMapPin,
  FaChevronDown,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaWifi,
  FaUtensils,
  FaTshirt,
  FaParking,
  FaSwimmingPool,
  FaHotTub,
  FaShieldAlt,
  FaWheelchair,
  FaArrowUp,
  FaSink,
  FaDumbbell,
  FaSnowflake,
  FaUmbrellaBeach,
  FaTv,
  FaCoffee,
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaImages,
  FaCloudUploadAlt,
  FaPaperPlane,
  FaMoneyBillWave,
  FaCalendarWeek,
  FaCalendarAlt,
  FaMoon,
  FaRupeeSign,
} from "react-icons/fa";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { fetchProperty } from "@/utils/requests";

const PropertyEditForm = () => {
  const { id } = useParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [fields, setFields] = useState({
    type: "Apartment",
    description: "",
    location: {
      street: "",
      city: "",
      state: "",
      zipcode: "",
      latitude: "30.844138",
      longitude: "75.837131",
    },
    beds: 1,
    baths: 1,
    square_feet: "",
    amenities: [],
    rates: {
      weekly: "",
      monthly: "",
      nightly: "",
    },
    seller_info: {
      name: "",
      email: "jane@gmail.com",
      phone: "",
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);

    // Fetch property data for form
    const fetchPropertyData = async () => {
      try {
        const propertyData = await fetchProperty(id);

        // Check rates for null, if so then make empty string
        if (propertyData && propertyData.rates) {
          const defaultRates = { ...propertyData.rates };
          for (const rate in defaultRates) {
            if (defaultRates[rate] === null) {
              defaultRates[rate] = "";
            }
          }
          propertyData.rates = defaultRates;
        }

        setFields(propertyData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [outerKey, innerKey] = name.split(".");

      setFields((prevFields) => ({
        ...prevFields,
        [outerKey]: {
          ...prevFields[outerKey],
          [innerKey]: value,
        },
      }));
    } else {
      setFields((prevFields) => ({
        ...prevFields,
        [name]: value,
      }));
    }
  };

  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;

    //clone the current arraye
    const updatedAmenities = [...fields.amenities];
    if (checked) {
      updatedAmenities.push(value);
    } else {
      //  remove value from array
      const index = updatedAmenities.indexOf(value);
      if (index !== -1) {
        updatedAmenities.splice(index, 1);
      }
    }

    setFields((prevFields) => ({
      ...prevFields,
      amenities: updatedAmenities,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const res = await fetch(`/api/properties/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (res.status === 200) {
        router.push(`/properties/${id}`);
        toast.success("Form updated successfully.");
      } else if (res.status === 401 || res.status === 403) {
        toast.error("Permission denied");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    mounted &&
    !loading && (
      <form onSubmit={handleSubmit}>
        {/* Heading */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <FaHome className="text-4xl text-blue-600" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">
              Edit Property
            </h2>
          </div>

          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Add the details below to edit your property listing.
          </p>
        </div>
        {/* Property Type */}
        <div className="mb-6">
          <label
            htmlFor="type"
            className="flex items-center gap-2 text-gray-800 font-semibold mb-2 text-lg"
          >
            <FaBuilding className="text-blue-600" />
            Property Type
          </label>

          <div className="relative">
            <select
              id="type"
              name="type"
              onChange={handleChange}
              value={fields.type}
              className="appearance-none w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-12 shadow-sm transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none hover:border-blue-400 cursor-pointer"
              required
            >
              <option value="Apartment">Apartment</option>
              <option value="Condo">Condo</option>
              <option value="House">House</option>
              <option value="Cabin Or Cottage">Cabin or Cottage</option>
              <option value="Room">Room</option>
              <option value="Studio">Studio</option>
              <option value="Other">Other</option>
            </select>

            {/* Custom Dropdown Icon */}
            <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none transition-colors duration-300" />
          </div>
        </div>
        {/* Listing Name */}
        <div className="mb-6">
          <label
            htmlFor="name"
            className="flex items-center gap-2 text-gray-800 font-semibold mb-2 text-lg"
          >
            <FaHome className="text-blue-600" />
            Listing Name
          </label>

          <input
            type="text"
            id="name"
            name="name"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm placeholder:text-gray-400 transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none hover:border-blue-400"
            placeholder="eg. Beautiful Apartment In Miami"
            required
            value={fields.name}
            onChange={handleChange}
          />
        </div>
        {/* Description */}
        <div className="mb-8">
          <label
            htmlFor="description"
            className="flex items-center gap-2 text-gray-800 font-semibold mb-2 text-lg"
          >
            <FaFileAlt className="text-blue-600" />
            Description
          </label>

          <textarea
            id="description"
            name="description"
            rows="5"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm resize-none placeholder:text-gray-400 transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none hover:border-blue-400"
            placeholder="Add an optional description of your property"
            value={fields.description}
            onChange={handleChange}
          ></textarea>
        </div>
        {/* Location */}
        <div className="mb-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-blue-50 p-6 shadow-lg">
          <h3 className="flex items-center gap-3 text-2xl font-bold text-blue-700 mb-6">
            <FaMapMarkerAlt className="text-red-500 text-2xl" />
            Property Location
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="street"
                className="flex items-center gap-2 text-gray-700 font-medium mb-2"
              >
                <FaRoad className="text-blue-500" />
                Street
              </label>

              <input
                type="text"
                id="street"
                name="location.street"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none hover:border-blue-400"
                placeholder="Street"
                value={fields.location.street}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="city"
                className="flex items-center gap-2 text-gray-700 font-medium mb-2"
              >
                <FaCity className="text-blue-500" />
                City
              </label>

              <input
                type="text"
                id="city"
                name="location.city"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none hover:border-blue-400"
                placeholder="City"
                required
                value={fields.location.city}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="state"
                className="flex items-center gap-2 text-gray-700 font-medium mb-2"
              >
                <FaMap className="text-blue-500" />
                State
              </label>

              <input
                type="text"
                id="state"
                name="location.state"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none hover:border-blue-400"
                placeholder="State"
                required
                value={fields.location.state}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="zipcode"
                className="flex items-center gap-2 text-gray-700 font-medium mb-2"
              >
                <FaMapPin className="text-blue-500" />
                Zipcode
              </label>

              <input
                type="text"
                id="zipcode"
                name="location.zipcode"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none hover:border-blue-400"
                placeholder="Zipcode"
                value={fields.location.zipcode}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="latitude"
                className="flex items-center gap-2 text-gray-700 font-medium mb-2"
              >
                <FaLocationCrosshairs className="text-blue-500" />
                Latitude
              </label>

              <p className="mb-2 text-sm text-gray-500">
                Enter the latitude to accurately locate the property on the
                map.{" "}
              </p>

              <input
                type="number"
                id="latitude"
                name="location.latitude"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none hover:border-blue-400"
                placeholder="Latitude"
                value={fields.location.latitude}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="longitude"
                className="flex items-center gap-2 text-gray-700 font-medium mb-2"
              >
                <FaLocationCrosshairs className="text-blue-500" />
                longitude
              </label>

              <p className="mb-2 text-sm text-gray-500">
                Enter the longitude to accurately locate the property on the
                map.{" "}
              </p>

              <input
                type="number"
                id="longitude"
                name="location.longitude"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none hover:border-blue-400"
                placeholder="longitude"
                value={fields.location.longitude}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="flex items-center gap-3 text-2xl font-bold text-blue-700 mb-6">
            <FaBed className="text-blue-600" />
            Property Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Beds */}
            <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-400">
              <label
                htmlFor="beds"
                className="flex items-center gap-2 text-gray-700 font-semibold mb-3"
              >
                <FaBed className="text-blue-600 text-lg" />
                Beds
              </label>

              <input
                type="number"
                id="beds"
                name="beds"
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none"
                placeholder="0"
                required
                value={fields.beds}
                onChange={handleChange}
              />
            </div>

            {/* Baths */}
            <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-400">
              <label
                htmlFor="baths"
                className="flex items-center gap-2 text-gray-700 font-semibold mb-3"
              >
                <FaBath className="text-blue-600 text-lg" />
                Baths
              </label>

              <input
                type="number"
                id="baths"
                name="baths"
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none"
                placeholder="0"
                required
                value={fields.baths}
                onChange={handleChange}
              />
            </div>

            {/* Square Feet */}
            <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-400">
              <label
                htmlFor="square_feet"
                className="flex items-center gap-2 text-gray-700 font-semibold mb-3"
              >
                <FaRulerCombined className="text-blue-600 text-lg" />
                Square Feet
              </label>

              <input
                type="number"
                id="square_feet"
                name="square_feet"
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none"
                placeholder="1200"
                required
                value={fields.square_feet}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* ================= Amenities ================= */}

        <div className="mb-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
              <FaHome className="text-2xl text-blue-600" />
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-blue-700">
                Property Amenities
              </h3>

              <p className="text-sm text-gray-500">
                Select all the facilities available with your property.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            <label
              htmlFor="amenity_wifi"
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg"
            >
              <input
                type="checkbox"
                id="amenity_wifi"
                name="amenities"
                value="Wifi"
                className="w-5 h-5 accent-blue-600"
                checked={fields.amenities.includes("Wifi")}
                onChange={handleAmenitiesChange}
              />
              <FaWifi className="text-blue-600 text-xl" />
              <span className="font-medium text-gray-700">WiFi</span>
            </label>

            {/* Full Kitchen */}
            <label
              htmlFor="amenity_kitchen"
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg"
            >
              <input
                type="checkbox"
                id="amenity_kitchen"
                name="amenities"
                value="Full Kitchen"
                className="w-5 h-5 accent-blue-600"
                checked={fields.amenities.includes("Full Kitchen")}
                onChange={handleAmenitiesChange}
              />
              <FaUtensils className="text-orange-500 text-xl" />
              <span className="font-medium text-gray-700">Full Kitchen</span>
            </label>

            {/* Washer & Dryer */}
            <label
              htmlFor="amenity_washer_dryer"
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg"
            >
              <input
                type="checkbox"
                id="amenity_washer_dryer"
                name="amenities"
                value="Washer & Dryer"
                className="w-5 h-5 accent-blue-600"
                checked={fields.amenities.includes("Washer & Dryer")}
                onChange={handleAmenitiesChange}
              />
              <FaTshirt className="text-pink-500 text-xl" />
              <span className="font-medium text-gray-700">Washer & Dryer</span>
            </label>

            {/* Free Parking */}
            <label
              htmlFor="amenity_free_parking"
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg"
            >
              <input
                type="checkbox"
                id="amenity_free_parking"
                name="amenities"
                value="Free Parking"
                className="w-5 h-5 accent-blue-600"
                checked={fields.amenities.includes("Free Parking")}
                onChange={handleAmenitiesChange}
              />
              <FaParking className="text-green-600 text-xl" />
              <span className="font-medium text-gray-700">Free Parking</span>
            </label>

            {/* Swimming Pool */}
            <label
              htmlFor="amenity_pool"
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg"
            >
              <input
                type="checkbox"
                id="amenity_pool"
                name="amenities"
                value="Swimming Pool"
                className="w-5 h-5 accent-blue-600"
                checked={fields.amenities.includes("Swimming Pool")}
                onChange={handleAmenitiesChange}
              />
              <FaSwimmingPool className="text-cyan-500 text-xl" />
              <span className="font-medium text-gray-700">Swimming Pool</span>
            </label>

            {/* Hot Tub */}
            <label
              htmlFor="amenity_hot_tub"
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg"
            >
              <input
                type="checkbox"
                id="amenity_hot_tub"
                name="amenities"
                value="Hot Tub"
                className="w-5 h-5 accent-blue-600"
                checked={fields.amenities.includes("Hot Tub")}
                onChange={handleAmenitiesChange}
              />
              <FaHotTub className="text-red-500 text-xl" />
              <span className="font-medium text-gray-700">Hot Tub</span>
            </label>
            <label
              htmlFor="amenity_24_7_security"
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg"
            >
              <input
                type="checkbox"
                id="amenity_24_7_security"
                name="amenities"
                value="24/7 Security"
                className="w-5 h-5 accent-blue-600"
                checked={fields.amenities.includes("24/7 Security")}
                onChange={handleAmenitiesChange}
              />
              <FaShieldAlt className="text-red-500 text-xl" />
              <span className="font-medium text-gray-700">24/7 Security</span>
            </label>

            {/* Wheelchair Accessible */}
            <label
              htmlFor="amenity_wheelchair_accessible"
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg"
            >
              <input
                type="checkbox"
                id="amenity_wheelchair_accessible"
                name="amenities"
                value="Wheelchair Accessible"
                className="w-5 h-5 accent-blue-600"
                checked={fields.amenities.includes("Wheelchair Accessible")}
                onChange={handleAmenitiesChange}
              />
              <FaWheelchair className="text-blue-500 text-xl" />
              <span className="font-medium text-gray-700">
                Wheelchair Accessible
              </span>
            </label>

            {/* Elevator Access */}
            <label
              htmlFor="amenity_elevator_access"
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg"
            >
              <input
                type="checkbox"
                id="amenity_elevator_access"
                name="amenities"
                value="Elevator Access"
                className="w-5 h-5 accent-blue-600"
                checked={fields.amenities.includes("Elevator Access")}
                onChange={handleAmenitiesChange}
              />
              <FaArrowUp className="text-purple-600 text-xl" />
              <span className="font-medium text-gray-700">Elevator Access</span>
            </label>

            {/* Dishwasher */}
            <label
              htmlFor="amenity_dishwasher"
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg"
            >
              <input
                type="checkbox"
                id="amenity_dishwasher"
                name="amenities"
                value="Dishwasher"
                className="w-5 h-5 accent-blue-600"
                checked={fields.amenities.includes("Dishwasher")}
                onChange={handleAmenitiesChange}
              />
              <FaSink className="text-cyan-600 text-xl" />
              <span className="font-medium text-gray-700">Dishwasher</span>
            </label>

            {/* Gym & Fitness Center */}
            <label
              htmlFor="amenity_gym_fitness_center"
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg"
            >
              <input
                type="checkbox"
                id="amenity_gym_fitness_center"
                name="amenities"
                value="Gym/Fitness Center"
                className="w-5 h-5 accent-blue-600"
                checked={fields.amenities.includes("Gym/Fitness Center")}
                onChange={handleAmenitiesChange}
              />
              <FaDumbbell className="text-orange-500 text-xl" />
              <span className="font-medium text-gray-700">
                Gym / Fitness Center
              </span>
            </label>

            <label
              htmlFor="amenity_air_conditioning"
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg"
            >
              <input
                type="checkbox"
                id="amenity_air_conditioning"
                name="amenities"
                value="Air Conditioning"
                className="w-5 h-5 accent-blue-600"
                checked={fields.amenities.includes("Air Conditioning")}
                onChange={handleAmenitiesChange}
              />
              <FaSnowflake className="text-sky-500 text-xl" />
              <span className="font-medium text-gray-700">
                Air Conditioning
              </span>
            </label>

            <label
              htmlFor="amenity_balcony_patio"
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg"
            >
              <input
                type="checkbox"
                id="amenity_balcony_patio"
                name="amenities"
                value="Balcony/Patio"
                className="w-5 h-5 accent-blue-600"
                checked={fields.amenities.includes("Balcony/Patio")}
                onChange={handleAmenitiesChange}
              />
              <FaUmbrellaBeach className="text-amber-500 text-xl" />
              <span className="font-medium text-gray-700">Balcony / Patio</span>
            </label>

            <label
              htmlFor="amenity_smart_tv"
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg"
            >
              <input
                type="checkbox"
                id="amenity_smart_tv"
                name="amenities"
                value="Smart TV"
                className="w-5 h-5 accent-blue-600"
                checked={fields.amenities.includes("Smart TV")}
                onChange={handleAmenitiesChange}
              />
              <FaTv className="text-indigo-600 text-xl" />
              <span className="font-medium text-gray-700">Smart TV</span>
            </label>

            <label
              htmlFor="amenity_coffee_maker"
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg"
            >
              <input
                type="checkbox"
                id="amenity_coffee_maker"
                name="amenities"
                value="Coffee Maker"
                className="w-5 h-5 accent-blue-600"
                checked={fields.amenities.includes("Coffee Maker")}
                onChange={handleAmenitiesChange}
              />
              <FaCoffee className="text-amber-700 text-xl" />
              <span className="font-medium text-gray-700">Coffee Maker</span>
            </label>
          </div>
        </div>
        {/* ================= Amenities ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"></div>
        {/* Rates Section */}
        <div className="mb-10 rounded-3xl bg-gradient-to-br from-blue-50 via-white to-indigo-50 border border-blue-100 p-6 md:p-8 shadow-lg">
          {/* Heading */}

          <div className="flex items-center gap-3 mb-2">
            <FaMoneyBillWave className="text-3xl text-green-600" />

            <h3 className="text-2xl md:text-3xl font-bold text-blue-700">
              Property Rates
            </h3>
          </div>

          <p className="text-gray-500 mb-8">
            Leave any field blank if that pricing option isn't available.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Weekly */}

            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300">
              <label
                htmlFor="weekly_rate"
                className="flex items-center gap-2 text-gray-700 font-semibold mb-3"
              >
                <FaCalendarWeek className="text-blue-600" />
                Weekly Rate
              </label>

              <div className="relative">
                <FaRupeeSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                <input
                  type="number"
                  id="weekly_rate"
                  name="rates.weekly"
                  placeholder="5000"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none"
                  value={fields.rates.weekly}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Monthly */}

            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300">
              <label
                htmlFor="monthly_rate"
                className="flex items-center gap-2 text-gray-700 font-semibold mb-3"
              >
                <FaCalendarAlt className="text-green-600" />
                Monthly Rate
              </label>

              <div className="relative">
                <FaRupeeSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                <input
                  type="number"
                  id="monthly_rate"
                  name="rates.monthly"
                  placeholder="18000"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none"
                  value={fields.rates.monthly}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Nightly */}

            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300">
              <label
                htmlFor="nightly_rate"
                className="flex items-center gap-2 text-gray-700 font-semibold mb-3"
              >
                <FaMoon className="text-indigo-600" />
                Nightly Rate
              </label>

              <div className="relative">
                <FaRupeeSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                <input
                  type="number"
                  id="nightly_rate"
                  name="rates.nightly"
                  placeholder="1200"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none"
                  value={fields.rates.nightly}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Seller Information */}
        <div className="mb-10 rounded-3xl bg-gradient-to-br from-blue-50 via-white to-indigo-50 border border-blue-100 p-6 md:p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <FaUser className="text-3xl text-blue-600" />

            <h3 className="text-2xl md:text-3xl font-bold text-blue-700">
              Seller Information
            </h3>
          </div>

          <p className="text-gray-500 mb-8">
            Enter your contact information so buyers can reach you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Seller Name */}

            <div>
              <label
                htmlFor="seller_name"
                className="flex items-center gap-2 font-semibold text-gray-700 mb-3"
              >
                <FaUser className="text-blue-600" />
                Seller Name
              </label>

              <input
                type="text"
                id="seller_name"
                name="seller_info.name."
                placeholder="John Doe"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none"
                value={fields.seller_info.name}
                onChange={handleChange}
              />
            </div>

            {/* Seller Email */}

            <div>
              <label
                htmlFor="seller_email"
                className="flex items-center gap-2 font-semibold text-gray-700 mb-3"
              >
                <FaEnvelope className="text-red-500" />
                Seller Email
              </label>

              <input
                type="email"
                id="seller_email"
                name="seller_info.email"
                placeholder="john@gmail.com"
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none"
                value={fields.seller_info.email}
                onChange={handleChange}
              />
            </div>

            {/* Seller Phone */}

            <div className="md:col-span-2">
              <label
                htmlFor="seller_phone"
                className="flex items-center gap-2 font-semibold text-gray-700 mb-3"
              >
                <FaPhoneAlt className="text-green-600" />
                Seller Phone
              </label>

              <input
                type="tel"
                id="seller_phone"
                name="seller_info.phone"
                placeholder="+91 9876543210"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none"
                value={fields.seller_info.phone}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        {/* Upload Images */}

        {/* Submit Button */}
        <div className="mt-10">
          <button
            type="submit"
            className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 py-4 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <span className="flex items-center justify-center gap-3">
              <FaPaperPlane className="transition-transform duration-300 group-hover:translate-x-1" />
              Edit Property
            </span>
          </button>
        </div>
      </form>
    )
  );
};

export default PropertyEditForm;
