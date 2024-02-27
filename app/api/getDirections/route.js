import { NextResponse } from "next/server";

export async function POST(request) {
  const adminLatitude = 10.23552;
  const adminLongitude = 76.37398;
  try {
    const { userLatitude, userLongitude } = await request.json();
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${adminLatitude},${adminLongitude}&destination=${userLatitude},${userLongitude}`;
    return NextResponse.json({ mapsUrl }, { status: 200 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error sending message' });
  }
}





