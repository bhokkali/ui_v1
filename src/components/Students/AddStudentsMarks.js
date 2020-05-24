import React from 'react'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import AddMarks from './AddMarks'
import LinkDisp from '../Common/LinkDisp'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
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
    }
  };
  
  
  export class AddStudentsMarks extends React.Component {
    
    constructor(props) {
      super(props)
      this.state = {
        columnDef: [],
        userRowData: [],
        academic_year_id: '',
        exam_id: '',
        school_grade_id: ''
      }
    }

    handleChangeExam = (stName) => event => {
      this.setState({[stName]:event.target.value})
      setTimeout(()=> {
        if(this.state.exam_id && this.state.school_grade_id) {
          this.props.getExamTimeTable(this.state.exam_id, this.state.school_grade_id)

          const sendData = {
            school_id: this.props.authInfo.id,
            academic_year_id: this.props.authInfo.academic_year_id,
            school_grade_id: this.state.school_grade_id
          }

          this.props.getAcademicStudents(sendData)

          this.props.getExamGradeMarks(this.state.exam_id, this.state.school_grade_id)
          this.props.getExamReports(this.state.exam_id, this.state.school_grade_id)
        }
      }, 100)
    }

    changeGrade = () => {
      this.setState({ school_grade_id: '', exam_id: '' })
      this.props.removeMarkUpdatedStatus()
      //this.props.history.push()
      //window.location.reload()
    }
  
    render() {
      const { classes, 
        listExams, 
        schoolGradesList,
        listAcademicGradeStudents,
        listExamTimeTable, 
        submitMarks, 
        listExamGradeMarks,
        listExamReports,
        createUpdateExamReport,
        marksUpatedStatus,
        removeMarkUpdatedStatus
       } = this.props
      const { columnDef, userRowData, exam_id, school_grade_id } = this.state
      
      return (
        <div id="mainContainer">
            <Paper className={classes.paper}>
              <Grid item xs={12} className={classes.marginLeft20}>
                  <Heading
                    label="Add Students Marks"
                  />
                </Grid>
            {(exam_id && school_grade_id) ? (
                <Grid container>
                  <Grid item xs={12} sm={12} md={12}>
                    Exam Id:  {exam_id}, Selected Grade : {school_grade_id} - <span onClick={this.changeGrade}>Change</span>
                  </Grid>
                </Grid>
              ) : (
              <Grid container>
                <Grid item xs={12} sm={12} md={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel shrink htmlFor="select-multiple-native">
                      Select Exam
                    </InputLabel>
                    <Select
                      native
                      value={exam_id}
                      onChange={this.handleChangeExam('exam_id')}
                      inputProps={{
                        id: 'select-multiple-native',
                      }}
                    >
                      <option value=''>Select Exam</option>
                      {listExams.map((opt,key) => (
                        <option key={key} value={opt.id}>
                          {opt.exam_name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel shrink htmlFor="select-multiple-native">
                      Select Grade
                    </InputLabel>
                    <Select
                      native
                      value={school_grade_id}
                      onChange={this.handleChangeExam('school_grade_id')}
                      inputProps={{
                        id: 'select-multiple-native',
                      }}
                    >
                      <option value=''>Select Grade</option>
                      {schoolGradesList.map((opt,key) => (
                        <option key={key} value={opt.id}>
                          {opt.grade_name} - {opt.sectionName}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                </Grid>
              </Grid>
              )}
            </Paper>
          {(listAcademicGradeStudents.length > 0 && listExamTimeTable.length > 0 && exam_id && school_grade_id) && 
            <AddMarks 
              listAcademicGradeStudents={listAcademicGradeStudents} 
              listExamTimeTable={listExamTimeTable}
              submitMarks={submitMarks}
              listExamGradeMarks={listExamGradeMarks}
              exam_id={exam_id}
              school_grade_id={school_grade_id}
              listExamReports={listExamReports}
              createUpdateExamReport={createUpdateExamReport}
              marksUpatedStatus={marksUpatedStatus}
              removeMarkUpdatedStatus={removeMarkUpdatedStatus}
            />
          }
        </div>)
    }
  }
  
  

export default withStyles(styles)(AddStudentsMarks)