import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserProfile, clearProfile } from "../../actions/profile";
import { Link, withRouter } from "react-router-dom";
import {
  getListingsByUser,
  getListings,
  clearListings,
} from "../../actions/listing";
import { getPostsByUser, clearPosts } from "../../actions/post";
import { getMarketplacesByUser, clearMPost } from "../../actions/marketplace";

import { getLeaderboardsByUser } from "../../actions/leaderboard";
import LeaderboardByUser from "../leaderboard/LeaderboardByUser";

import BadgeList from "../badge/BadgeList";

import ListingListByUser from "../listing/ListingListByUser";
import PostListByUser from "../posts/PostListByUser";
import MListByUser from "../marketplace/MListByUser";
import { privateChat, getPrivateChat } from "../../actions/chatRoom";
import ChatList from "../chat/ChatList";
import ModuleList from "../module/ModuleList";

const Dashboard = ({
  auth: { user },
  profile: { loading, profile },
  chatRoom,
  getListingsByUser,
  getPostsByUser,
  getUserProfile,
  clearProfile,
  clearListings,
  clearPosts,
  clearMPost,
  privateChat,
  getPrivateChat,
  getMarketplacesByUser,
  getLeaderboardsByUser,
  match,
  history,
}) => {
  useEffect(() => {
    getUserProfile(match.params.user_id);
    getPostsByUser(match.params.user_id);
    getListingsByUser(match.params.user_id);
    getPrivateChat(match.params.user_id);
    getMarketplacesByUser(match.params.user_id);
    getLeaderboardsByUser(match.params.user_id);

    return () => {
      clearProfile();
      clearPosts();
      clearListings();
      clearMPost();
    };
  }, [
    getUserProfile,
    getPostsByUser,
    getListingsByUser,
    match.params.user_id,
    getPrivateChat,
    getMarketplacesByUser,
    getLeaderboardsByUser,
  ]);

  const [dashboardState, setDashboardState] = useState({
    posts: false,
    listings: false,
    marketplace: false,
    privateChat: false,
    modules: false,

    leaderboards: false,

    bio: true,
  });

  const toggleListing = (e) => {
    setDashboardState({
      listings: true,
      posts: false,
      privateChat: false,
      modules: false,
      marketplace: false,

      leaderboards: false,

      bio: false,
    });
  };

  const togglePost = (e) => {
    setDashboardState({
      listings: false,
      posts: true,
      privateChat: false,
      modules: false,
      marketplace: false,

      leaderboards: false,

      bio: false,
    });
  };

  const togglePrivateChat = (e) => {
    setDashboardState({
      listings: false,
      posts: false,
      privateChat: true,
      modules: false,
      marketplace: false,

      leaderboards: false,

      bio: false,
    });
  };

  const toggleModules = (e) => {
    setDashboardState({
      listings: false,
      posts: false,
      privateChat: false,
      modules: true,
      marketplace: false,

      leaderboards: false,

      bio: false,
    });
  };

  const toggleMarketplace = (e) => {
    setDashboardState({
      listings: false,
      posts: false,
      privateChat: false,
      modules: false,
      marketplace: true,

      leaderboards: false,

      bio: false,
    });
  };

  const toggleBio = (e) => {
    setDashboardState({
      listings: false,
      posts: false,
      privateChat: false,
      modules: false,
      marketplace: false,
      bio: true,
    });
  };

  const toggleLeaderboards = (e) => {
    setDashboardState({
      listings: false,
      posts: false,
      privatechat: false,
      modules: false,
      marketplace: false,
      leaderboards: true,
    });
  };

  const startMessage = (e) => {
    const userData = {
      sender_id: user._id,
      receiver_id: profile.user._id,
    };

    privateChat(userData, history);
  };

  const NoProfile = () => {
    return user._id === match.params.user_id ? (
      <Fragment>
        <AuthHeader />
        <Link to="/createprofile">Click here to make your profile</Link>
      </Fragment>
    ) : (
      <div>This user has no profile</div>
    );
  };

  const HasProfile = () => {
    return user._id === match.params.user_id
      ? profile && (
          <Fragment>
            <AuthHeader />
            <Body />
          </Fragment>
        )
      : profile && (
          <Fragment>
            <NormalHeader />
            <Body />
          </Fragment>
        );
  };

  const AuthHeader = () => (
    <h1 className="ui center aligned header ">Welcome, {user.name} </h1>
  );

  const NormalHeader = () => (
    <Fragment>
      <h1 className="ui center aligned header ">
        {profile.user.name}'s Profile
      </h1>
      <button onClick={startMessage} class="ui centered basic button">
        <i class="paper plane outline icon"></i> Message
      </button>
    </Fragment>
  );

  const Body = () => {
    return (
      <Fragment>
        <div class="ui grid">
          <div class="four wide column">
            <div class="ui vertical fluid tabular menu">
              <a
                style={{ fontSize: "2vmin" }}
                onClick={toggleBio}
                class={dashboardState.bio ? "active item" : "item"}
              >
                Bio
              </a>
              <a
                style={{ fontSize: "2vmin" }}
                onClick={togglePost}
                class={dashboardState.posts ? "active item" : "item"}
              >
                Posts
              </a>
              <a
                style={{ fontSize: "2vmin" }}
                onClick={toggleListing}
                class={dashboardState.listings ? "active item" : "item"}
              >
                Listings
              </a>
              {match.params.user_id === user._id && (
                <a
                  style={{ fontSize: "2vmin" }}
                  onClick={togglePrivateChat}
                  className={
                    dashboardState.privateChat ? "active item" : "item"
                  }
                >
                  Private Chats
                </a>
              )}
              <a
                style={{ fontSize: "2vmin" }}
                onClick={toggleModules}
                class={dashboardState.modules ? "active item" : "item"}
              >
                Modules
              </a>
              <a
                style={{ fontSize: "2vmin" }}
                onClick={toggleMarketplace}
                class={dashboardState.marketplace ? "active item" : "item"}
              >
                Marketplace
              </a>
              <a
                style={{ fontSize: "2vmin" }}
                onClick={toggleLeaderboards}
                class={dashboardState.leaderboards ? "active item" : "item"}
              >
                Badges
              </a>
            </div>
          </div>
          <div class="twelve wide stretched column">
            <div class="ui segment">
              {dashboardState.listings && (
                <ListingListByUser userID={match.params.user_id} />
              )}
              {dashboardState.posts && (
                <PostListByUser userID={match.params.user_id} />
              )}
              {dashboardState.privateChat &&
                match.params.user_id === user._id && <ChatList />}
              {dashboardState.modules && (
                <ModuleList userID={match.params.user_id} />
              )}
              {dashboardState.marketplace && (
                <MListByUser userID={match.params.user_id} />
              )}
              {dashboardState.bio && (
                <div role="list" class="ui list">
                  <div role="listitem" class="item">
                    <i aria-hidden="true" class="fas fa-university"></i>
                    <div class="content">{profile.major}</div>
                  </div>

                  <div role="listitem" class="item">
                    <i aria-hidden="true" class="mail icon"></i>
                    <div class="content">
                      <a href="">{profile.user.email}</a>
                    </div>
                  </div>
                </div>
              )}
              {dashboardState.leaderboards && (
                <BadgeList userID={match.params.user_id} />
              )}
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    user && (
      <Fragment>{profile !== null ? <HasProfile /> : <NoProfile />}</Fragment>
    )
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getLoggedProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  chatRoom: state.chatRoom,
});
export default connect(mapStateToProps, {
  getPostsByUser,
  getListingsByUser,
  getUserProfile,
  clearProfile,
  privateChat,
  getPrivateChat,
  clearPosts,
  clearListings,
  clearMPost,
  getMarketplacesByUser,
  getLeaderboardsByUser,
})(withRouter(Dashboard));
