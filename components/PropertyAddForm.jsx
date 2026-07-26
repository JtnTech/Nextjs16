"use client";

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
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";

import { FaLocationCrosshairs } from "react-icons/fa6";
import { useState, useEffect } from "react";

const PropertyAddForm = () => {
  const [mounted, setMounted] = useState(false);
  const [imageError, setImageError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [countryCode, setCountryCode] = useState("+91");

  const [fields, setFields] = useState({
    name: "",
    type: "Apartment",
    description: "",
    location: {
      street: "",
      city: "",
      state: "",
      zipcode: "",
      latitude: "",
      longitude: "",
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
    images: [],
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Clean up Object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

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
    const updatedAmenities = [...fields.amenities];

    if (checked) {
      updatedAmenities.push(value);
    } else {
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

  const handleImageChange = (e) => {
    const { files } = e.target;
    if (!files || files.length === 0) return;

    setImageError("");
    const newFiles = Array.from(files);
    const updatedImages = [...fields.images, ...newFiles];

    if (updatedImages.length > 4) {
      setImageError("You can upload a maximum of 4 images.");
      return;
    }

    // Generate local URLs for previewing
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);

    setFields((prevFields) => ({
      ...prevFields,
      images: updatedImages,
    }));
  };

  const removeImage = (indexToRemove) => {
    setImageError("");

    // Revoke URL to clear browser memory
    URL.revokeObjectURL(imagePreviews[indexToRemove]);

    setImagePreviews((prev) => prev.filter((_, i) => i !== indexToRemove));
    setFields((prevFields) => ({
      ...prevFields,
      images: prevFields.images.filter((_, i) => i !== indexToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setImageError("");
    setSubmitSuccess(false);

    const zipPattern = /^[0-9]{5,6}$/;
    if (!zipPattern.test(fields.location.zipcode)) {
      alert("Submission Blocked: Please enter a valid 5 or 6 digit Zipcode.");
      return; 
    }

    // 2. CITY HARD RESTRICTION CHECK
    if (!fields.location.city || fields.location.city.trim().length < 2) {
      alert("Submission Blocked: Please enter a valid City name.");
      return;
    }

    // 3. STATE HARD RESTRICTION CHECK
    if (!fields.location.state || fields.location.state.trim().length < 2) {
      alert("Submission Blocked: Please enter a valid State name.");
      return;
    }

    // Build FormData object for API route (handles file arrays natively)
    const formData = new FormData();

    formData.append("name", fields.name);
    formData.append("type", fields.type);
    formData.append("description", fields.description);
    formData.append("beds", fields.beds);
    formData.append("baths", fields.baths);
    formData.append("square_feet", fields.square_feet);

    formData.append("location.street", fields.location.street);
    formData.append("location.city", fields.location.city);
    formData.append("location.state", fields.location.state);
    formData.append("location.zipcode", fields.location.zipcode);
    formData.append("location.latitude", fields.location.latitude);
    formData.append("location.longitude", fields.location.longitude);

    fields.amenities.forEach((amenity) =>
      formData.append("amenities", amenity),
    );

    formData.append("rates.weekly", fields.rates.weekly);
    formData.append("rates.monthly", fields.rates.monthly);
    formData.append("rates.nightly", fields.rates.nightly);

    formData.append("seller_info.name", fields.seller_info.name);
    formData.append("seller_info.email", fields.seller_info.email);
    formData.append("seller_info.phone", fields.seller_info.phone);

    fields.images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await fetch("/api/properties", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSubmitSuccess(true);
        // Optional: clear state after success
        setImagePreviews([]);
        setFields({
          name: "",
          type: "Apartment",
          description: "",
          location: {
            street: "",
            city: "",
            state: "",
            zipcode: "",
            latitude: "",
            longitude: "",
          },
          beds: 1,
          baths: 1,
          square_feet: "",
          amenities: [],
          rates: { weekly: "", monthly: "", nightly: "" },
          seller_info: { name: "", email: "jane@gmail.com", phone: "" },
          images: [],
        });
      } else {
        setImageError("Failed to submit property. Please check inputs.");
      }
    } catch (error) {
      setImageError("A connection error occurred. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-3xl shadow-xl border border-gray-100">
      {/* Success Notification Banner */}
      {submitSuccess && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 flex items-center gap-3 shadow-sm animate-fade-in">
          <FaCheckCircle className="text-green-600 text-2xl flex-shrink-0" />
          <div>
            <p className="font-bold">Success!</p>
            <p className="text-sm">
              Your property profile has been listed successfully.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Heading */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <FaHome className="text-4xl text-blue-600" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">
              Add Property
            </h2>
          </div>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Fill in the details below to list your property.
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
              className="appearance-none w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-12 shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none hover:border-blue-400 cursor-pointer"
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
            <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
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
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none hover:border-blue-400"
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
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm resize-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none hover:border-blue-400"
            placeholder="Add an optional description of your property"
            value={fields.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Location Section */}
        <div className="mb-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-blue-50 p-6 shadow-lg">
          <h3 className="flex items-center gap-3 text-2xl font-bold text-blue-700 mb-6">
            <FaMapMarkerAlt className="text-red-500 text-2xl" />
            Property Location
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="street" className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                <FaRoad className="text-blue-500" /> Street
              </label>
              <input
                type="text"
                id="street"
                name="location.street"
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none invalid:border-red-500"
                placeholder="e.g. 123 Main St"
                value={fields.location.street}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="city" className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                <FaCity className="text-blue-500" /> City
              </label>
              <input
                type="text"
                id="city"
                name="location.city"
                required
                className={`w-full rounded-xl border px-4 py-3 shadow-sm outline-none transition-all duration-200 focus:ring-4 focus:ring-blue-100 ${
                  fields.location.city && fields.location.city.trim().length < 2
                    ? "border-red-500 text-red-600 focus:border-red-500"
                    : "border-gray-300 bg-white focus:border-blue-500"
                }`}
                placeholder="e.g. Mumbai"
                value={fields.location.city}
                onChange={(e) => {
                  // Hard Filter: Rejects digits or punctuation instantly
                  const val = e.target.value.replace(/[^a-zA-Z\s-]/g, "");
                  handleChange({ target: { name: "location.city", value: val } });
                }}
              />
              {fields.location.city && fields.location.city.trim().length < 2 && (
                <p className="text-xs text-red-500 mt-1.5 font-medium">Please enter a valid city name</p>
              )}
            </div>

            <div>
              <label htmlFor="state" className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                <FaMap className="text-blue-500" /> State
              </label>
              <input
                type="text"
                id="state"
                name="location.state"
                required
                className={`w-full rounded-xl border px-4 py-3 shadow-sm outline-none transition-all duration-200 focus:ring-4 focus:ring-blue-100 ${
                  fields.location.state && fields.location.state.trim().length < 2
                    ? "border-red-500 text-red-600 focus:border-red-500"
                    : "border-gray-300 bg-white focus:border-blue-500"
                }`}
                placeholder="e.g. Maharashtra"
                value={fields.location.state}
                onChange={(e) => {
                  // Hard Filter: Rejects digits or punctuation instantly
                  const val = e.target.value.replace(/[^a-zA-Z\s-]/g, "");
                  handleChange({ target: { name: "location.state", value: val } });
                }}
              />
              {fields.location.state && fields.location.state.trim().length < 2 && (
                <p className="text-xs text-red-500 mt-1.5 font-medium">Please enter a valid state name</p>
              )}
            </div>

           <div>
              <label htmlFor="zipcode" className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                <FaMapPin className="text-blue-500" /> Zipcode
              </label>
              <input
                type="text"
                id="zipcode"
                name="location.zipcode"
                required
                className={`w-full rounded-xl border px-4 py-3 shadow-sm outline-none transition-all duration-200 focus:ring-4 focus:ring-blue-100 ${
                  fields.location.zipcode && !/^[0-9]{5,6}$/.test(fields.location.zipcode)
                    ? "border-red-500 text-red-600 focus:border-red-500"
                    : "border-gray-300 bg-white focus:border-blue-500"
                }`}
                placeholder="e.g. 400001 or 90210"
                value={fields.location.zipcode}
                onChange={(e) => {
                  // Hard Filter: Instantly destroys any text/special characters typed
                  const val = e.target.value.replace(/\D/g, "");
                  // Length Limit: Blocks typing more than 6 digits completely
                  if (val.length <= 6) {
                    handleChange({ target: { name: "location.zipcode", value: val } });
                  }
                }}
              />
              {/* Dynamic Error Messaging */}
              {fields.location.zipcode && fields.location.zipcode.length < 5 && (
                <p className="text-xs text-red-500 mt-1.5 font-medium animate-pulse">
                  Zipcode is too short (Must be 5 or 6 digits)
                </p>
              )}
            </div>

            {/* Longitude and Latitude  */}
            <div>
              <label
                htmlFor="latitude"
                className="flex items-center gap-2 text-gray-700 font-medium mb-2"
              >
                <FaLocationCrosshairs className="text-blue-500" />
                Latitude
              </label>
              <input
                type="text"
                inputMode="decimal"
                id="latitude"
                name="location.latitude"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none"
                placeholder="e.g. 28.6139"
                value={fields.location.latitude}
                onChange={(e) => {
                  // 1. Strip everything except numbers, dots, and minus signs
                  // 2. Prevent entering multiple decimal points
                  // 3. Prevent putting a minus sign anywhere except the very beginning
                  const val = e.target.value
                    .replace(/[^0-9.-]/g, "")
                    .replace(/(\..*?)\..*/g, "$1")
                    .replace(/(?!^)-/g, "");

                  handleChange({
                    target: { name: "location.latitude", value: val },
                  });
                }}
                onBlur={(e) => {
                  const val = e.target.value;
                  if (val && !val.includes(".") && !isNaN(val)) {
                    // Converts whole numbers like 38 into 38.0000 dynamically on blur
                    handleChange({
                      target: {
                        name: "location.latitude",
                        value: parseFloat(val).toFixed(4),
                      },
                    });
                  }
                }}
              />
            </div>
            <div>
              <label
                htmlFor="longitude"
                className="flex items-center gap-2 text-gray-700 font-medium mb-2"
              >
                <FaLocationCrosshairs className="text-blue-500" />
                Longitude
              </label>
              <input
                type="text"
                inputMode="decimal"
                id="longitude"
                name="location.longitude"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none"
                placeholder="e.g. 77.2090"
                value={fields.location.longitude}
                onChange={(e) => {
                  // 1. Strip everything except numbers, dots, and minus signs
                  // 2. Prevent entering multiple decimal points
                  // 3. Prevent putting a minus sign anywhere except the very beginning
                  const val = e.target.value
                    .replace(/[^0-9.-]/g, "")
                    .replace(/(\..*?)\..*/g, "$1")
                    .replace(/(?!^)-/g, "");

                  handleChange({
                    target: { name: "location.longitude", value: val },
                  });
                }}
                onBlur={(e) => {
                  const val = e.target.value;
                  if (val && !val.includes(".") && !isNaN(val)) {
                    // Converts whole numbers like 77 into 77.0000 dynamically on blur
                    handleChange({
                      target: {
                        name: "location.longitude",
                        value: parseFloat(val).toFixed(4),
                      },
                    });
                  }
                }}
              />
            </div>
            {/* Longitude and Latitude  */}
          </div>
        </div>

        {/* Property Details Section */}
        <div className="mb-8">
          <h3 className="flex items-center gap-3 text-2xl font-bold text-blue-700 mb-6">
            <FaBed className="text-blue-600" />
            Property Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
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
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 focus:border-blue-500 outline-none"
                required
                value={fields.beds}
                onChange={handleChange}
              />
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
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
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 focus:border-blue-500 outline-none"
                required
                value={fields.baths}
                onChange={handleChange}
              />
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
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
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 focus:border-blue-500 outline-none"
                required
                value={fields.square_feet}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Amenities Section */}
        <div className="mb-8">
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

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            {/* WiFi */}
            <label
              htmlFor="amenity_wifi"
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 cursor-pointer hover:bg-blue-50"
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
              <FaWifi className="text-blue-600 text-xl" />{" "}
              <span className="font-medium text-gray-700">WiFi</span>
            </label>

            {/* Full Kitchen */}
            <label
              htmlFor="amenity_kitchen"
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 cursor-pointer hover:bg-blue-50"
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
              <FaUtensils className="text-orange-500 text-xl" />{" "}
              <span className="font-medium text-gray-700">Full Kitchen</span>
            </label>

            {/* Washer & Dryer */}
            <label
              htmlFor="amenity_washer"
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 cursor-pointer hover:bg-blue-50"
            >
              <input
                type="checkbox"
                id="amenity_washer"
                name="amenities"
                value="Washer & Dryer"
                className="w-5 h-5 accent-blue-600"
                checked={fields.amenities.includes("Washer & Dryer")}
                onChange={handleAmenitiesChange}
              />
              <FaTshirt className="text-purple-500 text-xl" />{" "}
              <span className="font-medium text-gray-700">Washer & Dryer</span>
            </label>

            {/* Free Parking */}
            <label
              htmlFor="amenity_free_parking"
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 cursor-pointer hover:bg-blue-50"
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
              <FaParking className="text-green-600 text-xl" />{" "}
              <span className="font-medium text-gray-700">Free Parking</span>
            </label>

            {/* Swimming Pool */}
            <label
              htmlFor="amenity_pool"
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 cursor-pointer hover:bg-blue-50"
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
              <FaSwimmingPool className="text-cyan-500 text-xl" />{" "}
              <span className="font-medium text-gray-700">Pool</span>
            </label>

            {/* Hot Tub */}
            <label
              htmlFor="amenity_hot_tub"
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 cursor-pointer hover:bg-blue-50"
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
              <FaHotTub className="text-red-500 text-xl" />{" "}
              <span className="font-medium text-gray-700">Hot Tub</span>
            </label>

            {/* 24/7 Security */}
            <label
              htmlFor="amenity_security"
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 cursor-pointer hover:bg-blue-50"
            >
              <input
                type="checkbox"
                id="amenity_security"
                name="amenities"
                value="24/7 Security"
                className="w-5 h-5 accent-blue-600"
                checked={fields.amenities.includes("24/7 Security")}
                onChange={handleAmenitiesChange}
              />
              <FaShieldAlt className="text-amber-600 text-xl" />{" "}
              <span className="font-medium text-gray-700">24/7 Security</span>
            </label>

            {/* Wheelchair Accessible */}
            <label
              htmlFor="amenity_wheelchair"
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 cursor-pointer hover:bg-blue-50"
            >
              <input
                type="checkbox"
                id="amenity_wheelchair"
                name="amenities"
                value="Wheelchair Accessible"
                className="w-5 h-5 accent-blue-600"
                checked={fields.amenities.includes("Wheelchair Accessible")}
                onChange={handleAmenitiesChange}
              />
              <FaWheelchair className="text-blue-500 text-xl" />{" "}
              <span className="font-medium text-gray-700">Wheelchair</span>
            </label>

            {/* Elevator Access */}
            <label
              htmlFor="amenity_elevator"
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 cursor-pointer hover:bg-blue-50"
            >
              <input
                type="checkbox"
                id="amenity_elevator"
                name="amenities"
                value="Elevator Access"
                className="w-5 h-5 accent-blue-600"
                checked={fields.amenities.includes("Elevator Access")}
                onChange={handleAmenitiesChange}
              />
              <FaArrowUp className="text-emerald-600 text-xl" />{" "}
              <span className="font-medium text-gray-700">Elevator Access</span>
            </label>

            {/* Dishwasher */}
            <label
              htmlFor="amenity_dishwasher"
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 cursor-pointer hover:bg-blue-50"
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
              <FaSink className="text-teal-500 text-xl" />{" "}
              <span className="font-medium text-gray-700">Dishwasher</span>
            </label>

            {/* Gym / Fitness Center */}
            <label
              htmlFor="amenity_gym"
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 cursor-pointer hover:bg-blue-50"
            >
              <input
                type="checkbox"
                id="amenity_gym"
                name="amenities"
                value="Gym/Fitness Center"
                className="w-5 h-5 accent-blue-600"
                checked={fields.amenities.includes("Gym/Fitness Center")}
                onChange={handleAmenitiesChange}
              />
              <FaDumbbell className="text-stone-600 text-xl" />{" "}
              <span className="font-medium text-gray-700">Gym</span>
            </label>

            {/* Air Conditioning */}
            <label
              htmlFor="amenity_ac"
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 cursor-pointer hover:bg-blue-50"
            >
              <input
                type="checkbox"
                id="amenity_ac"
                name="amenities"
                value="Air Conditioning"
                className="w-5 h-5 accent-blue-600"
                checked={fields.amenities.includes("Air Conditioning")}
                onChange={handleAmenitiesChange}
              />
              <FaSnowflake className="text-sky-500 text-xl" />{" "}
              <span className="font-medium text-gray-700">AC</span>
            </label>

            {/* Balcony / Patio */}
            <label
              htmlFor="amenity_balcony"
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 cursor-pointer hover:bg-blue-50"
            >
              <input
                type="checkbox"
                id="amenity_balcony"
                name="amenities"
                value="Balcony/Patio"
                className="w-5 h-5 accent-blue-600"
                checked={fields.amenities.includes("Balcony/Patio")}
                onChange={handleAmenitiesChange}
              />
              <FaUmbrellaBeach className="text-yellow-600 text-xl" />{" "}
              <span className="font-medium text-gray-700">Balcony/Patio</span>
            </label>

            {/* Smart TV */}
            <label
              htmlFor="amenity_tv"
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 cursor-pointer hover:bg-blue-50"
            >
              <input
                type="checkbox"
                id="amenity_tv"
                name="amenities"
                value="Smart TV"
                className="w-5 h-5 accent-blue-600"
                checked={fields.amenities.includes("Smart TV")}
                onChange={handleAmenitiesChange}
              />
              <FaTv className="text-indigo-600 text-xl" />{" "}
              <span className="font-medium text-gray-700">Smart TV</span>
            </label>

            {/* Coffee Maker */}
            <label
              htmlFor="amenity_coffee"
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 cursor-pointer hover:bg-blue-50"
            >
              <input
                type="checkbox"
                id="amenity_coffee"
                name="amenities"
                value="Coffee Maker"
                className="w-5 h-5 accent-blue-600"
                checked={fields.amenities.includes("Coffee Maker")}
                onChange={handleAmenitiesChange}
              />
              <FaCoffee className="text-amber-700 text-xl" />{" "}
              <span className="font-medium text-gray-700">Coffee Maker</span>
            </label>
          </div>
        </div>

        {/* Rates Section */}
        <div className="mb-8 rounded-3xl bg-gradient-to-br from-blue-50 via-white to-indigo-50 border border-blue-100 p-6 md:p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <FaMoneyBillWave className="text-3xl text-green-600" />
            <h3 className="text-2xl md:text-3xl font-bold text-blue-700">
              Property Rates
            </h3>
          </div>
          <p className="text-gray-500 mb-6">
            Leave fields blank if pricing options aren't available.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label
                htmlFor="weekly_rate"
                className="flex items-center gap-2 text-gray-700 font-semibold mb-2"
              >
                <FaCalendarWeek className="text-blue-600" />
                Weekly
              </label>
              <div className="relative">
                <FaRupeeSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="number"
                  id="weekly_rate"
                  name="rates.weekly"
                  placeholder="5000"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 outline-none"
                  value={fields.rates.weekly}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="monthly_rate"
                className="flex items-center gap-2 text-gray-700 font-semibold mb-2"
              >
                <FaCalendarAlt className="text-green-600" />
                Monthly
              </label>
              <div className="relative">
                <FaRupeeSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="number"
                  id="monthly_rate"
                  name="rates.monthly"
                  placeholder="18000"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 outline-none"
                  value={fields.rates.monthly}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="nightly_rate"
                className="flex items-center gap-2 text-gray-700 font-semibold mb-2"
              >
                <FaMoon className="text-indigo-600" />
                Nightly
              </label>
              <div className="relative">
                <FaRupeeSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="number"
                  id="nightly_rate"
                  name="rates.nightly"
                  placeholder="1200"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 outline-none"
                  value={fields.rates.nightly}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Seller Info Section */}
        {/* Seller Info Section */}
        {/* Seller Info Section with International Country Support */}
        <div className="mb-8 rounded-2xl border border-gray-200 p-6 bg-white shadow-sm">
          <h3 className="flex items-center gap-3 text-2xl font-bold text-blue-700 mb-6">
            <FaUser className="text-blue-600" />
            Seller Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label
                htmlFor="seller_name"
                className="flex items-center gap-2 text-gray-700 font-medium mb-2"
              >
                <FaUser className="text-gray-400" />
                Name
              </label>
              <input
                type="text"
                id="seller_name"
                name="seller_info.name"
                className="w-full rounded-xl border border-gray-300 py-3 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                placeholder="Name"
                value={fields.seller_info.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="seller_email"
                className="flex items-center gap-2 text-gray-700 font-medium mb-2"
              >
                <FaEnvelope className="text-gray-400" />
                Email
              </label>
              <input
                type="email"
                id="seller_email"
                name="seller_info.email"
                className="w-full rounded-xl border border-gray-300 py-3 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                placeholder="Email"
                required
                value={fields.seller_info.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="seller_phone"
                className="flex items-center gap-2 text-gray-700 font-medium mb-2"
              >
                <FaPhoneAlt className="text-gray-400" />
                Phone
              </label>
              <div className="flex shadow-sm rounded-xl border border-gray-300 overflow-hidden focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10">
                {/* Country Selector Dropdown */}
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="bg-gray-50 border-r border-gray-300 px-3 py-3 outline-none text-gray-700 text-sm font-medium cursor-pointer max-w-[100px]"
                >
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+61">🇦🇺 +61</option>
                  <option value="+971">🇦🇪 +971</option>
                  <option value="+1">🇨🇦 +1</option>
                </select>

                {/* Numeric Input Area */}
                <input
                  type="tel"
                  id="seller_phone"
                  name="seller_info.phone"
                  className="w-full py-3 px-4 outline-none"
                  placeholder="Enter phone number"
                  required
                  value={fields.seller_info.phone}
                  onChange={(e) => {
                    // Strips all letters out natively
                    const cleanVal = e.target.value.replace(/\D/g, "");
                    // Max constraints (safely allows lengths between 7 to 14 digits)
                    if (cleanVal.length <= 14) {
                      handleChange({
                        target: {
                          name: "seller_info.phone",
                          value: cleanVal,
                        },
                      });
                    }
                  }}
                />
              </div>
              {fields.seller_info.phone &&
                fields.seller_info.phone.length < 7 && (
                  <p className="text-xs text-red-500 mt-1">
                    Please enter a valid phone length
                  </p>
                )}
            </div>
          </div>
        </div>

        {/* NEW Visual Image Upload Display Area */}
        <div className="mb-8 rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/30 p-6">
          <label
            htmlFor="images"
            className="flex items-center gap-2 text-gray-800 font-semibold mb-2 text-lg cursor-pointer"
          >
            <FaImages className="text-blue-600" />
            Property Images{" "}
            <span className="text-sm text-gray-500 font-normal">
              (Max 4 images)
            </span>
          </label>

          <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50 transition relative group">
            <input
              type="file"
              id="images"
              name="images"
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
            <FaCloudUploadAlt className="text-4xl text-blue-500 mb-2" />
            <p className="text-sm font-semibold text-gray-700">
              Click to upload or drag files here
            </p>
            <p className="text-xs text-gray-400 mt-1">
              PNG, JPG, JPEG up to 5MB each
            </p>
          </div>

          {/* Validation Errors Box */}
          {imageError && (
            <p className="mt-3 text-sm text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-100 flex items-center gap-2">
              <span>⚠</span> {imageError}
            </p>
          )}

          {/* Dynamic Image Preview Grids */}
          {imagePreviews.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-bold text-gray-700 mb-3">
                Selected Images ({imagePreviews.length}/4)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {imagePreviews.map((url, index) => (
                  <div
                    key={url}
                    className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group border border-gray-200 shadow-sm"
                  >
                    <img
                      src={url}
                      alt={`Preview profile ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600/90 text-white opacity-90 sm:opacity-0 group-hover:opacity-100 transition duration-200 shadow hover:bg-red-700 focus:opacity-100"
                      title="Remove image"
                    >
                      <FaTimes className="text-xs" />
                    </button>
                    <div className="absolute bottom-0 inset-x-0 bg-black/40 text-[10px] text-white px-2 py-1 truncate text-center font-medium">
                      Image {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Form Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition duration-300 ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200"
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing Profile...
              </>
            ) : (
              <>
                <FaPaperPlane /> Publish Property Listing
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyAddForm;
