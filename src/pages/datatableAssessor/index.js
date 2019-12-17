import React , {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import api from '../../services/api';

import {
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
} from 'mdbreact';

import './styles.css'

import Logo from '../../images/Investimentos.png'


function onAfterDeleteRow(rowKeys) {
  alert('The rowkey you drop: ' + rowKeys);
}


function onAfterInsertRow(row) {
  let newRowStr = '';

  for (const prop in row) {
    newRowStr += prop + ': ' + row[prop] + ' \n';
  }
  alert('The new row is:\n ' + newRowStr);
}



const options = {
  afterDeleteRow: onAfterDeleteRow  // A hook for after droping rows.
};

// If you want to enable deleteRow, you must enable row selection also.
const selectRowProp = {
  mode: 'checkbox'
};

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

  csvFormatter(cell, row) {
    return `${row.id}: ${cell} USD`;
  }
  
  render(){
    document.title = 'Data Table'
    
    const data = this.state.tableRows;
    
    return (
      <div id="classicformpage">
          <MDBContainer className="gradient" fluid>
              <MDBRow >
                <img src={Logo} width="400"/>
              </MDBRow>

          <MDBCard  id="classic-card" color='white'>
            <MDBCardBody>
              <MDBContainer fluid>   
                <BootstrapTable data={data} deleteRow={true} insertRow={true} selectRow={selectRowProp} exportCSV={true} options={options}>
                    <TableHeaderColumn dataField='number' isKey>Product ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='user'>Product Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='title'>Product Price</TableHeaderColumn>
                </BootstrapTable>   
              </MDBContainer>
              </MDBCardBody>
          </MDBCard>  
          </MDBContainer>
      </div>       
    );
  }
}