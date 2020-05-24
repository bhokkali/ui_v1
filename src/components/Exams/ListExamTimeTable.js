import React from 'react'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import SimpleTable from '../Common/Table/SimpelTable'
import LinkDisp from '../Common/LinkDisp'
import Heading from '../Common/Heading'

const styles = {
    root: {
      display: 'flex',
      height: 300,
    },
    paper: {
      margin: '10px 0px',
      padding: '10px',
    }
  };
  
  
  export class ListExamTimeTable extends React.Component {
    
    constructor(props) {
      super(props)
      this.state = {
        exam_id: '',
        school_grade_id: '',
        columnDef: [],
        userRowData: []
      }
    }
    
    static getDerivedStateFromProps(props, state) {
      const { listExamTimeTable } = props
      let userRowData = []
      let columnDef = []
      const removeColArr = ["id", "school_id", "exam_id", "school_grade_id", "subject_id"]
      if (listExamTimeTable && listExamTimeTable.length > 0) {
        // Construct column data
        columnDef = Object.keys(listExamTimeTable[0])
        columnDef = _.remove(columnDef, function(n) {
          return (removeColArr.indexOf(n) === -1);
        });
        if(columnDef.indexOf('Action') === -1) {
            columnDef.push('Action')
        }
        //Construct Row Data
        
        listExamTimeTable.map((obj) => {
          obj.Action = <LinkDisp 
            kmLink="/km?p=exams_editTimeTable" 
            kmLinkId={obj.id}
            kmLinkName="Edit" 
        />
          userRowData.push(obj)
        })

      }
      return {
        columnDef,
        userRowData
      }
    }

    handleChange = (stName) => event => {
      this.setState({[stName] : event.target.value})
      setTimeout(()=> {
        if(this.state.exam_id && this.state.school_grade_id) {
          this.props.getExamTimeTable(this.state.exam_id, this.state.school_grade_id)
        }
      }, 100)
    }
  
    render() {
      const { classes, listExams, schoolGradesList } = this.props
      const { exam_id, school_grade_id, columnDef, userRowData } = this.state
    
      return (
        <div id="mainContainer">
          <Paper className={classes.paper}>
            <Grid item xs={12} className={classes.marginLeft20}>
              <Heading
                label="List Exam Time Table"
              />
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={12} md={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel shrink htmlFor="select-multiple-native">
                    Select Exam
                  </InputLabel>
                  <Select
                    native
                    value={exam_id}
                    onChange={this.handleChange('exam_id')}
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
                    onChange={this.handleChange('school_grade_id')}
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
          </Paper>
          {(exam_id !== '' && school_grade_id !== '') && 
            <SimpleTable 
              columnDef={columnDef}
              rows={userRowData}
            />
          }
        </div>)
    }
  }
  
  

export default withStyles(styles)(ListExamTimeTable)