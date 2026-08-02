import React from 'react';
import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet';

interface MapPoint {
  id: string;
  lat: number;
  lng: number;
  title: string;
  subtitle?: string;
}

export function EventMap({
  points,
  height = 320,
  zoom = 11




}: {points: MapPoint[];height?: number;zoom?: number;}) {
  const center: [number, number] = points.length ?
  [points[0].lat, points[0].lng] :
  [52.52, 13.405];

  return (
    <div className="overflow-hidden rounded-2xl border border-line" style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}>
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
        
        {points.map((p) =>
        <CircleMarker
          key={p.id}
          center={[p.lat, p.lng]}
          radius={10}
          pathOptions={{ color: '#7C3AED', fillColor: '#7C3AED', fillOpacity: 0.7 }}>
          
            <Popup>
              <strong>{p.title}</strong>
              {p.subtitle && <div>{p.subtitle}</div>}
            </Popup>
          </CircleMarker>
        )}
      </MapContainer>
    </div>);

}