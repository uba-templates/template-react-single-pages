/**
 * 业务容器组件
 */

import React, { Component } from "react";
import mirror, { actions, connect } from "mirrorx";
import User from "../components/User";
import UserModel from "../models/User";

//注入Model
mirror.model(UserModel);

//全局HOOK函数

mirror.hook((action, getState) => {
  const { routing: { location } } = getState();
  if (action.type === "@@router/LOCATION_CHANGE" && location.pathname === '/bdm/user') {
    actions.user.load();
  }
});




export default connect((state) => state.user)(User);
