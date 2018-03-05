import React, { Component } from 'react';
import mirror, { connect } from 'mirrorx';
import qs from 'query-string';
import UserAdd from '../components/User/UserAdd';

mirror.hook((action, getState) => {
    const { routing: { location } } = getState();
    let param = qs.parse(location.search);
    if (action.type === "@@router/LOCATION_CHANGE" && location.pathname === '/bdm/user/add') {
        // console.log(param);
    }
});

export default connect(state => state)(UserAdd);
