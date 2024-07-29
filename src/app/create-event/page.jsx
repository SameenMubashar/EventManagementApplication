'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FaSpinner } from 'react-icons/fa';

const CreateEvent = () => {
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const [formSubmitting, setFormSubmitting] = useState(false);

  const resetFormValues = () => {
    setEventName('');
    setDate('');
    setLocation('');
    setDescription('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    // console.log(baseUrl);

    try {
      const res = await fetch(`${baseUrl}/api/eventDetails`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          eventName,
          date,
          location,
          description,
        }),
      });

      if (!res.ok) {
        console.log('Error Response:\n', res);
        setFormSubmitting(false);

        throw new Error('Failed to submit event form!');
      } else {
        resetFormValues();
        setFormSubmitting(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card className="mx-auto max-w-sm mt-20">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-xl">Create Event</CardTitle>
          <CardDescription>
            Enter your information related to the event
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="event-name">Event name</Label>
              <Input
                id="event-name"
                placeholder="Enter event name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {formSubmitting ? (
                <FaSpinner size={30} className="animate-spin" />
              ) : (
                'Create Event'
              )}
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
};

export default CreateEvent;
