import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Navigator from "./components/Partials/Navbar";
import Footer from "./components/Partials/Footer";
import MessageAlert from "./components/Partials/MessageAlert";
import Signup from "./components/User/Signup";
import Login from "./components/User/Login";
import ChangePassword from "./components/User/ChangePassword";
import Profile from "./components/User/Profile";
import AllDecks from "./components/Decks/AllDecks";
import AddBlog from "./components/Blog/AddBlog";
import BlogDetails from "./components/Blog/BlogDetails";
import AllBlogPage from "./pages/AllBlogPage";
import UserBlogPage from "./pages/UserBlogPage";
import Logout from "./components/User/Logout";
import CardList from "./components/Cards/CardList";
import AddMonsterCardPage from "./pages/AddMonsterCardPage";
import SpellCardList from "./components/SpellCards/SpellCardList";
import TrapCardList from "./components/TrapCards/TrapCardList";
import DeckDetails from "./components/Decks/DeckDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigator/>
        <MessageAlert/>
        <Switch>
          <Route path="/" exact component={CardList} />
          <Route path="/spell-cards" exact component={SpellCardList} />
          <Route path="/trap-cards" exact component={TrapCardList} />
          <Route path="/add-monster-card" component={AddMonsterCardPage} />
          <Route path="/users/signup" component={Signup} />
          <Route path="/users/login" component={Login} />
          <Route path="/users/change-password" component={ChangePassword} />
          <Route path="/users/logout" component={Logout} />
          <Route path="/profile" component={Profile} />
          <Route path="/decks/all" component={AllDecks} />
          <Route path="/blogs/user/:userID" component={UserBlogPage} />
          <Route path="/blogs/all" component={AllBlogPage} />
          <Route path="/blogs/add" component={AddBlog} />
          <Route path="/decks/details/:deckID" component={DeckDetails} />
          <Route path="/blogs/details/:blogID" component={BlogDetails} />
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
