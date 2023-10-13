import { useEffect } from "react";

export function Map() {
    useEffect(() => {
        initMap();
    
        async function initMap() {
            await ymaps3.ready;
    
            const {YMap, YMapDefaultSchemeLayer} = ymaps3;
    
            debugger
            const mapContainer = document.getElementById('map') as HTMLDivElement
            mapContainer.innerHTML = '';

            const map = new YMap(
                mapContainer,
                {
                    location: {
                        center: [37.588144, 55.733842],
                        zoom: 10
                    }
                }
            );
    
            map.addChild(new YMapDefaultSchemeLayer({}));
        }
    }, []);
  
    return (
        <div id="map" style={{width: 600, height: 400}}></div>
  )
}