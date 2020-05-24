import React from 'react'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import moment from 'moment'
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

export class AddExam extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stateUpdated: false,
            examInfo: {
                school_id: '',
                academic_year_id: '',
                exam_name: '',
                start_date: '',
                end_date: ''
            },
            examInfoError: {
                exam_name: {
                    error: false,
                    text: ''
                },
                start_date: {
                    error: false,
                    text: ''
                },
                end_date: {
                    error: false,
                    text: ''
                }
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(!state.stateUpdated) {
          const { mode, authInfo, selectedExamInfo } = props
          if(mode === 'Add' && authInfo) {
              return { examInfo: { 
                  ...state.examInfo,
                  school_id : authInfo.id,
                  academic_year_id : authInfo.academic_year_id
                }}
          }

          if(mode === 'Edit' && selectedExamInfo) {
            return { examInfo: { 
              ...state.examInfo,
              exam_name: selectedExamInfo.exam_name,
              start_date: selectedExamInfo.start_date,
              end_date: selectedExamInfo.end_date,
              school_id : props.authInfo.id,
              academic_year_id : selectedExamInfo.academic_year_id
            }}
          }
        }
        return null
    }

    setErrorState = (stname, err, msg) => {
        this.setState({ 
            examInfoError: {
            ...this.state.examInfoError,
            [stname]: {
              error: err,
              text: msg
            }
          }
         })
      }
    
      handleBlurChange = (stName) => event => {
        const enteredValue = event.target.value
      
        if(stName === 'exam_name') {
          if(!enteredValue) {
            this.setErrorState('exam_name', true, 'Exam Name required')
          }
        }
  
        if(stName === 'start_date') {
          if(!enteredValue) {
            this.setErrorState('start_date', true, 'Start Date required')
          }
        }
    
        if(stName === 'end_date') {
          if(!enteredValue) {
            this.setErrorState('end_date', true, 'End Date Required')
          }
        }

        
      }
    
      validateUserInfo = () => {
        const examInfo = this.state.examInfo
        if(!examInfo.exam_name) {
          this.setErrorState('exam_name', true, 'Student Name required')
          return false
        }
  
        if(!examInfo.start_date) {
          this.setErrorState('start_date', true, 'Start Date required')
          return false
        }
                  
        if(!examInfo.end_date) {
          this.setErrorState('end_date', true, 'End Date Required')
          return false
        } 

        if(examInfo.start_date && examInfo.end_date) {
          var st_date = new Date(examInfo.start_date); 
          var en_date = new Date(examInfo.end_date); 
          if(moment(st_date).isAfter(en_date)) {
            this.setErrorState('end_date', true, 'End date should be less then start date')
            return false
          }
        }
    
        return true
      }
    
      handleChange = (stName) => (event) => {
        this.setErrorState(stName, false, '')
        this.setState({ 
          stateUpdated: true,
          examInfo: { 
          ...this.state.examInfo,
          [stName] : event.target.value
        }})
  
      }

    

      
      
    
      handleSubmit = event => {
          if(this.validateUserInfo()) {
            const { examInfo } = this.state

            if(this.props.mode === 'Edit') {
              examInfo.id = this.props.selectedExamInfo.id
            }
            this.props.createUpdateExam(examInfo)
            this.props.history.push("/km?p=exams")
          } 
        }


    render() {
        const { classes, mode, schoolGradesList } = this.props
        const { examInfo, examInfoError } = this.state
        let btnDisableState = false
        Object.keys(examInfoError).map((opt) => {
            if(examInfoError[opt].error) {
            btnDisableState = true
            }
        })
        const btnDispName = mode === "Edit" ? "Update" : "Submit"
        let displayHeadText = mode+" Exam Details"
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
                                label="Enter Exam Name*"
                                placeholder="Placeholder"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={examInfo.exam_name}
                                onChange={this.handleChange('exam_name')}
                                error={examInfoError.exam_name.error}
                                helperText={examInfoError.exam_name.text}
                                onBlur={this.handleBlurChange('exam_name')}
                            />
                        </Grid>
                        <Grid item  xs={12} sm={12} md={6}>
                            <TextField
                                id="outlined-with-placeholder"
                                label="Select Start Date*"
                                placeholder="Placeholder"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                type="date"
                                value={examInfo.start_date}
                                onChange={this.handleChange('start_date')}
                                error={examInfoError.start_date.error}
                                helperText={examInfoError.start_date.text}
                                onBlur={this.handleBlurChange('start_date')}
                            /> 
                        </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item xs={12} sm={12} md={6}>
                          <TextField
                                id="outlined-with-placeholder"
                                label="Enter End Date*"
                                placeholder="Placeholder"
                                className={classes.textField}
                                margin="normal"
                                type="date"
                                variant="outlined"
                                value={examInfo.end_date}
                                onChange={this.handleChange('end_date')}
                                error={examInfoError.end_date.error}
                                helperText={examInfoError.end_date.text}
                                onBlur={this.handleBlurChange('end_date')}
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
                        {btnDispName}
                    </Button>
                </Grid>

                </Paper>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(AddExam);