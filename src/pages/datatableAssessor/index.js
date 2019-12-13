import React , {Component} from 'react';
import api from '../../services/api';

import {
  MDBDataTable, 
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalFooter,
  MDBModalBody,
  MDBInput,
  MDBCard,
  MDBCardBody
} from 'mdbreact';

import './styles.css'

import Logo from '../../images/Investimentos.png'



export default class dataTable extends Component{
  constructor (props) {
    super(props);
    this.state={
      posts: [],
      isLoading: true,
      tableRows: [],
      modal2: false
    };
  }


toggle = nr => () => {
  let modalNumber = 'modal' + nr
  this.setState({
    [modalNumber]: !this.state[modalNumber]
  });
}


  componentWillMount = async() => {
    await api.get('/posts')
    .then(Response => Response.data)
    .then(data => {
      //console.log(data);
      this.setState({ posts: data})

    })
    .then(async()=>{
      this.setState({ tableRows:this.assemblyPosts(), isLoading:false})
      console.log(this.state.tableRows);
    });
  }

  assemblyPosts =() => {
    let posts = this.state.posts.map((post) => {
      return({
        number: post.id,
        title: post.title,
        user: post.userId,
        body: post.body,
      })
    });
    return posts;
  }
  
  render(){
    document.title = 'Data Table'
    const data = {
      columns: [
        {
          label:'#',
          field:'number',
        },
        {
          label:'Title',
          field:'title',
        },
        {
          label:'User ID',
          field:'user',
        },
        {
          label:'Body',
          field:'body',
        },
      ],
      rows:this.state.tableRows,
    }
    return (
      <div id="classicformpage">
        <div>
          <MDBContainer className="gradient" fluid>
              <MDBRow >
                <img src={Logo} width="400"/>
              </MDBRow>
          <MDBRow left>
            <MDBBtn color="amber" onClick={this.toggle(2)}>Editar</MDBBtn>
            <MDBModal isOpen={this.state.modal2} toggle={this.toggle(2)}>
              <MDBModalHeader toggle={this.toggle(2)}>Alterações</MDBModalHeader>
              <MDBModalBody>
                <MDBInput 
                label= "Fomento"
                />
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={this.toggle(2)}>Close</MDBBtn>
                <MDBBtn color="primary">Save changes</MDBBtn>
              </MDBModalFooter>
            </MDBModal>
          </MDBRow>

          <MDBCard  id="classic-card" color='white'>
            <MDBCardBody>
              <MDBContainer fluid>
                <MDBDataTable
                  SelectableRows
                  striped
                  data={data}
                  />            
              </MDBContainer>
              </MDBCardBody>
          </MDBCard>  
          </MDBContainer>
        </div>
      </div>       
    );
  }
}