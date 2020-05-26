import React from 'react'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import AddAttendance from './AddAttendance'
import { getAttendanceDateRanges } from '../Common/Utility/Utils'
import * as Constants from '../Common/Utility/Constants'
import Heading from '../Common/Heading'
import SelectGrade from '../Common/SelectGrade'

const styles = {
    root: {
      display: 'flex',
      height: 300,
    },
    paper: {
      margin: '10px 0px',
      padding: '10px',
      textAlign: "center"
    },
    navLink: {
      fontSize: 20,
      cursor: 'pointer',
      textDecoration: 'underline'
    }
  };
  
  
  export class StudentAttendance extends React.Component {
    
    constructor(props) {
      super(props)
      this.state = {
        columnDef: [],
        userRowData: [],
        school_grade_id: '',
        absent_date: '',
        openAttendanceStatus: false
      }
    }
    
    handleChange = (stName) => event => {
        this.setState({[stName]: event.target.value, openAttendanceStatus: false })
        setTimeout(()=> {
          if(this.state.absent_date && this.state.school_grade_id) {
            const sendData = {
              school_id: this.props.authInfo.id,
              academic_year_id: this.props.authInfo.academic_year_id,
              school_grade_id: this.state.school_grade_id
            }
            this.props.getAcademicStudents(sendData)
            const sendDate = this.state.absent_date
            this.props.getAcademicStudentsAttendance(this.state.school_grade_id, sendDate)
            this.setState({ openAttendanceStatus: true })
          }
        },100)

        
    }

    changeGrade = () => {
      this.setState({ school_grade_id: '', absent_date: '', openAttendanceStatus: false })
    }
  
    render() {
      const { classes, schoolGradesList, listAcademicGradeStudents, listStudentsAttendance, createUpdateStudentAttendance, history } = this.props
      const { school_grade_id, absent_date, openAttendanceStatus } = this.state
      const attendanceDateRange = getAttendanceDateRanges(Constants.attendanceDateRange)

      const selectedGradeObj = _.find(schoolGradesList, (n) => { return n.id === parseInt(school_grade_id) })
      let dispGradeName = ''
      if(selectedGradeObj) {
        dispGradeName = selectedGradeObj.grade_name
        dispGradeName += selectedGradeObj.section_name ? "-"+selectedGradeObj.section_name : ''
      }
      
      return (
        <div id="mainContainer">
            <Paper className={classes.paper}>
                <Grid item xs={12} className={classes.marginLeft20}>
                  <Heading
                    label="Students Attendance"
                  />
                </Grid>
              {(absent_date && school_grade_id) ? (
                <Grid container>
                  <Grid item xs={12} sm={12} md={12}>
                    Selected Grade : {dispGradeName}, Date: {absent_date} - <span onClick={this.changeGrade} className={classes.navLink}>Change</span>
                  </Grid>
                </Grid>
              ) : (
              <Grid container>
                <Grid item xs={12} sm={12} md={6}>
                  <SelectGrade
                    title = "Select Grade"
                    value = {school_grade_id}
                    onChangeCB = {this.handleChange}
                    onChangeParam = 'school_grade_id'
                    schoolGradesList = {schoolGradesList}
                    errorDisplayStatus = {false}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                      id="outlined-with-placeholder"
                      label="Select Date*"
                      placeholder="Placeholder"
                      className={classes.textField}
                      margin="normal"
                      type="date"
                      //InputProps={{ inputProps: { max: getCurrentDateForDateField() } }}
                      inputProps={attendanceDateRange}
                      variant="outlined"
                      value={absent_date}
                      onChange={this.handleChange('absent_date')}
                  />
                </Grid>
              </Grid>
              )
              }
            </Paper>
            {(openAttendanceStatus && listAcademicGradeStudents.length > 0) && 
                <AddAttendance 
                    history={history}
                    listAcademicGradeStudents={listAcademicGradeStudents} 
                    listStudentsAttendance={listStudentsAttendance}
                    absent_date={absent_date}
                    school_grade_id={school_grade_id}
                    createUpdateStudentAttendance={createUpdateStudentAttendance}
                />
            }
        </div>)
    }
  }
  
  

export default withStyles(styles)(StudentAttendance)