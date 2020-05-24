import React from 'react'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { schoolTimeList, isEmpty } from '../Common/Utility/Utils'
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

export class AddExamTimeTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timeList : [],
            stateUpdated: false,
            examTimeTableInfo: {
                exam_id: '',
                school_grade_id: '',
                subject_id: '',
                exam_date: '',
                time_from: '',
                time_to: '',
                max_mark: ''
            },
            examTimeTableInfoError: {
                exam_id: {
                    error: false,
                    text: ''
                },
                school_grade_id: {
                    error: false,
                    text: ''
                },
                subject_id: {
                    error: false,
                    text: ''
                },
                exam_date: {
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
                max_mark: {
                  error: false,
                  text: ''
                },
            }
        }
    }

    componentDidMount() {
      const timeList = schoolTimeList()
      this.setState({timeList: timeList})
    }

    static getDerivedStateFromProps(props, state) {
        if(!state.stateUpdated) {
          const { mode, authInfo, selectedExamTimeTableInfo } = props

          if(mode === 'Edit' && selectedExamTimeTableInfo) {
            return { examTimeTableInfo: { 
              ...state.examTimeTableInfo,
              exam_id: selectedExamTimeTableInfo.exam_id,
              school_grade_id: selectedExamTimeTableInfo.school_grade_id,
              subject_id: selectedExamTimeTableInfo.subject_id,
              exam_date: selectedExamTimeTableInfo.exam_date,
              time_from : selectedExamTimeTableInfo.time_from,
              time_to : selectedExamTimeTableInfo.time_to,
              max_mark : selectedExamTimeTableInfo.max_mark
            }
          }
          }
        } 
        return null
    }

    setErrorState = (stname, err, msg) => {
        this.setState({ 
            examTimeTableInfoError: {
            ...this.state.examTimeTableInfoError,
            [stname]: {
              error: err,
              text: msg
            }
          }
         })
      }
    
      handleBlurChange = (stName) => event => {
        const enteredValue = event.target.value
      
        if(stName === 'exam_id') {
          if(!enteredValue) {
            this.setErrorState('exam_id', true, 'Select Exam')
          }
        }
  
        if(stName === 'school_grade_id') {
          if(!enteredValue) {
            this.setErrorState('school_grade_id', true, 'Select Grade')
          }
        }
    
        if(stName === 'subject_id') {
          if(!enteredValue) {
            this.setErrorState('subject_id', true, 'Select Subject')
          }
        }

        if(stName === 'exam_date') {
          if(!enteredValue) {
            this.setErrorState('exam_date', true, 'Exam Date Required')
          }
        }
        if(stName === 'time_from') {
          if(!enteredValue) {
            this.setErrorState('time_from', true, 'Select From Time')
          }
        }
        if(stName === 'time_to') {
          if(!enteredValue) {
            this.setErrorState('time_to', true, 'Select To Time')
          }
        }
        if(stName === 'max_mark') {
          if(!enteredValue) {
            this.setErrorState('max_mark', true, 'Maximum mark required')
          }
        }

        
      }
    
      validateUserInfo = () => {
        const examTimeTableInfo = this.state.examTimeTableInfo
        if(!examTimeTableInfo.exam_id) {
          this.setErrorState('exam_id', true, 'Select Exam')
          return false
        }
  
        if(!examTimeTableInfo.school_grade_id) {
          this.setErrorState('school_grade_id', true, 'Select Grade')
          return false
        }
                  
        if(!examTimeTableInfo.subject_id) {
          this.setErrorState('subject_id', true, 'Select Subject')
          return false
        } 
        if(!examTimeTableInfo.exam_date) {
          this.setErrorState('exam_date', true, 'Exam Date Required')
          return false
        } 
        if(!examTimeTableInfo.time_from) {
          this.setErrorState('time_from', true, 'Select To Time')
          return false
        } 
        if(!examTimeTableInfo.time_to) {
          this.setErrorState('time_to', true, 'Select To Time')
          return false
        } 
        if(!examTimeTableInfo.max_mark) {
          this.setErrorState('max_mark', true, 'Maximum mark required')
          return false
        } 
    
        return true
      }
    
      handleChange = (stName) => (event) => {
        this.setErrorState(stName, false, '')
        this.setState({ 
          stateUpdated: true,
          examTimeTableInfo: { 
          ...this.state.examTimeTableInfo,
          [stName] : event.target.value
        }})    
  
      }

    

      
      
    
      handleSubmit = event => {
          if(this.validateUserInfo()) {
            const { examTimeTableInfo } = this.state

            if(this.props.mode === 'Edit') {
              examTimeTableInfo.id = this.props.selectedExamTimeTableInfo.id
            }

            this.props.createUpdateExamGrade(this.state.examTimeTableInfo)
            this.props.history.push("/km?p=exams")
          } 
        }


    render() {
        const { classes, mode, listExams, schoolGradesList, subjectsMaster } = this.props
        const { examTimeTableInfo, examTimeTableInfoError } = this.state
        let btnDisableState = false
        Object.keys(examTimeTableInfoError).map((opt) => {
            if(examTimeTableInfoError[opt].error) {
            btnDisableState = true
            }
        })
        const btnDispName = mode === "Edit" ? "Update" : "Submit"
        let examDateRange = { min: '', max: '' }
        if(examTimeTableInfo.exam_id !== null) {
          const examObj = _.find(listExams, (n) => { return n.id === parseInt(examTimeTableInfo.exam_id) })
          if(!isEmpty(examObj)) {
            examDateRange.min = examObj.start_date
            examDateRange.max = examObj.end_date
          }
        }
        let displayHeadText = mode+" Exam Time Table Details"
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
                              Select Exam
                            </InputLabel>
                            <Select
                              native
                              value={examTimeTableInfo.exam_id}
                              onChange={this.handleChange('exam_id')}
                              inputProps={{
                                id: 'select-multiple-native',
                              }}
                              error={examTimeTableInfoError.exam_id.error}
                              onBlur={this.handleBlurChange('exam_id')}
                            >
                              <option value=''>Select Exam</option>
                              {listExams.map((opt,key) => (
                                <option key={key} value={opt.id}>
                                  {opt.exam_name}
                                </option>
                              ))}
                            </Select>
                          </FormControl>
                          <FormHelperText className={classes.checkIconFail}>{examTimeTableInfoError.exam_id.text}</FormHelperText>
                        </Grid>
                        <Grid item  xs={12} sm={12} md={6}>
                          <FormControl className={classes.formControl}>
                            <InputLabel shrink htmlFor="select-multiple-native">
                              Select Grade
                            </InputLabel>
                            <Select
                              native
                              value={examTimeTableInfo.school_grade_id}
                              onChange={this.handleChange('school_grade_id')}
                              inputProps={{
                                id: 'select-multiple-native',
                              }}
                              error={examTimeTableInfoError.school_grade_id.error}
                              onBlur={this.handleBlurChange('school_grade_id')}
                            >
                              <option value=''>Select Grade</option>
                              {schoolGradesList.map((opt,key) => (
                                <option key={key} value={opt.id}>
                                  {opt.grade_name} - {opt.section_name}
                                </option>
                              ))}
                            </Select>
                          </FormControl>
                          <FormHelperText className={classes.checkIconFail}>{examTimeTableInfoError.school_grade_id.text}</FormHelperText>
                        </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item xs={12} sm={12} md={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink htmlFor="select-multiple-native">
                              Select Subject
                            </InputLabel>
                            <Select
                              native
                              value={examTimeTableInfo.subject_id}
                              onChange={this.handleChange('subject_id')}
                              inputProps={{
                                id: 'select-multiple-native',
                              }}
                              error={examTimeTableInfoError.subject_id.error}
                              onBlur={this.handleBlurChange('subject_id')}
                            >
                              <option value=''>Select Subject</option>
                              {subjectsMaster.map((opt,key) => (
                                <option key={key} value={opt.id}>
                                  {opt.subject_name}
                                </option>
                              ))}
                            </Select>
                          </FormControl>
                          <FormHelperText className={classes.checkIconFail}>{examTimeTableInfoError.subject_id.text}</FormHelperText>
                      
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                          <TextField
                                id="outlined-with-placeholder"
                                label="Select Exam Date*"
                                placeholder="Placeholder"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                type="date"
                                value={examTimeTableInfo.exam_date}
                                onChange={this.handleChange('exam_date')}
                                error={examTimeTableInfoError.exam_date.error}
                                helperText={examTimeTableInfoError.exam_date.text}
                                onBlur={this.handleBlurChange('exam_date')}
                                inputProps={examDateRange}
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
                              value={examTimeTableInfo.time_from}
                              onChange={this.handleChange('time_from')}
                              inputProps={{
                                id: 'select-multiple-native',
                              }}
                              error={examTimeTableInfo.time_from.error}
                              onBlur={this.handleBlurChange('time_from')}
                            >
                              {this.state.timeList.map((opt,key) => (
                                <option key={key} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </Select>
                            <FormHelperText className={classes.checkIconFail}>{examTimeTableInfoError.time_from.text}</FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid item  xs={12} sm={12} md={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink htmlFor="select-multiple-native">
                              To Time
                            </InputLabel>
                            <Select
                              value={examTimeTableInfo.time_to}
                              onChange={this.handleChange('time_to')}
                              inputProps={{
                                id: 'select-multiple-native',
                              }}
                              error={examTimeTableInfo.time_to.error}
                              onBlur={this.handleBlurChange('time_to')}
                            >
                              {this.state.timeList.map((opt,key) => (
                                <option key={key} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </Select>
                            <FormHelperText className={classes.checkIconFail}>{examTimeTableInfoError.time_to.text}</FormHelperText>
                          </FormControl>
                        </Grid>
                    </Grid>
                </Grid>


                    <Grid container>
                      <Grid item xs={12} sm={12} md={6}>
                        <TextField
                            id="outlined-with-placeholder"
                            label="Enter Maximum Mark*"
                            placeholder="Placeholder"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            value={examTimeTableInfo.max_mark}
                            onChange={this.handleChange('max_mark')}
                            error={examTimeTableInfoError.max_mark.error}
                            helperText={examTimeTableInfoError.max_mark.text}
                            onBlur={this.handleBlurChange('max_mark')}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
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

export default withStyles(styles)(AddExamTimeTable);