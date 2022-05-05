import React,{Component} from 'react';

class Logout extends Component{
	constructor(props){
		super(props);
	}
	
	render(){
		localStorage.clear();
		this.props.history.push("/")
		return(
			<h1>Até logo!</h1>
		);
	}
}
export default Logout;