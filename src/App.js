import './App.css';
import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {useSelector, useDispatch} from 'react-redux';

function App() {

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const dispatch = useDispatch();
  const counter = useSelector((state) => {
    return state.counter;
  });

  const [invoice, setInvoiceList] = useState([]);

  const callInvoiceAPI = () => {
    fetch('')
      .then((response) => {
          response.json().then(function(data) {
            setInvoiceList(data)
          });
        }
      )
      .catch((err) => {
        console.log('Error in API', err);
      });
  }

  useEffect(() => {
    callInvoiceAPI();
  }, []);

  const handleChange = (event, invoiceNumber) => {
    fetch(`${invoiceNumber}/`, {
      method: 'PATCH',
      body: JSON.stringify({
        error_state: event.target.value
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then((response) => {
      response.json().then(function(data) {
        //callInvoiceAPI();
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
      <p>{counter}</p>
      <button onClick={()=>{
        dispatch({type:'increment'})
      }}>Increment</button>
      <button onClick={()=>{
        dispatch({type:'decrement'})
      }}>Decrement</button>
      <TableContainer component={Paper}>
      <Table className={useStyles().table}>
        <TableHead>
          <TableRow>
            <TableCell>Unique invoice ID</TableCell>
            <TableCell align="right">Supplier</TableCell>
            <TableCell align="right">Amount Due</TableCell>
            <TableCell align="right">Due Date</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Error State</TableCell>
            <TableCell align="right">Modify Error State</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoice.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">{row.id}</TableCell>
              <TableCell align="right">{row.supplier}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.due_date}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.error_state}</TableCell>
              <TableCell align="right">
                <FormControl variant="filled">
                  <InputLabel>Modify Error State</InputLabel>
                  <Select
                    native
                    onChange={e => handleChange(e, row.id)}
                    inputProps={{
                      name: 'Modify-Error-State',
                      id: 'filled-native-simple',
                    }}
                  >
                    <option value="" />
                    <option value={1}>Return invoices marked as Suspect</option>
                    <option value={2}>Return invoices marked as Confirmed Error</option>
                    <option value={3}>Return invoices marked as Confirmed Correct</option>
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </header>
    </div>
  );
}

export default App;
