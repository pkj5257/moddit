import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import ModuleItem from "./ModuleItem";

import {
  getModules,
  getCompletedModules,
  clearModules,
} from "../../actions/module";

const ModuleList = ({
  userID,
  module: { modules, loading },
  auth,
  profile: { profile },
  getCompletedModules,
  clearModules,
  getModules,
}) => {
  useEffect(() => {
    getModules(userID);

    return () => clearModules();
  }, [getModules, getCompletedModules]);

  const [moduleListState, toggleModuleListState] = useState({
    current: true,
    completed: false,
  });

  const toggleCurrent = () => {
    getModules(userID);
    toggleModuleListState({
      current: true,
      completed: false,
    });
  };

  const toggleCompleted = () => {
    getCompletedModules(userID);

    toggleModuleListState({
      current: false,
      completed: true,
    });
  };

  return (
    <Fragment>
      <div className="ui secondary menu">
        <a
          className={moduleListState.current ? "active item" : "item"}
          onClick={toggleCurrent}
        >
          current
        </a>
        <a
          className={moduleListState.completed ? "active item" : "item"}
          onClick={toggleCompleted}
        >
          completed
        </a>
      </div>
      {modules.map((mod) => (
        <ModuleItem key={mod._id} module={mod} profile={profile} auth={auth} />
      ))}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  module: state.module,
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getModules,
  getCompletedModules,
  clearModules,
})(ModuleList);
