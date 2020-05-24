import React from 'react'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import { isEmpty } from '../Common/Utility/Utils'

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
    tableRow1: {
        margin: 1,
        padding: 5,
        background: '#71f69d14'
    },
    tableRow2: {
        margin: 1,
        padding: 5,
        background: '#71f69d47'
    },
    textField: {
        padding: 5,
        margin: 2
    },
    button: {
        margin: 5
    }
  };
  
  
  export class AddMarks extends React.Component {
    
    constructor(props) {
      super(props)
      this.state = {
        markInfo: {},
        stateExamId: '',
        stateSchoolGradeId: '',
        generateBtnEnabledStatus: true
      }
    }

    handleChange = (student_id, tableInfo, stName) => event => {
        const exam_grade_id = tableInfo.id
        const resValue = stName === "attended_status" ? event.target.checked : event.target.value
        if(event.target.value <= tableInfo.max_mark) {
            this.setState({
                markInfo: {
                    ...this.state.markInfo,
                    [student_id]: {
                        ...this.state.markInfo[student_id],
                        [exam_grade_id] : {
                            ...this.state.markInfo[student_id][exam_grade_id],
                            [stName]: resValue
                        }
                    }
                }
            })
            setTimeout(() => { this.validateBeforeGenerateReport() }, 100)
        } else {
            console.log('mark should be 0 to '+tableInfo.max_mark)
        }
    }

    componentDidMount() {
        console.log('calling did motun')
        const { listAcademicGradeStudents, listExamTimeTable } = this.props
        let newMarksObj = {}
        listAcademicGradeStudents.map((student) => {
            let insideMarksObj = {}
            listExamTimeTable.map((tableObj) => {
                insideMarksObj[tableObj.id] = {
                    'attended_status': false,
                    'mark_obtained': ''
                }

            })

            newMarksObj[student.student_id] = insideMarksObj

        })
        this.setState({markInfo : newMarksObj})
    }

    /*getSnapshotBeforeUpdate(prevProps, prevState) {
        const { markInfo } = this.state
        if(JSON.stringify(prevProps.listExamGradeMarks) !== JSON.stringify(this.props.listExamGradeMarks)) {
            this.props.listExamGradeMarks.map((markObj) => {
                if(markInfo[markObj.student_id] && markInfo[markObj.student_id][markObj.exam_grade_id]) {
                    markInfo[markObj.student_id][markObj.exam_grade_id] = {
                        'attended_status': markObj.attended_status === 'Yes' ? true : false,
                        'mark_obtained': markObj.mark_obtained
                    }
                }
                
            })
            this.setState({markInfo})
        }
    } */

    static getDerivedStateFromProps(props, state) {
       
        const { listExamGradeMarks, marksUpatedStatus } = props
        const { markInfo } = state
        let newMarksObj = {}

        
        console.log('marksUpatedStatus  ---- ')
        console.log(marksUpatedStatus)
        console.log(listExamGradeMarks.length)
        console.log(listExamGradeMarks)

        //if(listExamGradeMarks.length > 0) {
            //if(state.stateExamId !== props.exam_id || state.stateSchoolGradeId !== props.school_grade_id) {
            if(marksUpatedStatus && listExamGradeMarks.length > 0) {
                console.log('kinsdie  ---- ')
                let updatedStatus = false
                listExamGradeMarks.map((markObj) => {

                    if(markInfo[markObj.student_id] && markInfo[markObj.student_id][markObj.exam_grade_id]) {
                        updatedStatus = true
                        markInfo[markObj.student_id][markObj.exam_grade_id] = {
                            'attended_status': markObj.attended_status === 'Yes' ? true : false,
                            'mark_obtained': markObj.mark_obtained
                        }
                    }
                    
                })

                if(updatedStatus) {
                    props.removeMarkUpdatedStatus()
                }
                
                return {
                    markInfo: markInfo,
                    stateExamId: props.exam_id,
                    stateSchoolGradeId: props.school_grade_id
                }
            }
        //}
        return null

    } 

    handleSubmit = (mode) => event => {
        const { markInfo } = this.state
        let sendArray = []
        Object.keys(markInfo).map((studentId) => {
            Object.keys(markInfo[studentId]).map((examGradeId) => {
                const markObtained = (markInfo[studentId][examGradeId].attended_status) ? parseInt(markInfo[studentId][examGradeId].mark_obtained) : ''
                const newMarkObj = {
                    student_id: studentId,
                    exam_grade_id: examGradeId,
                    attended_status: markInfo[studentId][examGradeId].attended_status ? 'Yes' : 'No',
                    mark_obtained: markObtained,
                }
                const curObj = _.find(this.props.listExamGradeMarks, (n) => {
                    return (n.student_id === parseInt(studentId) && n.exam_grade_id === parseInt(examGradeId))
                })
                if(curObj) {
                    newMarkObj.id = curObj.id 
                } 
                sendArray.push(newMarkObj)
            })
        })
        const studentsList = Object.keys(markInfo);
        this.props.submitMarks(sendArray, this.props.exam_id, this.props.school_grade_id, mode, studentsList)
    }

    generateReport = () => {
        const { markInfo, generateBtnEnabledStatus } = this.state
        let sendArray = []
        if(generateBtnEnabledStatus) {
            Object.keys(markInfo).map((studentId) => {
                const sendData = {
                    student_id: studentId,
                    exam_id: this.props.exam_id,
                    school_grade_id: this.props.school_grade_id
                }

                sendArray.push(sendData)
            })
            console.log('sendArray - to generate report')
            console.log(sendArray)
            //this.props.createUpdateExamReport(sendArray, this.props.exam_id, this.props.school_grade_id) 
            console.log('validation done !!! ')
        } else {
            console.log('some issue occured !!! ')
        }
    }

    validateBeforeGenerateReport = () => {
        const { markInfo } = this.state
        const { listAcademicGradeStudents, listExamTimeTable } = this.props
        let retStatus = true
        listAcademicGradeStudents.map((student) => {
            listExamTimeTable.map((tableInfo) => {
                if(retStatus && markInfo[student.student_id][tableInfo.id].attended_status) { 
                    if(!markInfo[student.student_id][tableInfo.id].mark_obtained || markInfo[student.student_id][tableInfo.id].mark_obtained === null) {
                        retStatus = false
                    }
                } 
            })
        })
        //return retStatus
        this.setState({ generateBtnEnabledStatus: retStatus })
    }
    
    
  
    render() {
      const { classes, listAcademicGradeStudents, listExamTimeTable, listExamReports, listExamGradeMarks } = this.props
      const { markInfo, generateBtnEnabledStatus } = this.state
      
      let btnDisableState = false

      console.log('markInfo render <><')
      console.log(markInfo)

      return (
        <div id="mainContainer">
            <Paper className={classes.paper}>
                <Grid item xs={12} sm={12} md={12}>
                    <Grid container className={classes.tableHead}>
                        <Grid item xs>S.No</Grid>
                        <Grid item xs>Student Name</Grid>
                        {listExamTimeTable.map((tableInfo, key) => {
                            return (<Grid item xs key={key}>{tableInfo.subject_name}({tableInfo.max_mark})</Grid>)
                        })}
                        {listExamReports.length > 0 &&
                            <React.Fragment>
                                <Grid item xs>Total</Grid>
                                <Grid item xs>Max</Grid>
                                <Grid item xs>Percentage</Grid>
                                <Grid item xs>Grade</Grid>
                            </React.Fragment>
                        }
                    </Grid>
                </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Grid container>
                            {listAcademicGradeStudents.map((student, key) => {
                                let reportObj = {}
                                if(listExamReports.length > 0) {
                                    reportObj = _.find(listExamReports, (n) => { return n.student_id === student.student_id })
                                }
                                const rowStyle = key % 2 === 1 ? classes.tableRow1 : classes.tableRow2
                                return (
                                    <Grid container key={key} className={rowStyle}>
                                        <Grid item xs>{key+1}</Grid>
                                        <Grid item xs>{student.student_name}</Grid>
                                        {listExamTimeTable.map((tableInfo, key) => {
                                            let curValue = ''
                                            let curAttendedStatus = false
                                            if(markInfo && markInfo[student.student_id] && markInfo[student.student_id][tableInfo.id]) {
                                                curValue = markInfo[student.student_id][tableInfo.id].mark_obtained
                                                curAttendedStatus = markInfo[student.student_id][tableInfo.id].attended_status
                                            }
                                            return (
                                            <Grid item xs key={key}>
                                                {listExamReports.length <= 0 ? (
                                                    <React.Fragment>
                                                        <Switch
                                                            checked={curAttendedStatus}
                                                            onChange={this.handleChange(student.student_id, tableInfo, "attended_status")}
                                                            name="attended_status"
                                                            color="primary"
                                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                                        />
                                                        {curAttendedStatus && 
                                                            <TextField
                                                                id="outlined-with-placeholder"
                                                                label="addMark*"
                                                                placeholder="Placeholder"
                                                                className={classes.textField}
                                                                margin="normal"
                                                                type="number"
                                                                variant="outlined"
                                                                value={curValue}
                                                                onChange={this.handleChange(student.student_id, tableInfo, "mark_obtained")}
                                                                //error={teacherInfoError.designation.error}
                                                                //helperText={teacherInfoError.designation.text}
                                                                //onBlur={this.handleBlurChange('designation')}
                                                            />
                                                        }
                                                    </React.Fragment>
                                                    ) : (
                                                        <div>{curValue}</div>
                                                    )
                                                }
                                            </Grid>
                                            )
                                        })}
                                        {(!isEmpty(reportObj) && listExamReports.length > 0) &&
                                            <React.Fragment>
                                                <Grid item xs>{reportObj.total_marks}</Grid>
                                                <Grid item xs>{reportObj.total_max_marks}</Grid>
                                                <Grid item xs>{reportObj.overall_percentage}</Grid>
                                                <Grid item xs>{reportObj.overall_grade}</Grid>
                                            </React.Fragment>
                                        }
                                    </Grid>
                                )
                            })}
                        </Grid>
                    
                </Grid>
                {listExamReports.length <= 0 &&
                    <Grid item xs={12} className={classes.btnRow}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleSubmit('Save')}
                            className={classes.button}
                            disabled={!generateBtnEnabledStatus}
                        >
                            Save
                        </Button>
                        {listExamGradeMarks.length > 0 &&
                            <Button
                                variant="contained"
                                color="primary"
                                //onClick={this.generateReport}
                                onClick={this.handleSubmit('Report')}
                                className={classes.button}
                                disabled={!generateBtnEnabledStatus}
                            >
                                Save & Generate Report
                            </Button>
                        }
                    </Grid>
                }
            </Paper>
          
        </div>)
    }
  }
  
  

export default withStyles(styles)(AddMarks)