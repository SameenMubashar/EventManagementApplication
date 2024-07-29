import ConnectMongoDB from '@/lib/mongodb';
import admin from '@/models/Admin';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { email, password } = await request.json();

  await ConnectMongoDB();
  const newResponse = await admin.create({
    email,
    password,
  });

  console.log('New User Response:', newResponse);

  return NextResponse.json({ message: 'New User Posted' }, { status: 201 });
}
