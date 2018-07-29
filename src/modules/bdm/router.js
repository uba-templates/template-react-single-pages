/*
* bdm模块路由表
* */
import React from "react";
import { Route,Link } from "mirrorx";
import User from './containers/User';
import UserAdd from './containers/UserAdd';


const Routers = ({ match }) => (
	<div>
		<Route exact path={match.url} render={() => (
            <h3>请选择一个菜单</h3>
        )}/>
        <Route exact path={`${match.url}/user`} component={User}/>
        <Route exact path={`${match.url}/user/add`} component={UserAdd}/>
	</div>
);

export default Routers;