import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Heatmap.css';
import L from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Map as MapIcon,
    Calendar,
    Shield,
    Leaf,
    Smile,
    CloudSun,
    Newspaper,
    Navigation,
    TrendingUp
} from 'lucide-react';

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// --- Mock Data ---

const DISTRICTS = {
    dhaka: {
        id: 'dhaka',
        name: 'Dhaka',
        coords: [23.8103, 90.4125],
        description: 'The capital city, bustling with life and history.',
        risk: 'Medium',
        eco: 'Low',
        comfort: 'Medium',
        weather: { temp: '32°C', condition: 'Haze' },
        news: ['Traffic updates: Heavy congestion in Gulshan.', 'New metro rail schedule announced.'],
        landmarks: [
            { name: 'Lalbagh Fort', coords: [23.7195, 90.3881] },
            { name: 'Ahsan Manzil', coords: [23.7086, 90.4060] }
        ]
    },
    chittagong: {
        id: 'chittagong',
        name: 'Chittagong',
        coords: [22.3569, 91.7832],
        description: 'The port city, known for its green hills and sea.',
        risk: 'Low',
        eco: 'High',
        comfort: 'High',
        weather: { temp: '29°C', condition: 'Sunny' },
        news: ['Port activity increases by 15%.', 'Beach festival starting this weekend.'],
        landmarks: [
            { name: 'Patenga Beach', coords: [22.2386, 91.7963] },
            { name: 'Foy\'s Lake', coords: [22.3655, 91.7950] }
        ]
    },
    sylhet: {
        id: 'sylhet',
        name: 'Sylhet',
        coords: [24.8949, 91.8687],
        description: 'Land of tea gardens and saints.',
        risk: 'Low',
        eco: 'Very High',
        comfort: 'High',
        weather: { temp: '27°C', condition: 'Rainy' },
        news: ['Tea production hits record high.', 'Tourist influx expected for Eid.'],
        landmarks: [
            { name: 'Ratargul Swamp Forest', coords: [25.0000, 91.9333] },
            { name: 'Jaflong', coords: [25.1633, 92.0172] }
        ]
    },
    coxsbazar: {
        id: 'coxsbazar',
        name: 'Cox\'s Bazar',
        coords: [21.4272, 92.0058],
        description: 'The longest natural sea beach in the world.',
        risk: 'Low',
        eco: 'Medium',
        comfort: 'Very High',
        weather: { temp: '30°C', condition: 'Clear' },
        news: ['New hotels opening near marine drive.', 'Safety warnings for high tide.'],
        landmarks: [
            { name: 'Inani Beach', coords: [21.1967, 92.0642] },
            { name: 'Himchari', coords: [21.3500, 92.0333] }
        ]
    }
};

const TRIPS = [
    {
        id: 1,
        from: 'dhaka',
        to: 'chittagong',
        date: '2023-10-15',
        risk: 2, // 1-10
        eco: 7,
        comfort: 8,
        path: [DISTRICTS.dhaka.coords, [23.0, 91.0], DISTRICTS.chittagong.coords]
    },
    {
        id: 2,
        from: 'chittagong',
        to: 'coxsbazar',
        date: '2023-10-18',
        risk: 1,
        eco: 8,
        comfort: 9,
        path: [DISTRICTS.chittagong.coords, [21.8, 92.0], DISTRICTS.coxsbazar.coords]
    },
    {
        id: 3,
        from: 'dhaka',
        to: 'sylhet',
        date: '2023-11-05',
        risk: 3,
        eco: 9,
        comfort: 7,
        path: [DISTRICTS.dhaka.coords, [24.3, 91.2], DISTRICTS.sylhet.coords]
    },
    {
        id: 4,
        from: 'sylhet',
        to: 'chittagong',
        date: '2023-12-10',
        risk: 2,
        eco: 8,
        comfort: 8,
        path: [DISTRICTS.sylhet.coords, [23.5, 91.5], DISTRICTS.chittagong.coords]
    },
    {
        id: 5,
        from: 'coxsbazar',
        to: 'dhaka',
        date: '2024-01-15',
        risk: 4,
        eco: 6,
        comfort: 9,
        path: [DISTRICTS.coxsbazar.coords, [22.5, 91.0], DISTRICTS.dhaka.coords]
    },
    {
        id: 6,
        from: 'dhaka',
        to: 'coxsbazar',
        date: '2024-02-20',
        risk: 1,
        eco: 7,
        comfort: 10,
        path: [DISTRICTS.dhaka.coords, [22.0, 91.5], DISTRICTS.coxsbazar.coords]
    }
];

// --- Components ---

function MapController({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, zoom, { duration: 1.5 });
        }
    }, [center, zoom, map]);
    return null;
}

function AIInsight({ district }) {
    const insights = useMemo(() => {
        const safe = district.risk === 'Low' || district.risk === 'Medium';
        return {
            message: safe
                ? `AI Analysis: It is a great time to visit ${district.name}. Weather is favorable and risk levels are manageable.`
                : `AI Analysis: Exercise caution when visiting ${district.name} due to current conditions.`,
            score: safe ? 92 : 65
        };
    }, [district]);

    return (
        <div className="ai-insight">
            <div className="ai-header">
                <Smile size={20} />
                <h4 className="ai-title">AI Travel Insight</h4>
            </div>
            <p className="ai-message">{insights.message}</p>
            <div className="ai-score">
                <span className="score-label">Confidence Score</span>
                <span className="score-value">{insights.score}%</span>
            </div>
        </div>
    );
}

