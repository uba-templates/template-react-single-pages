import React, { Component } from 'react';
import { actions } from "mirrorx";
import { Breadcrumb, Button, Col, Row, FormControl } from 'tinper-bee';
import { createForm } from 'rc-form';
import queryString from 'query-string';

import "./UserAdd.less";


const UserAdd = (props) => {
    const { getFieldProps, getFieldError } = props.form;
    let { location } = props;
    let qs = queryString.parse(location.search);
    let { username, sex, age } = location.state ? location.state : {};
    let errors;

    const saveHandler = () => {
        props.form.validateFields((error, values) => {
            if (!error) {
                if (qs.type === 'add') {
                    actions.user.createByPage(values);
                }else{
                    actions.user.editByPage({ id: qs.id, ...values });
                }
                
            }
        });
    }

    return (<div className="user-add">
        <Row>
            <Col md={12}>
                <div className="user-add-btn-wrap">
                    <Button onClick={() => actions.routing.goBack()} shape="border" >返回</Button>
                </div>
                <div className="user-add-btn-wrap">
                    <Button onClick={saveHandler} colors="success">保存</Button>
                </div>
            </Col>
        </Row>
        <div className="user-add-wrap">
            <Row>
                <Col md={6}>
                    <Col md={1}><span className="user-add-form-lab">姓名：</span> </Col>
                    <Col md={7}>
                        <FormControl {...getFieldProps("username", {
                            rules: [{ required: true, message: "不能为空" }],
                            initialValue: username
                        }) } />
                    </Col>
                    <Col md={2} mdOffset={1}>
                        <span className="user-add-form-lab">{(errors = getFieldError("username")) ? errors.join(',') : null}</span>
                    </Col>
                </Col>
                <Col md={6}>
                    <Col md={1}><span className="user-add-form-lab">性别：</span> </Col>
                    <Col md={7}>
                        <FormControl {...getFieldProps("sex", {
                            rules: [{ required: true, message: "不能为空" }],
                            initialValue: sex
                        }) } />
                    </Col>
                    <Col md={2} mdOffset={1}>
                        <span className="user-add-form-lab">{(errors = getFieldError("sex")) ? errors.join(',') : null}</span>
                    </Col>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Col md={1}><span className="user-add-form-lab">年龄：</span> </Col>
                    <Col md={7}>
                        <FormControl {...getFieldProps("age", {
                            rules: [{ required: true, message: "不能为空" }],
                            initialValue: age
                        }) } />
                    </Col>
                    <Col md={2} mdOffset={1}>
                        <span className="user-add-form-lab">{(errors = getFieldError("age")) ? errors.join(',') : null}</span>
                    </Col>
                </Col>
                <Col md={6}>
                    <Col md={1}><span className="user-add-form-lab">备注：</span> </Col>
                    <Col md={7}>
                        <FormControl {...getFieldProps("memo", {
                            rules: [{ required: true, message: "不能为空" }],
                            initialValue: ""
                        }) } />
                    </Col>
                    <Col md={2} mdOffset={1}>
                        <span className="user-add-form-lab">{(errors = getFieldError("memo")) ? errors.join(',') : null}</span>
                    </Col>
                </Col>
            </Row>
        </div>
    </div>)
}



export default createForm()(UserAdd);