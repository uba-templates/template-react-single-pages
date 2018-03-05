import React, { Component } from 'react';
import { Modal, Button, Row, Col, FormControl } from "tinper-bee";
import { actions } from "mirrorx";
import { createForm } from 'rc-form';
import './BaseModal.less';


class BaseModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    hideModelHandler = () => {
        this.setState({
            show: false
        });
    }

    showModeHandler = (e) => {
        if (e) e.stopPropagation();
        this.setState({
            show: true
        });
    }

    saveHandler = () => {
        let {onSave,record:{id}} = this.props;
        if (onSave) {
            this.props.form.validateFields((error, values) => {
                if (!error) {
                    onSave({id,...values});
                    this.hideModelHandler();
                }
            });
            
        }
    }

    render() {
        let { id, age, sex, username } = this.props.record;
        let errors;
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <span>
                <span onClick={this.showModeHandler}>
                    {this.props.children}
                </span>
                <Modal
                    dialogClassName="base-modal"
                    show={this.state.show}
                    onHide={this.hideModelHandler}
                    keyboard={true}
                    backdrop={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title > {id ? "修改用户" : "新增用户"} </Modal.Title>
                    </Modal.Header >
                    <Modal.Body >
                        <div>


                        </div>
                        <Row>
                            <Col md={2}><span className="base-modal-form-lab">姓名：</span> </Col>
                            <Col md={7}>
                                <FormControl {...getFieldProps("username", {
                                    rules: [{ required: true, message: "不能为空" }],
                                    initialValue: username
                                }) } />
                            </Col>
                            <Col md={2} mdOffset={1}>
                                <span className="base-modal-form-lab">{(errors = getFieldError("username")) ? errors.join(',') : null}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={2}><span className="base-modal-form-lab">性别：</span> </Col>
                            <Col md={7}>
                                <FormControl {...getFieldProps("sex", {
                                    rules: [{ required: true, message: "不能为空" }],
                                    initialValue: sex
                                }) } />
                            </Col>
                            <Col md={2}  mdOffset={1}>
                                <span className="base-modal-form-lab">{(errors = getFieldError("sex")) ? errors.join(',') : null}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={2}><span className="base-modal-form-lab">年龄：</span> </Col>
                            <Col md={7}>
                                <FormControl {...getFieldProps("age", {
                                    rules: [{ required: true, message: "不能为空" }],
                                    initialValue: age
                                }) } />
                            </Col>
                            <Col md={2} mdOffset={1}>
                                <span className="base-modal-form-lab">{(errors = getFieldError("age")) ? errors.join(',') : null}</span>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.saveHandler} style={{ "marginRight": "10px" }} colors="success"> 保存 </Button>
                        <Button onClick={this.hideModelHandler} style={{ "marginRight": "10px" }} colors="danger"> 关闭 </Button>
                    </Modal.Footer>
                </Modal>
            </span>
        );
    }
}


export default createForm()(BaseModal);
