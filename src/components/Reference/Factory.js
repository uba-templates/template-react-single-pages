import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Row, Col, FormControl, Icon, Loading, Table } from "tinper-bee";
import request from 'utils/request';
import { Info,Error } from "utils";
import './Factory.less';

const getGridDataURL = 'https://mock.yonyoucloud.com/mock/56/nc/api/ref/factory';
const columns = [
    {
        title: "序号", dataIndex: "id", key: "id", width: 100, render(text, record, index) {
            return (<span>{index + 1}</span>)
        }
    },
    { title: "编码", dataIndex: "code", key: "code", width: 100 },
    { title: "名称", dataIndex: "text", key: "text" }
];
class Factory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            showLoading: false,
            searchValue: '',
            gridData: [],
            factoryValue: null,
            selectedRow: []
        }
    }

    async componentDidMount() {
        const result = await request(getGridDataURL, {
            method: 'get'
        });
        // console.log(result);
        this.setState({
            gridData: result.data.data,
            selectedRow: new Array(result.data.data.length)
        });
    }

    getGridId = () => {
        return document.getElementById('gridId');
    }

    showModeHandler = () => {
        this.setState({
            show: true
        });
    }
    hideModalHander = () => {
        this.setState({
            show: false
        });
    }


    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.id}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode title={item.title} key={item.id} />;
        });
    }

    searchValueHandler = (searchValue) => {
        this.setState({
            searchValue
        });
    }

    saveHandler = () => {
        let onSave = this.props.onSave;
        if (onSave) {
            if (!this.state.factoryValue) {
                Error('请选择!');
                return;
            }
            onSave(this.state.factoryValue);
            this.setState({
                show: false,
                searchValue: '',
                factoryValue: null,
                selectedRow:[]
            });
        }
    }

    searchHandler = async (value) => {
        this.setState({
            showLoading: true
        });
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, 2000)
        });
        const result = await request(getGridDataURL, {
            method: 'get',
            param: {
                key: value
            }
        });
        this.setState({
            treeData: result.data.data,
            showLoading: false,
            selectedRow:[],
            factoryValue: null,
        });
    }

    clickRowHandler = (record, index, event) => {
        let selectedRow = new Array(this.state.gridData.length);
        selectedRow[index] = true;
        this.setState({
            factoryValue: record,
            selectedRow: selectedRow
        });
    }
    rowClassNameHandler = (record,index,indent) => {
        if (this.state.selectedRow[index]) {
            return 'selected';
        } else {
            return '';
        }
    }


    render() {
        return (
            <div className="ref-factory">
                <span onClick={this.showModeHandler}>
                    {this.props.children}
                </span>
                <Modal
                    dialogClassName="ref-factory-modal"
                    show={this.state.show}
                    onHide={this.hideModalHander}
                    keyboard={true}
                    backdrop={false}
                    className="ref-factory"
                >
                    <Modal.Header closeButton>
                        <Modal.Title> 工厂 </Modal.Title>
                    </Modal.Header >
                    <Modal.Body >
                        <div id="gridId">
                            <Row>
                                <Col md={12}>
                                    <FormControl
                                        value={this.state.searchValue}
                                        type='search'
                                        onSearch={this.searchHandler}
                                        onChange={this.searchValueHandler}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Table
                                        columns={columns}
                                        emptyText={() => '暂无数据'}
                                        data={this.state.gridData}
                                        rowKey='id'
                                        bordered={true}
                                        rowClassName={this.rowClassNameHandler}
                                        onRowClick={this.clickRowHandler}
                                        scroll={{ y: 200 }}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.saveHandler} style={{ "marginRight": "10px" }} colors="success"> 确定 </Button>
                        <Button onClick={this.hideModalHander} style={{ "marginRight": "10px" }} colors="danger"> 取消 </Button>
                    </Modal.Footer>
                </Modal>
                <Loading container={this.getGridId} show={this.state.showLoading} loadingType="line" />
            </div>
        );
    }
}

Factory.propTypes = {
    onSave: PropTypes.func
};

export default Factory;