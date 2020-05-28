import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Navigator from "./components/Partials/Navbar";
import CardList from "./components/Cards/CardList";
import AddCard from "./components/Cards/AddCard";
import SpellCardList from "./components/SpellCards/SpellCardList";
import TrapCardList from "./components/TrapCards/TrapCardList";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigator/>
        <Switch>
          <Route path="/" exact component={CardList} />
          <Route path="/spell-cards" exact component={SpellCardList} />
          <Route path="/trap-cards" exact component={TrapCardList} />
          <Route path="/add-monster-card" component={AddCard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
