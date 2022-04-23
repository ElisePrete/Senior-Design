import './App.css';
import Home from './components/HomePage/Home'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Document from './components/DocumentPage/Document'
import { useMediaQuery } from 'react-responsive';

export var isPhone = false

function App() {
  isPhone = useMediaQuery({ query: '(max-width: 1224px)' })
  //class=" bg-light"
  return (
    <Router >
        <Routes>
        <Route path="/"  element={<Home className="Page"/>}/>
        <Route path="document/:docID" element={ <Document className="Page" />} />  
      </Routes>
    </Router>
  );
}
export default App;
