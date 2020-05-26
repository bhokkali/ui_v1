import React from 'react'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { isEmpty } from '../Common/Utility/Utils'
import SelectGrade from '../Common/SelectGrade'

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

export class AddStudent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stateUpdated: false,
            studentInfo: {
                school_id: '',
                parent_id: '',
                register_no: '',
                student_name: '',
                blood_group: '',
                mobile_no: '',
                aadhar_no: '',
                dob: '',
                joining_date: '',
                status: 'Active',
                school_grade_id: '',
                gender: ''
            },
            studentInfoError: {
                student_name: {
                    error: false,
                    text: ''
                },
                blood_group: {
                    error: false,
                    text: ''
                },
                mobile_no: {
                    error: false,
                    text: ''
                },
                aadhar_no: {
                  error: false,
                  text: ''
                },
                dob: {
                  error: false,
                  text: ''
                },
                joining_date: {
                  error: false,
                  text: ''
                },
                school_grade_id: {
                  error: false,
                  text: ''
                },
                gender: {
                  error: false,
                  text: ''
                }
            }
        }
    }

    componentDidMount() {
      if(this.props.parentDetails) this.props.getParentInfo(this.props.parentId)
    }

    static getDerivedStateFromProps(props, state) {
        if(!state.stateUpdated) {
          const { mode, authInfo, selectedStudentInfo, parentId } = props
          if(mode === 'Add' && authInfo) {
              return { studentInfo: { 
                  ...state.studentInfo,
                  school_id : authInfo.id,
                  parent_id : parentId
                }}
          }

          if(mode === 'Edit' && selectedStudentInfo) {
            console.log('render :: selectedStudentInfo')
            console.log(selectedStudentInfo)
            return { studentInfo: { 
              ...state.studentInfo,
              student_name: selectedStudentInfo.student_name,
              blood_group: selectedStudentInfo.blood_group,
              mobile_no: selectedStudentInfo.mobile_no ? selectedStudentInfo.mobile_no.toString() : '',
              aadhar_no: selectedStudentInfo.aadhar_no ? selectedStudentInfo.aadhar_no.toString() : '',
              dob: selectedStudentInfo.dob,
              joining_date: selectedStudentInfo.joining_date,
              status: selectedStudentInfo.designation,
              school_id : props.authInfo.id,
              parent_id : selectedStudentInfo.parent_id,
              status: selectedStudentInfo.status,
              gender: selectedStudentInfo.gender,
              register_no: selectedStudentInfo.register_no,
              school_grade_id: selectedStudentInfo.school_grade_id
            }}
          }
        }
        return null
    }

    setErrorState = (stname, err, msg) => {
        this.setState({ 
            studentInfoError: {
            ...this.state.studentInfoError,
            [stname]: {
              error: err,
              text: msg
            }
          }
         })
      }
    
      handleBlurChange = (stName) => event => {
        const enteredValue = event.target.value
      
        if(stName === 'student_name') {
          if(!enteredValue) {
            this.setErrorState('student_name', true, 'Student Name required')
          }
        }
  
        if(stName === 'blood_group') {
          if(!enteredValue) {
            this.setErrorState('blood_group', true, 'Blood Group required')
          }
        }
    
        if(stName === 'mobile_no' && enteredValue) {
          if(enteredValue.length !== 10) {
            this.setErrorState('mobile_no', true, 'Mobile Number number should be 10 characters long')
          }
        }

        if(stName === 'aadhar_no' && enteredValue) {
          if(enteredValue.length !== 12) {
            this.setErrorState('aadhar_no', true, 'Aadhar Number number should be 12 characters long')
          }
        }

        if(stName === 'dob') {
          if(!enteredValue) {
            this.setErrorState('dob', true, 'Date of Birth Required')
          }
        }

        if(stName === 'joining_date') {
          if(!enteredValue) {
            this.setErrorState('joining_date', true, 'Joining Date Required')
          }
        }

        if(stName === 'gender') {
          if(!enteredValue) {
            this.setErrorState('gender', true, 'Select Gender')
          }
        }

        if(stName === 'school_grade_id') {
          if(!enteredValue) {
            this.setErrorState('school_grade_id', true, 'Select Grade')
          }
        }
        
        
      }
    
      validateUserInfo = () => {
        const studentInfo = this.state.studentInfo
        if(!studentInfo.student_name) {
          this.setErrorState('student_name', true, 'Student Name required')
          return false
        }
  
        if(!studentInfo.blood_group) {
          this.setErrorState('blood_group', true, 'Blood Group required')
          return false
        }
            
        if(studentInfo.mobile_no && studentInfo.mobile_no.length !== 10) {
          this.setErrorState('mobile_no', true, 'Mobile Number number should be 10 characters long')
          return false
        }

        if(studentInfo.aadhar_no) {
          if(studentInfo.aadhar_no.length !== 12) {
            this.setErrorState('aadhar_no', true, 'Aadhar Number number should be 12 characters long')
            return false
          }
        }

        if(!studentInfo.dob) {
          this.setErrorState('dob', true, 'Date of Birth Required')
          return false
        } 

        if(!studentInfo.joining_date) {
          this.setErrorState('joining_date', true, 'Joining Date Required')
          return false
        } 

        if(!studentInfo.gender) {
          this.setErrorState('gender', true, 'Select Gender')
          return false
        }

        if(!studentInfo.school_grade_id) {
          this.setErrorState('school_grade_id', true, 'Select Grade')
          return false
        }
    
        return true
      }
    
      handleChange = (stName) => (event) => {
        this.setErrorState(stName, false, '')
        this.setState({ 
          stateUpdated: true,
          studentInfo: { 
          ...this.state.studentInfo,
          [stName] : event.target.value
        }})
  
      }

    

      
      
    
      handleSubmit = event => {
          if(this.validateUserInfo()) {
            const { studentInfo } = this.state

            if(this.props.mode === 'Edit') {
              studentInfo.id = this.props.selectedStudentInfo.id
            }

            const selecedGrade = studentInfo.school_grade_id
            delete studentInfo.school_grade_id
            const sendData = {
              student_info: studentInfo,
              school_grade_id: selecedGrade,
              academic_year_id: this.props.authInfo.academic_year_id
            }
            this.props.createUpdateStudentCB(sendData)
            this.props.history.push("/km?p=students")
          } 
        }


    render() {
        const { classes, mode, schoolGradesList, parentDetails } = this.props
        const { studentInfo, studentInfoError } = this.state
        let btnDisableState = false
        Object.keys(studentInfoError).map((opt) => {
            if(studentInfoError[opt].error) {
            btnDisableState = true
            }
        })
        const btnDispName = mode === "Edit" ? "Update" : "Submit"

        return (
            <React.Fragment>
                {!isEmpty(parentDetails) && 
                  <Paper className={classes.paper}>
                    <Grid container>
                      <Grid item xs={12} sm={12} md={6}>Parent Name</Grid>
                      <Grid item xs={12} sm={12} md={6}>{parentDetails.parent_name}</Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} sm={12} md={6}>Active Status</Grid>
                      <Grid item xs={12} sm={12} md={6}>{parentDetails.status}</Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} sm={12} md={6}>Relationship</Grid>
                      <Grid item xs={12} sm={12} md={6}>{parentDetails.relationship}</Grid>
                    </Grid>
                  </Paper>
                }
                <Paper className={classes.paper}>
                <h2 className={classes.headBlock}>{mode} Student</h2>
                <Grid item xs={12} className={classes.marginLeft20}>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                id="outlined-with-placeholder"
                                label="Enter Student Name*"
                                placeholder="Placeholder"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={studentInfo.student_name}
                                onChange={this.handleChange('student_name')}
                                error={studentInfoError.student_name.error}
                                helperText={studentInfoError.student_name.text}
                                onBlur={this.handleBlurChange('student_name')}
                            />
                        </Grid>
                        <Grid item  xs={12} sm={12} md={6}>
                            <TextField
                                id="outlined-with-placeholder"
                                label="Enter Blood Group*"
                                placeholder="Placeholder"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={studentInfo.blood_group}
                                onChange={this.handleChange('blood_group')}
                                error={studentInfoError.blood_group.error}
                                helperText={studentInfoError.blood_group.text}
                                onBlur={this.handleBlurChange('blood_group')}
                            /> 
                        </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} sm={12} md={6}>
                          <TextField
                                id="outlined-with-placeholder"
                                label="Enter Mobile Number"
                                placeholder="Placeholder"
                                className={classes.textField}
                                type="number"
                                margin="normal"
                                variant="outlined"
                                value={studentInfo.mobile_no}
                                onChange={this.handleChange('mobile_no')}
                                error={studentInfoError.mobile_no.error}
                                helperText={studentInfoError.mobile_no.text}
                                onBlur={this.handleBlurChange('mobile_no')}
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
                                value={studentInfo.aadhar_no}
                                onChange={this.handleChange('aadhar_no')}
                                error={studentInfoError.aadhar_no.error}
                                helperText={studentInfoError.aadhar_no.text}
                                onBlur={this.handleBlurChange('aadhar_no')}
                            />
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item xs={12} sm={12} md={6}>
                        <TextField
                            id="outlined-with-placeholder"
                            label="Select Date of Birth*"
                            placeholder="Placeholder"
                            className={classes.textField}
                            margin="normal"
                            type="date"
                            variant="outlined"
                            value={studentInfo.dob}
                            onChange={this.handleChange('dob')}
                            error={studentInfoError.dob.error}
                            helperText={studentInfoError.dob.text}
                            onBlur={this.handleBlurChange('dob')}
                        />
                      </Grid>
                      <Grid item  xs={12} sm={12} md={6}>
                        <TextField
                            id="outlined-with-placeholder"
                            label="Enter Joining Date*"
                            placeholder="Placeholder"
                            className={classes.textField}
                            margin="normal"
                            type="date"
                            variant="outlined"
                            value={studentInfo.joining_date}
                            onChange={this.handleChange('joining_date')}
                            error={studentInfoError.joining_date.error}
                            helperText={studentInfoError.joining_date.text}
                            onBlur={this.handleBlurChange('joining_date')}
                        />
                      </Grid>
                      
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} sm={12} md={6}>
                        <FormControl 
                            component="fieldset" 
                            className={classes.formControl} 
                            error={studentInfoError.gender.error}
                            helperText={studentInfoError.gender.text}
                          >
                          <FormLabel component="legend">Gender*</FormLabel>
                          <RadioGroup
                            aria-label="Gender"
                            name="gender"
                            className={classes.group}
                            value={studentInfo.gender}
                            onChange={this.handleChange('gender')}
                            onBlur={this.handleBlurChange('gender')}
                            required
                          >
                          <FormControlLabel value="male" control={<Radio />} label="Male" />
                          <FormControlLabel value="female" control={<Radio />} label="Female" />
                          <FormControlLabel value="transgender" control={<Radio />} label="Trans Gender" />
                          </RadioGroup>
                          {studentInfoError.gender.error && 
                            <p className={classes.errorMsg}>{studentInfoError.gender.text}</p>
                          }
                        </FormControl>
                        
                      </Grid>
                      <Grid item  xs={12} sm={12} md={6}>
                        <SelectGrade
                          title = "Select Grade"
                          value = {studentInfo.school_grade_id}
                          onChangeCB = {this.handleChange}
                          onChangeParam = 'school_grade_id'
                          schoolGradesList = {schoolGradesList}
                          errorDisplayStatus = {true}
                          errorText = {studentInfoError.school_grade_id.text}
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
                        {btnDispName}
                    </Button>
                </Grid>

                </Paper>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(AddStudent);