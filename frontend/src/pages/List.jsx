import React from 'react';
import api from '../services/api';
import Header from "../components/Header";
import { Button } from "react-bootstrap";

class List extends React.Component{
    state= {
      content: {
        data:[]
      },
    }
    componentDidMount(){
        api.get('/content').then(response => {
             this.setState({
              content:{
                data: response.data
              }
             })
			  });
    }

    handleClick = (e) => {
      e.preventDefault();
      this.props.history.push("/Post")
    }

    render(){
      return(
        <React.Fragment>
          <Header/>
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