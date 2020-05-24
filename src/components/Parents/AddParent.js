import React from 'react'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import { ValidateEmail } from '../Common/Utility/Utils'
import * as Constants from '../Common/Utility/Constants'
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

export class AddGrade extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stateUpdated: false,
            parentInfo: {
                school_id: '',
                parent_name: '',
                designation: '',
                qualification: '',
                relationship: '',
                mobile_no: '',
                email: '',
                aadhar_no: '',
                address: '',
                login_pwd: '',
                status: 'Active'
            },
            parentInfoError: {
                parent_name: {
                    error: false,
                    text: ''
                },
                designation: {
                    error: false,
                    text: ''
                },
                qualification: {
                    error: false,
                    text: ''
                },
                relationship: {
                  error: false,
                  text: ''
                },
                mobile_no: {
                    error: false,
                    text: ''
                },
                email: {
                  error: false,
                  text: ''
                },
                aadhar_no: {
                  error: false,
                  text: ''
                },
                address: {
                  error: false,
                  text: ''
                },
                login_pwd: {
                  error: false,
                  text: ''
                }
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(!state.stateUpdated) {
          const { mode, authInfo, selectedParentInfo } = props
          if(mode === 'Add' && authInfo) {
              return { parentInfo: { 
                  ...state.parentInfo,
                  school_id : authInfo.id
                }}
          }
          
          if(mode === 'Edit' && selectedParentInfo) {
            return { parentInfo: { 
              ...state.parentInfo,
              parent_name: selectedParentInfo.parent_name,
              designation: selectedParentInfo.designation,
              qualification: selectedParentInfo.qualification,
              relationship: selectedParentInfo.relationship,
              mobile_no: selectedParentInfo.mobile_no.toString(),
              email: selectedParentInfo.email,
              aadhar_no: selectedParentInfo.aadhar_no.toString(),
              address: selectedParentInfo.address,
              login_pwd: selectedParentInfo.login_pwd,
              status: 'Active',
              school_id : props.authInfo.id
            }}
          }
        }
        return null
    }


    setErrorState = (stname, err, msg) => {
        this.setState({ 
            parentInfoError: {
            ...this.state.parentInfoError,
            [stname]: {
              error: err,
              text: msg
            }
          }
         })
      }
    
      handleBlurChange = (stName) => event => {
        const enteredValue = event.target.value
      
        if(stName === 'parent_name') {
          if(!enteredValue) {
            this.setErrorState('parent_name', true, 'Parent/Guardian Name required')
          }
        }
  
        if(stName === 'designation') {
          if(!enteredValue) {
            this.setErrorState('designation', true, 'Parent Designation required')
          }
        }

        if(stName === 'qualification') {
          if(!enteredValue) {
            this.setErrorState('qualification', true, 'Parent Qualification required')
          }
        }

        if(stName === 'relationship') {
          if(!enteredValue) {
            this.setErrorState('relationship', true, 'Parent Relationship required')
          }
        }
    
        if(stName === 'mobile_no') {
          if(!enteredValue) {
            this.setErrorState('mobile_no', true, 'Mobile No Required')
          } else if(enteredValue.length !== 10) {
            this.setErrorState('mobile_no', true, 'Mobile Number number should be 10 characters long')
          } else {
            this.checkAvailability(stName, enteredValue)
          }
        }

        if(stName === 'email') {
          if(!ValidateEmail(enteredValue)) {
            this.setErrorState('email', true, 'Invalid Email')
          } else {
            this.checkAvailability(stName, enteredValue)
          }
        }

        if(stName === 'aadhar_no' && enteredValue) {
          if(enteredValue.length !== 12) {
            this.setErrorState('aadhar_no', true, 'Aadhar Number number should be 12 characters long')
          } else {
            this.checkAvailability(stName, enteredValue)
          }
        }

        if(stName === 'login_pwd') {
          if(!enteredValue) {
            this.setErrorState('login_pwd', true, 'Login password Required')
          } else if(/^[a-zA-Z0-9]*$/.test(enteredValue) === false) {
            this.setErrorState('login_pwd', true, 'Password contains only alphabets and number')
          }
        }

        
      }
    
      validateUserInfo = () => {
        const parentInfo = this.state.parentInfo
        const { availableListParents } = this.props
        if(!parentInfo.parent_name) {
          this.setErrorState('parent_name', true, 'Parent/Guardian Name required')
          return false
        }
  
        if(!parentInfo.designation) {
          this.setErrorState('designation', true, 'Parent Designation required')
          return false
        }
        
        if(!parentInfo.qualification) {
            this.setErrorState('qualification', true, 'Parent Qualification required')
            return false
          }

          if(!parentInfo.relationship) {
            this.setErrorState('relationship', true, 'Parent Relationship required')
            return false
          }
    
        if(!parentInfo.mobile_no) {
          this.setErrorState('mobile_no', true, 'Mobile Number Required')
          return false
        } else if(parentInfo.mobile_no.length !== 10) {
          this.setErrorState('mobile_no', true, 'Mobile Number should be 10 characters long')
          return false
        } else if(availableListParents.mobile_no) {
          this.setErrorState('mobile_no', true, 'Mobile Number already exists')
          return false
        }

        if(parentInfo.email && !ValidateEmail(parentInfo.email)) {
          this.setErrorState('email', true, 'Invalid Email')
          return false
        } else if(availableListParents.email) {
          this.setErrorState('email', true, 'Email already exists')
          return false
        }

        if(parentInfo.aadhar_no) {
          if(parentInfo.aadhar_no.length !== 12) {
            this.setErrorState('aadhar_no', true, 'Aadhar Number should be 12 characters long')
            return false
          } else if(availableListParents.aadhar_no) {
            this.setErrorState('aadhar_no', true, 'Aadhar Number already exists')
            return false
          }
        }

        if(!parentInfo.login_pwd) {
          this.setErrorState('login_pwd', true, 'Login password Required')
          return false
        } else if(/^[a-zA-Z0-9]*$/.test(parentInfo.login_pwd) === false) {
          this.setErrorState('login_pwd', true, 'Password contains only alphabets and number')
          return false
        }
    
        return true
      }
    
      handleChange = (stName) => (event) => {
        this.setErrorState(stName, false, '')
        this.setState({ 
          stateUpdated: true,
          parentInfo: { 
          ...this.state.parentInfo,
          [stName] : event.target.value
        }})

      }

      checkAvailability = (entity, value) => {
        if(entity === 'mobile_no' || entity === 'email' ||  entity === 'aadhar_no') {
          const sendData = {
            [entity] : value
          }
          if(this.props.mode === 'Edit') {
            sendData.id = this.props.selectedParentInfo.id
          }
          this.props.checkAvailability(sendData, entity)
        }
      }
      
    
      handleSubmit = event => {
          if(this.validateUserInfo()) {
            const { parentInfo } = this.state

            if(this.props.mode === 'Edit') {
              parentInfo.id = this.props.selectedParentInfo.id
            }
            this.props.createUpdateParentCB(parentInfo)
            this.props.history.push("/km?p=parents")
          } 
        }


    render() {
        const { classes, mode } = this.props
        const { parentInfo, parentInfoError } = this.state
        let btnDisableState = false
        Object.keys(parentInfoError).map((opt) => {
            if(parentInfoError[opt].error) {
            btnDisableState = true
            }
        })
        let displayHeadText = mode+" Parent"
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
                                label="Enter Parent/Guardian Name*"
                                placeholder="Placeholder"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={parentInfo.parent_name}
                                onChange={this.handleChange('parent_name')}
                                error={parentInfoError.parent_name.error}
                                helperText={parentInfoError.parent_name.text}
                                onBlur={this.handleBlurChange('parent_name')}
                            />
                        </Grid>
                        <Grid item  xs={12} sm={12} md={6}>
                            <TextField
                                id="outlined-with-placeholder"
                                label="Enter Designation*"
                                placeholder="Placeholder"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={parentInfo.designation}
                                onChange={this.handleChange('designation')}
                                error={parentInfoError.designation.error}
                                helperText={parentInfoError.designation.text}
                                onBlur={this.handleBlurChange('designation')}
                            /> 
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6}>
                          <TextField
                                id="outlined-with-placeholder"
                                label="Enter Qualification*"
                                placeholder="Placeholder"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={parentInfo.qualification}
                                onChange={this.handleChange('qualification')}
                                error={parentInfoError.qualification.error}
                                helperText={parentInfoError.qualification.text}
                                onBlur={this.handleBlurChange('qualification')}
                            />
                        </Grid>
                        <Grid item  xs={12} sm={12} md={6}>
                            <TextField
                                id="outlined-with-placeholder"
                                label="Enter Mobile Number*"
                                placeholder="Placeholder"
                                className={classes.textField}
                                type="number"
                                margin="normal"
                                variant="outlined"
                                value={parentInfo.mobile_no}
                                onChange={this.handleChange('mobile_no')}
                                error={parentInfoError.mobile_no.error}
                                helperText={parentInfoError.mobile_no.text}
                                onBlur={this.handleBlurChange('mobile_no')}
                            /> 
                        </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} sm={12} md={6}>
                          <TextField
                                id="outlined-with-placeholder"
                                label="Enter Email"
                                placeholder="Placeholder"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={parentInfo.email}
                                onChange={this.handleChange('email')}
                                error={parentInfoError.email.error}
                                helperText={parentInfoError.email.text}
                                onBlur={this.handleBlurChange('email')}
                            />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                          <TextField
                                id="outlined-with-placeholder"
                                label="Enter Aadhar Number"
                                placeholder="Placeholder"
                                className={classes.textField}
                                type="number"
                                margin="normal"
                                variant="outlined"
                                value={parentInfo.aadhar_no}
                                onChange={this.handleChange('aadhar_no')}
                                error={parentInfoError.aadhar_no.error}
                                helperText={parentInfoError.aadhar_no.text}
                                onBlur={this.handleBlurChange('aadhar_no')}
                            />
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item xs={12} sm={12} md={6}>
                          <TextField
                                id="outlined-with-placeholder"
                                label="Enter Address"
                                placeholder="Placeholder"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={parentInfo.address}
                                onChange={this.handleChange('address')}
                                error={parentInfoError.address.error}
                                helperText={parentInfoError.address.text}
                                onBlur={this.handleBlurChange('address')}
                            />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-simple">Select Relationship*</InputLabel>
                            <Select
                            value={parentInfo.relationship}
                            onChange={this.handleChange('relationship')}
                            className={classes.selectBox}
                            error={parentInfoError.relationship.error}
                            onBlur={this.handleBlurChange('relationship')}
                            >
                            <MenuItem value='None'>Select Relationship</MenuItem>
                            {Constants.relationships.map((opt, key) => {
                                return (<MenuItem value={opt} key={key}>{opt}</MenuItem>)
                            })}
                            </Select>
                            <FormHelperText className={classes.checkIconFail}>{parentInfoError.relationship.text}</FormHelperText>
                        </FormControl>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item xs={12} sm={12} md={6}>
                          <TextField
                                id="outlined-with-placeholder"
                                label="Enter Login Password*"
                                placeholder="Placeholder"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={parentInfo.login_pwd}
                                onChange={this.handleChange('login_pwd')}
                                error={parentInfoError.login_pwd.error}
                                helperText={parentInfoError.login_pwd.text}
                                onBlur={this.handleBlurChange('login_pwd')}
                            />
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

export default withStyles(styles)(AddGrade);