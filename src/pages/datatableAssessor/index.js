import React , {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import api from '../../services/api';

import {MDBContainer, MDBRow, MDBCard, MDBCardBody} from 'mdbreact';

import './styles.css'

import Logo from '../../images/Investimentos.png'

function onAfterInsertRow(row) {
  let newRowStr = '';

  for (const prop in row) {
    newRowStr += prop + ': ' + row[prop] + ' \n';
  }
  alert('The new row is:\n ' + newRowStr);
}

const options = {
  //onAfterInsertRow: onAfterInsertRow,
};

//Opções do checkbox
const selectRowProp = {
  mode: 'checkbox'
};

//Edição de celula
/*function onAfterSaveCell(row, cellName, cellValue) {
  alert(`Save cell ${cellName} with value ${cellValue}`);

  let rowStr = '';
  for (const prop in row) {
    rowStr += prop + ': ' + row[prop] + '\n';
  }

  alert('Thw whole row :\n' + rowStr);
}

function onBeforeSaveCell(row, cellName, cellValue) {
  // You can do any validation on here for editing value,
  // return false for reject the editing
  return true;
}*/


const cellEditProp = {
  mode: 'click',
  blurToSave: true,
  //beforeSaveCell: onBeforeSaveCell, 
  //afterSaveCell: onAfterSaveCell
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
    await api.get('/users')
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
        id: post.id,
        name: post.name,
        email: post.email,
        website: post.website,
      })
    });
    return posts;
  }

  csvFormatter(cell, row) {
    return `${row.id}: ${cell} USD`;
  } 
  
  render(){
    document.title = 'Datatable'
    const jobTypes = ['Realizado', 'Não realizado']
    
    const data = this.state.tableRows;

    
    return (
      <div id="classicformpage">
        <MDBContainer className="gradient" fluid>          
          <MDBRow>
            <img src={Logo} width="400"/>
          </MDBRow>
          <MDBCard  id="classic-card" color='white' >
            <MDBCardBody>
              <MDBContainer  fluid>                
                  <BootstrapTable
                  data={data} 
                  selectRow={selectRowProp} 
                  insertRow={true} 
                  deleteRow={true} 
                  exportCSV={true} 
                  cellEdit={cellEditProp}
                  options={options}  
                  pagination>
                    <TableHeaderColumn dataField='id' width="100" isKey hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' width="400">Nome</TableHeaderColumn>
                    <TableHeaderColumn dataField='email' width="400">E-mail</TableHeaderColumn>
                    <TableHeaderColumn dataField='website' width="200" editable={ { type:'select', options: { values: jobTypes } } }> Fomento </TableHeaderColumn>
                  </BootstrapTable> 
              </MDBContainer>
            </MDBCardBody>
          </MDBCard>  
        </MDBContainer>        
        <MDBContainer>
        </MDBContainer>
      </div>       
    );
  }
}