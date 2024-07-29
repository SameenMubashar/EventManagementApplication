'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useSession, getSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

import { FaSpinner } from 'react-icons/fa';
import { montserrat } from './fonts';

const LoginPage = () => {
  const { data: session } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [loginPending, setLoginPending] = useState(false);

  if (session) {
    redirect('/dashboard');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoginPending(true);

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError('Invalid Credentials');
        setLoginPending(false);
        return;
      }

      redirect('/dashboard');
    } catch (error) {
      console.log(error);
      setLoginPending(false);
    }
  };
  return (
    <div
      className={`${montserrat.className} w-full lg:grid md:min-h-[100vh] md:grid-cols-2`}
    >
      <div className="flex flex-col items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-4xl text-blueMain font-bold">Login</h1>
            <p className="text-lg">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-md">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="border border-blueMain"
              />
            </div>
            <div className="grid gap-2">
              <div className="">
                <Label htmlFor="password" className="text-md">
                  Password
                </Label>

                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-blueMain"
                />
              </div>
            </div>

            {error && (
              <div className="bg-[#ff0000] py-2 px-6 text-center rounded-lg mt-2">
                <p className="font-semibold text-sm text-white">
                  Error: {error}
                </p>
              </div>
            )}

            <Button ype="submit" className="w-full" onClick={handleSubmit}>
              {loginPending ? (
                <FaSpinner size={25} className="animate-spin" />
              ) : (
                'Login'
              )}
            </Button>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={`relative hidden md:flex p-16`}>
        <div className="absolute inset-0 bg-blueMainOverlay z-10"></div>
        <div className="relative z-20 my-auto">
          <h1 className="text-4xl font-bold text-white">
            Event Management Application
          </h1>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
