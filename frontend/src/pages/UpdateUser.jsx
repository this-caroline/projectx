import React, { Component } from 'react';
import {  Card,Form, Label, FormGroup, Button, Checkbox, Modal } from 'react-bootstrap'
import api from '../services/api';
import Header from "../components/Header";

class UpdateUser extends Component {
    state = {
        name: '',
        password: '',
        email: '',
        admin: 0,
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
    handleAdm = (e) => {
        this.setState({
            admin: e.target.value == 'on' ? 1 : 0
        })
    }
    onSubmit= async e =>{
		e.preventDefault();
			const data = {
                password: this.state.password,
                email: this.state.email,
                name: this.state.name,
                admin: this.state.admin
		    }
		api.patch(`/user/${localStorage.getItem('id')}`, data)
            .then(res => {
                this.localStorage.clear()
                this.props.history.push("/")
            })
            .catch(error => {
                this.setState({ error:"Senha ou Email inválidos"})
            });
	}
    render() {
        return (
            <React.Fragment >
                <Header/>
                <Form style={{  alignItems: 'center', width: '500px'}} className="text-center">
                <Form.Label>Atualização de cadastro</Form.Label>
                    <Form.Group className="mb-3">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="name" placeholder="Novo nome" onChange={this.handleName}/>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Novo email" onChange={this.handleEmail}/>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Nova Senha" onChange={this.handlePass} />
                        {this.state.error && <Form.Text id="passwordHelpBlock" muted>'Erro ao criar conta'</Form.Text> }
                    </Form.Group>
                    <Form.Check 
                        type="switch"
                        label="Usuário administrador"
                        onClick={this.handleAdm}
                    />
                    <Button variant="primary" type="submit"  onClick={this.onSubmit}>
                        Salvar
                    </Button>
                    </Form>
            </React.Fragment>
        )
    }
}

export default UpdateUser;