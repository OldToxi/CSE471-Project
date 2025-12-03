import React from 'react';
import dayjs from 'dayjs';


export default function TimelinePanel({ trips, onTripClick, selectedTrip }) {
if (!trips.length) return <div className="p-4">No trips yet.</div>;


return (
<div className="bg-white rounded-lg shadow p-3 overflow-auto" style={{ maxHeight: '70vh' }}>
<h2 className="text-lg font-semibold mb-2">Travel Timeline</h2>
<ul className="space-y-3">
{trips.map((t) => (
<li key={t.id} className={`p-2 rounded border ${selectedTrip && selectedTrip.id===t.id ? 'border-indigo-500' : 'border-gray-200'}`}>
<div className="flex justify-between items-start">
<div>
<div className="font-medium">{t.from} → {t.to}</div>
<div className="text-sm text-gray-600">{dayjs(t.startDate).format('MMM D, YYYY')} — {dayjs(t.endDate).format('MMM D, YYYY')}</div>
<div className="text-xs mt-1">Risk: <strong>{t.analysis.risk}</strong> | Comfort: <strong>{t.analysis.comfortScore}</strong> | Eco: <strong>{t.analysis.ecoScore}</strong></div>
</div>
<div className="text-right">
<button className="px-2 py-1 rounded bg-indigo-600 text-white text-sm" onClick={() => onTripClick(t)}>View</button>
</div>
</div>
<div className="mt-2 text-sm text-gray-700">AI insight: {t.analysis.insight}</div>
</li>
))}
</ul>
</div>
);
}