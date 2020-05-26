import React from 'react'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { isEmpty } from '../Common/Utility/Utils'
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
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
    tableHead: {
        padding: 10,
        background: '#53f99d'
    },
    tableRow: {
        margin: 1,
        padding: 5,
        background: '#71f69d14'
    },
    textField: {
        padding: 5,
        margin: 2,
        width: 200
    },
    button: {
        margin: 5
    }
  };
  
  
  export class AddAttendance extends React.Component {
    
    constructor(props) {
      super(props)
      this.state = {
        studInfo: {}
      }
    }

    handleChange = (academic_student_id, stName) => event => {
        const resValue = stName === "status" ? event.target.checked : event.target.value
        this.setState({
            studInfo: {
                ...this.state.studInfo,
                [academic_student_id]: {
                    ...this.state.studInfo[academic_student_id],
                    [stName]: resValue
                }
            }
        })

        if(stName === "status" && resValue) {
            this.setState({
                studInfo: {
                    ...this.state.studInfo,
                    [academic_student_id]: {
                        ...this.state.studInfo[academic_student_id],
                        absent_period: "Full Day",
                        [stName]: resValue
                    }
                }
            })
        }
    }

    componentDidMount () {
        this.setState({studInfo: {}})
    }
    

    static getDerivedStateFromProps(props, state) {
       
        const { listStudentsAttendance } = props
        const { studInfo } = state
        let newMarksObj = {}

        console.log('state value <<<')
        console.log(listStudentsAttendance)
        console.log(studInfo)
       
        

        if(listStudentsAttendance.length > 0 && isEmpty(studInfo)) {
        //if(state.absent_date !== props.absent_date || state.school_grade_id !== props.school_grade_id) {
            listStudentsAttendance.map((obj) => {
                const gradeObj = {
                    status : true,
                    absent_period: obj.absent_period,
                    reason: obj.reason
                }
                newMarksObj[obj.academic_student_id] = gradeObj
            })   
            return {
                studInfo: newMarksObj
            }         
        } 
        return null

    } 

    handleSubmit = () => {
        const { studInfo } = this.state
        let sendArray = []
        Object.keys(studInfo).map((studentId) => {
            if(studInfo[studentId].status) {
                const newMarkObj = {
                    academic_student_id: studentId,
                    absent_date: this.props.absent_date,
                    absent_period: studInfo[studentId].absent_period,
                    reason: studInfo[studentId].reason
                }
                const curObj = _.find(this.props.listStudentsAttendance, (n) => {
                    return (n.academic_student_id === parseInt(studentId))
                })
                if(curObj) {
                    newMarkObj.id = curObj.id 
                }
                sendArray.push(newMarkObj)
            }
        })

        this.props.createUpdateStudentAttendance(sendArray, this.props.school_grade_id, this.props.absent_date)
        this.props.history.push("/km?p=students")
    }

    generateReport = () => {
        const { studInfo } = this.state
        let sendArray = []
        Object.keys(studInfo).map((studentId) => {
            const sendData = {
                student_id: studentId,
                exam_id: this.props.exam_id,
                school_grade_id: this.props.school_grade_id
            }

            sendArray.push(sendData)
        })
        //this.props.createUpdateExamReport(sendArray, this.props.exam_id, this.props.school_grade_id)
    }
    
    
  
    render() {
      const { classes, listAcademicGradeStudents, listStudentsAttendance } = this.props
      const { studInfo } = this.state
      
      let btnDisableState = false

      if(listAcademicGradeStudents.length <= 0) {
          return (
              <React.Fragment>
                  <Paper className={classes.paper}>
                      No Data found
                  </Paper>
              </React.Fragment>
          )
      }
      
      return (
        <div id="mainContainer">
            <Paper className={classes.paper}>
                <Grid item xs={12} sm={12} md={12}>
                    <Grid container className={classes.tableHead}>
                        <Grid item xs={1} sm={1} md={1}>S.No</Grid>
                        <Grid item xs={2} sm={2} md={2}>Student Name</Grid>
                        <Grid item xs={1} sm={1} md={1}>Attendance</Grid>
                        <Grid item xs={2} sm={2} md={2}>Period</Grid>
                        <Grid item xs={3} sm={3} md={3}>Reason</Grid>
                    </Grid>
                </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Grid container>
                            {listAcademicGradeStudents.map((student, key) => {
                                const checkStatus = (studInfo[student.id]) ? studInfo[student.id].status : false
                                return (
                                    <Grid container key={key} className={classes.tableRow}>
                                        <Grid item xs={1} sm={1} md={1}>{key+1}</Grid>
                                        <Grid item xs={2} sm={2} md={2}>{student.student_name}</Grid>
                                        <Grid item xs={1} sm={1} md={1}>
                                            <Switch
                                                checked={checkStatus}
                                                onChange={this.handleChange(student.id, "status")}
                                                name="checkedA"
                                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                            />
                                        </Grid>
                                        {checkStatus && 
                                            <React.Fragment>
                                                <Grid item xs={2} sm={2} md={2}>
                                                    <FormControl className={classes.formControl}>
                                                        <InputLabel shrink htmlFor="select-multiple-native">
                                                        Absent Period
                                                        </InputLabel>
                                                        <Select
                                                        native
                                                        value={studInfo[student.id].absent_period}
                                                        onChange={this.handleChange(student.id, 'absent_period')}
                                                        inputProps={{
                                                            id: 'select-multiple-native',
                                                        }}
                                                        >
                                                        {constants.lsitAbsentPeriod.map((opt,key) => (
                                                            <option key={key} value={opt}>
                                                            {opt}
                                                            </option>
                                                        ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={3} sm={3} md={3}>
                                                    <TextField
                                                        id="outlined-with-placeholder"
                                                        label="Reason*"
                                                        placeholder="Placeholder"
                                                        className={classes.textField}
                                                        margin="normal"
                                                        variant="outlined"
                                                        value={studInfo[student.id].reason}
                                                        onChange={this.handleChange(student.id, "reason")}
                                                    />
                                                </Grid>
                                            </React.Fragment>
                                        }
                                    </Grid>
                                )
                            })}
                        </Grid>
                    
                </Grid>
                {(!isEmpty(studInfo)) &&
                    <Grid item xs={12} className={classes.btnRow}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleSubmit}
                            className={classes.button}
                            disabled={btnDisableState}
                        >
                            Submit
                        </Button>
                        {/*<Button
                            variant="contained"
                            color="primary"
                            onClick={this.generateReport}
                            className={classes.button}
                            disabled={btnDisableState}
                        >
                            Generate Report
                        </Button>*/}
                    </Grid>
                }
            </Paper>
          
        </div>)
    }
  }
  
  

export default withStyles(styles)(AddAttendance)