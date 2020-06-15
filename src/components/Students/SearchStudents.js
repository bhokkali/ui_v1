import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import PaginatedTable from '../Common/Table/PaginatedTable'
import LinkDisp from '../Common/LinkDisp'
import Heading from '../Common/Heading'
import { isEmpty } from '../Common/Utility/Utils'
import { getSearchStudents, removeSearchUpdatedStatus } from '../../store/Students/actionCreator'
import * as constants from '../Common/Utility/Constants'

const styles = {
    root: {
      display: 'flex',
      height: 300,
    },
    paper: {
      margin: '10px 0px',
      padding: '10px',
    },
    formControl: {
        width: 250
    },
    button: {
        marginTop: 20
    }
}
  export class SearchStudents extends React.Component {
    
    constructor(props) {
      super(props)
      this.state = {
        columnDef: [],
        userRowData: [],
        student_name: '',
        status: 'Active'
      }
    }

    pagination = (page, limit) => {
      this.props.getSearchStudents(this.props.authInfo.id, this.state.student_name, this.state.status, page, limit)
    }
    
    static getDerivedStateFromProps(props, state) {
      const { listSearchStudents } = props
      let userRowData = []
      let columnDef = []
      if(!props.listSearchUpdatedStatus) {
        if (!isEmpty(listSearchStudents) && listSearchStudents.studentsList.length > 0) {
          // Construct column data
          columnDef = Object.keys(listSearchStudents.studentsList[0])
          columnDef = _.remove(columnDef, function(n) {
            return (n !== 'id' && n !== 'school_id' && n !== 'parents_id' && n !== 'key');
          });
          if(columnDef.indexOf('Action') === -1) {
              columnDef.push('Action')
          } 
          //Construct Row Data
          
          listSearchStudents.studentsList.map((obj) => {
            obj.Action = <LinkDisp 
              kmLink="/km?p=students_edit" 
              kmLinkId={obj.id}
              kmLinkName="Edit" 
          />
            userRowData.push(obj)
          })

        }
        props.removeSearchUpdatedStatus()
        return {
          columnDef,
          userRowData
        }
      }
    }

    handleChange = (stName) => event => {
        console.log(stName)
        console.log(event.target.value)
        this.setState({[stName]: event.target.value})
    }

    handleSubmit = event => {
        this.props.getSearchStudents(this.props.authInfo.id, this.state.student_name, this.state.status, 0, 10)
    }
  
    render() {
      const { listSearchStudents, classes } = this.props
      const { columnDef, userRowData, student_name, status } = this.state
      let count = !isEmpty(listSearchStudents) ? listSearchStudents.count : 0
      let searchBtnEnabledStatus = (student_name === '') ? false : true
      return (
        <div id="mainContainer">
          <Paper className={classes.paper}>
                <Grid item xs={12} className={classes.marginLeft20}>
                  <Heading
                    label="Search Active Students"
                  />
                </Grid>
                <Grid item xs={12} className={classes.marginLeft20}>
                    <Grid container>
                        <Grid item xs={12} sm={4} md={4}>
                            <FormControl className={classes.formControl}>
                                <InputLabel shrink htmlFor="select-multiple-native">
                                Select Status
                                </InputLabel>
                                <Select
                                native
                                value={status}
                                onChange={this.handleChange('status')}
                                inputProps={{
                                    id: 'select-multiple-native',
                                }}
                                >
                                {constants.listStatusOptions.map((opt,key) => (
                                    <option key={key} value={opt}>
                                    {opt}
                                    </option>
                                ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4}>
                        <TextField
                            id="outlined-with-placeholder"
                            label="Enter Student Name*"
                            placeholder="Placeholder"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            value={student_name}
                            onChange={this.handleChange("student_name")}
                            //error={teacherInfoError.designation.error}
                            //helperText={teacherInfoError.designation.text}
                            //onBlur={this.handleBlurChange('designation')}
                        />
                        </Grid>
                        <Grid item xs={12} sm={4} md={4}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleSubmit}
                            className={classes.button}
                            disabled={!searchBtnEnabledStatus}
                        >
                            Search
                        </Button>
                        </Grid>
                    </Grid>
                    
                    
                </Grid>
            </Paper>
            
          <PaginatedTable 
            columnDef={columnDef} 
            rows={userRowData}
            paginationCB={this.pagination}
            count={count}
          />
        </div>)
    }
  }
  
  const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getSearchStudents,
    removeSearchUpdatedStatus
  }, dispatch)

  const mapStateToProps = state => ({
    listSearchStudents: state.Students.listSearchStudents,
    listSearchUpdatedStatus: state.Students.listSearchUpdatedStatus
  })

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchStudents))