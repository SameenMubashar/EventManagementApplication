import event from '@/models/Event';
import ConnectMongoDB from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = params;

  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await ConnectMongoDB();
  const eventResponse = await event.findOne({ _id: id });
  return NextResponse.json({ eventResponse }, { status: 200 });
}

export async function PUT(request, { params }) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = params;
  const { eventName, date, location, description } = await request.json();

  await ConnectMongoDB();

  try {
    const updatedEvent = await event.findByIdAndUpdate(
      id,
      {
        eventName,
        date,
        location,
        description,
      },
      { new: true }
    );

    if (!updatedEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Event updated successfully', event: updatedEvent },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json({ error: 'Failed to update event' });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  console.log('at server side, id:', id);
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await ConnectMongoDB();

  const eventResponse = await event.findOne({ _id: id });

  if (!eventResponse) {
    return NextResponse.json({ message: 'Event not found' }, { status: 404 });
  } else {
    await event.findByIdAndDelete(id);
  }

  return NextResponse.json({ message: 'Event deleted' }, { status: 200 });
}
