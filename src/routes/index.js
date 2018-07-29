/*
* 路由表
* */
import React from "react";
import { Router, Route } from "mirrorx";
import Layout from "layout";
import BDM from "modules/bdm/router";


const App = () => (
	<Router>
		<div>
			<Route exact path="*" component={Layout} />
			<Route path="/bdm" component={BDM} />
			<Route exact path="/" render={() => (
				<h3>请选择一个菜单</h3>
			)}/>
		</div>
	</Router>
);

export default App;
