import { useEffect, useState } from 'react';

export function useScrollZoom(initialZoom = 1, sensitivity = 0.001, minZoom = 0.5, maxZoom = 3) {
    const [zoom, setZoom] = useState(initialZoom);

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (e.ctrlKey) return; // avoid conflicting with browser zoom
            e.preventDefault();

            setZoom(prev => {
                const next = prev - e.deltaY * sensitivity;
                return Math.min(maxZoom, Math.max(minZoom, next));
            });
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleWheel);
    }, [sensitivity, minZoom, maxZoom]);

    return [zoom, setZoom] as const;
}
