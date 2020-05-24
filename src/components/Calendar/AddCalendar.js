import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
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
    }
  };

export class AddCalendar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stateUpdated: false,
            calendarInfo: {
                school_id: '',
                academic_year_id: '',
                event_name: '',
                event_date: '',
                event_type: ''
            },
            calendarInfoError: {
                event_name: {
                    error: false,
                    text: ''
                },
                event_date: {
                  error: false,
                  text: ''
                },
                event_type: {
                  error: false,
                  text: ''
                }
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
      if(!state.stateUpdated) {
        const { mode, authInfo, selectedCalendarInfo } = props
        if(mode === 'Add' && authInfo) {
          return { calendarInfo: { 
              ...state.calendarInfo,
              school_id : props.authInfo.id,
              academic_year_id: props.authInfo.academic_year_id
            }}
        }
  
        if(mode === 'Edit' && selectedCalendarInfo) {
          return { calendarInfo: { 
            ...state.calendarInfo,
            academic_year_id: selectedCalendarInfo.academic_year_id,
            event_name: selectedCalendarInfo.event_name,
            event_date: selectedCalendarInfo.event_date,
            event_type: selectedCalendarInfo.event_type,
            school_id : selectedCalendarInfo.school_id
          }}
        }
      }
      
      return null
    }

    setErrorState = (stname, err, msg) => {
        this.setState({ 
            calendarInfoError: {
            ...this.state.calendarInfoError,
            [stname]: {
              error: err,
              text: msg
            }
          }
         })
      }
    
      handleBlurChange = (stName) => event => {
        const enteredValue = event.target.value
      
      
        
         if(stName === 'event_name') {
            if(!enteredValue) {
              this.setErrorState('event_name', true, 'Please enter event name')
            }
          }

          if(stName === 'event_date') {
            if(!enteredValue) {
              this.setErrorState('event_date', true, 'Please select event date')
            }
          }

          if(stName === 'event_type') {
            if(!enteredValue) {
              this.setErrorState('event_type', true, 'Please select event type')
            }
          }

          
        
      }
    
      validateUserInfo = () => {
        const calendarInfo = this.state.calendarInfo
        
       
        if(!calendarInfo.event_name) {
          this.setErrorState('event_name', true, 'Please enter event name')
          return false
        }

        if(!calendarInfo.event_date) {
          this.setErrorState('event_date', true, 'Please select event Date')
          return false
        }

        if(!calendarInfo.event_type) {
          this.setErrorState('event_type', true, 'Please select event type')
          return false
        }
      
    
        return true
      }
    
      handleChange = (stName) => (event) => {
        this.setErrorState(stName, false, '')
        this.setState({ 
          stateUpdated: true,
          calendarInfo: { 
            ...this.state.calendarInfo,
            [stName] : event.target.value
          }
        })
  
      }
    
    
      handleSubmit = event => {
          if(this.validateUserInfo()) {
            const { calendarInfo } = this.state
            const sendData = {
                school_id: parseInt(calendarInfo.school_id),
                academic_year_id: parseInt(calendarInfo.academic_year_id),
                event_name: calendarInfo.event_name,
                event_date: calendarInfo.event_date,
                event_type: calendarInfo.event_type
            }
            if(this.props.mode === 'Edit') {
              sendData.id = this.props.selectedCalendarInfo.id
            }
            this.props.createUpdateSchoolCalendarCB(sendData)
            this.props.history.push("/km?p=calendar")
          } 
        }


    render() {
        const { classes, mode } = this.props
        const { calendarInfo, calendarInfoError } = this.state
        let btnDisableState = false
        Object.keys(calendarInfoError).map((opt) => {
            if(calendarInfoError[opt].error) {
            btnDisableState = true
            }
        })
        let displayHeadText = mode+" School Calendar"

        console.log('calendarInfo <>')
        console.log(calendarInfo)
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
                                label="Enter Event Name*"
                                placeholder="Placeholder"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={calendarInfo.event_name}
                                onChange={this.handleChange('event_name')}
                                error={calendarInfoError.event_name.error}
                                helperText={calendarInfoError.event_name.text}
                                onBlur={this.handleBlurChange('event_name')}
                            /> 
                        </Grid>
                        <Grid item  xs={12} sm={12} md={6}>
                          <TextField
                                id="outlined-with-placeholder"
                                label="Enter Event Date*"
                                placeholder="Placeholder"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                type="date"
                                value={calendarInfo.event_date}
                                onChange={this.handleChange('event_date')}
                                error={calendarInfoError.event_date.error}
                                helperText={calendarInfoError.event_date.text}
                                onBlur={this.handleBlurChange('event_date')}
                            /> 
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6}>
                          <FormControl className={classes.formControl}>
                              <InputLabel shrink htmlFor="select-multiple-native">
                                Event Type
                              </InputLabel>
                              <Select
                                native
                                value={calendarInfo.event_type}
                                onChange={this.handleChange('event_type')}
                                inputProps={{
                                  id: 'select-multiple-native',
                                }}
                                error={calendarInfoError.event_type.error}
                                onBlur={this.handleBlurChange('event_type')}
                              >
                                <option value=''>Select Event Type</option>
                                {Constants.calendarEventTypes.map((opt,key) => (
                                  <option key={key} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                                </Select>
                            </FormControl>
                            <FormHelperText className={classes.checkIconFail}>{calendarInfoError.event_type.text}</FormHelperText>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>

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

export default withStyles(styles)(AddCalendar);