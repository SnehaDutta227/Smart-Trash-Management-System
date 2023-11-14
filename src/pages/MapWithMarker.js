import React, { useState, useEffect } from "react";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, off } from 'firebase/database';

function MapWithMarker() {
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
    const dataRef = ref(getDatabase(firebaseApp), '/TrashBin1/');
    // Set up a listener for changes in the data
    const dataRefListener = onValue(dataRef, (snapshot) => {
      const firebaseData = snapshot.val();
      setData(firebaseData);
    });
    return () => {
      off(dataRefListener);
    };
  }, []);

  useEffect(() => {
    // Load the Google Maps API
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBMDXH-Qs0-8T21z5FGHcHrw8OC1j-5Lag&callback=initMap`;
    script.defer = true;
    script.async = true;

    script.onload = () => {
      initMap();
    };

    document.head.appendChild(script);
  }, []);

  const initMap = () => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 12.9692, lng: 79.1559 },
      zoom: 16,
    });

    // Create markers with different colors at different locations
    const markers = [
      {
        position: { lat: 12.9694885, lng: 79.1580284 },
        icon: getColorMarker([80, 60]), // Replace these values with your hardcoded ultrasonic sensor values
        title: "Marker 1",
      },
      {
        position: { lat: 12.9707442, lng: 79.1600879 },
        icon: getColorMarker([70, 55]), // Replace these values with your hardcoded ultrasonic sensor values
        title: "Marker 2",
      },
      {
        position: { lat: 12.9697, lng: 79.1604 },
        icon: getColorMarker([45]), // Replace these values with your hardcoded ultrasonic sensor values
        title: "Marker 3",
      },
    ];

    markers.forEach((markerInfo) => {
      const marker = new window.google.maps.Marker({
        position: markerInfo.position,
        map: map,
        icon: markerInfo.icon,
      });

      const infowindow = new window.google.maps.InfoWindow({
        content: `<div style="font-size: 16px">${markerInfo.title}</div>`,
      });

      marker.addListener("click", () => {
        infowindow.open(map, marker);
      });
    });
  };

  const getColorMarker = (ultrasonicValues) => {
    if (!ultrasonicValues) return "http://maps.google.com/mapfiles/ms/icons/green-dot.png";

    const above50Count = ultrasonicValues.filter((value) => value > 50).length;

    if (above50Count >= 2) return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
    if (above50Count === 1) return "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";

    return "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
  };

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
      {data && (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Data from the Firebase</h2>
            <div className="bg-gray-200 p-4 rounded shadow-md text-2xl">
              <p>Coordinate X: {data.coordinate_x}</p>
              <p>Coordinate Y: {data.coordinate_y}</p>
              <p>Ultrasonic 1: {data.ultrasonic1}</p>
              <p>Ultrasonic 2: {data.ultrasonic2}</p>
              <p>Ultrasonic 3: {data.ultrasonic3}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MapWithMarker;
