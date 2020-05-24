import React from 'react'
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
    }
  };

export class AddGrade extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stateUpdated: false, 
            gradeInfo: {
                school_id: '',
                grade_id: '',
                academic_year_id: '',
                teacher_id: '',
                section_name: ''
            },
            gradeInfoError: {
                grade_id: {
                    error: false,
                    text: ''
                },
                teacher_id: {
                    error: false,
                    text: ''
                },
                section_name: {
                    error: false,
                    text: ''
                }
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
      if(!state.stateUpdated) {
        const { mode, authInfo, selectedGradeInfo } = props
        if(mode === 'Add' && authInfo) {
            return { gradeInfo: { 
                ...state.gradeInfo,
                school_id : props.authInfo.id,
                academic_year_id: props.authInfo.academic_year_id
              }}
        }

        if(mode === 'Edit' && selectedGradeInfo) {

          return { gradeInfo: { 
            ...state.gradeInfo,
            grade_id: selectedGradeInfo.grade_id,
            academic_year_id: selectedGradeInfo.academic_year_id,
            teacher_id: selectedGradeInfo.teacher_id,
            section_name: selectedGradeInfo.section_name,
            school_id : props.authInfo.id
          }}
        }

      }
        return null
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
        const enteredValue = event.target.value
      
        if(stName === 'grade_id') {
          if(!enteredValue) {
            this.setErrorState('grade_id', true, 'Select Grade')
          }
        }
  
        if(stName === 'teacher_id') {
            if(!enteredValue) {
              this.setErrorState('teacher_id', true, 'Select Class Teacher')
            }
          }
    
         /* if(stName === 'section_name') {
            if(!enteredValue) {
              this.setErrorState('section_name', true, 'Please enter Section name')
            }
          }*/
        
      }
    
      validateUserInfo = () => {
        const gradeInfo = this.state.gradeInfo
        if(!gradeInfo.grade_id) {
          this.setErrorState('grade_id', true, 'Select Grade')
          return false
        }
          
        if(!gradeInfo.teacher_id) {
            this.setErrorState('teacher_id', true, 'Select Class Teacher')
            return false
          }
    
         /* if(!gradeInfo.section_name) {
            this.setErrorState('section_name', true, 'Please enter Section name')
            return false
          } */
      
    
        return true
      }
    
      handleChange = (stName) => (event) => {
        this.setErrorState(stName, false, '')
        this.setState({ 
          stateUpdated: true,
          gradeInfo: { 
          ...this.state.gradeInfo,
          [stName] : event.target.value
        }})
  
      }
    
    
      handleSubmit = event => {
          if(this.validateUserInfo()) {
            const { gradeInfo } = this.state
            const sendData = {
                school_id: parseInt(gradeInfo.school_id),
                grade_id: parseInt(gradeInfo.grade_id),
                academic_year_id: parseInt(gradeInfo.academic_year_id),
                teacher_id: parseInt(gradeInfo.teacher_id),
                section_name: gradeInfo.section_name
            }

            if(this.props.mode === 'Edit') {
              sendData.id = this.props.selectedGradeInfo.id
            }

            this.props.createUpdateSchoolGradeCB(sendData)
            this.props.history.push("/km?p=grades")
          } 
        }


    render() {
        const { classes, listGradesMaster, academicYearMaster, schoolTeachersMaster, mode } = this.props
        const { gradeInfo, gradeInfoError } = this.state
        let btnDisableState = false
        Object.keys(gradeInfoError).map((opt) => {
            if(gradeInfoError[opt].error) {
            btnDisableState = true
            }
        })
        let displayHeadText = mode+" School Grade"
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
                                <InputLabel htmlFor="age-simple">Select Grade*</InputLabel>
                                <Select
                                value={gradeInfo.grade_id}
                                onChange={this.handleChange('grade_id')}
                                className={classes.selectBox}
                                error={gradeInfoError.grade_id.error}
                                onBlur={this.handleBlurChange('grade_id')}
                                >
                                <MenuItem value='None'>Select Grade</MenuItem>
                                {listGradesMaster.map((opt, key) => {
                                    return (<MenuItem value={opt.id} key={key}>{opt.grade_name}</MenuItem>)
                                })}
                                </Select>
                                <FormHelperText className={classes.checkIconFail}>{gradeInfoError.grade_id.text}</FormHelperText>
                            </FormControl> 
                        </Grid>
                        <Grid item  xs={12} sm={12} md={6}>
                          <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-simple">Select Class Teacher*</InputLabel>
                                <Select
                                value={gradeInfo.teacher_id}
                                onChange={this.handleChange('teacher_id')}
                                className={classes.selectBox}
                                error={gradeInfoError.teacher_id.error}
                                onBlur={this.handleBlurChange('teacher_id')}
                                >
                                <MenuItem value='None'>Select Grade</MenuItem>
                                {schoolTeachersMaster.map((opt, key) => {
                                    return (<MenuItem value={opt.id} key={key}>{opt.teacher_name}</MenuItem>)
                                })}
                                </Select>
                                <FormHelperText className={classes.checkIconFail}>{gradeInfoError.teacher_id.text}</FormHelperText>
                            </FormControl> 
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6}>
                          <TextField
                              id="outlined-with-placeholder"
                              label="Enter Section Name*"
                              placeholder="Placeholder"
                              className={classes.textField}
                              margin="normal"
                              variant="outlined"
                              value={gradeInfo.section_name}
                              onChange={this.handleChange('section_name')}
                              error={gradeInfoError.section_name.error}
                              helperText={gradeInfoError.section_name.text}
                              onBlur={this.handleBlurChange('section_name')}
                          /> 
                        </Grid>
                        <Grid item  xs={12} sm={12} md={6}>
                            
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