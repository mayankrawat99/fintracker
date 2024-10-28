import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth'; // Import Firebase auth method
import { auth } from '../firebase'; // Import your Firebase auth instance
import { Spin } from 'antd'; // Ant Design spinner
import Header from '../Components/LandingPage/Header';
import Hero from '../Components/LandingPage/Hero';
import '../Components/LandingPage/style.css';
import Loader from '../Components/Loader';

function LandingPage() {
  const [loading, setLoading] = useState(true); // State to manage loading spinner
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/dashboard'); // Redirect to dashboard if user is authenticated
      } 
      else {
        setLoading(false); // Stop loading when not authenticated
      }
    });

    // Clean up subscription to avoid memory leaks
    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      // <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      //   {/* Remove 'tip' or nest it in a container */}
      //   <Spin size="large" />
      // </div>
      <Loader/>
    );
  }

  // If not loading, render the landing page content
  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
}

export default LandingPage;
