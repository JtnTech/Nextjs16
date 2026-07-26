export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");
    if (!address) {
      return new Response("Address is required", { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY;
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${apiKey}`
    );
    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Server-side geocoding error:", error);
    return new Response("Geocoding failed", { status: 500 });
  }
};
