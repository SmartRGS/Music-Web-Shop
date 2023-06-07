import React, { useEffect, useState } from 'react';

function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from localStorage
    const storedData = JSON.parse(localStorage.getItem('userData'));
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedData && currentUser) {
      setUserData(storedData[currentUser]);
    }
  }, []);

 return (
    <div>
      <h1>{userData.name} {userData.surname}</h1>
      <p>Email: {userData.email}</p>
      <p>Username: {userData.username}</p>
    </div>
  );
}

export default Profile;