function DistrictPanel({ district, onClose }) {
    if (!district) return null;

    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="district-panel"
        >
            <button onClick={onClose} className="close-btn">✕</button>

            <h2 className="panel-title">{district.name}</h2>
            <p className="panel-desc">{district.description}</p>

            <AIInsight district={district} />

            <div className="stats-grid">
                <div className="stat-box risk">
                    <Shield className="stat-icon" />
                    <div className="stat-label">Risk</div>
                    <div className="stat-value">{district.risk}</div>
                </div>
                <div className="stat-box eco">
                    <Leaf className="stat-icon" />
                    <div className="stat-label">Eco</div>
                    <div className="stat-value">{district.eco}</div>
                </div>
                <div className="stat-box comfort">
                    <Smile className="stat-icon" />
                    <div className="stat-label">Comfort</div>
                    <div className="stat-value">{district.comfort}</div>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="section-title">
                    <CloudSun size={16} /> Live Weather
                </h3>
                <div className="weather-box">
                    <span className="weather-temp">{district.weather.temp}</span>
                    <span>{district.weather.condition}</span>
                </div>
            </div>

            <div>
                <h3 className="section-title">
                    <Newspaper size={16} /> Local Updates
                </h3>
                <ul className="news-list">
                    {district.news.map((item, i) => (
                        <li key={i} className="news-item">
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-6">
                <h3 className="section-title">
                    <MapIcon size={16} /> Key Landmarks
                </h3>
                <div className="landmarks-list">
                    {district.landmarks.map((l, i) => (
                        <span key={i} className="landmark-tag">
                            {l.name}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

function Timeline({ trips, onSelectTrip, selectedTripId }) {
    return (
        <div className="timeline-container">
            <h3 className="timeline-title">
                <TrendingUp size={16} /> Travel Timeline
            </h3>
            <div className="timeline-items">
                {trips.map((trip, index) => (
                    <button
                        key={trip.id}
                        onClick={() => onSelectTrip(trip)}
                        className={`trip-card ${selectedTripId === trip.id ? 'selected' : ''}`}
                    >
                        <div className="trip-date">
                            <Calendar size={12} />
                            {trip.date}
                        </div>
                        <div className="trip-route">
                            {DISTRICTS[trip.from].name} → {DISTRICTS[trip.to].name}
                        </div>
                        <div className="trip-stats">
                            <span className={`trip-badge ${trip.risk > 5 ? 'badge-risk-high' : 'badge-risk-low'}`}>
                                Risk: {trip.risk}/10
                            </span>
                            <span className="trip-badge badge-comfort">
                                Comfort: {trip.comfort}/10
                            </span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default function Heatmap() {
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [mapCenter, setMapCenter] = useState([23.6850, 90.3563]); // Bangladesh center
    const [mapZoom, setMapZoom] = useState(7);

    const handleDistrictClick = (key) => {
        const district = DISTRICTS[key];
        setSelectedDistrict(district);
        setMapCenter(district.coords);
        setMapZoom(10);
        setSelectedTrip(null); // Deselect trip to focus on district
    };

    const handleTripSelect = (trip) => {
        setSelectedTrip(trip);
        setSelectedDistrict(null);
        // Center map between from and to
        const from = DISTRICTS[trip.from].coords;
        const to = DISTRICTS[trip.to].coords;
        const centerLat = (from[0] + to[0]) / 2;
        const centerLng = (from[1] + to[1]) / 2;
        setMapCenter([centerLat, centerLng]);
        setMapZoom(8);
    };

    return (
        <div className="heatmap-container">
            {/* Timeline Sidebar - Moved to Left */}
            <Timeline
                trips={TRIPS}
                onSelectTrip={handleTripSelect}
                selectedTripId={selectedTrip?.id}
            />

            <MapContainer
                center={[23.6850, 90.3563]}
                zoom={7}
                className="map-view"
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapController center={mapCenter} zoom={mapZoom} />

                {/* District Markers */}
                {Object.entries(DISTRICTS).map(([key, district]) => (
                    <Marker
                        key={key}
                        position={district.coords}
                        eventHandlers={{
                            click: () => handleDistrictClick(key),
                        }}
                    >
                        <Popup>
                            <div style={{ textAlign: 'center' }}>
                                <h3 style={{ fontWeight: 'bold', margin: '0' }}>{district.name}</h3>
                                <p style={{ fontSize: '12px', color: '#666', margin: '0' }}>Click for details</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Trip Paths */}
                {TRIPS.map((trip) => (
                    <Polyline
                        key={trip.id}
                        positions={trip.path}
                        pathOptions={{
                            color: selectedTrip?.id === trip.id ? '#3b82f6' : '#94a3b8',
                            weight: selectedTrip?.id === trip.id ? 5 : 3,
                            opacity: selectedTrip?.id === trip.id ? 1 : 0.6,
                            dashArray: selectedTrip?.id === trip.id ? null : '5, 10'
                        }}
                    />
                ))}

            </MapContainer>

            {/* Overlays */}
            <div className="header-overlay">
                <div className="header-content">
                    <h1 className="header-title">
                        <Navigation size={20} color="#2563eb" />
                        Travel Explorer
                    </h1>
                    <p className="header-subtitle">Interactive Journey Map</p>
                </div>
            </div>

            <AnimatePresence>
                {selectedDistrict && (
                    <DistrictPanel
                        district={selectedDistrict}
                        onClose={() => {
                            setSelectedDistrict(null);
                            setMapZoom(7);
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
