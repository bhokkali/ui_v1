import React from 'react'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { isEmpty } from '../Common/Utility/Utils'

const styles = {
    root: {
      display: 'flex',
      width: 500,
    },
    paper: {
      margin: '15px 0px',
      padding: 10,
      backgroundColor: "#fff",
      width: 400,
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
    headingBlock: {
      background: "#83ec76",
      padding: 5,
      marginTop: 2
    },
    textBlock: {
      background: "#e5ec76",
      padding: 5,
      marginTop: 2
    },
    inputBlock: {
      //background: "#7af5de",
      marginTop: 2,
      marginLeft: 20
    }
  };

export class AddUpdate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            school_id: '',
            academic_year_id: '',
            school_grade_id: '',
            period_id: '',
            subject_id: '',
            teacher_id: '',
            weekday: '',
            stateTableInfo: {}
        }
    }

    componentDidMount() {
      let state = this.state
      let props = this.props
      let subject_id = ''
      let teacher_id = ''
      let id = ''
      
      //if(state.school_grade_id == '') {
      if(!isEmpty(props.tableInfo)) {
        subject_id = props.tableInfo.subject_id
        teacher_id = props.tableInfo.teacher_id
        id = props.tableInfo.id 
      }
      this.setState({
          school_id: props.gradeInfo.school_id,
          academic_year_id: props.gradeInfo.academic_year_id,
          school_grade_id: props.gradeInfo.id,
          period_id: props.periodInfo.id,
          weekday: props.weekday,
          subject_id: subject_id,
          teacher_id: teacher_id,
          id: id
      })
      //}
    }

    static getDerivedStateFromProps(props, state) {
      
        let subject_id = ''
        let teacher_id = ''
        let id = ''
        console.log('props check')
        console.log(props.tableInfo)
        console.log(state.stateTableInfo)
        if(!isEmpty(props.tableInfo)) {
          if(props.tableInfo.period_id !== state.stateTableInfo.period_id 
            || props.tableInfo.weekday !== state.stateTableInfo.weekday) {
              if(props.tableInfo) {
                subject_id = props.tableInfo.subject_id
                teacher_id = props.tableInfo.teacher_id
                id = props.tableInfo.id 
              }
              return {
                  school_id: props.gradeInfo.school_id,
                  academic_year_id: props.gradeInfo.academic_year_id,
                  school_grade_id: props.gradeInfo.id,
                  period_id: props.periodInfo.id,
                  weekday: props.weekday,
                  subject_id: subject_id,
                  teacher_id: teacher_id,
                  id: id,
                  stateTableInfo: props.tableInfo
              }
          }
        }
        
    } 

    setErrorState = (stname, err, msg) => {
        this.setState({ 
            gradeInfoError: {
            ...this.state.gradeInfoError,
            [stname]: {
              error: err,
              text: msg
            }
          }
         })
      }
    
      handleBlurChange = (stName) => event => {
      
        
         /* if(stName === 'section_name') {
            if(!enteredValue) {
              this.setErrorState('section_name', true, 'Please enter Section name')
            }
          }*/
        
      }
    
      validateUserInfo = () => {
        
    
         /* if(!gradeInfo.section_name) {
            this.setErrorState('section_name', true, 'Please enter Section name')
            return false
          } */
      
    
        return true
      }
    
      handleChange = (stName) => (event) => {
        this.setState({ 
          [stName] : event.target.value
        })

        if(stName === "subject_id") {
          console.log("reach here")
          this.props.parentProps.getSubjectTeachersCB(event.target.value)
        }

        /*if(stName === "subject_id") {
            const subjectTeachers = _.find(this.props.parentProps.listSchoolTeachers, (teacherInfo) => {
                return _.find((teacherInfo.subject_info,(subInfo) => {
                    return subInfo.subject_id === event.target.value
                }))
            })
            console.log('subjectTeachers >>> ')
            console.log(subjectTeachers)
        }*/
  
      }
    
    
      handleSubmit = event => {
          //if(this.validateUserInfo()) {
            const sendData = this.state
            delete sendData.stateTableInfo
            this.props.parentProps.createUpdateTimeTable(sendData, this.props.gradeInfo)
            //this.props.parentProps.getGradeTimeTable(this.props.gradeInfo)
            //this.props.parentProps.history.push("/km?p=timeTable")
            this.props.closeCB()
          //} 
        }


    render() {
        const { classes, gradeInfo, periodInfo, parentProps } = this.props
        const { subject_id, weekday, teacher_id } = this.state
       
        let btnDisableState = true
        if(subject_id !== '' && teacher_id !== '') {
            btnDisableState = false
        }

        console.log('render <<<<')
        console.log(parentProps.subjectTeachers)
        
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid item xs={12} className={classes.marginLeft20}>
                        <Grid container>
                          <Grid item xs={6} className={classes.headingBlock}>Selected Grade:</Grid>
                          <Grid item xs={6} className={classes.textBlock}>{gradeInfo.grade_name}</Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.marginLeft20}>
                      <Grid container>
                        <Grid item xs={6} className={classes.headingBlock}>Academic year:</Grid>
                        <Grid item xs={6} className={classes.textBlock}>{gradeInfo.academic_year}</Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} className={classes.marginLeft20}>
                      <Grid container>
                        <Grid item xs={6} className={classes.headingBlock}>Selected Period:</Grid>
                        <Grid item xs={6} className={classes.textBlock}>{periodInfo.period_name}</Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.marginLeft20}>
                      <Grid container>
                        <Grid item xs={6} className={classes.headingBlock}>WeekDay:</Grid>
                        <Grid item xs={6} className={classes.textBlock}>{weekday}</Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} className={classes.inputBlock}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-simple">Select Subject*</InputLabel>
                            <Select
                            value={subject_id}
                            onChange={this.handleChange('subject_id')}
                            className={classes.selectBox}
                            >
                            <MenuItem value='None'>Select Subject</MenuItem>
                            {parentProps.subjectsMaster.map((opt, key) => {
                                return (<MenuItem value={opt.id} key={key}>{opt.subject_name}</MenuItem>)
                            })}
                            </Select>
                        </FormControl>
                    </Grid>
                    {parentProps.subjectTeachers && 
                      <Grid item xs={12} className={classes.inputBlock}>
                          <FormControl className={classes.formControl}>
                              <InputLabel htmlFor="age-simple">Select Teacher*</InputLabel>
                              <Select
                              value={teacher_id}
                              onChange={this.handleChange('teacher_id')}
                              className={classes.selectBox}
                              >
                              <MenuItem value='None'>Select Teacher</MenuItem>
                              {parentProps.subjectTeachers.map((opt, key) => {
                                  return (<MenuItem value={opt.id} key={key}>{opt.teacher_name}</MenuItem>)
                              })}
                              </Select>
                          </FormControl>
                      </Grid>
                    }
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
                </Grid>

                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(AddUpdate);