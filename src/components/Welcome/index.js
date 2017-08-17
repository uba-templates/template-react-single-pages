import React,{ Component } from 'react';
import './index.css';
import './index.less';

export default class Welcome extends Component{
  constructor(props) {
   super(props);
 }
  render(){
    return (<div>
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.title}</h3>
        </div>
        <div className="panel-body">{this.props.content}</div>
      </div>
    </div>)
  }
}
