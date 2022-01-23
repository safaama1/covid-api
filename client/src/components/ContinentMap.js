import WorldMap from 'react-world-map'
import '../css/ContinentMap.css'
function ContinentMap({ continent }) {

    return (
        <>
            <WorldMap selected={continent} />
        </>
    );
}
export default ContinentMap;