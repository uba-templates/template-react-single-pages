import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Row, Col, FormControl, Icon, Loading, Table, Tabs, Tree } from "tinper-bee";
import request from 'utils/request';
import { Info, Error } from "utils";
const { TabPane } = Tabs;
const TreeNode = Tree.TreeNode;
import './Materiel.less';

const getGridDataURL = 'https://mock.yonyoucloud.com/mock/56/nc/api/ref/factory';
const getTreeDataURL = 'https://mock.yonyoucloud.com/mock/56/nc/api/ref/materiel';
const columns = [
    {
        title: "序号", dataIndex: "id", key: "id", width: 100, render(text, record, index) {
            return (<span>{index + 1}</span>)
        }
    },
    { title: "编码", dataIndex: "code", key: "code", width: 100 },
    { title: "名称", dataIndex: "text", key: "text" }
];
class Materiel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            showLoading: false,
            searchValue: '',
            gridData: [],
            treeData: [],
            factoryValue: null,
            selectedRow: [],
            treeValue: null
        }
    }

    async componentDidMount() {
        const result = await request(getTreeDataURL, {
            method: 'get'
        });
        // console.log(result)
        this.setState({
            treeData: result.data.data
        });
    }

    getId = () => {
        return document.getElementById('materielId');
    }

    showModeHandler = () => {
        this.setState({
            show: true
        });
    }
    hideModalHander = () => {
        this.setState({
            show: false,
            gridData : [],
            factoryValue: null
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
                Error('请选择表格物料数据!');
                return;
            }
            onSave(this.state.factoryValue);
            this.setState({
                show: false,
                searchValue: '',
                factoryValue: null,
                selectedRow: [],
                gridData : []
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
        const result = await request(getTreeDataURL, {
            method: 'get',
            param: {
                key: value
            }
        });
        this.setState({
            treeData: result.data.data,
            showLoading: false,
            selectedRow: [],
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
    rowClassNameHandler = (record, index, indent) => {
        if (this.state.selectedRow[index]) {
            return 'selected';
        } else {
            return '';
        }
    }

    selectTreeNodeHander = async(selectedKey, e) => {
        this.setState({
            treeValue: {
                selectedKey: selectedKey[0],
                title: e.node.props.title
            }
        });
        this.setState({
            showLoading: true
        });
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, 500)
        });
        const result = await request(getGridDataURL, {
            method: 'get',
            param : {
                key : selectedKey[0]
            }
        });
        // console.log(result);
        this.setState({
            gridData: result.data.data,
            selectedRow: new Array(result.data.data.length),
            showLoading: false
        });
    }


    render() {
        return (
            <div className="ref-factory">
                <span onClick={this.showModeHandler}>
                    {this.props.children}
                </span>
                <Modal
                    dialogClassName="ref-materiel-modal"
                    show={this.state.show}
                    onHide={this.hideModalHander}
                    keyboard={true}
                    backdrop={false}
                    className="ref-materiel"
                >
                    <Modal.Header closeButton>
                        <Modal.Title> 物料 </Modal.Title>
                    </Modal.Header >
                    <Modal.Body >
                        <div id="materielId">
                            <Row>
                                <Col md={4}>
                                    <Tabs
                                        defaultActiveKey="2"
                                        tabBarStyle="upborder"
                                        className="ref-materiel-tabs"
                                    >
                                        <TabPane tab='我的搜藏' key="1" style={{ "height": "300px" }}>

                                        </TabPane>
                                        <TabPane tab='全部数据' key="2" style={{ "height": "300px" }}>
                                            <Row>
                                                <Col md={11}>
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
                                                    <Tree
                                                        className="ref-department-tree"
                                                        showLine
                                                        defaultExpandAll={true}
                                                        onSelect={this.selectTreeNodeHander}
                                                        openIcon={<Icon type="uf-folderopen-o" />}
                                                        closeIcon={<Icon type="uf-folder-o" />}
                                                    >
                                                        {
                                                            this.renderTreeNodes(this.state.treeData)
                                                        }
                                                    </Tree>
                                                </Col>
                                            </Row>

                                        </TabPane>
                                    </Tabs>
                                </Col>
                                <Col md={8}>
                                    <Table style={{ "marginLeft": "5px" }}
                                        columns={columns}
                                        emptyText={() => '请从左侧菜单选择项'}
                                        data={this.state.gridData}
                                        rowKey='id'
                                        bordered={true}
                                        rowClassName={this.rowClassNameHandler}
                                        onRowClick={this.clickRowHandler}
                                        scroll={{ y: 280 }}
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
                <Loading container={this.getId} show={this.state.showLoading} loadingType="line" />
            </div>
        );
    }
}

Materiel.propTypes = {
    onSave: PropTypes.func
};

export default Materiel;