import React, { Component } from 'react';
import { actions } from "mirrorx";
import { Table, Button, Col, Row, Icon ,Popconfirm} from 'tinper-bee';
import BaseModal from "./BaseModal";
import DepartmentVersion from 'components/Reference/DepartmentVersion';
import Factory from 'components/Reference/Factory';
import Materiel from 'components/Reference/Materiel';




import "./index.less";


const User = ({list,location}) => {
    let {remove,create,edit} = actions.user;
    const editPageHandler = (record) => {
        actions.routing.push({
            pathname: `${location.pathname}/add`,
            search: `?type=edit&id=${record.id}`,
            state : record
        });
    }
    const AddPageHandler = () => {
        actions.routing.push({
            pathname: `${location.pathname}/add`,
            search: '?type=add',
            state : {}
        });
    }
    const getDepartmentHandler = (obj) => {
        console.log(obj);
    }
    const getFactoryHandler =(obj) => {
        console.log(obj);
    }
    const getMaterielHandler = (obj) => {
        console.log(obj);
    }
    const columns = [
        {
            title: "用户名",
            dataIndex: "username",
            key: "username",
            width: 200
        }, {
            id: "123",
            title: "性别",
            dataIndex: "sex",
            key: "sex",
            width: 120
        }, {
            title: "年龄",
            dataIndex: "age",
            key: "age",
            width: 120
        }, {
            title: "操作",
            dataIndex: "id",
            key: "id",
            render(text, record, index) {
                let {id} = record;
                return (
                    <div>
                        <BaseModal
                            record={record}
                            onSave={edit}
                        >
                            <Button className="user-table-btn" size="sm" colors="info">编辑</Button>
                        </BaseModal>
                        <Button onClick={editPageHandler.bind(this,record)} className="user-table-btn" size="sm" colors="info">编辑（切换）</Button>
                        <Popconfirm
                            trigger="click"
                            placement="right"
                            content={"是否删除?"}
                            onClose={remove.bind(this,{id})}
                            rootClose={true}
                        >
                            <Button className="user-table-btn" size="sm" colors="danger">删除</Button>
                        </Popconfirm>
                        
                    </div>
                );
            }
        }
    ];

    return (<div className="user">
        <Row>
            <Col md={12}>
                <div className="user-btn-wrap">
                    <Button onClick={() => actions.user.load()} shape="border" colors="success">加载</Button>
                </div>
                <div className="user-btn-wrap">
                    <Button onClick={() => actions.user.clear()} shape="border" colors="danger">清除</Button>
                </div>
                <div className="user-btn-wrap">
                    <BaseModal
                        record={{}}
                        onSave={create}
                    >
                        <Button shape="border" colors="info">添加</Button>
                    </BaseModal>
                </div>
                <div className="user-btn-wrap">
                    <Button onClick={AddPageHandler} shape="border" colors="info">新增（页面跳转）</Button>
                </div>
                <div className="user-btn-wrap">
                    <DepartmentVersion
                        onSave={getDepartmentHandler}
                    >
                        <Button shape="border" colors="info">参照(部门版本)</Button>
                    </DepartmentVersion>
                </div>
                <div className="user-btn-wrap">
                    <Factory
                        onSave={getFactoryHandler}
                    >
                        <Button shape="border" colors="info">参照(工厂)</Button>
                    </Factory>
                </div>
                <div className="user-btn-wrap">
                    <Materiel
                        onSave={getMaterielHandler}
                    >
                        <Button shape="border" colors="info">参照(物料)</Button>
                    </Materiel>
                </div>
            </Col>
        </Row>
        <Row>
            <Col md={12}>
                <Table bordered
                    rowKey={"id"}
                    columns={columns}
                    data={list}
                    emptyText={() => <span><Icon className="user-table-empty-icon" type="uf-exc-c"></Icon></span>}
                />
            </Col>
        </Row>
    </div>)
}





export default User;
