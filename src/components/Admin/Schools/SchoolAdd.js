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
import { ValidateEmail } from '../../Common/Utility/Utils'
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

  

export class SchoolAdd extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stateUpdated: false,
            schoolInfo: {
              school_name: '',
              school_code: '',
              address: '',
              contact_number: '',
              email: '',
              syllabus: '',
              pan_number: '',
              active_status: '',
              login_name: '',
              login_pwd: ''
            },
            schoolInfoError: {
              school_name: {
                  error: false,
                  text: ''
              },
              school_code: {
                  error: false,
                  text: ''
              },
              address: {
                error: false,
                text: ''
              },
              contact_number: {
                error: false,
                text: ''
              },
              email: {
                error: false,
                text: ''
              },
              syllabus: {
                error: false,
                text: ''
              },
              active_status: {
                error: false,
                text: ''
              },
              login_name: {
                error: false,
                text: ''
              },
              login_pwd: {
                error: false,
                text: ''
              },
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
      if(!state.stateUpdated) {
        const { mode, selectedSchoolInfo } = props
  
        if(mode === 'Edit' && selectedSchoolInfo) {
          return { schoolInfo: { 
            ...state.schoolInfo,
            school_name: selectedSchoolInfo.school_name,
            school_code: selectedSchoolInfo.school_code,
            address: selectedSchoolInfo.address,
            contact_number: selectedSchoolInfo.contact_number,
            email: selectedSchoolInfo.email,
            syllabus: selectedSchoolInfo.syllabus,
            pan_number: selectedSchoolInfo.pan_number,
            active_status: selectedSchoolInfo.active_status,
            login_name: selectedSchoolInfo.login_name,
            login_pwd: selectedSchoolInfo.login_pwd,
          }}
        }
      }
      
      return null
    }


    setErrorState = (stname, err, msg) => {
        this.setState({ 
            schoolInfoError: {
            ...this.state.schoolInfoError,
            [stname]: {
              error: err,
              text: msg
            }
          }
         })
      }
    
      handleBlurChange = (stName) => event => {
        const enteredValue = event.target.value
        const { schoolInfoError } = this.state
        
        Object.keys(schoolInfoError).map((option) => {
            if(stName === option && !enteredValue) {
              this.setErrorState(option, true, 'Required')
            }
            if(enteredValue && stName === "email" && !ValidateEmail(enteredValue)) {
              this.setErrorState(stName, true, 'Invalid Email')
            }
        })
        
      }
    
      validateUserInfo = () => {
        const { schoolInfo, schoolInfoError } = this.state
        let retactive_status = true
        Object.keys(schoolInfoError).map((obj) => {
          if(!schoolInfo[obj]) {
            this.setErrorState(obj, true, 'Required')
            retactive_status = false
          }
          if(schoolInfo[obj] && obj === "email" && !ValidateEmail(schoolInfo[obj])) {
            this.setErrorState(obj, true, 'Invalid Email')
          }
        })
        
        return retactive_status
      }
    
      handleChange = (stName) => (event) => {
        this.setErrorState(stName, false, '')
        this.setState({ 
          stateUpdated: true,
          schoolInfo: { 
          ...this.state.schoolInfo,
          [stName] : event.target.value
        }})
  
      }
    
    
      handleSubmit = event => {
          if(this.validateUserInfo()) {
            const { schoolInfo } = this.state
         

            const sendData = schoolInfo

            if(this.props.mode === 'Edit') {
              sendData.id = this.props.selectedSchoolInfo.id
            }

            this.props.createUpdateSchool(sendData)
            this.props.history.push("/km?p=admin_schools")
          } 
        }


  

    render () {
        const { classes, mode } = this.props
        const { schoolInfo, schoolInfoError } = this.state
        let btnDisableState = false
        Object.keys(schoolInfoError).map((opt) => {
            if(schoolInfoError[opt].error) {
            btnDisableState = true
            }
        })
        
        return (
            <div>
                <Paper className={classes.paper}>
                <h2 className={classes.headBlock}>{mode} School</h2>
                  <Grid container>
                      <Grid item xs={12} sm={12} md={6}>
                          <TextField
                              id="outlined-with-placeholder"
                              label="Enter School Name*"
                              placeholder="Placeholder"
                              className={classes.textField}
                              margin="normal"
                              variant="outlined"
                              value={schoolInfo.school_name}
                              onChange={this.handleChange('school_name')}
                              error={schoolInfoError.school_name.error}
                              helperText={schoolInfoError.school_name.text}
                              onBlur={this.handleBlurChange('school_name')}
                          /> 
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <TextField
                              id="outlined-with-placeholder"
                              label="Enter School Code*"
                              placeholder="Placeholder"
                              className={classes.textField}
                              margin="normal"
                              variant="outlined"
                              value={schoolInfo.school_code}
                              onChange={this.handleChange('school_code')}
                              error={schoolInfoError.school_code.error}
                              helperText={schoolInfoError.school_code.text}
                              onBlur={this.handleBlurChange('school_code')}
                          /> 
                      </Grid>
                  </Grid>
                  <Grid container>
                      <Grid item xs={12} sm={12} md={6}>
                         <TextField
                              id="outlined-with-placeholder"
                              label="Enter Address*"
                              placeholder="Placeholder"
                              className={classes.textField}
                              margin="normal"
                              variant="outlined"
                              value={schoolInfo.address}
                              onChange={this.handleChange('address')}
                              error={schoolInfoError.address.error}
                              helperText={schoolInfoError.address.text}
                              onBlur={this.handleBlurChange('address')}
                          /> 
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <TextField
                              id="outlined-with-placeholder"
                              label="Enter Contact Number*"
                              placeholder="Placeholder"
                              className={classes.textField}
                              margin="normal"
                              variant="outlined"
                              value={schoolInfo.contact_number}
                              onChange={this.handleChange('contact_number')}
                              error={schoolInfoError.contact_number.error}
                              helperText={schoolInfoError.contact_number.text}
                              onBlur={this.handleBlurChange('contact_number')}
                          /> 
                      </Grid> 
                  </Grid>
                  <Grid container>
                      <Grid item xs={12} sm={12} md={6}>
                        <TextField
                              id="outlined-with-placeholder"
                              label="Enter Email*"
                              placeholder="Placeholder"
                              className={classes.textField}
                              margin="normal"
                              variant="outlined"
                              value={schoolInfo.email}
                              onChange={this.handleChange('email')}
                              error={schoolInfoError.email.error}
                              helperText={schoolInfoError.email.text}
                              onBlur={this.handleBlurChange('email')}
                          /> 
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                      <TextField
                              id="outlined-with-placeholder"
                              label="Enter Syllabus*"
                              placeholder="Placeholder"
                              className={classes.textField}
                              margin="normal"
                              variant="outlined"
                              value={schoolInfo.syllabus}
                              onChange={this.handleChange('syllabus')}
                              error={schoolInfoError.syllabus.error}
                              helperText={schoolInfoError.syllabus.text}
                              onBlur={this.handleBlurChange('syllabus')}
                          /> 
                      </Grid> 
                  </Grid>
                  <Grid container>
                      <Grid item xs={12} sm={12} md={6}>
                      <TextField
                              id="outlined-with-placeholder"
                              label="Enter Pan Number"
                              placeholder="Placeholder"
                              className={classes.textField}
                              margin="normal"
                              variant="outlined"
                              value={schoolInfo.pan_number}
                              onChange={this.handleChange('pan_number')}
                          /> 
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink htmlFor="select-multiple-native">
                              Select Status
                            </InputLabel>
                            <Select
                              native
                              value={schoolInfo.active_status}
                              onChange={this.handleChange('active_status')}
                              inputProps={{
                                id: 'select-multiple-native',
                              }}
                            >
                              <option value="">Select Status</option>
                              {Constants.listStatusOptions.map((opt,key) => (
                                <option key={key} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </Select>
                          </FormControl>
                          <FormHelperText className={classes.checkIconFail}>{schoolInfoError.active_status.text}</FormHelperText>
                      </Grid> 
                  </Grid>
                  <Grid container>
                      <Grid item xs={12} sm={12} md={6}>
                      <TextField
                              id="outlined-with-placeholder"
                              label="Enter Login Name*"
                              placeholder="Placeholder"
                              className={classes.textField}
                              margin="normal"
                              variant="outlined"
                              value={schoolInfo.login_name}
                              onChange={this.handleChange('login_name')}
                              error={schoolInfoError.login_name.error}
                              helperText={schoolInfoError.login_name.text}
                              onBlur={this.handleBlurChange('login_name')}
                          /> 
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                      <TextField
                              id="outlined-with-placeholder"
                              label="Enter Login Password*"
                              placeholder="Placeholder"
                              className={classes.textField}
                              margin="normal"
                              variant="outlined"
                              value={schoolInfo.login_pwd}
                              onChange={this.handleChange('login_pwd')}
                              error={schoolInfoError.login_pwd.error}
                              helperText={schoolInfoError.login_pwd.text}
                              onBlur={this.handleBlurChange('login_pwd')}
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

SchoolAdd.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(SchoolAdd)
