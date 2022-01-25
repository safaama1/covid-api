import WorldMap from 'react-world-map'
import '../css/ContinentMap.css'

// world map with the given continent highlighted in yellow 
function ContinentMap({ continent }) {

    return (
        <>
            <WorldMap selected={continent} />
        </>
    );
}
export default ContinentMap;