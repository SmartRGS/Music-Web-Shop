import React, { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import './Profile.css';

function Profile() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [purchasedItems, setPurchasedItems] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('loggedInUser');
      if (!userId) return;
  
      try {
        const response = await fetch(`http://localhost:3001/user/${userId}`);
        const data = await response.json();
  
        if (response.ok && data.success) {
          const { name, surname, email, username, purchasedItems, profileImage } = data.user;
          setName(name);
          setSurname(surname);
          setEmail(email);
          setUsername(username);
          setPurchasedItems(purchasedItems);
          setProfileImage(profileImage); // Set the base64 profile image
          console.log(data.user.username)
        } else {
          console.error('Error fetching user data:', data.error);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, []);
  

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageData = e.target.result;
        setProfileImage(imageData);
  
        const userId = localStorage.getItem('loggedInUser'); // Get the userId from localStorage
  
        const response = await fetch('http://localhost:3001/user/updateProfileImage/', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, profileImage: imageData }), 
        });
  
        if (!response.ok) {
          console.error('Error updating profile image');
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="profile">
      <h1>Profile</h1>
      <div className="profile-info">
        <div>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Surname:</strong> {surname}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Username:</strong> {username}
          </p>
        </div>
        <div>{profileImage && <img src={profileImage} alt="Profile Image" className="profile-image" />}</div>
      </div>
      <div className="profile-image-input">
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <div>
        <h2>Purchased Items</h2>
        <ul>
          {purchasedItems.map((item, index) => (
            <li key={index} className="purchased-item">
              <div
                className="purchased-item-image"
                style={{ backgroundImage: `url(${item.coverImage})` }}
              ></div>
              <div className="purchased-item-title">{item.title}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
