import React from 'react'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { schoolTimeList } from '../Common/Utility/Utils'
import Heading from '../Common/Heading'
import * as Constants from '../Common/Utility/Constants'

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

export class AddPeriod extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timeList: [],
            stateUpdated: false,
            periodInfo: {
                school_id: '',
                period_name: '',
                period_short_name: '',
                period_type: 'Teaching',
                time_from: '',
                time_to: '',
                priority: ''
            },
            periodInfoError: {
                period_name: {
                    error: false,
                    text: ''
                },
                period_short_name: {
                  error: false,
                  text: ''
                },
                period_type: {
                  error: false,
                  text: ''
                },
                time_from: {
                    error: false,
                    text: ''
                },
                time_to: {
                    error: false,
                    text: ''
                },
                priority: {
                  error: false,
                  text: ''
                },
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
        const timeList = schoolTimeList()
        if(!state.stateUpdated) {
          const { mode, authInfo, selectedPeriodInfo } = props
          if(mode === 'Add' && authInfo) {
              return { periodInfo: { 
                  ...state.periodInfo,
                  school_id : authInfo.id
                },
                timeList
              }
          }

          if(mode === 'Edit' && selectedPeriodInfo) {
            return { periodInfo: { 
              ...state.periodInfo,
              period_name: selectedPeriodInfo.period_name,
              period_type: selectedPeriodInfo.period_type,
              period_short_name: selectedPeriodInfo.period_short_name,
              time_from: selectedPeriodInfo.time_from,
              time_to: selectedPeriodInfo.time_to,
              priority: selectedPeriodInfo.priority,
              school_id: selectedPeriodInfo.school_id
            },
            timeList}
          }
        }
        return null
    }

    setErrorState = (stname, err, msg) => {
        this.setState({ 
            periodInfoError: {
            ...this.state.periodInfoError,
            [stname]: {
              error: err,
              text: msg
            }
          }
         })
      }
    
      handleBlurChange = (stName) => event => {
        const enteredValue = event.target.value
      
        if(stName === 'period_name') {
          if(!enteredValue) {
            this.setErrorState('period_name', true, 'Period Name required')
          }
        }

        if(stName === 'period_short_name') {
          if(!enteredValue) {
            this.setErrorState('period_short_name', true, 'Period Short Name required')
          }
        }

  
        if(stName === 'time_from') {
          if(!enteredValue) {
            this.setErrorState('time_from', true, 'From Time required')
          }
        }

        if(stName === 'time_to') {
          if(!enteredValue) {
            this.setErrorState('time_to', true, 'To time required')
          }
        }

        if(stName === 'priority') {
          if(!enteredValue) {
            this.setErrorState('priority', true, 'Priority required')
          }
        }

        if(stName === 'period_type') {
          if(!enteredValue) {
            this.setErrorState('period_type', true, 'Period Type required')
          }
        }
        
        
      }
    
      validateUserInfo = () => {
        const periodInfo = this.state.periodInfo
        if(!periodInfo.period_name) {
          this.setErrorState('period_name', true, 'Period Name required')
          return false
        }

        if(!periodInfo.period_short_name) {
          this.setErrorState('period_short_name', true, 'Period Short Name required')
          return false
        }        
  
        if(!periodInfo.time_from) {
          this.setErrorState('time_from', true, 'From Time required')
          return false
        }
        
        if(!periodInfo.time_to) {
            this.setErrorState('time_to', true, 'To Time required')
            return false
          }

          if(!periodInfo.priority) {
            this.setErrorState('priority', true, 'Priority required')
            return false
          }

          if(!periodInfo.period_type) {
            this.setErrorState('period_type', true, 'Period Type required')
            return false
          }
  
          
    
        return true
      }
    
      handleChange = (stName) => (event) => {
        this.setErrorState(stName, false, '')
        this.setState({ 
          stateUpdated: true,
          periodInfo: { 
          ...this.state.periodInfo,
          [stName] : event.target.value
        }})
  
      }

    

      
      
    
      handleSubmit = event => {
          if(this.validateUserInfo()) {
            const { periodInfo } = this.state
            if(this.props.mode === 'Edit') {
              periodInfo.id = this.props.selectedPeriodInfo.id
            }
            //periodInfo.school_id = this.props.selectedPeriodInfo.school_id
            this.props.createUpdatePeriodCB(periodInfo)
            this.props.history.push("/km?p=periods")
          } 
        }


    render() {
        const { classes, mode } = this.props
        const { periodInfo, periodInfoError } = this.state
        let btnDisableState = false
        Object.keys(periodInfoError).map((opt) => {
            if(periodInfoError[opt].error) {
            btnDisableState = true
            }
        })
        let displayHeadText = mode+" Period Details"
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
                            <TextField
                                id="outlined-with-placeholder"
                                label="Enter Period Name*"
                                placeholder="Placeholder"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={periodInfo.period_name}
                                onChange={this.handleChange('period_name')}
                                error={periodInfoError.period_name.error}
                                helperText={periodInfoError.period_name.text}
                                onBlur={this.handleBlurChange('period_name')}
                            />
                        </Grid>
                        <Grid item  xs={12} sm={12} md={6}>
                          <TextField
                                id="outlined-with-placeholder"
                                label="Enter Period Short Name*"
                                placeholder="Placeholder"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={periodInfo.period_short_name}
                                onChange={this.handleChange('period_short_name')}
                                error={periodInfoError.period_short_name.error}
                                helperText={periodInfoError.period_short_name.text}
                                onBlur={this.handleBlurChange('period_short_name')}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6}>
                          <FormControl className={classes.formControl}>
                            <InputLabel shrink htmlFor="select-multiple-native">
                              From Time
                            </InputLabel>
                            <Select
                              value={periodInfo.time_from}
                              onChange={this.handleChange('time_from')}
                              inputProps={{
                                id: 'select-multiple-native',
                              }}
                              error={periodInfoError.time_from.error}
                              onBlur={this.handleBlurChange('time_from')}
                            >
                              {this.state.timeList.map((opt,key) => (
                                <option key={key} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </Select>
                            <FormHelperText className={classes.checkIconFail}>{periodInfoError.time_from.text}</FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid item  xs={12} sm={12} md={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink htmlFor="select-multiple-native">
                              To Time
                            </InputLabel>
                            <Select
                              value={periodInfo.time_to}
                              onChange={this.handleChange('time_to')}
                              inputProps={{
                                id: 'select-multiple-native',
                              }}
                              error={periodInfoError.time_to.error}
                              onBlur={this.handleBlurChange('time_to')}
                            >
                              {this.state.timeList.map((opt,key) => (
                                <option key={key} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </Select>
                            <FormHelperText className={classes.checkIconFail}>{periodInfoError.time_to.text}</FormHelperText>
                          </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6}>
                          <FormControl className={classes.formControl}>
                            <InputLabel shrink htmlFor="select-multiple-native">
                              Priority
                            </InputLabel>
                            <Select
                              value={periodInfo.priority}
                              onChange={this.handleChange('priority')}
                              inputProps={{
                                id: 'select-multiple-native',
                              }}
                              error={periodInfoError.priority.error}
                              onBlur={this.handleBlurChange('priority')}
                            >
                              <option value="">Select</option>
                              {Constants.priorityList.map((opt,key) => (
                                <option key={key} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </Select>
                            <FormHelperText className={classes.checkIconFail}>{periodInfoError.priority.text}</FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <FormControl className={classes.formControl}>
                              <InputLabel shrink htmlFor="select-multiple-native">
                                Period Type
                              </InputLabel>
                              <Select
                                value={periodInfo.period_type}
                                onChange={this.handleChange('period_type')}
                                inputProps={{
                                  id: 'select-multiple-native',
                                }}
                                error={periodInfoError.period_type.error}
                                onBlur={this.handleBlurChange('period_type')}
                              >
                                {Constants.periodTypes.map((opt,key) => (
                                  <option key={key} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </Select>
                              <FormHelperText className={classes.checkIconFail}>{periodInfoError.period_type.text}</FormHelperText>
                            </FormControl>
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

export default withStyles(styles)(AddPeriod);