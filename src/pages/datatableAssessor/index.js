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
  onAfterInsertRow: onAfterInsertRow,
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
    await api.get('/DataTableDTO')
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
        /*fomento: post.id,
        fometnoRealizado: post.equipe,
        qtdeValor: post.head,
        nmAi: post.website,*/
        
        id: post.id,
        cliente: post.nmCliente,
        xp: post.perfilXp,
        aai: post.nmAai,
        equipe: post.nmEquipe,
        fomento: post.fomento,
        elegivel: post.elegivel,
        fomentoRealizado: post.fomentoRealizado,
        operacaoEnviada: post.operacaoEnviada,
        permissaoRecebida: post.permissaoRecebida,
        ordem: post.ordemExecutada,
        valor: post.qtdeValor,
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
      <div backgroundcolor='#B5B5B5'>
        <MDBContainer  fluid>          
          <MDBRow>
            <img src={Logo} width="400" alt="Lifetime Logo"/>
          </MDBRow>
          <MDBCard  id="classic-card" color='white' >
            <MDBCardBody>
              <MDBContainer  fluid>                
                  <BootstrapTable
                  data={data} 
                  selectRow={selectRowProp} 
                  deleteRow={true}  
                  exportCSV={true} 
                  cellEdit={cellEditProp}
                  options={options}  
                  pagination>
                    <TableHeaderColumn dataField='id' width="100" isKey hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='cliente' width="100">Cliente</TableHeaderColumn>
                    <TableHeaderColumn dataField='xp' width="100">Perfil</TableHeaderColumn>
                    <TableHeaderColumn dataField='aai' width="100">Assessor</TableHeaderColumn>
                    <TableHeaderColumn dataField='equipe' width="100">Equipe</TableHeaderColumn>
                    <TableHeaderColumn dataField='fomento' width="100">Fomento</TableHeaderColumn>
                    <TableHeaderColumn dataField='elegivel' width="100" editable={ { type:'select', options: { values:jobTypes } } }> Elegivel </TableHeaderColumn>
                    <TableHeaderColumn dataField='fomentoRealizado' width="100" editable={ { type:'select', options: { values:jobTypes } } }> Fomento Realizado </TableHeaderColumn>
                    <TableHeaderColumn dataField='operacaoEnviada' width="100" editable={ { type:'select', options: { values:jobTypes } } }> Operação Enviada </TableHeaderColumn>
                    <TableHeaderColumn dataField='permissaoRecebida' width="100" editable={ { type:'select', options: { values:jobTypes } } }> Permissão Recebida </TableHeaderColumn>
                    <TableHeaderColumn dataField='ordem' width="100" editable={ { type:'select', options: { values:jobTypes } } }> Ordem Executada </TableHeaderColumn>
                    <TableHeaderColumn dataField='valor' width="100">Valor</TableHeaderColumn>
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