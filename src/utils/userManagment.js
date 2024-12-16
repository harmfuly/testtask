import React, { useCallback, useRef } from 'react';
import { GETBlock } from './GETBlock';
import { POSTBlock } from './POSTBlock';

export function userManagement() {
  const refreshUsersRef = useRef(null);

  const handleSuccessfulRegistration = useCallback(() => {
    if (refreshUsersRef.current) {
      refreshUsersRef.current();
    }
  }, []);

  return (
    <div>
      <GETBlock onSuccessfulRegistration={(refreshFunc) => (refreshUsersRef.current = refreshFunc)} />
      <POSTBlock onSuccessfulRegistration={handleSuccessfulRegistration} />
    </div>
  );
}