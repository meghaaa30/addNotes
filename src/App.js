import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Notes from './Components/Notes';
import NoteState from './Context/NoteState';

function App() {
  return (
    <>
<NoteState>
      <Router>
        <Navbar />
        <div className="container">
            <Routes>          
          <Route exact path="/" element={<Notes/>}/>
        </Routes>
        </div>  
      </Router>
      </NoteState>
    </>
  );
}

export default App;
