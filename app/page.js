// pages/admin.js
'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';

const AdminPage = () => {
  const [directionsUrl, setDirectionsUrl] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          console.error("current location:", position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Error getting the current location:", error.message);
        }
      );
    }
  }, []);

  const getDirections = async () => {
    axios.post('/api/getDirections', { userLatitude:latitude, userLongitude:longitude }).then((response) => {
      console.log("response:", response.data.mapsUrl);
      setDirectionsUrl(response.data.mapsUrl);
    })
  };

  return (
    <div className='h-screen flex items-center justify-center flex-col'>
      <h1 className='text-3xl font-bold'>Admin Page</h1>
      {latitude && longitude ? <button className='mt-3 border  px-2 py-1 rounded hover:bg-gray-100 transition-all text-muted-foreground' onClick={getDirections}>Get Directions to User</button> :
      <button className='mt-3 border  px-2 py-1 rounded hover:bg-gray-100 transition-all animate-pulse'>loading...</button>}
      
      {directionsUrl &&  (
        <div className='mt-2'>
        <a className='text-blue-600' href={directionsUrl}>{directionsUrl && 'Google map link'}</a>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
