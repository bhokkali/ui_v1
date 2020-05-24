import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Heading from '../Common/Heading'

const styles = {
    root: {
      display: 'flex',
      height: 300,
    },
    paper: {
      margin: '10px 0px',
      padding: '10px',
    },
    marginLeft20: {
      marginLeft: 20,
    },
    textField: {
      width:300,
    },
    textField1: {
        width:300,
        borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
    },
    btnRow: {
        textAlign: 'center',
        padding: 5,
    },
    group: {
      display: 'inline',
    },
    checkIconFail: {
      color: 'red',
    },
  };
  
  
  export class UpdateProfile extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        availableStatus: {},
        userInfo: {
          id: '',
          school_name: '',
          school_code: '',
          address: '',
          contact_number: '',
          email: '',
          syllabus: '',
          pan_number: '',
          status: '',
          login_name: ''
        },
        userInfoError: {
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
          pan_number: {
            error: false,
            text: ''
          },
          status: {
            error: false,
            text: ''
          },
          login_name: {
            error: false,
            text: ''
          }
        }
      }
    }

    componentDidMount(){
      if(this.props.authInfo) {
        this.setState({
            userInfo: {
              ...this.state.userInfo,
              id: this.props.authInfo.id,
              school_name: this.props.authInfo.school_name,
              school_code: this.props.authInfo.school_code,
              address: this.props.authInfo.address,
              contact_number: this.props.authInfo.contact_number,
              email: this.props.authInfo.email,
              syllabus: this.props.authInfo.syllabus,
              pan_number: this.props.authInfo.pan_number,
              status: this.props.authInfo.active_status,
              login_name: this.props.authInfo.login_name
            }
            
        })
      }
    }


  
    setErrorState = (stname, err, msg) => {
      this.setState({ 
        userInfoError: {
          ...this.state.userInfoError,
          [stname]: {
            error: err,
            text: msg
          }
        }
       })
    }
  
    handleBlurChange = (stName) => event => {
      const enteredValue = event.target.value
    
      if(stName === 'school_name') {
        if(!enteredValue) {
          this.setErrorState('school_name', true, 'School Name required')
        }
      }

      if(stName === 'school_code') {
        if(!enteredValue) {
          this.setErrorState('school_code', true, 'School Code required')
        }
      }
      
    }
  
    validateUserInfo = () => {
      const userInfo = this.state.userInfo
      if(!userInfo.school_name) {
        this.setErrorState('school_name', true, 'School Name required')
        return false
      }

      if(!userInfo.school_code) {
        this.setErrorState('school_code', true, 'School Code required')
        return false
      }
    
  
      return true
    }
  
    handleChange = (stName) => (event) => {
      this.setErrorState(stName, false, '')
      this.setState({ userInfo: { 
        ...this.state.userInfo,
        [stName] : event.target.value
      }})

    }
  
  
      handleUpdate = event => {
        if(this.validateUserInfo()) {
          const sendData = this.state.userInfo
          //this.props.updateUserInfoCB(sendData)
        } 
      }
  
    render() {
      const { classes } = this.props
      const { userInfo, userInfoError } = this.state
      let btnDisableState = false
      Object.keys(userInfoError).map((opt) => {
        if(this.state.userInfoError[opt].error) {
          btnDisableState = true
        }
      })

      const formDisableState = true
      return (
        <div id="mainContainer">
          <Paper className={classes.paper}>
          <Grid item xs={12} className={classes.marginLeft20}>
            <Heading
              label="School Profile"
            />
          </Grid>
          <Grid item xs={12} className={classes.marginLeft20}>
              <Grid container>
                  <Grid item xs={12} sm={6} md={6}>
                      <TextField
                          id="outlined-with-placeholder"
                          label="School Name"
                          placeholder="Placeholder"
                          className={classes.textField}
                          margin="normal"
                          variant="outlined"
                          value={userInfo.school_name}
                          onChange={this.handleChange('school_name')}
                          error={userInfoError.school_name.error}
                          helperText={userInfoError.school_name.text}
                          onBlur={this.handleBlurChange('school_name')}
                          disabled={formDisableState}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        id="outlined-with-placeholder"
                        label="School Code"
                        placeholder="Placeholder"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        inputProps={{
                        maxLength: 6,
                        }}
                        value={userInfo.school_code}
                        onChange={this.handleChange('school_code')}
                        error={userInfoError.school_code.error}
                        helperText={userInfoError.school_code.text}
                        onBlur={this.handleBlurChange('school_code')}
                        disabled={formDisableState}
                    /> 
                  </Grid>
              </Grid>
              <Grid container>
                  <Grid item xs={12} sm={6} md={6}>
                      <TextField
                          id="outlined-with-placeholder"
                          label="School Address"
                          placeholder="Placeholder"
                          className={classes.textField}
                          margin="normal"
                          variant="outlined"
                          value={userInfo.address}
                          onChange={this.handleChange('address')}
                          error={userInfoError.address.error}
                          helperText={userInfoError.address.text}
                          onBlur={this.handleBlurChange('address')}
                          disabled={formDisableState}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        id="outlined-with-placeholder"
                        label="Contact Number*"
                        placeholder="Placeholder"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        inputProps={{
                        maxLength: 6,
                        }}
                        value={userInfo.contact_number}
                        onChange={this.handleChange('contact_number')}
                        error={userInfoError.contact_number.error}
                        helperText={userInfoError.contact_number.text}
                        onBlur={this.handleBlurChange('contact_number')}
                        disabled={formDisableState}
                    /> 
                  </Grid>
              </Grid>
              <Grid container>
                  <Grid item xs={12} sm={6} md={6}>
                      <TextField
                          id="outlined-with-placeholder"
                          label="Email"
                          placeholder="Placeholder"
                          className={classes.textField}
                          margin="normal"
                          variant="outlined"
                          value={userInfo.email}
                          onChange={this.handleChange('email')}
                          error={userInfoError.email.error}
                          helperText={userInfoError.email.text}
                          onBlur={this.handleBlurChange('email')}
                          disabled={formDisableState}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        id="outlined-with-placeholder"
                        label="Syllabus"
                        placeholder="Placeholder"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        inputProps={{
                        maxLength: 6,
                        }}
                        value={userInfo.syllabus}
                        onChange={this.handleChange('syllabus')}
                        error={userInfoError.syllabus.error}
                        helperText={userInfoError.syllabus.text}
                        onBlur={this.handleBlurChange('syllabus')}
                        disabled={formDisableState}
                    /> 
                  </Grid>
              </Grid>
              <Grid container>
                  <Grid item xs={12} sm={6} md={6}>
                      <TextField
                          id="outlined-with-placeholder"
                          label="PAN Number"
                          placeholder="Placeholder"
                          className={classes.textField}
                          margin="normal"
                          variant="outlined"
                          value={userInfo.pan_number}
                          onChange={this.handleChange('pan_number')}
                          error={userInfoError.pan_number.error}
                          helperText={userInfoError.pan_number.text}
                          onBlur={this.handleBlurChange('pan_number')}
                          disabled={formDisableState}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        id="outlined-with-placeholder"
                        label="Active Status"
                        placeholder="Placeholder"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        inputProps={{
                        maxLength: 6,
                        }}
                        value={userInfo.status}
                        onChange={this.handleChange('status')}
                        error={userInfoError.status.error}
                        helperText={userInfoError.status.text}
                        onBlur={this.handleBlurChange('status')}
                        disabled={formDisableState}
                    /> 
                  </Grid>
              </Grid>
              <Grid container>
                  <Grid item xs={12} sm={6} md={6}>
                      <TextField
                          id="outlined-with-placeholder"
                          label="Login Name"
                          placeholder="Placeholder"
                          className={classes.textField}
                          margin="normal"
                          variant="outlined"
                          value={userInfo.login_name}
                          onChange={this.handleChange('login_name')}
                          error={userInfoError.login_name.error}
                          helperText={userInfoError.login_name.text}
                          onBlur={this.handleBlurChange('login_name')}
                          disabled={formDisableState}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>

                  </Grid>
              </Grid>
          </Grid>
  
            {/*<Grid item xs={12} className={classes.btnRow}>
              <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleUpdate}
                  className={classes.button}
                  disabled={btnDisableState}
              >
                  Update
              </Button>
            </Grid>*/}
          </Paper>
        </div>)
    }
  }
  
  export default withStyles(styles)(UpdateProfile)