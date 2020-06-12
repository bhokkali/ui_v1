import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import loadingHOC from '../HOC/LoadingHOC'
import { getTableHead } from '../Utility/Utils'
import Heading from '../Heading'

const useStyles = {
  root: {
    width: '100%',
    overflowX: 'auto',
    padding: 10
  },
  table: {
    minWidth: 650,
  },
  tableHead: {
    background: "#efca76"
  },
  tableHeadText: {
    color: "#000"
  },
  tableRow1: {
    background: "#f9d7891c"
  },
  tableRow2: {
    background: "#f9d78938"
  },
  marginBottom10: {
    marginBottom: 10
  }
};

export class SimpleTable extends React.Component {
      
    render () {
        const { classes, columnDef, rows, label } = this.props;
        if(!rows || rows.length <= 0 ) {
          return (
            <Paper className={classes.root}>
              Data not available
            </Paper>
          )
        }
        return (
            <Paper className={classes.root}>
                {label && 
                  <div className={classes.marginBottom10}>
                    <Heading
                      label={label}
                    />
                  </div>
                }
                
                <Table className={classes.table}>
                  <TableHead className={classes.tableHead}>
                    <TableRow>
                      <TableCell className={classes.tableHeadText}>S.No</TableCell>
                        {columnDef.map((cObj,key) => (
                            <TableCell key={key} className={classes.tableHeadText}>{getTableHead(cObj)}</TableCell>
                        ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row,key) => {
                      const rowStyle = key % 2 === 1 ? classes.tableRow1 : classes.tableRow2
                      return (
                        <TableRow key={key} className={rowStyle}>
                            <TableCell align="left">{key+1}</TableCell>
                            {columnDef.map(cObj => {
                                if(cObj === 'Permissions') {
                                  //const colName = cObj.split("-")[0]
                                  return (<TableCell align="left">
                                    {row[cObj].split(",").map((opt, key) => {
                                      return <div>{key+1}. {opt}</div>
                                    })}
                                    </TableCell>
                                  )
                                } else {
                                  return <TableCell align="left">{row[cObj]}</TableCell>
                                }
                            }
                                
                            )}
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
            </Paper>
          );
    }
  
}

export default withStyles(useStyles)(SimpleTable)
