
"use client";

import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import OneSignal from 'react-onesignal';

async function initOneSignal() {
    if (OneSignal.Notifications.isPushSupported()) {
        await OneSignal.init({
            appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID!,
            allowLocalhostAsSecureOrigin: true,
        });
    } else {
        console.warn("Push notifications are not supported on this browser.");
    }
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [oneSignalInitialized, setOneSignalInitialized] = useState(false);

  useEffect(() => {
    if (!oneSignalInitialized) {
        initOneSignal().then(() => setOneSignalInitialized(true));
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (oneSignalInitialized) {
          if (user) {
            await OneSignal.login(user.uid);
            console.log("OneSignal user logged in:", user.uid);
          } else {
            if (OneSignal.User.isLoggedIn()) {
                await OneSignal.logout();
                console.log("OneSignal user logged out.");
            }
          }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [oneSignalInitialized]);

  return { user, loading };
}
