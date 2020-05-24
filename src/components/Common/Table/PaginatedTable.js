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
import TablePagination from '@material-ui/core/TablePagination'
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

export class PaginatedTable extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      page: 0,
      rowsPerPage: 10,
      rowsPerPageOptions: [10, 20, 50, 100]
    }
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
    this.props.paginationCB(page, this.state.rowsPerPage)
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
    this.props.paginationCB(this.state.page, event.target.value)
  }    
  
    render () {
        const { classes, columnDef, rows, count, label } = this.props;
        const { page, rowsPerPage, rowsPerPageOptions } = this.state
        if(!rows || rows.length <= 0 ) {
          return (
            <Paper className={classes.root}>
              Date not available
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
                      const sNo = (page*rowsPerPage) + (key+1)
                      const rowStyle = key % 2 === 1 ? classes.tableRow1 : classes.tableRow2
                      return(<TableRow key={key}>
                          <TableCell align="left" className={rowStyle}>{sNo}</TableCell>
                          {columnDef.map(cObj => {
                            //const displayData = cObj.indexOf("_date") !== -1 ? convertGMTtoIST(row[cObj]) : row[cObj]
                            return (
                              <TableCell align="left" className={rowStyle}>{row[cObj]}</TableCell>
                              )
                            }
                          )}
                      </TableRow>)
                    }
                    )}
                  </TableBody>
                </Table>
                <TablePagination
                  component="div"
                  count={count}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  rowsPerPageOptions={rowsPerPageOptions}
                  backIconButtonProps={{
                    'aria-label': 'Previous Page',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'Next Page',
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
          );
    }
  
}

export default withStyles(useStyles)(PaginatedTable)
