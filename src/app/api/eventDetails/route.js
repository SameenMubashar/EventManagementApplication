import ConnectMongoDB from '@/lib/mongodb';
import event from '@/models/Event';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import validator from 'validator';

export async function GET(request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await ConnectMongoDB();

  try {
    const allData = await event.find({}).exec();
    return NextResponse.json(allData);
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong!' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { eventName, date, location, description } = await request.json();
  if (
    !eventName ||
    !validator.isLength(eventName, { min: 1 }) ||
    !validator.isISO8601(date) ||
    !location ||
    !validator.isLength(location, { min: 1 }) ||
    !description ||
    !validator.isLength(description, { min: 1 })
  ) {
    return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
  }

  await ConnectMongoDB();

  try {
    const newResponse = await event.create({
      eventName,
      date,
      location,
      description,
    });

    console.log('New Event Response:', newResponse);

    return NextResponse.json(
      { message: 'Event Response Posted' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong!' },
      { status: 500 }
    );
  }
}
