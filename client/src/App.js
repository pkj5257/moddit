import React, { Fragment, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/alert/Alert";
import Main from "./components/layout/Main";
import PostList from "./components/posts/PostList";
import ProtectedRoute from "./components/route/ProtectedRoute";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/dashboard/CreateProfile";
import PostForm from "./components/posts/PostForm";
import Post from "./components/posts/Post";
import Forum from "./components/forum/Forum";
import ForumList from "./components/forum/ForumList";
import ForumPostForm from "./components/posts/ForumPostForm";
import Chat from "./components/chat/Chat";
import ChatRoomList from "./components/chat/ChatRoomList";
import ListingForm from "./components/listing/ListingForm";
import Listing from "./components/listing/Listing";
import UserList from "./components/user/UserList";
import ModuleSearch from "./components/module/ModuleSearch";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";

import MarketplaceList from "./components/marketplace/MarketplaceList";
import MarketplaceForm from "./components/marketplace/MarketplaceForm";
import ForumMarketplaceForm from "./components/marketplace/ForumMarketplaceForm";
import Marketplace from "./components/marketplace/Marketplace";

import LeaderboardList from "./components/leaderboard/LeaderboardList";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Main} />
          <div className="ui main text container">
            <Alert />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <ProtectedRoute exact path="/forums" component={ForumList} />
              <ProtectedRoute
                exact
                path="/forums/:forum_id"
                component={Forum}
              />
              <ProtectedRoute exact path="/posts" component={PostList} />
              <ProtectedRoute
                exact
                path="/dashboard/:user_id"
                component={withRouter(Dashboard)}
              />
              <ProtectedRoute
                exact
                path="/createprofile"
                component={CreateProfile}
              />
              <ProtectedRoute exact path="/posts/new" component={PostForm} />
              <ProtectedRoute exact path="/posts/:post_id" component={Post} />
              <ProtectedRoute
                exact
                path="/forums/:forum_id/posts/new"
                component={ForumPostForm}
              />
              <ProtectedRoute
                exact
                path="/forums/:forum_id/listings/new"
                component={ListingForm}
              />
              <ProtectedRoute
                exact
                path="/forums/:forum_id/marketplaces/new"
                component={ForumMarketplaceForm}
              />
              <ProtectedRoute
                exact
                path="/listing/:listing_id"
                component={Listing}
              />
              <ProtectedRoute exact path="/chat" component={Chat} />
              <ProtectedRoute
                exact
                path="/chat/join"
                component={ChatRoomList}
              />
              <ProtectedRoute exact path="/users" component={UserList} />

              <ProtectedRoute
                exact
                path="/marketplace"
                component={MarketplaceList}
              />
              <ProtectedRoute
                exact
                path="/marketplace/:marketplace_id"
                component={Marketplace}
              />
              <ProtectedRoute
                exact
                path="/marketplace/new"
                component={MarketplaceForm}
              />
              <ProtectedRoute exact path="/module" component={ModuleSearch} />

              <Route exact path="/leaderboard" component={LeaderboardList} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
