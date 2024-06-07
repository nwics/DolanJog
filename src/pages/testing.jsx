import React, { useEffect, useState } from 'react';

function TSPRoute() {
    const [route, setRoute] = useState([]);

    useEffect(() => {
        const waypoints = [
            { id: 1, name: "A", lat: -7.800671500000001, lng: 110.3676551 },
            { id: 6, name: "F", lat: -7.7705416, lng: 110.4894158 },
            { id: 4, name: "E", lat: -7.943178000000001, lng: 110.48924 },
            { id: 2, name: "B", lat: -7.8052845, lng: 110.3642031 },
            { id: 5, name: "D", lat: -7.816315599999999, lng: 110.3871442 },
            { id: 3, name: "C", lat: -8.1384509, lng: 110.577522 },
        ];

        const calculateDistance = (lat1, lon1, lat2, lon2) => {
            var R = 6371; // radius of Earth in kilometers
            var dLat = (lat2 - lat1) * Math.PI / 180;
            var dLon = (lon2 - lon1) * Math.PI / 180;
            var a = 
                Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = R * c;
            return d;
        };

        const findNearest = (point, waypoints) => {
            var nearest = null;
            var minDistance = Infinity;
            waypoints.forEach(function(waypoint) {
                var distance = calculateDistance(point.lat, point.lng, waypoint.lat, waypoint.lng);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearest = waypoint;
                }
            });
            return nearest;
        };

        const findTSPRoute = (waypoints) => {
            var route = [waypoints[0]]; // mulai dari titik pertama
            var remainingWaypoints = waypoints.slice(1); // titik-titik yang belum dikunjungi

            while (remainingWaypoints.length > 0) {
                var lastPoint = route[route.length - 1];
                var nearest = findNearest(lastPoint, remainingWaypoints);
                route.push(nearest);
                remainingWaypoints = remainingWaypoints.filter(function(waypoint) {
                    return waypoint !== nearest;
                });
            }

            route.push(waypoints[0]); // kembali ke titik awal

            return route;
        };

        const route = findTSPRoute(waypoints);
        setRoute(route);
    }, []);

    return (
        <div>
            <h1>Rute TSP</h1>
            <p>{route.map(waypoint => waypoint.name).join(' -> ')}</p>
        </div>
    );
}

export default TSPRoute;
