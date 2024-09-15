import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './Components/Navbar';
import { Homeee } from './Components/Homeee';
import About from './Components/About';
import NoteState from './Context/NoteState';

function App() {
  return (
    <>
<NoteState>
      <Router>
        <Navbar />
        <div className="container">
            <Routes>          
          <Route exact path="/" element={<Homeee/>}/>
          <Route exact path="/about" element={<About/>}/>
        </Routes>
        </div>  
      </Router>
      </NoteState>
    </>
  );
}

export default App;
