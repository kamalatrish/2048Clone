import Header from './src/Header/headerComponent'
import GameComponent from './src/Routes/GameComponent'
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/">
            <GameComponent />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}