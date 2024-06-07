import Header from "../components/Header";
import React, { useEffect } from 'react';
// import seedrandom from "seedrandom";
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const TampilanPeta = () => {
  useEffect(() => {

    
    const map = L.map('map').setView([-7.8029783, 110.3656536], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const waypoints = [
        { id: 1, name: "A",lat: -7.800671500000001, lng: 110.3676551 },
        { id: 2, name: "B",lat: -7.8052845, lng: 110.3642031 },
        { id: 3, name: "C",lat: -8.1384509, lng: 110.577522 },
        { id: 4, name: "E",lat: -7.943178000000001, lng: 110.48924 },
        { id: 5, name: "D",lat: -7.816315599999999, lng: 110.3871442 },
        { id: 6, name: "F",lat: -7.7705416, lng: 110.4894158},
        
      ];

    if (waypoints.length < 2) {
      console.error("At least two waypoints are required");
      return;
    }

    waypoints.forEach((waypoint, index) => {
      L.marker([waypoint.lat, waypoint.lng]).addTo(map).bindPopup(`Titik ${index + 1}`);
    });
    //Set seed for consistent randomness
    const seed = '123'; // Gantilah dengan nilai seed yang Anda inginkan
    const result = solveTSPGenetic(waypoints, seed);
    console.log("Genetic Algorithm Result:", result);


    // const result = solveTSPGenetic(waypoints);
    // console.log("Genetic Algorithm Result:", result);

    if (result && result.length > 0) {
      const sortedWaypoints = result.map(index => waypoints[index]);
      // Tambahkan titik awal ke rute yang sudah diurutkan
      sortedWaypoints.push(sortedWaypoints[0]);

      console.log("Sorted Waypoints:", sortedWaypoints);

      L.Routing.control({
        waypoints: sortedWaypoints.map(wp => L.latLng(wp.lat, wp.lng)),
        routeWhileDragging: true,
        lineOptions: {
          styles: [{ color: 'blue', opacity: 0.7, weight: 5 }],
        }
      }).addTo(map);
    } else {
      console.error("Genetic algorithm did not produce a valid result.", result);
    }
  }, []);

  const solveTSPGenetic = (waypoints, seed) => {
    

    const populationSize = 20;
    const generations = 50;
  
    let bestPath = generateRandomPath(waypoints.length, seed);
  
    for (let generation = 0; generation < generations; generation++) {
      const population = Array.from({ length: populationSize }, () => generateRandomPath(waypoints.length));
  
      // Evaluate population based on total distance
      const rankedPopulation = rankPopulation(population, waypoints);
  
      console.log(`Generation ${generation + 1}: Best distance = ${calculateTotalDistance(rankedPopulation[0], waypoints)}`);
      console.log("Best Path:", rankedPopulation[0]);
      // Update the best path if a better one is found
      const currentBestPath = rankedPopulation[0];
      const currentBestDistance = calculateTotalDistance(currentBestPath, waypoints);
  
      if (currentBestDistance < calculateTotalDistance(bestPath, waypoints)) {
        bestPath = [...currentBestPath]; // Make a copy of the array
      }
    //   seedrandom(`${seed}_${generation + 1}`, { global: true }); 
    }
  
    return bestPath;
  };

  const generateRandomPath = (length, seed) => {
    const randomArray = Array.from({ length }, (_, index) => index);
    for (let i = randomArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomArray[i], randomArray[j]] = [randomArray[j], randomArray[i]];
    }
    return randomArray;
  };

  const rankPopulation = (population, waypoints) => {
    // Evaluate and rank population based on total distance
    const rankedPopulation = population.sort((a, b) => calculateTotalDistance(a, waypoints) - calculateTotalDistance(b, waypoints));
    console.log("Ranked Population:", rankedPopulation);
    // Ensure the ranked population is not empty
    if (rankedPopulation.length === 0) {
      console.error("Empty ranked population:", rankedPopulation);
      return population;
    }

    return rankedPopulation;
  };

  const calculateTotalDistance = (path, waypoints) => {
    // Calculate total distance of a path using Haversine formula
    return path.reduce((total, waypoint, index) => {
      const nextWaypoint = path[(index + 1) % path.length];
      return total + haversineDistance(waypoints[waypoint], waypoints[nextWaypoint]);
    }, 0);
  };

  const haversineDistance = (point1, point2) => {
    // Haversine formula to calculate distance between two points on the Earth
    const R = 6371; // Earth radius in kilometers
    const dLat = deg2rad(point2.lat - point1.lat);
    const dLon = deg2rad(point2.lng - point1.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(point1.lat)) * Math.cos(deg2rad(point2.lat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };
  const deg2rad = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  return (
    <>
      <Header />
      <div id="map" style={{ height: '100vh', width: '100vw' }}></div>
    </>
  );
};

export default TampilanPeta;
