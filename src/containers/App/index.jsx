import {Component} from 'react';
import {Welcome} from 'components';

export default class App extends Component {
    render() {
        return (
            <Welcome
                title="欢迎使用uba所构建的脚手架"
                content="本页面来自演示组件[src/components/Welcome]，你可以修改入口文件[src/entry/index.js]来设置不同的加载组件以及路由规则等。"
            />
        )
    }
}