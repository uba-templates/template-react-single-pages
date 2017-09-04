
import {Router, Route, hashHistory} from 'react-router';

import { App } from 'containers';


export default (
<Router history={hashHistory}>
    <Route path="/" component={App} />
</Router>
)
