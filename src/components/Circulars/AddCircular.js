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
import { getCurrentDate } from '../Common/Utility/Utils'
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
    textFieldMultiline: {
      width: 1000
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
      width: 250
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

export class AddCircular extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stateUpdated: false,
            circularInfo: {
                school_id: '',
                academic_year_id: '',
                circular_date: getCurrentDate(),
                circular_title: '',
                circular_message: '',
                circular_to: ''
            },
            circularInfoError: {
                circular_date: {
                    error: false,
                    text: ''
                },
                circular_title: {
                    error: false,
                    text: ''
                },
                circular_message: {
                    error: false,
                    text: ''
                },
                circular_to: {
                  error: false,
                  text: ''
              }
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(!state.stateUpdated) {
          const { mode, authInfo, selectedCircularInfo } = props
          if(mode === 'Add' && authInfo) {
              return { circularInfo: { 
                  ...state.circularInfo,
                  school_id: authInfo.id,
                  academic_year_id: authInfo.academic_year_id
                }
              }
            
          }

          if(mode === 'Edit' && selectedCircularInfo) {
            return { circularInfo: { 
              ...state.circularInfo,
              circular_date: selectedCircularInfo.circular_date,
              circular_title: selectedCircularInfo.circular_title,
              circular_message: selectedCircularInfo.circular_message,
              circular_to: selectedCircularInfo.circular_to,
              school_id: selectedCircularInfo.school_id,
              academic_year_id: selectedCircularInfo.academic_year_id
            }
          }
          }
        }
        return null
    }

    setErrorState = (stname, err, msg) => {
        this.setState({ 
            circularInfoError: {
            ...this.state.circularInfoError,
            [stname]: {
              error: err,
              text: msg
            }
          }
         })
      }
    
      handleBlurChange = (stName) => event => {
        const enteredValue = event.target.value
        const { circularInfoError } = this.state
      
        Object.keys(circularInfoError).map((option) => {
          if(stName === option && !enteredValue) {
            this.setErrorState(option, true, 'Required')
          }
        })
        
      }

      validateUserInfo = () => {
        const { circularInfo, circularInfoError } = this.state
        let retactive_status = true
        Object.keys(circularInfoError).map((obj) => {
          if(!circularInfo[obj]) {
            this.setErrorState(obj, true, 'Required')
            retactive_status = false
          }
        })
        
        return retactive_status
      }
        
      handleChange = (stName) => (event) => {
        this.setErrorState(stName, false, '')
        this.setState({ 
          stateUpdated: true,
          circularInfo: { 
          ...this.state.circularInfo,
          [stName] : event.target.value
        }})
  
      }
    
      handleSubmit = event => {
          if(this.validateUserInfo()) {
            const { circularInfo } = this.state
            if(this.props.mode === 'Edit') {
              circularInfo.id = this.props.selectedCircularInfo.id
            }
            this.props.createUpdateCircular(circularInfo)
            this.props.history.push("/km?p=circulars")
          } 
        }


    render() {
        const { classes, mode } = this.props
        const { circularInfo, circularInfoError } = this.state
        let btnDisableState = false
        Object.keys(circularInfoError).map((opt) => {
            if(circularInfoError[opt].error) {
            btnDisableState = true
            }
        })
        let displayHeadText = mode+" Circular Details"
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
                                label="Select Circular Date*"
                                placeholder="Placeholder"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                type="date"
                                value={circularInfo.circular_date}
                                onChange={this.handleChange('circular_date')}
                                error={circularInfoError.circular_date.error}
                                helperText={circularInfoError.circular_date.text}
                                onBlur={this.handleBlurChange('circular_date')}
                                disabled={true}
                            />
                        </Grid>
                        <Grid item  xs={12} sm={12} md={6}>

                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6}>
                          <FormControl className={classes.formControl}>
                            <InputLabel shrink htmlFor="select-multiple-native">
                              Circular Send To
                            </InputLabel>
                            <Select
                              value={circularInfo.circular_to}
                              onChange={this.handleChange('circular_to')}
                              inputProps={{
                                id: 'select-multiple-native',
                              }}
                              error={circularInfo.circular_to.error}
                              onBlur={this.handleBlurChange('circular_to')}
                            >
                              <option value=''>Select Circular Desination</option>
                              {Constants.listCircularDestinations.map((opt,key) => (
                                <option key={key} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </Select>
                            <FormHelperText className={classes.checkIconFail}>{circularInfoError.circular_to.text}</FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid item  xs={12} sm={12} md={6}>
                          <TextField
                              id="outlined-with-placeholder"
                              label="Enter Circular Title*"
                              placeholder="Placeholder"
                              className={classes.textField}
                              margin="normal"
                              variant="outlined"
                              value={circularInfo.circular_title}
                              onChange={this.handleChange('circular_title')}
                              error={circularInfoError.circular_title.error}
                              helperText={circularInfoError.circular_title.text}
                              onBlur={this.handleBlurChange('circular_title')}
                          />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6}>
                          <TextField
                              id="outlined-with-placeholder"
                              label="Enter Circular Message*"
                              placeholder="Placeholder"
                              className={classes.textFieldMultiline}
                              margin="normal"
                              variant="outlined"
                              multiline
                              rows={4}
                              value={circularInfo.circular_message}
                              onChange={this.handleChange('circular_message')}
                              error={circularInfoError.circular_message.error}
                              helperText={circularInfoError.circular_message.text}
                              onBlur={this.handleBlurChange('circular_message')}
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

export default withStyles(styles)(AddCircular);