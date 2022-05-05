import React, { Component } from 'react';
import {  Card,Form, Label, FormGroup, Button, Checkbox, Modal } from 'react-bootstrap'
import api from '../services/api';

class SignUp extends Component {
    state = {
        name: '',
        password: '',
        email: '',
        error: ''
    }
    handleName = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    handleEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    handlePass = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit= async e =>{
		e.preventDefault();
			const data = {
                password: this.state.password,
                email: this.state.email,
                name: this.state.name
		    }
		api.post('/user', data)
            .then(res => {
                this.props.history.push("/")
            })
            .catch(error => {
                this.setState({ error:"Senha ou Email inválidos"})
            });
	}
    render() {
        return (
            <React.Fragment >
                <Form style={{  alignItems: 'center', width: '500px'}} className="text-center">
                    <Form.Group className="mb-3">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="name" placeholder="Insira seu nome" onChange={this.handleName}/>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Insira seu email" onChange={this.handleEmail}/>
                        <Form.Text className="text-muted">
                         Seus dados estarão a salvo conosco :D
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Senha" onChange={this.handlePass} />
                        {this.state.error && <Form.Text id="passwordHelpBlock" muted>'Erro ao criar conta'</Form.Text> }
                    </Form.Group>
                    <Button variant="primary" type="submit"  onClick={this.onSubmit}>
                        Salvar
                    </Button>
                    </Form>
            </React.Fragment>
        )
    }
}

export default SignUp;