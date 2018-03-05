import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Row, Col, FormControl, Tree,Icon,Loading } from "tinper-bee";
const TreeNode = Tree.TreeNode;
import request from 'utils/request';
import { Info,Error } from "utils";
import './DepartmentVersion.less';

const getTreeDataURL = 'https://mock.yonyoucloud.com/mock/56/nc/api/ref/department';

class DepartmentVersion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            showLoading:false,
            searchValue: '',
            treeData: [],
            departValue : null
        }
    }

    async componentDidMount() {
        const resultTree = await request(getTreeDataURL, {
            method: 'get'
        });
        // console.log(resultTree)
        this.setState({
            treeData: resultTree.data.data
        });
    }

    getTreeId = ()=>{
        return document.getElementById('treeId');
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

    selectTreeNodeHander = (selectedKey, e) => {
        // console.log(selectedKey,e.node.props.title);
        this.setState({
            departValue : {
                selectedKey : selectedKey[0],
                title : e.node.props.title
            }
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
            if (!this.state.departValue) {
                Error('请选择!');
                return;
            }
            onSave(this.state.departValue);
            this.setState({
                show: false,
                searchValue:'',
                departValue : null
            });
        }
    }

    searchHandler = async(value) => {
        this.setState({
            showLoading:true
        });
        await new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve()
            }, 2000)
        });
        const resultTree = await request(getTreeDataURL, {
            method: 'get',
            param : {
                key : value
            }
        });
        this.setState({
            treeData: resultTree.data.data,
            showLoading:false,
            departValue : null
        });
    }

    render() {
        return (
            <div className="ref-department">
                <span onClick={this.showModeHandler}>
                    {this.props.children}
                </span>
                <Modal
                    dialogClassName="ref-department-modal"
                    show={this.state.show}
                    onHide={this.hideModalHander}
                    keyboard={true}
                    backdrop={false}
                    className="ref-department"
                >
                    <Modal.Header closeButton>
                        <Modal.Title> 部门版本 </Modal.Title>
                    </Modal.Header >
                    <Modal.Body >
                        <div id="treeId">
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
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.saveHandler} style={{ "marginRight": "10px" }} colors="success"> 确定 </Button>
                        <Button onClick={this.hideModalHander} style={{ "marginRight": "10px" }} colors="danger"> 取消 </Button>
                    </Modal.Footer>
                </Modal>
                <Loading container={this.getTreeId} show={this.state.showLoading} loadingType="line"/>
            </div>
        );
    }
}

DepartmentVersion.propTypes = {
    onSave : PropTypes.func
};

export default DepartmentVersion;