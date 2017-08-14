import React,{ Component } from 'react';
import './index.css';
import './index.less';

export default class Test extends Component{
  constructor(props) {
   super(props);
 }
  render(){
    return <div className="Test">Hello {this.props.name} , I am from Components.</div>
  }
}
