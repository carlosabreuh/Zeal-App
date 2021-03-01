import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles({
  table: {},
});

export default function StatusTable({
  tableRows,
  myCharities,
  setMyCharities,
  page,
}) {
  const classes = useStyles();

  const handleClick = (newCharity) => {
    console.log(newCharity);
    console.log(newCharity);
    buttonFunc(newCharity);
  };

  let buttonName, buttonFunc, actionName;

  if (page === 'MyCharities') { 
    actionName = 'Remove';
    buttonFunc = (newCharity) =>
      setMyCharities((state) =>
        state.filter((charity) => newCharity.ein !== charity.ein)
      );
    buttonName = (
      <IconButton aria-label='delete'>
        <DeleteIcon />
      </IconButton>
    );
  } else if (page === 'Resources') {
    actionName = 'Save';
    if (false) {
      alert('Please Login');
      return;
    }

    buttonFunc = (newCharity) => {
      console.log(tableRows);
      let alreadyAdded = myCharities.filter((ch) => ch.ein === newCharity.ein)
        .length;
      console.log(alreadyAdded);
      if (!alreadyAdded) {
        setMyCharities((state) => [...state, newCharity]);
      }
    };

    buttonName = (
      <Fab
        size='small'
        color='secondary'
        aria-label='add'
        className={classes.margin}
      >
        <AddIcon />
      </Fab>
      
    );
  }
  //myCharities.includes((ch) => ch.ein!==newCharity.ein) && setMyCharities ((state) => [...state, newCharity])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Classification / Purpose</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>{actionName}</TableCell>
          </TableRow>
        </TableHead>
        {/* Table Contents */}
        <TableBody>
          {tableRows.map((row, index) => (
            <TableRow key={index}>
              <TableCell component='th' scope='row'>
                <Link
                  target='_blank'
                  href={row.websiteURL || row.charityNavigatorURL}
                >
                  {row.name}
                </Link>
              </TableCell>
              <TableCell>{row.numSites}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.statusUpdatedAt}</TableCell>
              <TableCell onClick={() => handleClick(row)}>
                {buttonName}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
