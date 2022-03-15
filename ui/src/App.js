import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
// Import pages
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage'
// Import components
import EditExercisePage from './pages/EditExercisePage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import AuthenticationPage from './pages/AuthenticationPage';
import UserProfilePage from './pages/UserProfilePage';

function App() {
  const history = useHistory();  
  const [exerciseToEdit, setExerciseToEdit] = useState();
  const [ loggedIn, setLoggedIn ] = useState(false);

  return (
    <div className="App">
      <Router>
        <header>
        <h1>Exercise Tracker</h1>
        <p id="description">Create, edit, and view your exercises to help you achieve your fitness goals.</p>
        </header>
        <Navigation loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        <main>
          <Route path="/" exact>
            <HomePage setExerciseToEdit={setExerciseToEdit} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
          </Route>
          <Route path="/login">
            <AuthenticationPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          </Route>
          <Route path="/create-exercise">
            <CreateExercisePage loggedIn={loggedIn}/>
          </Route>
          <Route path="/edit-exercise">
            <EditExercisePage exercise={exerciseToEdit}/>
          </Route>
          <Route path="/profile" exact>
            <UserProfilePage loggedIn={loggedIn}/>
          </Route>
        </main>
        <footer>
          <Footer/>
        </footer>
      </Router>
    </div>
  );
}

export default App;
