import React, { useEffect, useState } from "react";


return (
<div className="min-h-screen flex flex-col md:flex-row gap-2 p-2">
<div className="md:w-2/3 h-96 md:h-auto rounded-lg shadow p-1">
<MapContainer center={mapCenter} zoom={zoom} style={{ height: '100%', width: '100%' }}>
<TileLayer
attribution='&copy; OpenStreetMap contributors'
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>


{trips.map((trip) import React, { useEffect, useState } from "react";
import dynamic from "react-dynamic-import";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import TimelinePanel from "./TimelinePanel";
import { fetchUserTrips } from '../../services/tripService';
import { analyzeTrip } from '../../services/aiService';


// default marker icon fix for leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
iconUrl: require('leaflet/dist/images/marker-icon.png'),
shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


export default function MapTimeline({ userId }) {
const [trips, setTrips] = useState([]);
const [selectedTrip, setSelectedTrip] = useState(null);
const [mapCenter, setMapCenter] = useState([23.7806, 90.2794]); // Dhaka default
const [zoom, setZoom] = useState(7);


useEffect(() => {
async function load() {
const data = await fetchUserTrips(userId);
// sort by date ascending
data.sort((a,b) => new Date(a.startDate) - new Date(b.startDate));


// analyze trips with AI service (mock or real)
const analyzed = await Promise.all(data.map(async (t) => {
const analysis = await analyzeTrip(t);
return { ...t, analysis };
}));


setTrips(analyzed);
if (analyzed.length) {
const last = analyzed[analyzed.length - 1];
setMapCenter([last.center.lat, last.center.lng]);
setZoom(8);
}
}
load();
}, [userId]);


function onTripClick(trip) {
setSelectedTrip(trip);
setMapCenter([trip.center.lat, trip.center.lng]);
setZoom(12);
}


return (
<div className="min-h-screen flex flex-col md:flex-row gap-2 p-2">
<div className="md:w-2/3 h-96 md:h-auto rounded-lg shadow p-1">
<MapContainer center={mapCenter} zoom={zoom} style={{ height: '100%', width: '100%' }}>
<TileLayer
attribution='&copy; OpenStreetMap contributors'
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>


{trips.map((trip) => (
<React.Fragment key={trip.id}>
<Marker position={[trip.center.lat, trip.center.lng]}>
<Popup>
<strong>{trip.from} → {trip.to}</strong><br />
}=> (
<React.Fragment key={trip.id}>
<Marker position={[trip.center.lat, trip.center.lng]}>
<Popup>
<strong>{trip.from} → {trip.to}</strong><br />
{trip.startDate} — {trip.endDate}<br />
Risk: {trip.analysis.risk} | Comfort: {trip.analysis.comfortScore}<br />
</Popup>
</Marker>


{/* circle shows area visited for trip */}
<Circle center={[trip.center.lat, trip.center.lng]} radius={trip.analysis.footprintMeters || 2000} />
</React.Fragment>
))}


{selectedTrip && (
<Marker position={[selectedTrip.center.lat, selectedTrip.center.lng]}>
<Popup>
<div>
<h3>{selectedTrip.from} → {selectedTrip.to}</h3>
<p>{selectedTrip.startDate} to {selectedTrip.endDate}</p>
</div>
</Popup>
</Marker>
)}
</MapContainer>
</div>


<div className="md:w-1/3 flex flex-col gap-2">
<TimelinePanel trips={trips} onTripClick={onTripClick} selectedTrip={selectedTrip} />
</div>
</div>
);
}

