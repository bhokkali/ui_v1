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
import ConfirmDialog from '../Common/Dialogs/ConfirmDialog'

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
    },
    marginRight5: {
        marginRight: 5
    },
    padding5: {
        padding: 5
    },
    reportContainer: {
        //background: '#c57e14',
        borderRadius: 10,
        color: '#333'
    },
    errorStyle: {
        color: "#ff0000",
        fontSize: 10,
        textAlign: "center"
    }
  };
  
  
  export class AddPromotion extends React.Component {
    
    constructor(props) {
      super(props)
      this.state = {
        studInfo: {},
        dialogOpenStatus: false,
        btnDisableState: false,
        errorMessage: ''
      }
    }

    static getDerivedStateFromProps(props, state) {
       
        const { listAcademicGradeStudents } = props
        const { studInfo } = state
        let newPromoObj = {}

        

        if(listAcademicGradeStudents.length > 0 && isEmpty(studInfo)) {
            listAcademicGradeStudents.map((obj) => {
                const gradeObj = {
                    promotion_status: ''
                }
                newPromoObj[obj.id] = gradeObj
            })   
            return {
                studInfo: newPromoObj
            }         
        }
        return null

    } 

    handleChange = (academic_student_id, stName) => event => {
        this.setState({
            errorMessage: '',
            studInfo: {
                ...this.state.studInfo,
                [academic_student_id]: {
                    ...this.state.studInfo[academic_student_id],
                    [stName]: event.target.value
                }
            }
        })
        setTimeout(() => {
            this.validatePromotion()
        }, 100)
        
    }

    confirmSubmit = () => {
        this.setState({dialogOpenStatus: false})
        const { studInfo } = this.state
        let sendArray = []
        Object.keys(studInfo).map((studentId) => {
            if(studInfo[studentId].promotion_status) {
                const newPromitionObj = {
                    id: studentId,
                    promotion_status: studInfo[studentId].promotion_status,
                    school_grade_id: studInfo[studentId].school_grade_id
                }
                /*const curObj = _.find(this.props.listStudentsAttendance, (n) => {
                    return (n.academic_student_id === parseInt(studentId))
                })
                if(curObj) {
                    newPromitionObj.id = curObj.id 
                } */
                sendArray.push(newPromitionObj)
            }
        })
        this.props.updateAcademicPromotion(sendArray)
        this.props.history.push("/km?p=students")
    }

    handleSubmit = event => {
        if(this.validatePromotion()) {
            this.setState({dialogOpenStatus: true})
        } else {
            this.setState({errorMessage: "Please select all promotion details for all students"})
        }
    }

    validatePromotion = () => {
        let retStatus = true
        const { studInfo } = this.state
        Object.keys(studInfo).map((studentId) => {
            if(!studInfo[studentId].promotion_status) {
                retStatus = false
            }
            if(retStatus && studInfo[studentId].promotion_status === "Promoted" || studInfo[studentId].promotion_status === "Depromoted") {
                if(!studInfo[studentId].school_grade_id) {
                    retStatus = false
                }
            }
        })
        this.setState({btnDisableState: retStatus})
        return retStatus
    }

    cancelSubmit = () => {
        this.setState({dialogOpenStatus: false})
    }

    


  
    render() {
      const { classes, listAcademicGradeStudents, listAllExamReports, schoolGradesList } = this.props
      const { studInfo, dialogOpenStatus, btnDisableState, errorMessage } = this.state
      
      const groupExams = _.groupBy(listAllExamReports, (n) => { return n.exam_name })
      
      return (
        <div id="mainContainer">
            <Paper className={classes.paper}>
                {errorMessage && 
                    <div className={classes.errorStyle}>{errorMessage}</div>
                }
            <Grid container className={classes.tableHead}>
                <Grid item xs>S.No</Grid>
                <Grid item xs>Student Name</Grid>
                {Object.keys(groupExams).map((exam, key) => {
                    return <Grid item xs key={key}>{exam}</Grid>
                })}
                <Grid item xs>Promotion Status</Grid>
            </Grid>
            {listAcademicGradeStudents.map((student, key) => {
                return (
                    <Grid container key={key} className={classes.tableRow}>
                        <Grid item xs>{key+1}</Grid>
                        <Grid item xs>{student.student_name}</Grid>
                        {Object.keys(groupExams).map((exam, key) => {
                            const studentReport = _.find(groupExams[exam], (n) => { return n.student_id === student.student_id })
                            let bgColorStyle = "#c57e14"
                            if(!isEmpty(studentReport)) {
                                const bgColorObj = _.find(constants.gradeColors, (n) => { return n.grade === studentReport.overall_grade })
                                bgColorStyle = (bgColorObj) ? bgColorObj.color : bgColorStyle
                                return (
                                <Grid item xs key={key} className={classes.marginRight5}>
                                    <Grid container className={classes.reportContainer} style={{background: bgColorStyle}}>
                                        <Grid item xs className={classes.padding5}>
                                            <Grid item xs>Total: {studentReport.total_marks}</Grid>
                                            <Grid item xs>Max: {studentReport.total_max_marks}</Grid>
                                        </Grid>
                                        <Grid item xs className={classes.padding5}>
                                            <Grid item xs>% : {studentReport.overall_percentage}</Grid>
                                            <Grid item xs>Grade: {studentReport.overall_grade}</Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>)
                            } else {
                                return (<Grid item xs></Grid>)
                            }
                        })}
                        {student.promotion_status !== "InProgress" ? (
                            <React.Fragment>
                                {(student.promotion_status === "Promoted" || student.promotion_status === "Depromoted") ? (
                                    <Grid item xs>
                                        {student.promotion_status} to {student.promoted_grade_name}
                                    </Grid>
                                ) : (
                                    <Grid item xs>
                                        {student.promotion_status}
                                    </Grid>
                                )}
                                
                            </React.Fragment>
                        ) : (
                        <Grid item xs>
                            <FormControl className={classes.formControl}>
                                <InputLabel shrink htmlFor="select-multiple-native">
                                    Select Promotion
                                </InputLabel>
                                <Select
                                native
                                value={studInfo[student.id].promotion_status}
                                onChange={this.handleChange(student.id, 'promotion_status')}
                                inputProps={{
                                    id: 'select-multiple-native',
                                }}
                                >
                                    <option value=''>Select Promotion</option>
                                {constants.listPromotionOptions.map((opt,key) => (
                                    <option key={key} value={opt}>
                                     {opt}
                                    </option>
                                ))}
                                </Select>
                            </FormControl>
                            {(studInfo[student.id].promotion_status === "Promoted" || studInfo[student.id].promotion_status === "Depromoted") && 
                                <Grid item xs>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel shrink htmlFor="select-multiple-native">
                                        Select Promotion Grade
                                        </InputLabel>
                                        <Select
                                            native
                                            value={studInfo[student.id].school_grade_id}
                                            onChange={this.handleChange(student.id, 'school_grade_id')}
                                            inputProps={{
                                                id: 'select-multiple-native',
                                            }}
                                        >
                                        <option>Select Promotion Grade</option>
                                        {schoolGradesList.map((opt,key) => (
                                            <option key={key} value={opt.id}>
                                                {opt.grade_name} - {opt.section_name}
                                            </option>
                                        ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            }
                        </Grid>
                        )}
                        
                    </Grid>
                )
            })}

                {(!isEmpty(studInfo)) &&
                    <Grid item xs={12} className={classes.btnRow}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleSubmit}
                            className={classes.button}
                            disabled={!btnDisableState}
                        >
                            Submit
                        </Button>
                       {/* <Button
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
            <ConfirmDialog
                dialogOpenStatus={dialogOpenStatus}
                dialogTitle="Promotion Confirmation"
                dialogContent="Are you sure to confirm promotion?"
                cancelBtnText="Cancel"
                cancelBtnCB={this.cancelSubmit}
                confirmBtnText="Confirm"
                confirmBtnCB={this.confirmSubmit}
            />
          
        </div>)
    }
  }
  
  

export default withStyles(styles)(AddPromotion)