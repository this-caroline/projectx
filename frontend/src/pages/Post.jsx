import React, { Component } from 'react';
import Header from "../components/Header";
import {  Card,Form, Label, FormGroup, Button, Checkbox, Modal } from 'react-bootstrap'
import api from '../services/api';

class Post extends Component {
    state = {
        filename: '',
        mimeType: '',
        errror: ''
    }
    handleFilename = (e) => {
        this.setState({
            filename: e.target.value
        })
    }
    handleMimeType = (e) => {
        this.setState({
            mimeType: e.target.value
        })
    }
    handleContent = (e) => {
        this.setState({
            content: e.target.value
        })
    }

    onSubmit= async e =>{
		e.preventDefault();
			const data = {
            filename: this.state.filename,
			mimeType: this.state.mimeType,
            userId: "1"
		}
		api.post('/content', data)
		.then(res => {
            this.props.history.push("/List")
		})
		.catch(error => {
			this.setState({ error: "Erro ao postar"})
		});
	}

    render() {
        return (
            <React.Fragment>
                <Header/>
                    <Card style={{ alignItems: 'center'}} >
                        <Card.Body>
                        <label>Nome do Post</label>
                        <Form.Control placeholder="Titulo" required
                            onChange={this.handleFilename} />
                        <label>Tipo de Post</label>
                        <Form.Control type="text" 
                            class="form-control"
                            placeholder="Texto, declaração, fofoca, anuncio..." required
                            onChange={this.handleMimeType} />
                        <label>Texto</label>
                        <Form.Control as="textarea" rows={3} 
                            placeholder="Conteudo" required
                            onChange={this.handleContent} />
                        <div class="invalid-tooltip">
                            Favor adicionar informações a postagem.
                    </div>
                    {this.state.error && <Form.Text id="passwordHelpBlock" muted>'Email ou senha inválida'</Form.Text> }
                    <Button type="submit"
                        onClick={this.onSubmit}>Salvar Post</Button>
                    </Card.Body>
                </Card>
            </React.Fragment>
        );
    }
}

export default Post;