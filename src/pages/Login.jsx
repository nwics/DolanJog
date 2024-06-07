
import Header from "../components/Header"
import React, { useEffect } from 'react';
// import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
// import dijkstra from "dijkstrajs";
// import GeneticAlgorithm from 'geneticalgorithm';
// import { MapContainer, TileLayer } from "react-leaflet";

const TampilanPeta = () => {
  

    useEffect(() => {
    
        // Buat peta
        const map = L.map('map').setView([-7.8029783, 110.3656536], 15);
        // const height = window.innerHeight;
        // const width = window.innerWidth;
        // Tambahkan tile layer dari OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
    
        // Tentukan koordinat titik awal dan titik akhir
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
        
        // Tambahkan marker untuk titik awal dan akhir
        waypoints.forEach((waypoint, index) => {
          L.marker([waypoint.lat, waypoint.lng]).addTo(map).bindPopup(`Titik ${index + 1}`);
          });

        const result = solveTSP(waypoints);
        console.log("Branch and Bound Result:", result);


        // Urutkan waypoints sesuai solusi TSP
        if (result && result.length > 0) {
          const sortedWaypoints = result.map(index => waypoints[index]);
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
        
      
      const solveTSP = (waypoints) => {
        const n = waypoints.length;
        let minCost = Number.MAX_SAFE_INTEGER;
        let bestPath = [];


        const branchAndBound = (path, bound, level) => {
          if (level === n - 1) {
            const lastCity = path[level - 1];
            const currentCity = path[level];
            const cost = calculateDistance(waypoints[lastCity], waypoints[currentCity]);
    
             // Tambahkan kembali ke node awal
            const returnCost = calculateDistance(waypoints[currentCity], waypoints[path[0]]);
            const totalCost = bound + cost + returnCost;

            if (totalCost < minCost) {
              minCost = totalCost;
              bestPath = [...path, path[0]];
            }
    
            return;
          }
          for (let i = level + 1; i < n; i++) {
            if (!path.includes(i)) {
              const currentCity = path[level];
              const cost = calculateDistance(waypoints[currentCity], waypoints[i]);
    
              if (bound + cost < minCost) {
                path[level + 1] = i;
                branchAndBound([...path], bound + cost, level + 1);
              }
            }
          }
        };
    
        branchAndBound([0], 0, 0);
        console.log("Min Cost:", minCost);
        console.log("Best Path:", bestPath);
        return bestPath;
      };
      const calculateDistance = (point1, point2) => {
        const dx = point1.lat - point2.lat;
        const dy = point1.lng - point2.lng;
        return Math.sqrt(dx * dx + dy * dy);
      };
    
        return (
        <>
           <Header />
           <div id="map" style={{ height: '100vh', width: '100vw' }}>
            {/* <MapContainer center={[-7.8029783, 110.3656536]} zoom={15} style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap contributors' />  
            </MapContainer> */}
           </div>

        </>
    )
}

export default TampilanPeta