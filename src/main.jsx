// import React, { Component } from "react";
import Component from './Component'
import ReactDOM from "./react-dom";
import './index.css';


function FunctionComponent(props) {
	return (
		<div className="border">
			<p>{props.name}</p>
		</div>
	)
}

class ClassComponent extends Component{
	render(){
		return (
			<div className="border">
				<p>{this.props.name}</p>
			</div>
		)
	}
}

const container = (
	<div className='border'>
		<h3>类容</h3>
		<div>123</div>
		<FunctionComponent name='函数组件'/>
		<ClassComponent name="class组件"/>
		<>
			<div>1</div>
		</>
	</div>
)

ReactDOM.render(
	container,
	document.getElementById("root")
);
