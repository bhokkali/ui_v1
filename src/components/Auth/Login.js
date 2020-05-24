import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import LoginScreen from './LoginScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';

const styles = {
    textField: {
        width:350,
      },
      btnRow: {
        textAlign: 'center',
        padding: 5,
        marginTop: 5,
      },
      loginWidth: {
          width: '100%',
      },
      navLink: {
          fontSize: 12,
          textDecoration: 'underline',
          cursor: 'pointer',
          paddingLeft: 20,
      }
  };

export class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageMode: 'Login'
        }
    }

    changeMode = (pageMode) => event => {
        this.setState({ pageMode })
    }

    render () {
        const { classes, academicYearMaster } = this.props
        const { pageMode } = this.state
        return (
            <div className={classes.loginWidth}>
                {(pageMode === 'Login') && 
                    <LoginScreen 
                        classes = {classes}
                        changeModeCB = {this.changeMode}
                        submitLoginCB = {this.props.submitLoginCB}
                        academicYearMaster={academicYearMaster}
                    />
                }
                {(pageMode === 'Forgot') && 
                    <ForgotPasswordScreen 
                        classes = {classes}
                        changeModeCB = {this.changeMode}
                        submitForgotPasswordCB = {this.props.submitForgotPasswordCB}
                    />
                }
            </div>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Login)
