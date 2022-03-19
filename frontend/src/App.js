import './App.css';
import Home from './components/HomePage/Home'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Document from './components/DocumentPage/Document'

function App() {
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
