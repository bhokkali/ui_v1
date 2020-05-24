import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import * as Constants from '../../Common/Utility/Constants'

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
};

  

export class GradesAdd extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stateUpdated: false,
            gradeInfo: {
              grade_name: '',
              priority: ''
            },
            gradeInfoError: {
              grade_name: {
                  error: false,
                  text: ''
              },
              priority: {
                error: false,
                text: ''
            }
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
      if(!state.stateUpdated) {
        const { mode, selectedGradeInfo } = props
  
        if(mode === 'Edit' && selectedGradeInfo) {
          return { gradeInfo: { 
            ...state.gradeInfo,
            grade_name: selectedGradeInfo.grade_name,
            priority: selectedGradeInfo.priority
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
        const { gradeInfoError } = this.state

          Object.keys(gradeInfoError).map((option) => {
            if(stName === option && !enteredValue) {
              this.setErrorState(option, true, 'Required')
            }
          })
      }
    
      validateUserInfo = () => {
        const { gradeInfo, gradeInfoError } = this.state
        let retactive_status = true
        Object.keys(gradeInfoError).map((obj) => {
          if(!gradeInfo[obj]) {
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
          gradeInfo: { 
          ...this.state.gradeInfo,
          [stName] : event.target.value
        }})
  
      }
    
    
      handleSubmit = event => {
          if(this.validateUserInfo()) {
            const { gradeInfo } = this.state
         

            const sendData = {
              grade_name: gradeInfo.grade_name,
              priority: parseInt(gradeInfo.priority)
            }

            if(this.props.mode === 'Edit') {
              sendData.id = this.props.selectedGradeInfo.id
            }

            this.props.createUpdateGrade(sendData)
            this.props.history.push("/km?p=admin_grades")
          } 
        }


  

    render () {
        const { classes, mode } = this.props
        const { gradeInfo, gradeInfoError } = this.state
        let btnDisableState = false
        Object.keys(gradeInfoError).map((opt) => {
            if(gradeInfoError[opt].error) {
            btnDisableState = true
            }
        })
        
        return (
            <div>
                <Paper className={classes.paper}>
                <h2 className={classes.headBlock}>{mode} Grade</h2>
                  <Grid container>
                      <Grid item xs={12} sm={12} md={6}>
                          <TextField
                              id="outlined-with-placeholder"
                              label="Enter Grade Name*"
                              placeholder="Placeholder"
                              className={classes.textField}
                              margin="normal"
                              variant="outlined"
                              value={gradeInfo.grade_name}
                              onChange={this.handleChange('grade_name')}
                              error={gradeInfoError.grade_name.error}
                              helperText={gradeInfoError.grade_name.text}
                              onBlur={this.handleBlurChange('grade_name')}
                          /> 
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                       <FormControl className={classes.formControl}>
                            <InputLabel shrink htmlFor="select-multiple-native">
                              Select Priority
                            </InputLabel>
                            <Select
                              native
                              value={gradeInfo.priority}
                              onChange={this.handleChange('priority')}
                              inputProps={{
                                id: 'select-multiple-native',
                              }}
                            >
                              <option value="">Select Priority</option>
                              {Constants.priorityList.map((opt,key) => (
                                <option key={key} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </Select>
                          </FormControl>
                          <FormHelperText className={classes.checkIconFail}>{gradeInfoError.priority.text}</FormHelperText>
                      </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12}>
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
                  </Grid>
                </Paper>
            </div>
        )
    }
}

GradesAdd.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(GradesAdd)
