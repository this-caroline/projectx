import React from 'react';
import api from '../services/api';
import Header from "../components/Header";
import { Button } from "react-bootstrap";
import FormControl from 'react-bootstrap/FormControl';

class List extends React.Component{
    state= {
      content: {
        data:[]
      },
      search: ''
    }
    componentDidMount(){
        api.get('/content', { headers: {
          'Authorization': localStorage.getItem('token')
      }}).then(res => {
             this.setState({
              content:{
                data: res.data
              }
             })
			  }).catch( e =>{
            this.props.history.push("/")
        });
    }

    handleClick = (e) => {
      e.preventDefault();
      this.props.history.push("/Post")
    }
    handleBar = (e) => {
      this.setState({
        search: e.target.value
      })
    }
    handleSearch = (e) =>{
      e.preventDefault();
      api.get(`/content?filter=${this.state.search}`, { headers: {
        'Authorization': localStorage.getItem('token')
      }}).then(res => {
           this.setState({
            content:{
              data: res.data
            }
           })
      }).catch( e =>{
          this.props.history.push("/")
      });
    }
    render(){ 
      return(
        <React.Fragment>
          <Header/>
          <FormControl
              placeholder="Procurar post"
              onChange={this.handleBar}
            />
            <Button variant="secondary" onClick={this.handleSearch}> Buscar </Button>

            <div className=" container">
            <Button variant="primary" onClick={this.handleClick}> Postar </Button>

                {this.state.content?.data ? (
                    <div>
                        {this.state.content.data.data?.map((item) => {
                            return (
                            <div key={item.id} className="post card">
                                <div className="blue-text">{item.filename}</div>
                                <div className="blue-text">{item.mimeType}</div>
                                <div className="blue-text">{item.id}</div>
                            </div>
                            )
                        })}
                    </div>) : ''}
            </div>
        
      </React.Fragment>
    );
  }
}
export default List