import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import DiscussionBadge from "./DiscussionBadge";
import CommentBadge from "./CommentBadge";
import PointBadge from "./PointBadge";
import MarketplaceBadge from "./MarketplaceBadge";
import { getLeaderboardsByUser } from "../../actions/leaderboard";

const BadgeList = ({
  userID,
  getLeaderboardsByUser,
  leaderboard: { leaderboard, loading },
}) => {
  useEffect(() => {
    getLeaderboardsByUser(userID);
  }, [getLeaderboardsByUser]);
  return (
    <Fragment>
      {!loading && (
        <div>
          <PointBadge
            // key={leaderboard._id}
            leaderboard={leaderboard}
          />

          <div class="ui divider"></div>

          <DiscussionBadge
            // key={leaderboard._id}
            leaderboard={leaderboard}
          />

          <div class="ui divider"></div>

          <MarketplaceBadge
            // key={leaderboard._id}
            leaderboard={leaderboard}
          />

          <div class="ui divider"></div>

          <CommentBadge
            // key={leaderboard._id}
            leaderboard={leaderboard}
          />
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  leaderboard: state.leaderboard,
});

export default connect(mapStateToProps, { getLeaderboardsByUser })(BadgeList);
