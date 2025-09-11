
"use client";

import { useState, useEffect, useMemo } from "react";
import Map, { Marker, Layer, Source, useMap } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { updateUserLocationInOrder } from "@/lib/firestore";
import polyline from '@mapbox/polyline';
import { Order } from "@/hooks/use-orders";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

async function getDirections(start: {lng: number, lat: number}, end: {lng: number, lat: number}) {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.lng},${start.lat};${end.lng},${end.lat}?geometries=polyline&access_token=${MAPBOX_TOKEN}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.routes[0];
    } catch (error) {
        console.error("Error fetching directions:", error);
        return null;
    }
}


export function OrderTrackingMap({ order }: { order: Order }) {
    const [route, setRoute] = useState<any>(null);
    const [routeInfo, setRouteInfo] = useState<{distance: number, duration: number} | null>(null);
    const [isStyleLoaded, setIsStyleLoaded] = useState(false);
    const { current: map } = useMap();

     useEffect(() => {
        if (map) {
            const onStyleLoad = () => setIsStyleLoaded(true);
            map.on('style.load', onStyleLoad);
            
            // If style is already loaded, set it directly
            if (map.isStyleLoaded()) {
                setIsStyleLoaded(true);
            }

            return () => {
                map.off('style.load', onStyleLoad);
            };
        }
    }, [map]);


    useEffect(() => {
        if (order && !order.userLocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    updateUserLocationInOrder(order.id, { lat: latitude, lng: longitude });
                },
                (err) => console.error("Could not get user location", err),
                { enableHighAccuracy: true }
            );
        }
    }, [order]);

    useEffect(() => {
        if (order?.driverLocation && order.userLocation) {
            getDirections(order.driverLocation, order.userLocation).then(data => {
                if (data) {
                    const decoded = polyline.toGeoJSON(data.geometry);
                    setRoute({
                        type: 'Feature',
                        properties: {},
                        geometry: decoded,
                    });
                    setRouteInfo({ distance: data.distance, duration: data.duration });
                }
            })
        }
    }, [order?.driverLocation, order?.userLocation]);
    
    const viewport = useMemo(() => {
        let centerLocation = order?.userLocation || { lat: 6.5244, lng: 3.3792 };
        if (order?.driverLocation && order?.userLocation) {
            centerLocation = {
                lat: (order.driverLocation.lat + order.userLocation.lat) / 2,
                lng: (order.driverLocation.lng + order.userLocation.lng) / 2,
            };
        }
        
        return {
            latitude: centerLocation.lat,
            longitude: centerLocation.lng,
            zoom: 12
        };
    }, [order?.userLocation, order?.driverLocation]);


    return (
        <div className="space-y-4">
             <div className="relative h-72 w-full rounded-lg overflow-hidden">
                <Map
                    mapboxAccessToken={MAPBOX_TOKEN}
                    initialViewState={viewport}
                    style={{ width: '100%', height: '100%' }}
                    mapStyle="mapbox://styles/echilord/cmf7c1uy9000m01sdg37522su"
                    key={`${viewport.latitude}-${viewport.longitude}`} // Force re-render on viewport change
                >
                    {order.userLocation && (
                        <Marker longitude={order.userLocation.lng} latitude={order.userLocation.lat} color="red" />
                    )}
                    {order.driverLocation && (
                        <Marker longitude={order.driverLocation.lng} latitude={order.driverLocation.lat} color="blue" />
                    )}
                    {isStyleLoaded && route && (
                        <Source id="route" type="geojson" data={route}>
                            <Layer
                                id="route"
                                type="line"
                                source="route"
                                layout={{
                                    'line-join': 'round',
                                    'line-cap': 'round'
                                }}
                                paint={{
                                    'line-color': '#007cbf',
                                    'line-width': 5
                                }}
                            />
                        </Source>
                    )}
                </Map>
            </div>
            {routeInfo && (
                <Card className="bg-secondary/50">
                    <CardContent className="p-4 flex items-center justify-around text-center">
                        <div>
                            <p className="text-sm text-muted-foreground">Est. Time</p>
                            <p className="font-bold text-lg">{Math.round(routeInfo.duration / 60)} mins</p>
                        </div>
                        <Separator orientation="vertical" className="h-10" />
                        <div>
                            <p className="text-sm text-muted-foreground">Distance</p>
                            <p className="font-bold text-lg">{(routeInfo.distance / 1000).toFixed(1)} km</p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
