import React from 'react'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import SimpleTable from '../Common/Table/SimpelTable'
import LinkDisp from '../Common/LinkDisp'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
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
  
  
  export class AcademicStudents extends React.Component {
    
    constructor(props) {
      super(props)
      this.state = {
        columnDef: [],
        userRowData: [],
        school_grade_id: ''
      }
    }
    
    static getDerivedStateFromProps(props, state) {
      const { listAcademicGradeStudents } = props
      const rejectArr = ['id', 'school_id', 'academic_year_id', 'school_grade_id', 'student_id']
      let columnDef = []
      let userRowData = []
      if (listAcademicGradeStudents && listAcademicGradeStudents.length > 0) {
        // Construct column data
        columnDef = Object.keys(listAcademicGradeStudents[0])
        columnDef = _.remove(columnDef, function(n) {
          return (rejectArr.indexOf(n) === -1);
        });
        /*if(columnDef.indexOf('Action') === -1) {
            columnDef.push('Action')
        } */
        //Construct Row Data
        listAcademicGradeStudents.map((obj) => {
          /*obj.Action = <LinkDisp 
            kmLink="/km?p=students_edit" 
            kmLinkId={obj.id}
            kmLinkName="Edit" 
        />*/
          userRowData.push(obj)
        })

        
      }  
      return {
        columnDef,
        userRowData
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
    }
  
    render() {
      const { classes, schoolGradesList } = this.props
      const { columnDef, userRowData, school_grade_id } = this.state
      
      return (
        <div id="mainContainer">
            <Paper className={classes.paper}>
                <SelectGrade
                  title = "Select Grade"
                  value = {school_grade_id}
                  onChangeCB = {this.handleChange}
                  onChangeParam = 'school_grade_id'
                  schoolGradesList = {schoolGradesList}
                  errorDisplayStatus = {false}
                />
            </Paper>
          {school_grade_id && 
            <SimpleTable 
              columnDef={columnDef} 
              rows={userRowData}
              label="List Academic Students"
            />
          }
        </div>)
    }
  }
  
  

export default withStyles(styles)(AcademicStudents)