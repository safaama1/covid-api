import ReactDOM from 'react-dom';
import WorldMap from 'react-world-map'
import '../ContinentMap.css'
function ContinentMap({ continent }) {

    return (
        <>
            <WorldMap selected={continent} />
        </>
    );
}
export default ContinentMap;