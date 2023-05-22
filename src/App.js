import './App.css';
import Display from './Components/Home/Display';
import 'mapbox-gl/dist/mapbox-gl.css';

/**
 * Renders Home component which has User Input and Map View components
 * @returns 
 */
function App() {
  return (
    <div className="App" data-testid="app">
      <Display data-testid="home"></Display>
    </div>
  );
}

export default App;
