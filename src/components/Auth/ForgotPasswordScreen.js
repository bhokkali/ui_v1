import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { ValidateEmail } from '../Common/Utility/Utils'

const styles = {
    group: {
      display: 'inline',
    }
}

export class ForgotPasswordScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            send_to: 'mobile',
            email: '',
            mobile_no: '',
            email_error: false,
            email_error_text: '',
            mobile_error: false,
            mobile_error_text: ''
        }
    }


    handleChangeForgot = (stName) => event => {
        this.setState({ 
            [stName] : event.target.value
          })
    }

    setErrorState = (stname, err, msg) => {
        this.setState({ 
              error: err,
              errorText: msg
         })
      }

    validateInfo = () => {
        if(this.state.send_to === 'email') {
            if(!this.state.email) {
                //this.setErrorState('email', true, 'Email required')
                this.setState({ 
                    email_error: true,
                    email_error_text: 'Email required'
               })
                return false
              } else if(!ValidateEmail(this.state.email)) {
                //this.setErrorState('email', true, 'Invalid Email')
                this.setState({ 
                    email_error: true,
                    email_error_text: 'Invalid Email'
               })
                return false
              }
        }

        if(this.state.send_to === 'mobile') {
            if(!this.state.mobile_no) {
                //this.setErrorState('email', true, 'Email required')
                this.setState({ 
                    mobile_error: true,
                    mobile_error_text: 'Mobile Number required'
               })
                return false
              } else if(/^[0-9]*$/.test(this.state.mobile_no) === false) {
                this.setState({ 
                    mobile_error: true,
                    mobile_error_text: 'Invalid Mobile Number'
               })
               return false
              } else if(this.state.mobile_no.length !== 10) {
                this.setState({ 
                    mobile_error: true,
                    mobile_error_text: 'Mobile Number should be 10 characters long'
               })
               return false
              } 
        }
        
          return true
    }


    handleForgotSubmit = () => {
        this.setState({ 
            email_error: true,
            email_error_text: '',
            mobile_error: true,
            mobile_error_text: ''
       })
        if(this.validateInfo()) {
            let sendData = {}
            if(this.state.send_to === "mobile") {
                sendData = {
                    role_id: 1,
                    mobile_no: this.state.mobile_no
                }
            } else if(this.state.send_to === "email") {
                sendData = {
                    role_id: 1,
                    email: this.state.email
                }
            }
            
            this.props.submitForgotPasswordCB(sendData, this.state.send_to)
        }
    }


    render () {
        const { classes, changeModeCB } = this.props
        return (
            <Grid container>
                <Grid item xs={12}>
                    <h2> Forgot Password </h2>
                </Grid>
                <Grid item xs={12}>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Send To*</FormLabel>
                        <RadioGroup
                        aria-label="Gender"
                        name="gender"
                        className={classes.group}
                        value={this.state.send_to}
                        onChange={this.handleChangeForgot('send_to')}
                        >
                        <FormControlLabel value="mobile" control={<Radio />} label="Mobile" />
                        <FormControlLabel value="email" control={<Radio />} label="Email" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                {this.state.send_to === "email" ? (
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-with-placeholder"
                            label="Enter email"
                            placeholder="Placeholder"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            value={this.state.email}
                            error={this.state.email_error}
                            helperText={this.state.email_error_text}
                            onChange={this.handleChangeForgot('email')}
                        />
                    </Grid>
                ) : (
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-with-placeholder"
                            label="Enter Mobile Number*"
                            placeholder="Placeholder"
                            type='number'
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            value={this.state.mobile_no}
                            inputProps={{
                            maxLength: 10,
                            }}
                            onChange={this.handleChangeForgot('mobile_no')}
                            error={this.state.mobile_error}
                            helperText={this.state.mobile_error_text}
                        />
                    </Grid>
                )
            }
                
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleForgotSubmit}
                        className={classes.button}
                    >
                        Submit
                </Button>
                <span className={classes.navLink} onClick={changeModeCB('Login')}>Login</span>
                </Grid>
            </Grid>
        )
    }
}

ForgotPasswordScreen.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ForgotPasswordScreen)