import React from 'react'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import * as Constants from '../Common/Utility/Constants'
import { isEmpty } from '../Common/Utility/Utils'
import MenuItem from '@material-ui/core/MenuItem';
import Heading from '../Common/Heading'

const styles = {
    root: {
      display: 'flex',
      height: 300,
    },
    paper: {
      margin: '10px 0px',
      padding: '10px',
      textAlign: 'center'
    },
    selectBox: {
      width: 250
    },
    tableHead: {
      background: "#84ec43",
      textAlign: "center",
      border: "1px solid #fff",
      padding: 5
    },
    tableTimeSpan: {
      fontSize: 10,
    },
    tableNode: {
      padding: 5,
      background: "#84ec4340",
      border: "1px solid #fff",
    },
    tableDay: {
      padding: 5,
      background: "#ffe422",
      border: "1px solid #fff",
    },
    selectedGrade: {
      textAlign: "center",
      margin: 10,
      fontSize: 25
    },
    tableName: {
      display: "block",
      fontSize: 14,
      padding: 3
    },
    tableLink: {
      display: "block",
      cursor: "pointer",
      textDecoration: "underline",
      fontSize: 14,
      padding: 3
    }
  };
  
  
  export class TeacherTimeTable extends React.Component {
    
    constructor(props) {
      super(props)
      this.state = {
        teacher_id: '',
      }
    }

    changeTeacherInfo = event => {
      this.setState({teacher_id: event.target.value})
      const sendData = {
        school_id: this.props.authInfo.id,
        academic_year_id: this.props.authInfo.academic_year_id,
        teacher_id: event.target.value
      }
      this.props.getTeacherTimeTable(sendData)
    }
    
    
    render() {
      const { classes, listSchoolTeachers, listTeacherTimeTable, listSchoolPeriods } = this.props
      const { teacher_id } = this.state
      return (
        <div id="mainContainer">
            <Paper className={classes.paper}>
            <Grid item xs={12} className={classes.marginLeft20}>
                  <Heading
                    label="School Teacher Time Table"
                  />
                </Grid>
              <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="age-simple">Select Teacher*</InputLabel>
                  <Select
                    value={teacher_id}
                    onChange={this.changeTeacherInfo}
                    className={classes.selectBox}
                  >
                  <MenuItem value='None'>Select Grade</MenuItem>
                  {listSchoolTeachers.map((opt, key) => {
                      return (<MenuItem value={opt.id} key={key}>{opt.teacher_name}</MenuItem>)
                  })}
                  </Select>
              </FormControl> 
            </Paper>
            {(listTeacherTimeTable && listTeacherTimeTable.length > 0) && 
              <Paper className={classes.paper}>
                {/* Heading */}
                <Grid item xs={12} className={classes.marginLeft20}>
                  <Grid container>
                    <Grid item xs={1} className={classes.tableHead}>Day</Grid>
                    {listSchoolPeriods.map((opt) => {
                      return (
                        <Grid item xs={1} className={classes.tableHead}>
                          {opt.period_name}<br />
                          <span className={classes.tableTimeSpan}>{opt.time_from} to {opt.time_to}</span>
                        </Grid>
                      )
                    })}
                  </Grid>
                </Grid>
                {/* Rows */}
                <Grid item xs={12} className={classes.marginLeft20}>
                  {Constants.weekDays.map((weekday) => {
                    return (
                      <Grid container>
                        <Grid item xs={1} className={classes.tableDay}>{weekday}</Grid>
                        {listSchoolPeriods.map((opt) => {
                          let curObj = _.find(listTeacherTimeTable, (n) => { 
                            return (n.period_id === opt.id && n.weekday === weekday)
                          })
                          
                          const addLinkStatus = (curObj) ? false : true
                          
                          return (
                            <Grid item xs={1} className={classes.tableNode}>
                              {(Constants.nonTeachingPeriods.indexOf(opt.period_name) === -1) &&
                                <React.Fragment>
                                  {addLinkStatus ? (
                                    <div></div>
                                  ) : (
                                    <div>
                                        <span className={classes.tableName}> {curObj.grade_name}<br/> - {curObj.subject_name}</span>
                                    </div>
                                  )}
                                  
                                </React.Fragment>
                              }
                            </Grid>
                          )
                        })}
                      </Grid>
                    )
                  })}
                </Grid>
              </Paper>
            }
        </div>)
    }
  }
  
  

export default withStyles(styles)(TeacherTimeTable)