import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './screens/Home';

function App() {
  return (
    <div className="App h-full">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
