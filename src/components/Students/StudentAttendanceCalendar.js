import React from 'react'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import EventCalendar from '../Common/EventCalendar/EventCalendar'
import Heading from '../Common/Heading'

const styles = {
    root: {
      display: 'flex',
      height: 300,
    },
    paper: {
      margin: '10px 0px',
      padding: '10px',
      textAlign: "center"
    }
  };
  
  
  export class StudentAttendanceCalendar extends React.Component {
    
    constructor(props) {
      super(props)
      this.state = {
        columnDef: [],
        userRowData: [],
        school_grade_id: '',
        openCalendarStatus: false
      }
    }
    
    handleChange = (stName) => event => {
        this.setState({[stName]: event.target.value, openCalendarStatus: false })
        setTimeout(()=> {
          if(this.state.school_grade_id) {
            this.props.getStudentAttendanceCalendar(this.state.school_grade_id)
            this.setState({ openCalendarStatus: true })
          }
        },100)

        
    }

    changeGrade = () => {
      this.setState({ school_grade_id: '', openCalendarStatus: false })
    }
  
    render() {
      const { classes, schoolGradesList, listStudentAttendanceCalendar } = this.props
      const { school_grade_id, openCalendarStatus } = this.state

      let myEventsList = []
      listStudentAttendanceCalendar.map((opt) => {
        const curObj = {
                        start: opt.absent_date,
                        end: opt.absent_date,
                        title: opt.student_name,
                        allDay: true
                      }
        myEventsList.push(curObj)
      })

      return (
        <div id="mainContainer">
            <Paper className={classes.paper}>
              <Grid item xs={12} className={classes.marginLeft20}>
                  <Heading
                    label="Students Attendance Calendar"
                  />
                </Grid>
              {(school_grade_id) ? (
                <Grid container>
                  <Grid item xs={12} sm={12} md={12}>
                    Selected Grade : {school_grade_id} - <span onClick={this.changeGrade}>Change</span>
                  </Grid>
                </Grid>
              ) : (
              <Grid container>
                <Grid item xs={12} sm={12} md={6}>
                  <FormControl className={classes.formControl}>
                      <InputLabel shrink htmlFor="select-multiple-native">
                      Select Grade
                      </InputLabel>
                      <Select
                          native
                          value={school_grade_id}
                          onChange={this.handleChange('school_grade_id')}
                          inputProps={{
                              id: 'select-multiple-native',
                          }}
                      >
                      <option>Select Grade</option>
                      {schoolGradesList.map((opt,key) => (
                          <option key={key} value={opt.id}>
                          {opt.grade_name} - {opt.section_name}
                          </option>
                      ))}
                      </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  
                </Grid>
              </Grid>
              )
              }
            </Paper>
            {(openCalendarStatus && myEventsList.length > 0) && 
              <EventCalendar 
                myEventsList={myEventsList}
              />
            }
        </div>)
    }
  }
  
  

export default withStyles(styles)(StudentAttendanceCalendar)