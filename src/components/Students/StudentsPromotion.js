import React from 'react'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import AddPromotion from './AddPromotion'
import { getNextAcademicYear } from '../Common/Utility/Utils'
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
    }
  };
  
  
  export class StudentsPromotion extends React.Component {
    
    constructor(props) {
      super(props)
      this.state = {
        columnDef: [],
        userRowData: [],
        school_grade_id: '',
        nextAcaYear: ''
      }
    }

    componentDidMount() {
      if(this.props.authInfo) {
        const nextAcaYear = getNextAcademicYear(this.props.authInfo.academic_year)
        this.props.getAcademicYearInfoFromYearString(this.props.authInfo.id, nextAcaYear)
        this.setState({nextAcaYear})
      }
    }
    
    handleChange = (stName) => event => {
        this.setState({[stName]: event.target.value })
        const sendData = {
            school_id: this.props.authInfo.id,
            academic_year_id: this.props.authInfo.academic_year_id,
            school_grade_id: event.target.value
        }
        this.props.getAcademicStudents(sendData)
        this.props.getAllExamReports(this.props.authInfo.academic_year_id, event.target.value)        
    }
  
    render() {
      const { classes, schoolGradesList, listAcademicGradeStudents, listAllExamReports, updateAcademicPromotion, history, nextAcademicGrades } = this.props
      const { school_grade_id, nextAcaYear } = this.state

      
      return (
        <div id="mainContainer">
            <Paper className={classes.paper}>
            <Grid item xs={12} className={classes.marginLeft20}>
              <Heading
                label="Students Promotion"
              />
            </Grid>
            <Grid container>
              {nextAcademicGrades.length >0 ? (
                <Grid item xs={12} sm={12} md={12}>
                  <SelectGrade
                    title = "Select Grade"
                    value = {school_grade_id}
                    onChangeCB = {this.handleChange}
                    onChangeParam = 'school_grade_id'
                    schoolGradesList = {schoolGradesList}
                    errorDisplayStatus = {false}
                  />
                  {/*
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
                          {opt.grade_name} - {opt.id}
                          </option>
                      ))}
                      </Select>
                      </FormControl> */}
                </Grid>
              ) : (
                <Grid item xs={12} sm={12} md={12}>
                  Please contact admin to add grades for the academic year {nextAcaYear}
                </Grid>
              )}
              </Grid>
            </Paper>
            {(listAcademicGradeStudents.length > 0 && listAllExamReports.length > 0 && school_grade_id !== '' && nextAcademicGrades.length > 0) && 
                <AddPromotion
                    listAcademicGradeStudents={listAcademicGradeStudents} 
                    school_grade_id={school_grade_id}
                    listAllExamReports={listAllExamReports}
                    schoolGradesList={nextAcademicGrades}
                    updateAcademicPromotion={updateAcademicPromotion}
                    history={history}
                />
            }
        </div>)
    }
  }
  
  

export default withStyles(styles)(StudentsPromotion)