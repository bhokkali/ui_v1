import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

  

export class SubjectsAdd extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stateUpdated: false,
            subjectInfo: {
              subject_name: '',
              subject_code: ''
            },
            subjectInfoError: {
              subject_name: {
                  error: false,
                  text: ''
              },
              subject_code: {
                error: false,
                text: ''
            }
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
      if(!state.stateUpdated) {
        const { mode, selectedSubjectInfo } = props
  
        if(mode === 'Edit' && selectedSubjectInfo) {
          return { subjectInfo: { 
            ...state.subjectInfo,
            subject_name: selectedSubjectInfo.subject_name,
            subject_code: selectedSubjectInfo.subject_code
          }}
        }
      }
      
      return null
    }

    setErrorState = (stname, err, msg) => {
        this.setState({ 
            subjectInfoError: {
            ...this.state.subjectInfoError,
            [stname]: {
              error: err,
              text: msg
            }
          }
         })
      }
    
      handleBlurChange = (stName) => event => {
        const enteredValue = event.target.value
        const { subjectInfoError } = this.state

          Object.keys(subjectInfoError).map((option) => {
            if(stName === option && !enteredValue) {
              this.setErrorState(option, true, 'Required')
            }
          })
      }
    
      validateUserInfo = () => {
        const { subjectInfo, subjectInfoError } = this.state
        let retactive_status = true
        Object.keys(subjectInfoError).map((obj) => {
          if(!subjectInfo[obj]) {
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
          subjectInfo: { 
          ...this.state.subjectInfo,
          [stName] : event.target.value
        }})
  
      }
    
    
      handleSubmit = event => {
          if(this.validateUserInfo()) {
            const { subjectInfo } = this.state
         

            const sendData = {
              subject_name: subjectInfo.subject_name,
              subject_code: parseInt(subjectInfo.subject_code)
            }

            if(this.props.mode === 'Edit') {
              sendData.id = this.props.selectedSubjectInfo.id
            }

            this.props.createUpdateSubject(sendData)
            this.props.history.push("/km?p=admin_subjects")
          } 
        }


  

    render () {
        const { classes, mode } = this.props
        const { subjectInfo, subjectInfoError } = this.state
        let btnDisableState = false
        Object.keys(subjectInfoError).map((opt) => {
            if(subjectInfoError[opt].error) {
            btnDisableState = true
            }
        })
        
        return (
            <div>
                <Paper className={classes.paper}>
                <h2 className={classes.headBlock}>{mode} Subject</h2>
                  <Grid container>
                      <Grid item xs={12} sm={12} md={6}>
                          <TextField
                              id="outlined-with-placeholder"
                              label="Enter Subject Name*"
                              placeholder="Placeholder"
                              className={classes.textField}
                              margin="normal"
                              variant="outlined"
                              value={subjectInfo.subject_name}
                              onChange={this.handleChange('subject_name')}
                              error={subjectInfoError.subject_name.error}
                              helperText={subjectInfoError.subject_name.text}
                              onBlur={this.handleBlurChange('subject_name')}
                          /> 
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <TextField
                              id="outlined-with-placeholder"
                              label="Enter Subject Code*"
                              placeholder="Placeholder"
                              className={classes.textField}
                              margin="normal"
                              variant="outlined"
                              value={subjectInfo.subject_code}
                              onChange={this.handleChange('subject_code')}
                              error={subjectInfoError.subject_code.error}
                              helperText={subjectInfoError.subject_code.text}
                              onBlur={this.handleBlurChange('subject_code')}
                          /> 
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

SubjectsAdd.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(SubjectsAdd)
