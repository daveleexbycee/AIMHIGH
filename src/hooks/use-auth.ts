
"use client";

import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

// Add this interface to your project
interface OneSignalWindow extends Window {
  OneSignalDeferred?: any[];
  OneSignal?: any;
}

declare const window: OneSignalWindow;


export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);

      // OneSignal logic
      if (user) {
        window.OneSignalDeferred = window.OneSignalDeferred || [];
        window.OneSignalDeferred.push(function(OneSignal) {
          OneSignal.login(user.uid);
        });
      } else {
        if (window.OneSignal) {
            window.OneSignal.logout();
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}
