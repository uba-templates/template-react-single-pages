import React, { Component } from 'react';
import { Link } from "mirrorx";
import './index.less';

export default class App extends Component {
	render() {
		return (
			<div className="index">
				<div className="index-header">
					<h3 className="index-title">
						<Link to="/"> 开发框架 </Link>
					</h3>
					<ul className="index-main">
						{/* 生产基础数据路由 */}
						<li className="index-main-li">
							<h3>基础数据</h3>
							<ul className="index-ul">
								<li className="index-li">
									<Link to="/bdm/user">用户测试</Link>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}
