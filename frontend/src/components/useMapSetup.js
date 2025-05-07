import { useEffect, useRef } from 'react';

export function useMapSetup(initialPosition) {
  const mapRef = useRef(null);
  
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(initialPosition, 13);
    }
  }, [initialPosition]);

  return mapRef;
}