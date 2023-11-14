import React, { useState, useEffect } from "react";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, off } from 'firebase/database';

const FirebaseDataComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Initialize your Firebase app
    const firebaseConfig = {
        apiKey: 'AIzaSyA0P6gyzfCCxBOnXOtoV6YAIWtH50vssq8',
        authDomain: 'http://smart-trash-management-s-d0819.firebaseapp.com',
        databaseURL: 'https://smart-trash-management-s-d0819-default-rtdb.firebaseio.com',
        projectId: 'smart-trash-management-s-d0819',
        storageBucket: 'http://smart-trash-management-s-d0819.appspot.com',
        messagingSenderId: '900253278493',
        appId: '1:900253278493:web:fc5b35db92ca0ff86301f4',
      };
    const firebaseApp = initializeApp(firebaseConfig);

    // Reference to your Firebase data path
    const dataRef = ref(getDatabase(firebaseApp),'/TrashBin1/');
    // Set up a listener for changes in the data
    const dataRefListener = onValue(dataRef, (snapshot) => {
      const firebaseData = snapshot.val();
      setData(firebaseData);
    });
    return () => {
        off(dataRefListener);
      };
    }, []);
    
   

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Data from the Firebase</h2>
        {data ? (
          <div className="bg-gray-200 p-4 rounded shadow-md text-2xl">
            <p>Coordinate X: {data.coordinate_x}</p>
            <p>Coordinate Y: {data.coordinate_y}</p>
            <p>Ultrasonic 1: {data.ultrasonic1}</p>
            <p>Ultrasonic 2: {data.ultrasonic2}</p>
            <p>Ultrasonic 3: {data.ultrasonic3}</p>
          </div>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
}

export default FirebaseDataComponent;
