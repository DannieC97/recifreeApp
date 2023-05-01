import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AllRecipes from './components/AllRecipes';
import CreateRecipes from './components/CreateRecipes';
//import RecipeAPIProvider from "./components/context/RecipeContext";
import RecipePage from './components/RecipePage';

function App() {
  return (
    <Router>
      <div className="App">
          
              <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route exact path="/allrecipes" element={<AllRecipes />} />
                  <Route exact path="/createrecipes" element={<CreateRecipes />} />
                  <Route exact path="/recipePage/:id" element={<RecipePage />} />
              </Routes>
          
      </div>
      </Router>
  );
}

export default App;
