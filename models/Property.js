import { Schema, model, models } from "mongoose";

const PropertySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: [true, "Property name is required"],
    },

    type: {
      type: String,
      required: [true, "Property type is required"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
    },

    location: {
      street: {
        type: String,
      },
      latitude: {
        type: Number,
        required: false,
      },
      longitude: {
        type: Number,
        required: false,
      },

      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zipcode: {
        type: String,
      },
    },

    beds: {
      type: Number,
      required: true,
    },

    baths: {
      type: Number,
      required: true,
    },

    square_feet: {
      type: Number,
      required: true,
    },

    amenities: [
      {
        type: String,
      },
    ],

    rates: {
      nightly: {
        type: Number,
        default: 0,
      },

      weekly: {
        type: Number,
        default: 0,
      },

      monthly: {
        type: Number,
        default: 0,
      },
    },

    seller_info: {
      name: {
        type: String,
      },

      email: {
        type: String,
      },

      phone: {
        type: String,
      },
    },

    images: [
      {
        type: String,
      },
    ],

    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Property = models.Property || model("Property", PropertySchema);

export default Property;
