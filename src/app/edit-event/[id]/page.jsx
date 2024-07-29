'use client';
import TopBar from '@/components/General/TopBar';
import { montserrat } from '@/app/fonts';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

const EditEventPage = () => {
  const pathname = usePathname();
  const currentId = pathname.split('/').pop();
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      try {
        const response = await fetch(
          `${baseUrl}/api/eventDetails/${currentId}`
        );
        const data = await response.json();

        if (response.ok) {
          console.log('data fetched successfully', data);
          setEventName(data.eventResponse.eventName);
          setDate(data.eventResponse.date);
          setLocation(data.eventResponse.location);
          setDescription(data.eventResponse.description);
        } else {
          console.log('failed to fetch data');
          setError(data.error || 'Failed to fetch event data');
        }
      } catch (error) {
        setError('Failed to fetch event data');
      }
    };

    fetchEvent();
  }, [currentId]);

  const handleUpdate = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    try {
      const response = await fetch(`${baseUrl}/api/eventDetails/${currentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventName,
          date,
          location,
          description,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Event updated successfully');
      } else {
        setError(data.error || 'Failed to update event');
      }
    } catch (error) {
      setError('Failed to update event');
    }
  };

  return (
    <div className="flex flex-col">
      <TopBar />
      <h2
        className={`${montserrat.className} mt-4 text-4xl text-blueMain font-bold text-center mb-4`}
      >
        Event Details
      </h2>
      <div className="px-[5%] flex flex-col gap-6 ">
        <div className="flex flex-col gap-4 w-[60%] mx-auto ">
          <div className="flex flex-col gap-4 mx-auto w-full">
            <Label htmlFor="eventName" className="text-left">
              Event Name
            </Label>
            <Input
              id="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col gap-4 mx-auto w-full">
            <Label htmlFor="date" className="text-left">
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col gap-4 mx-auto w-full">
            <Label htmlFor="location" className="text-left">
              Location
            </Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col gap-4 mx-auto w-full">
            <Label htmlFor="description" className="text-left">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          <Button
            type="button"
            className="w-[40%] mx-auto"
            onClick={handleUpdate}
          >
            Save changes
          </Button>
        </div>
        {error && <div className="text-red-500 mx-auto">{error}</div>}
        {successMessage && (
          <div className="text-green-500 mx-auto">{successMessage}</div>
        )}
      </div>
    </div>
  );
};

export default EditEventPage;
