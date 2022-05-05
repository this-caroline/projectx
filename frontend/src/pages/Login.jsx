import React,{Component} from 'react';
import api from '../services/api';
import {  Card,Form, Label, FormGroup, Button, Checkbox, Modal } from 'react-bootstrap'

class Login extends Component{
	constructor(props){
		super(props);
	
		this.state = {
			email:"",
			password:"",
			error: ''
		}
	}
	
	onSubmit= async e =>{
		e.preventDefault();
		await this.onButton()
	}

	onChange= async e=>{
		await this.setState({
			form:{
				...this.state.form,
				[e.target.name]:e.target.value
			}
		})
	}

	onButton= async () => { 
		const data = {
			password: this.state.password,
			email: this.state.email
		}
		api.post('/session', data)
		.then(res => {
			if(res?.status === 200){
				localStorage.setItem('token', res.data.token);
				this.props.history.push("/List")
			}
		})
		.catch(error => {
			this.setState({error:"Senha ou Email inválidos"})
		});
	}

render(){
    return(
	<React.Fragment>
		<Card  style={{ alignItems: 'center'}} className="text-center" >
  			<Card.Header >Project X</Card.Header>
			<Card.Body className="text-center" >
				<Card.Title>Login</Card.Title>
				<span className="text-danger">{this.state.error} </span>
    			<Form.Control
				 type="email"
				 placeholder="email@email.com"
				 onChange={ e => {
					this.setState(
						{'email': e.target.value});
				}}
				 />
				<Form.Control
					type="password"
					id="password"
					onChange={ e => {
						this.setState(
							{'password': e.target.value});
					}}
					style={{height:'40px', lineHeight:'20px'}}
				/>
				<br/>
				{this.state.error.login && <Form.Text id="passwordHelpBlock" muted>'Email ou senha inválida'</Form.Text> }
				<Button type='submit' onClick={this.onButton} value="Logar" >Login</Button>
	  		
  			</Card.Body>
	</Card>
</React.Fragment>

    );
}
}
export default Login