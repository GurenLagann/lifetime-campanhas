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
              <MDBRow>
                <img src={Logo} width="400"/>
              </MDBRow>

          <MDBCard  id="classic-card" color='white' >
            <MDBCardBody>
              <MDBContainer  fluid>   
                <BootstrapTable
                data={data} 
                deleteRow={true} 
                insertRow={true} 
                selectRow={selectRowProp} 
                exportCSV={true} 
                cellEdit={cellEditProp}
                options={options}  
                pagination>
                    <TableHeaderColumn dataField='number' width="100" isKey>Product ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='title' width="400">Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='body'>Description</TableHeaderColumn>
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