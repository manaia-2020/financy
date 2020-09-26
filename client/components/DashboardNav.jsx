import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { logOff, isAuthenticated } from "authenticare/client";
import { IfAuthenticated } from "./Authenticated";

import Transactions from "./Transactions";

const DashboardNav = (props) => {
  const handleClick = () => {
    logOff();
    if (!isAuthenticated()) {
      props.history.push("/");
    }
  };

  return (
    <div>
      <IfAuthenticated>
        <ul>
          <li>
            <Link to="/dashboard">Profile</Link>
          </li>
          <li>
            <Link to="/rewards">Rewards</Link>
          </li>
          <li>
            <Link to="/goals">Goals</Link>
          </li>
          <li>
            <Link to="/transactions">Transactions</Link>
          </li>
        </ul>
        <button onClick={handleClick}>Log off</button>
      </IfAuthenticated>
      <Switch>
        {/* <Route exact path="/dashboard">
          <Profile />
        </Route>
        <Route path="/rewards">
          <Rewards />
        </Route>
        <Route path="/goals">
          <Goals />
        </Route> */}
        <Route exact path="/transactions">
          <Transactions />
        </Route>
      </Switch>
    </div>
  );
};

export default DashboardNav;
