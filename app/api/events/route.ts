import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "@/lib/mongodb";
import Event from '@/database/event.model';

// Upload image to Cloudinary
async function uploadToCloudinary(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { resource_type: "image", folder: "upload" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result!.secure_url);
      }
    ).end(buffer);
  });
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // Parse form data
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    // Upload image and prepare event data
    const imageUrl = await uploadToCloudinary(file);
    const event = Object.fromEntries(formData.entries());
    event.image = imageUrl;

    // Create event in database
    const createdEvent = await Event.create(event);

    return NextResponse.json(
      { message: 'Event created successfully', event: createdEvent },
      { status: 201 }
    );
  } catch (error) {
    console.error('Event creation error:', error);

    return NextResponse.json(
      {
        message: 'Event creation failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    // Fetch all events, newest first
    const events = await Event.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { message: 'Events fetched successfully', events },
      { status: 200 }
    );
  } catch (error) {
    console.error('Event fetch error:', error);

    return NextResponse.json(
      {
        message: 'Unable to fetch events',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}