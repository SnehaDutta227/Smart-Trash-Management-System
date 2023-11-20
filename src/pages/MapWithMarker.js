import React, { useState, useEffect } from "react";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, off } from 'firebase/database';

function MapWithMarker() {
  const [trashBin1Data, setTrashBin1Data] = useState(null);
  const [trashBin2Data, setTrashBin2Data] = useState(null);

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

    // Reference to your Firebase data path for TrashBin1
    const trashBin1Ref = ref(getDatabase(firebaseApp), '/TrashBin1/');
    const trashBin1Listener = onValue(trashBin1Ref, (snapshot) => {
      const data = snapshot.val();
      setTrashBin1Data(data);
    });

    // Reference to your Firebase data path for TrashBin2
    const trashBin2Ref = ref(getDatabase(firebaseApp), '/TrashBin2/');
    const trashBin2Listener = onValue(trashBin2Ref, (snapshot) => {
      const data = snapshot.val();
      setTrashBin2Data(data);
    });

    return () => {
      off(trashBin1Listener);
      off(trashBin2Listener);
    };
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBMDXH-Qs0-8T21z5FGHcHrw8OC1j-5Lag&callback=initMap`;
    script.defer = true;
    script.async = true;

    script.onload = () => {
      initMap();
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [trashBin1Data, trashBin2Data]);

  const initMap = () => {
    if (!trashBin1Data || !trashBin2Data) {
      console.error("No data available from Firebase.");
      return;
    }

    const mapContainer = document.getElementById("map");

    if (!mapContainer) {
      console.error("Map container not found.");
      return;
    }

    const map = new window.google.maps.Map(mapContainer, {
      center: { lat: parseFloat(trashBin1Data.coordinate_x), lng: parseFloat(trashBin1Data.coordinate_y) },
      zoom: 16,
    });

    // Create markers with different colors at different locations for TrashBin1
    const ultrasonicValues1 = [trashBin1Data.ultrasonic1, trashBin1Data.ultrasonic2, trashBin1Data.ultrasonic3];
    const markerIcon1 = getColorMarker(ultrasonicValues1);

    const marker1 = new window.google.maps.Marker({
      position: { lat: parseFloat(trashBin1Data.coordinate_x), lng: parseFloat(trashBin1Data.coordinate_y) },
      map: map,
      icon: markerIcon1,
    });

    const infowindow1 = new window.google.maps.InfoWindow({
      content: `<div style="font-size: 16px">TrashBin1</div>`,
    });

    marker1.addListener("click", () => {
      infowindow1.open(map, marker1);
    });

    // Create markers with different colors at different locations for TrashBin2
    const ultrasonicValues2 = [trashBin2Data.ultrasonic1, trashBin2Data.ultrasonic2, trashBin2Data.ultrasonic3];
    const markerIcon2 = getColorMarker(ultrasonicValues2);

    const marker2 = new window.google.maps.Marker({
      position: { lat: parseFloat(trashBin2Data.coordinate_x), lng: parseFloat(trashBin2Data.coordinate_y) },
      map: map,
      icon: markerIcon2,
    });

    const infowindow2 = new window.google.maps.InfoWindow({
      content: `<div style="font-size: 16px">TrashBin2</div>`,
    });

    marker2.addListener("click", () => {
      infowindow2.open(map, marker2);
    });
  };

  const getColorMarker = (ultrasonicValues) => {
    const above50Count = ultrasonicValues.filter((value) => value >= 50).length;

    if (above50Count >= 2) return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
    if (above50Count === 1) return "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";

    return "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
  };

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
      {trashBin1Data && trashBin2Data && (
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Data from the Firebase</h2>
          <div className="bg-gray-200 p-4 rounded shadow-md text-2xl flex justify-around">
            {/* Display data for TrashBin1 */}
            <div>
              <p>TrashBin1 Data:</p>
              <p>Coordinate X: {trashBin1Data.coordinate_x}</p>
              <p>Coordinate Y: {trashBin1Data.coordinate_y}</p>
              <p>Ultrasonic 1: {trashBin1Data.ultrasonic1}</p>
              <p>Ultrasonic 2: {trashBin1Data.ultrasonic2}</p>
              <p>Ultrasonic 3: {trashBin1Data.ultrasonic3}</p>
            </div>

            {/* Display data for TrashBin2 */}
            <div>
              <p>TrashBin2 Data:</p>
              <p>Coordinate X: {trashBin2Data.coordinate_x}</p>
              <p>Coordinate Y: {trashBin2Data.coordinate_y}</p>
              <p>Ultrasonic 1: {trashBin2Data.ultrasonic1}</p>
              <p>Ultrasonic 2: {trashBin2Data.ultrasonic2}</p>
              <p>Ultrasonic 3: {trashBin2Data.ultrasonic3}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MapWithMarker;
