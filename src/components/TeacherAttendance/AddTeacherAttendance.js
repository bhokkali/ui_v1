import React from 'react'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import { ValidateEmail } from '../Common/Utility/Utils'
import * as constants from '../Common/Utility/Constants'
import Heading from '../Common/Heading'

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
  };

export class AddTeacherAttendance extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stateUpdated: false,
            teacherAttendanceInfo: {
                school_id: '',
                academic_year_id: '',
                teacher_id: '',
                from_date: '',
                to_date: '',
                absent_period: 'Full Day',
                leave_type: 'Annual Leave',
                reason: ''
            },
            teacherAttendanceInfoError: {
                teacher_id: {
                    error: false,
                    text: ''
                },
                from_date: {
                    error: false,
                    text: ''
                },
                to_date: {
                    error: false,
                    text: ''
                },
                absent_period: {
                    error: false,
                    text: ''
                },
                leave_type: {
                  error: false,
                  text: ''
                },
                reason: {
                  error: false,
                  text: ''
                }
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(!state.stateUpdated) {
          const { mode, authInfo, selectedTeacherInfo } = props
          if(mode === 'Add' && authInfo) {
              return { teacherAttendanceInfo: { 
                  ...state.teacherAttendanceInfo,
                  school_id : authInfo.id,
                  academic_year_id: authInfo.academic_year_id
                }}
          }

          if(mode === 'Edit' && selectedTeacherInfo) {

            return { teacherAttendanceInfo: { 
              ...state.teacherAttendanceInfo,
              teacher_id: selectedTeacherInfo.teacher_id,
              from_date: selectedTeacherInfo.from_date,
              to_date: selectedTeacherInfo.to_date,
              absent_period: selectedTeacherInfo.absent_period,
              leave_type: selectedTeacherInfo.leave_type,
              reason: selectedTeacherInfo.reason,
              school_id : props.authInfo.id,
              academic_year_id: authInfo.academic_year_id
            }}
          }
        }
        return null
    }

    

    setErrorState = (stname, err, msg) => {
        this.setState({ 
          teacherAttendanceInfoError: {
            ...this.state.teacherAttendanceInfoError,
            [stname]: {
              error: err,
              text: msg
            }
          }
         })
      }
    
      handleBlurChange = (stName) => event => {
        const enteredValue = event.target.value
      
        if(stName === 'teacher_id') {
          if(!enteredValue) {
            this.setErrorState('teacher_id', true, 'Select Teacher')
          }
        }
  
        if(stName === 'from_date') {
          if(!enteredValue) {
            this.setErrorState('from_date', true, 'From Date required')
          }
        }

        if(stName === 'to_date') {
          if(!enteredValue) {
            this.setErrorState('to_date', true, 'To Date required')
          }
        }
        
      }
    
      validateUserInfo = () => {
        const teacherAttendanceInfo = this.state.teacherAttendanceInfo
        if(!teacherAttendanceInfo.teacher_id) {
          this.setErrorState('teacher_id', true, 'Select Teacher')
          return false
        }
  
        if(!teacherAttendanceInfo.from_date) {
          this.setErrorState('from_date', true, 'From Date required')
          return false
        }
        
        if(!teacherAttendanceInfo.to_date) {
            this.setErrorState('to_date', true, 'To Date required')
            return false
          }
        
        return true
      }
    
      handleChange = (stName) => (event) => {
        this.setErrorState(stName, false, '')
        this.setState({ 
          stateUpdated: true,
          teacherAttendanceInfo: { 
          ...this.state.teacherAttendanceInfo,
          [stName] : event.target.value
        }})
  
      }

      
      
    
      handleSubmit = event => {
          if(this.validateUserInfo()) {
            const { teacherAttendanceInfo } = this.state

            if(this.props.mode === 'Edit') {
              teacherAttendanceInfo.id = this.props.selectedTeacherInfo.id
            }

            teacherAttendanceInfo.teacher_id = parseInt(teacherAttendanceInfo.teacher_id)
            
            this.props.addTeacherAttendanceCB(teacherAttendanceInfo)
            this.props.history.push("/km?p=teacherAttendance")
          } 
        }


    render() {
        const { classes, listSchoolTeachers, mode } = this.props
        const { teacherAttendanceInfo, teacherAttendanceInfoError } = this.state
        let btnDisableState = false
        Object.keys(teacherAttendanceInfoError).map((opt) => {
            if(teacherAttendanceInfoError[opt].error) {
            btnDisableState = true
            }
        })

        const ITEM_HEIGHT = 48;
        const ITEM_PADDING_TOP = 8;
        const MenuProps = {
          PaperProps: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
              width: 250,
            },
          },
        };
        let displayHeadText = mode+" Teacher Attendance"
        return (
            <React.Fragment>
                <Paper className={classes.paper}>
                <Grid item xs={12} className={classes.marginLeft20}>
                  <Heading
                    label={displayHeadText}
                  />
                </Grid>
                <Grid item xs={12} className={classes.marginLeft20}>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6}>
                          <FormControl className={classes.formControl}>
                            <InputLabel shrink htmlFor="select-multiple-native">
                              Select Teacher
                            </InputLabel>
                            <Select
                              native
                              value={teacherAttendanceInfo.teacher_id}
                              onChange={this.handleChange('teacher_id')}
                              inputProps={{
                                id: 'select-multiple-native',
                              }}
                            >
                              {listSchoolTeachers.map((opt,key) => (
                                <option key={key} value={opt.id}>
                                  {opt.teacher_name} - {opt.id}
                                </option>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item  xs={12} sm={12} md={6}>
                            <TextField
                                id="outlined-with-placeholder"
                                label="From Date*"
                                placeholder="Placeholder"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                type="date"
                                value={teacherAttendanceInfo.from_date}
                                onChange={this.handleChange('from_date')}
                                error={teacherAttendanceInfoError.from_date.error}
                                helperText={teacherAttendanceInfoError.from_date.text}
                                onBlur={this.handleBlurChange('from_date')}
                            /> 
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6}>
                          <TextField
                                id="outlined-with-placeholder"
                                label="To Date*"
                                placeholder="Placeholder"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                type="date"
                                value={teacherAttendanceInfo.to_date}
                                onChange={this.handleChange('to_date')}
                                error={teacherAttendanceInfoError.to_date.error}
                                helperText={teacherAttendanceInfoError.to_date.text}
                                onBlur={this.handleBlurChange('to_date')}
                            /> 
                        </Grid>
                        <Grid item  xs={12} sm={12} md={6}>
                          <FormControl className={classes.formControl}>
                            <InputLabel shrink htmlFor="select-multiple-native">
                              Absent Period
                            </InputLabel>
                            <Select
                              native
                              value={teacherAttendanceInfo.absent_period}
                              onChange={this.handleChange('absent_period')}
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
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} sm={12} md={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink htmlFor="select-multiple-native">
                              Leave Type
                            </InputLabel>
                            <Select
                              native
                              value={teacherAttendanceInfo.leave_type}
                              onChange={this.handleChange('leave_type')}
                              inputProps={{
                                id: 'select-multiple-native',
                              }}
                            >
                              {constants.listLeaveTypes.map((opt,key) => (
                                <option key={key} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </Select>
                          </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                          <TextField
                                id="outlined-with-placeholder"
                                label="Reason"
                                placeholder="Placeholder"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={teacherAttendanceInfo.reason}
                                onChange={this.handleChange('reason')}
                                error={teacherAttendanceInfoError.reason.error}
                                helperText={teacherAttendanceInfoError.reason.text}
                                onBlur={this.handleBlurChange('reason')}
                            />
                      </Grid>
                    </Grid>
                </Grid>
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
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(AddTeacherAttendance);