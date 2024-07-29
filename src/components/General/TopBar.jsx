'use client';
import Link from 'next/link';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { FaPlusCircle } from 'react-icons/fa';
import { FaSignOutAlt, FaSpinner } from 'react-icons/fa';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { montserrat } from '@/app/fonts';

const TopBar = () => {
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = () => {
    setSigningOut(true);
    signOut();
  };
  return (
    <div
      className={`${montserrat.className} sticky top-0 z-20 flex flex-row items-center justify-between py-2 px-6 text-white bg-blueMain mb-6`}
    >
      <div className="flex flex-row gap-4 items-center justify-end">
        <Link href={'/create-event'}>
          <FaPlusCircle
            size={30}
            className="hover:text-yellowMain transitions duration-200"
          />
        </Link>
        {signingOut ? (
          <FaSpinner size={30} className="animate-spin" />
        ) : (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <FaSignOutAlt
                size={30}
                className="hover:text-yellowMain hover:cursor-pointer transitions duration-200"
              />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to Sign Out?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleSignOut}
                  className="bg-blueMain"
                >
                  Sign Out
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
};

export default TopBar;
