import {
  Layers,
  MapPin,
  X
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const API_KEY =
  import.meta.env.VITE_OPENWEATHER_API_KEY;

export default function WeatherMap({
  weather,
  onClose
}) {
  const unit = localStorage.getItem("weatherwise-temperature-unit") || "C";
  const mapElement = useRef(null);
  const mapRef = useRef(null);
  const [layerVisible, setLayerVisible] =
    useState(true);

  useEffect(() => {
    if (!mapElement.current || !weather) {
      return;
    }

    const { lat, lon } =
      weather.coordinates;

    const map = L.map(
      mapElement.current,
      {
        zoomControl: false
      }
    ).setView([lat, lon], 9);

    mapRef.current = map;

    L.control
      .zoom({
        position: "bottomright"
      })
      .addTo(map);

    L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; OpenStreetMap contributors',
        maxZoom: 19
      }
    ).addTo(map);

    const precipitationLayer =
      L.tileLayer(
        `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
        {
          opacity: 0.55,
          attribution:
            "Weather data &copy; OpenWeather"
        }
      );

    precipitationLayer.addTo(map);

    L.circleMarker([lat, lon], {
      radius: 10,
      color: "#ffffff",
      weight: 3,
      fillColor: "#3fa7ff",
      fillOpacity: 1
    })
      .addTo(map)
      .bindPopup(
        `<strong>${weather.displayLocation}</strong><br />${
          unit === "F"
            ? Math.round(weather.current.temperature * 9 / 5 + 32)
            : Math.round(weather.current.temperature)
        }${String.fromCharCode(176)}${unit} &bull; ${weather.current.description}`
      )
      .openPopup();

    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [weather, unit]);

  return (
    <div className="map-modal">
      <div
        className="map-backdrop"
        onClick={onClose}
      />

      <div className="map-dialog">
        <div className="map-header">
          <div>
            <span>LOCATION MAP</span>
            <h2>
              {weather.displayLocation}
            </h2>
          </div>

          <div className="map-header-actions">
            <button
              type="button"
              onClick={() =>
                setLayerVisible((value) => {
                  const next = !value;

                  if (mapRef.current) {
                    mapRef.current.eachLayer(
                      (layer) => {
                        if (
                          layer.options?.attribution?.includes(
                            "OpenWeather"
                          )
                        ) {
                          if (next) {
                            layer.addTo(
                              mapRef.current
                            );
                          } else {
                            mapRef.current.removeLayer(
                              layer
                            );
                          }
                        }
                      }
                    );
                  }

                  return next;
                })
              }
            >
              <Layers size={17} />
              {layerVisible
                ? "Weather layer"
                : "Map only"}
            </button>

            <button
              type="button"
              className="map-close"
              onClick={onClose}
              aria-label="Close map"
            >
              <X size={19} />
            </button>
          </div>
        </div>

        <div
          className="map-canvas"
          ref={mapElement}
        />

        <div className="map-footer">
          <span>
            <MapPin size={15} />
            {weather.coordinates.lat.toFixed(3)},
            {" "}
            {weather.coordinates.lon.toFixed(3)}
          </span>

          <span>
            Precipitation overlay • surrounding area
          </span>
        </div>
      </div>
    </div>
  );
}




