import React, { useEffect, useState,Image } from 'react';
import SunCalc from 'suncalc';
import '../test/test.css'

const SunPositionDisplay = () => {
  const [sunPosition, setSunPosition] = useState({ azimuth: 0, elevation: 0 });

  useEffect(() => {
    const getCurrentSolarPosition = () => {
      // Get current date and time
      const now = new Date();

      // Get solar position
      const solarPosition = SunCalc.getPosition(now, 11.059821, 78.387451);

      // Convert azimuth to degrees and map it to the range [0, 180)
      let azimuth = (solarPosition.azimuth * 180) / Math.PI;
      azimuth = (azimuth + 180) % 360; // Ensure azimuth is in the range [0, 360)
      azimuth = azimuth >= 180 ? azimuth - 180 : azimuth; // Map to the range [0, 180)

      // Convert elevation to degrees
      const elevation = (solarPosition.altitude * 180) / Math.PI;

      return { azimuth, elevation };
    };

    const updateSunPosition = () => {
      const { azimuth, elevation } = getCurrentSolarPosition();
      setSunPosition({ azimuth, elevation });
    };

    // Update sun position every second (you can adjust the interval as needed)
    const intervalId = setInterval(updateSunPosition, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const { azimuth, elevation } = sunPosition;

  // Scale the values to fit the specified range in your graph
  const scaledAzimuth = (azimuth / 180) * 45; // Map azimuth to [0, 45]
  const scaledElevation = (elevation / 90) * 180; // Map elevation to [0, 180]
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  // Calculate the angle for the sun's position
  const angle = (15 * hours + 0.25 * minutes - 90) % 360;

  // Convert the angle to radians for CSS rotation
  const radians = (angle * Math.PI) / 180;
  return (
    <div className="container">
    <div
      className="sun"
      style={{
        transform: `rotateX(${radians}deg) rotate(${angle}deg)`,
      }}
    >
    </div>
  </div>
  );
};

export default SunPositionDisplay;
