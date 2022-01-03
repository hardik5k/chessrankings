import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.css';

const renderRow = (rowData, i) => {
  return(
    <tr key={i}>
      {rowData.map(renderColumn)}
    </tr>
  );
}
const renderColumn = (columnValue, i) => {
  return (
    <td key={i}>{columnValue}</td>
  );
}
const createTableHead = (heading, i) =>{
  return (
    <th key={i}>{heading}</th>
  );
}

const CreateTable = (props) => {
    return (
      <Table hover striped style = {props.style}>
          <thead>
            <tr>
              {props.tableHeadings.map(createTableHead)}
            </tr>
          </thead>
          <tbody>
            {props.tableData.map(renderRow)}
          </tbody>
        </Table> 
    );
}

export default CreateTable;