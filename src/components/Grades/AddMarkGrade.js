import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
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

export class AddMarkGrade extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stateUpdated: false,
            markGradeInfo: {
                school_id: '',
                min_mark: '',
                max_mark: '',
                mark_grade: ''
            },
            markGradeInfoError: {
                min_mark: {
                    error: false,
                    text: ''
                },
                max_mark: {
                    error: false,
                    text: ''
                },
                mark_grade: {
                    error: false,
                    text: ''
                }
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
      if(!state.stateUpdated) {
        const { mode, authInfo, selectedMarkGradeInfo } = props
        if(mode === 'Add' && authInfo) {
            return { markGradeInfo: { 
                ...state.markGradeInfo,
                school_id : props.authInfo.id
              }}
        }

        if(mode === 'Edit' && selectedMarkGradeInfo) {
          return { markGradeInfo: { 
            ...state.markGradeInfo,
            min_mark: selectedMarkGradeInfo.min_mark,
            max_mark: selectedMarkGradeInfo.max_mark,
            mark_grade: selectedMarkGradeInfo.mark_grade,
            school_id : props.authInfo.id
          }}
        }

      }
        return null
    }

    setErrorState = (stname, err, msg) => {
        this.setState({ 
            markGradeInfoError: {
            ...this.state.markGradeInfoError,
            [stname]: {
              error: err,
              text: msg
            }
          }
         })
      }
    
      handleBlurChange = (stName) => event => {
        const enteredValue = event.target.value
      
        if(stName === 'min_mark') {
          if(!enteredValue) {
            this.setErrorState('min_mark', true, 'Minimum mark required')
          }
        }
  
        if(stName === 'max_mark') {
          if(!enteredValue) {
            this.setErrorState('max_mark', true, 'Maximum mark required')
          }
        }

        if(stName === 'mark_grade') {
            if(!enteredValue) {
              this.setErrorState('mark_grade', true, 'Mark Grade required')
            }
          }
    
        
        
      }
    
      validateUserInfo = () => {
        const markGradeInfo = this.state.markGradeInfo
        if(!markGradeInfo.min_mark) {
          this.setErrorState('min_mark', true, 'Minimum mark required')
          return false
        }
  
        if(!markGradeInfo.max_mark) {
          this.setErrorState('max_mark', true, 'Maximum mark required')
          return false
        }
        
        if(!markGradeInfo.mark_grade) {
            this.setErrorState('mark_grade', true, 'Mark Grade required')
            return false
          }
      
    
        return true
      }
    
      handleChange = (stName) => (event) => {
        this.setErrorState(stName, false, '')
        this.setState({ 
          stateUpdated: true,
          markGradeInfo: { 
          ...this.state.markGradeInfo,
          [stName] : event.target.value
        }})
  
      }
    
    
      handleSubmit = event => {
          if(this.validateUserInfo()) {
            const { markGradeInfo } = this.state
            const sendData = {
                school_id: markGradeInfo.school_id,
                min_mark: markGradeInfo.min_mark,
                max_mark: markGradeInfo.max_mark,
                mark_grade: markGradeInfo.mark_grade
            }

            if(this.props.mode === 'Edit') {
              sendData.id = this.props.selectedMarkGradeInfo.id
            }

            this.props.createUpdateMarkGrade(sendData)
            this.props.history.push("/km?p=grades")
          } 
        }


    render() {
        const { classes, mode } = this.props
        const { markGradeInfo, markGradeInfoError } = this.state
        let btnDisableState = false
        Object.keys(markGradeInfoError).map((opt) => {
            if(markGradeInfoError[opt].error) {
            btnDisableState = true
            }
        })
        let displayHeadText = mode+" Mark Grade"
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
                              label="Enter Minimum Mark*"
                              placeholder="Placeholder"
                              className={classes.textField}
                              margin="normal"
                              type="number"
                              variant="outlined"
                              value={markGradeInfo.min_mark}
                              onChange={this.handleChange('min_mark')}
                              error={markGradeInfoError.min_mark.error}
                              helperText={markGradeInfoError.min_mark.text}
                              onBlur={this.handleBlurChange('min_mark')}
                          /> 
                        </Grid>
                        <Grid item  xs={12} sm={12} md={6}>
                          <TextField
                              id="outlined-with-placeholder"
                              label="Enter Maximum Mark*"
                              placeholder="Placeholder"
                              className={classes.textField}
                              margin="normal"
                              type="number"
                              variant="outlined"
                              value={markGradeInfo.max_mark}
                              onChange={this.handleChange('max_mark')}
                              error={markGradeInfoError.max_mark.error}
                              helperText={markGradeInfoError.max_mark.text}
                              onBlur={this.handleBlurChange('max_mark')}
                          /> 
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6}>
                          <TextField
                              id="outlined-with-placeholder"
                              label="Enter Mark Grade*"
                              placeholder="Placeholder"
                              className={classes.textField}
                              margin="normal"
                              variant="outlined"
                              value={markGradeInfo.mark_grade}
                              onChange={this.handleChange('mark_grade')}
                              error={markGradeInfoError.mark_grade.error}
                              helperText={markGradeInfoError.mark_grade.text}
                              onBlur={this.handleBlurChange('mark_grade')}
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

export default withStyles(styles)(AddMarkGrade);