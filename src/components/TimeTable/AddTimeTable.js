import React from 'react'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import * as Constants from '../Common/Utility/Constants'
import { isEmpty } from '../Common/Utility/Utils'
import MenuItem from '@material-ui/core/MenuItem';
import FormDialog from '../Common/Dialogs/FormDialog'
import AddUpdate from './AddUpdate'
import Heading from '../Common/Heading'
import GeneratePDF from '../Common/GeneratePDF'

const styles = {
    root: {
      display: 'flex',
      height: 300,
    },
    paper: {
      margin: '15px 0px',
      padding: 10,
      backgroundColor: "#fff",
    },
    marginLeft20: {
      marginLeft: 20,
    },
    textField: {
      width:350,
    },
    
    btnRow: {
      textAlign: 'center',
      padding: 5,
      marginTop: 5,
    },
    rowOdd: {
      padding: 10,
      background: '#ebebeb',
    },
    rowEven: {
      padding: 10,
      background: '#fbfbfb',
    },
    textRight: {
      textAlign: 'right',
      paddingRgiht: 5,
    },
    textLeft: {
      textAlign: 'left',
      paddingLeft: 5,
    },
    navLink: {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
    checkBlock: {
      paddingTop: 35,
    },
    checkIconSuccess: {
      color: 'green',
    },
    checkIconFail: {
      color: 'red',
    },
    selectBox: {
      width: 220,
    },
    errorText: {
        color: 'red',
    },
    headBlock: {
      background: '#ebebeb',
      padding: 10
    },
    verified: {
      color: 'green',
      fontSize: 25
    },
    formControl: {
      margin: 5,
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: 10,
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

export class AddTimeTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stateUpdated: false,
            school_id: '',
            school_grade_id: '',
            grade_info: {},
            periodInfo: {},
            weekday: '',
            mode: '',
            tableInfo: {},
            dialogOpenStatus: false,
            dialogTitle: '',
            modelContent: ''
        }
    }

    

    componentWillReceiveProps(nextProps) {
      if(nextProps.subjectTeachers && nextProps.subjectTeachers.length > 0) {
        this.setState({
          dialogContent: <AddUpdate 
            authInfo = {nextProps.authInfo}
            gradeInfo = {this.state.grade_info}
            periodInfo = {this.state.periodInfo}
            parentProps = {nextProps}
            weekday = {this.state.weekday}
            mode = {this.state.mode}
            tableInfo = {this.state.tableInfo}
            closeCB = {this.closeDialog}
            isSubjectUpdated = {true}
          />
        })
      }
    }

    changeGradeInfo = event => {
      this.setState({grade_info: event.target.value, school_grade_id: event.target.value.id })
      this.props.getGradeTimeTable(event.target.value)
    }

    clearGradeInfo = () => {
      this.setState({grade_info: {}, school_grade_id: '' })
    }

    addUpdateModelOpen = (periodInfo, weekday, mode, curObj) => event => {
      const dialogTitle = mode === "Edit" ? "Edit Time Table" : "Add Time Table"
     
      this.setState({
        periodInfo: periodInfo,
        weekday: weekday,
        dialogOpenStatus: true, 
        dialogTitle: dialogTitle, 
        tableInfo: curObj,
        dialogContent: <AddUpdate 
          authInfo = {this.props.authInfo}
          gradeInfo = {this.state.grade_info}
          periodInfo = {periodInfo}
          parentProps = {this.props}
          weekday = {weekday}
          mode = {mode}
          tableInfo = {curObj}
          closeCB = {this.closeDialog}
          isSubjectUpdated = {false}
        />
      })
      if(!isEmpty(curObj)) {
        this.props.getSubjectTeachersCB(this.props.authInfo.id, curObj.subject_id)
      }
    }

    closeDialog = () => {
      this.setState({dialogOpenStatus: false, dialogTitle: '', dialogContent: ''})
    }

    generateRowData = () => {
      const { listSchoolPeriods, listGradeTimeTable } = this.props
      var result = [];
     
      
      Constants.weekDays.map((weekday) => {
          let rowData = [weekday]
          listSchoolPeriods.map((opt) => {

              let curObj = _.find(listGradeTimeTable, (n) => {
                  return (n.period_id === opt.id && n.weekday === weekday)
              })
             
              const disData = curObj ? curObj.subject_name : ''
              rowData.push(disData)
          })
          result.push(rowData)
      })
      return result;
  };

  generateColumnHeader = () => {
      const { listSchoolPeriods } = this.props
      var result = ['Day'];
      
      listSchoolPeriods.map((opt) => {
          const dispName = opt.period_name
          result.push(dispName)
      })
      
      return result;
    }

    periodsTimings = () => {
      const { listSchoolPeriods } = this.props
      var result = [];
      
      listSchoolPeriods.map((opt) => {
          const rowData = [opt.period_name]
          const dispName = opt.time_from+" to "+opt.time_to
          rowData.push(dispName)
          result.push(rowData)
      })
      return result;
    }


    render() {
        const { classes, listSchoolPeriods, schoolGradesList, listGradeTimeTable, authInfo } = this.props
        const { grade_info, school_grade_id, dialogOpenStatus, dialogTitle, dialogContent } = this.state
        
        let pdfTableData = []
        if(listSchoolPeriods.length > 0 && listGradeTimeTable.length > 0) {
          pdfTableData = [{
              columDef: [this.generateColumnHeader()],
              rowDef: this.generateRowData()
            },
            {
              columDef: [],
              rowDef: this.periodsTimings()
            }
          ]
        }
        return (
            <React.Fragment>
              <Paper className={classes.paper}>
              <Grid item xs={12} className={classes.marginLeft20}>
                  <Heading
                    label="School Grade Time Table"
                  />
                </Grid>
              {school_grade_id == '' ? (
                  <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="age-simple">Select Grade*</InputLabel>
                      <Select
                        value={school_grade_id}
                        onChange={this.changeGradeInfo}
                        className={classes.selectBox}
                      >
                      <MenuItem value='None'>Select Grade</MenuItem>
                      {schoolGradesList.map((opt, key) => {
                        let dispGradeName = opt.grade_name
                        dispGradeName += opt.section_name ? " - "+opt.section_name : ''
                          return (<MenuItem value={opt} key={key}>{dispGradeName}</MenuItem>)
                      })}
                      </Select>
                  </FormControl> 
              ) : (
                <div id="TimeTable" ref="timeTable">
                  <Grid item xs={12} className={classes.selectedGrade}>
                    Selected Grade : {grade_info.grade_name} - <span onClick={this.clearGradeInfo} className={classes.navLink}>Change</span>
                  </Grid>
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
                            let curObj = _.find(listGradeTimeTable, (n) => { 
                              return (n.period_id === opt.id && n.weekday === weekday)
                            })
                            
                            const addLinkStatus = (curObj) ? false : true
                           
                            return (
                              <Grid item xs={1} className={classes.tableNode}>
                                {opt.period_type === 'Teaching' &&
                                  <React.Fragment>
                                    {addLinkStatus ? (
                                      <div className={classes.tableLink} onClick={this.addUpdateModelOpen(opt, weekday, "Add", {})}>Add</div>
                                    ) : (
                                      <div>
                                          <span className={classes.tableName}>S: {curObj.subject_name}</span>
                                          <span className={classes.tableName}>T: {curObj.teacher_name}</span>
                                          <span className={classes.tableLink} onClick={this.addUpdateModelOpen(opt, weekday, "Edit", curObj)}>Edit</span>
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
                    <GeneratePDF 
                      authInfo={authInfo}
                      gradeName={grade_info.grade_name}
                      content="Time Table"
                      tableData={pdfTableData}
                    />
                  </Grid>
                </div>
              )}
              
              </Paper>
              <FormDialog 
              dialogOpenStatus={dialogOpenStatus}
              dialogTitle={dialogTitle}
              dialogContent={dialogContent}
              cancelBtnText="Cancel"
              cancelBtnCB={this.closeDialog}
              />
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(AddTimeTable);