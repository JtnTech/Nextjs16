import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";
//GET /api/properties
export const GET = async (request) => {
  try {
    await connectDB();
    const properties = await Property.find({});
    console.log(properties);
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log("Route.jsx Error :", error);

    return new Response("Something Went Wrong", { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("UserId is required", { status: 401 });
    }
    const { userId } = sessionUser;

    const formData = await request.formData();
    

    //acces all values from amenties and images
    const amenities = formData.getAll("amenities");
    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");

    // create propertydata object for database
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
         latitude: formData.get('location.latitude'),
        longitude: formData.get('location.longitude'),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },

      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId
    };

    // Upload Images to Cloudinary..
    const ImageUploadPromises= [];

for (const image of images) {
  const imageBuffer = await image.arrayBuffer();
  const imageArray = Array.from(new Uint8Array(imageBuffer));
  const imageData = Buffer.from(imageArray);

  //Convert the image data to base64
 const imageBase64 = imageData.toString("base64");

const result = await cloudinary.uploader.upload(
  `data:image/png;base64,${imageBase64}`,
  {
    folder: "EstateKart",
  }
);

ImageUploadPromises.push(result.secure_url);

//wait for all images to upload
 const uploadedImages = await Promise.all(ImageUploadPromises);
 // add uploaded images to the propertydata object
propertyData.images = uploadedImages;


}

    // Upload Images to Cloudinary..

    const newProperty = new Property(propertyData);

    await newProperty.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`,
    );
    // return new Response(JSON.stringify({ message: "Success" }), {
    //   statue: 200,
    // });
  } catch (error) {
    console.log(error);

    return new Response(error.message, {
      status: 500,
    });
  }
};
