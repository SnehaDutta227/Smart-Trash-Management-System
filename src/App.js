import logo from './logo.svg';
import './App.css';
import Header from './pages/Header';
import MapWithMarker from './pages/MapWithMarker';
import { Outlet } from 'react-router-dom';
import Home from './pages/Home';
import FirebaseDataComponent from './pages/FirebaseDataComponent'; // Ensure you're using the correct import name

function App() {
  return (
    <div>
      <Header />

      <div className="pt-16 bg-violet-50 min-h-screen"> {/* Adjust margin as needed */}
        <div className="mt-4"> {/* Add margin to the top */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
