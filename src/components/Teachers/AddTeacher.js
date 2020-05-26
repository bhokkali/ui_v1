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
import Heading from '../Common/Heading'

import { ValidateEmail } from '../Common/Utility/Utils'

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

export class AddTeacher extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stateUpdated: false,
            teacherInfo: {
                school_id: '',
                teacher_name: '',
                designation: '',
                qualification: '',
                mobile_no: '',
                email: '',
                aadhar_no: '',
                address: '',
                subjects: [],
                login_pwd: '',
                joining_date: '',
                status: 'Active'
            },
            teacherInfoError: {
                teacher_name: {
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
                },
                joining_date: {
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
              return { teacherInfo: { 
                  ...state.teacherInfo,
                  school_id : authInfo.id
                }}
          }

          if(mode === 'Edit' && selectedTeacherInfo) {
            console.log('again called')
            let subjectsArr = []
            selectedTeacherInfo.subject_info.map((opt) => {
              subjectsArr.push(opt.subject_id)
            })

            return { teacherInfo: { 
              ...state.teacherInfo,
              teacher_name: selectedTeacherInfo.teacher_name,
              designation: selectedTeacherInfo.designation,
              qualification: selectedTeacherInfo.qualification,
              mobile_no: selectedTeacherInfo.mobile_no.toString(),
              email: selectedTeacherInfo.email,
              aadhar_no: selectedTeacherInfo.aadhar_no.toString(),
              address: selectedTeacherInfo.address,
              subjects: subjectsArr,
              login_pwd: selectedTeacherInfo.login_pwd,
              joining_date: selectedTeacherInfo.joining_date,
              status: selectedTeacherInfo.designation,
              school_id : props.authInfo.id
            }}
          }
        }
        return null
    }

    componentDidMount() {
      if(this.props.teacherId) {

      }
    }

    setErrorState = (stname, err, msg) => {
        this.setState({ 
            teacherInfoError: {
            ...this.state.teacherInfoError,
            [stname]: {
              error: err,
              text: msg
            }
          }
         })
      }
    
      handleBlurChange = (stName) => event => {
        const enteredValue = event.target.value
      
        if(stName === 'teacher_name') {
          if(!enteredValue) {
            this.setErrorState('teacher_name', true, 'Teacher Name required')
          }
        }
  
        if(stName === 'designation') {
          if(!enteredValue) {
            this.setErrorState('designation', true, 'Teacher Designation required')
          }
        }

        if(stName === 'qualification') {
          if(!enteredValue) {
            this.setErrorState('qualification', true, 'Teacher Qualification required')
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

        if(stName === 'joining_date') {
          if(!enteredValue) {
            this.setErrorState('joining_date', true, 'Joining Date Required')
          }
        }

        
      }
    
      validateUserInfo = () => {
        const teacherInfo = this.state.teacherInfo
        const { availableListTeacher } = this.props
        if(!teacherInfo.teacher_name) {
          this.setErrorState('teacher_name', true, 'Teacher Name required')
          return false
        }
  
        if(!teacherInfo.designation) {
          this.setErrorState('designation', true, 'Teacher Designation required')
          return false
        }
        
        if(!teacherInfo.qualification) {
            this.setErrorState('qualification', true, 'Teacher Qualification required')
            return false
          }
    
        if(!teacherInfo.mobile_no) {
          this.setErrorState('mobile_no', true, 'Mobile Number Required')
          return false
        } else if(teacherInfo.mobile_no.length !== 10) {
          this.setErrorState('mobile_no', true, 'Mobile Number number should be 10 characters long')
          return false
        } else if(availableListTeacher.mobile_no) {
          this.setErrorState('mobile_no', true, 'Mobile Number already exists')
          return false
        }

        if(teacherInfo.email && !ValidateEmail(teacherInfo.email)) {
          this.setErrorState('email', true, 'Invalid Email')
          return false
        } else if(availableListTeacher.email) {
          this.setErrorState('email', true, 'Email already exists')
          return false
        }

        if(teacherInfo.aadhar_no) {
          if(teacherInfo.aadhar_no.length !== 12) {
            this.setErrorState('aadhar_no', true, 'Aadhar Number number should be 12 characters long')
            return false
          } else if(availableListTeacher.aadhar_no) {
            this.setErrorState('aadhar_no', true, 'Aadhar Number already exists')
            return false
          }
        }

        if(!teacherInfo.login_pwd) {
          this.setErrorState('login_pwd', true, 'Login password Required')
          return false
        }  else if(/^[a-zA-Z0-9]*$/.test(teacherInfo.login_pwd) === false) {
          this.setErrorState('login_pwd', true, 'Password contains only alphabets and number')
          return false
        }

        if(!teacherInfo.joining_date) {
          this.setErrorState('joining_date', true, 'Joining Date Required')
          return false
        } 
      
    
        return true
      }
    
      handleChange = (stName) => (event) => {
        this.setErrorState(stName, false, '')
        this.setState({ 
          stateUpdated: true,
          teacherInfo: { 
          ...this.state.teacherInfo,
          [stName] : event.target.value
        }})
  
      }

      handleChangeMultiple = (stName) => event => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        console.log('selected value')
        console.log(value)

        this.setErrorState(stName, false, '')
        this.setState({ teacherInfo: { 
          ...this.state.teacherInfo,
          [stName] : value
        }})

      };

      
      
    
      handleSubmit = event => {
          if(this.validateUserInfo()) {
            const { teacherInfo } = this.state
            //teacherInfo.subjects = teacherInfo.subjects.toString()

            if(this.props.mode === 'Edit') {
              teacherInfo.id = this.props.selectedTeacherInfo.id
            }
            let newSubArr = []
            teacherInfo.subjects.map((opt) => {
              newSubArr.push(parseInt(opt))
            })
            teacherInfo.subjects = newSubArr
            this.props.createUpdateTeacherCB(teacherInfo)
            this.props.history.push("/km?p=teachers")
          } 
        }

        checkAvailability = (entity, value) => {
          if(entity === 'mobile_no' || entity === 'email' ||  entity === 'aadhar_no') {
            const sendData = {
              [entity] : value
            }
            if(this.props.mode === 'Edit') {
              sendData.id = this.props.selectedTeacherInfo.id
            }
            this.props.checkAvailability(sendData, entity)
          }
        }


    render() {
        const { classes, subjectsMaster, mode } = this.props
        const { teacherInfo, teacherInfoError } = this.state
        let btnDisableState = false
        Object.keys(teacherInfoError).map((opt) => {
            if(teacherInfoError[opt].error) {
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
        let displayHeadText = mode+" Teacher"
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
                                label="Enter Teacher Name*"
                                placeholder="Placeholder"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={teacherInfo.teacher_name}
                                onChange={this.handleChange('teacher_name')}
                                error={teacherInfoError.teacher_name.error}
                                helperText={teacherInfoError.teacher_name.text}
                                onBlur={this.handleBlurChange('teacher_name')}
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
                                value={teacherInfo.designation}
                                onChange={this.handleChange('designation')}
                                error={teacherInfoError.designation.error}
                                helperText={teacherInfoError.designation.text}
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
                                value={teacherInfo.qualification}
                                onChange={this.handleChange('qualification')}
                                error={teacherInfoError.qualification.error}
                                helperText={teacherInfoError.qualification.text}
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
                                value={teacherInfo.mobile_no}
                                onChange={this.handleChange('mobile_no')}
                                error={teacherInfoError.mobile_no.error}
                                helperText={teacherInfoError.mobile_no.text}
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
                                value={teacherInfo.email}
                                onChange={this.handleChange('email')}
                                error={teacherInfoError.email.error}
                                helperText={teacherInfoError.email.text}
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
                                value={teacherInfo.aadhar_no}
                                onChange={this.handleChange('aadhar_no')}
                                error={teacherInfoError.aadhar_no.error}
                                helperText={teacherInfoError.aadhar_no.text}
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
                                value={teacherInfo.address}
                                onChange={this.handleChange('address')}
                                error={teacherInfoError.address.error}
                                helperText={teacherInfoError.address.text}
                                onBlur={this.handleBlurChange('address')}
                            />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                          <TextField
                                id="outlined-with-placeholder"
                                label="Enter Joining Date*"
                                placeholder="Placeholder"
                                className={classes.textField}
                                type="date"
                                margin="normal"
                                variant="outlined"
                                value={teacherInfo.joining_date}
                                onChange={this.handleChange('joining_date')}
                                error={teacherInfoError.joining_date.error}
                                helperText={teacherInfoError.joining_date.text}
                                onBlur={this.handleBlurChange('joining_date')}
                            />
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item xs={12} sm={12} md={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink htmlFor="select-multiple-native">
                              Select Subjects
                            </InputLabel>
                            <Select
                              multiple
                              native
                              value={teacherInfo.subjects}
                              onChange={this.handleChangeMultiple('subjects')}
                              inputProps={{
                                id: 'select-multiple-native',
                              }}
                            >
                              {subjectsMaster.map((opt,key) => (
                                <option key={key} value={opt.id}>
                                  {opt.subject_name}
                                </option>
                              ))}
                            </Select>
                          </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                          <TextField
                                id="outlined-with-placeholder"
                                label="Enter Login Password*"
                                placeholder="Placeholder"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={teacherInfo.login_pwd}
                                onChange={this.handleChange('login_pwd')}
                                error={teacherInfoError.login_pwd.error}
                                helperText={teacherInfoError.login_pwd.text}
                                onBlur={this.handleBlurChange('login_pwd')}
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

export default withStyles(styles)(AddTeacher);