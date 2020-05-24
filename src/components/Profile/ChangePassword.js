import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import { changePassword } from '../../store/Registration/actionCreator'
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
      btnRow: {
          padding: 5,
          marginTop: 5,
          marginLeft: 20,
      },
 
};


export class ChangePassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        old_pwd: '',
        new_pwd: '',
        confirm_pwd: '',
        opError: false,
        opMsg: '',
        npError: false,
        npMsg: '',
        cpError: false,
        cpMsg: '',
    }
  }
    
    handleChange = (stName) => (event) => {
        this.setState({ 
            [stName] : event.target.value
        })
    }
    
    validateForm = () => {
        if(this.state.old_pwd !== this.props.authInfo.login_pwd) {
          this.setState({opError: true, opMsg: 'Invalid old password'})
          return false
        }
        if(this.state.new_pwd.length < 6) {
            this.setState({npError: true, npMsg: 'New password must be 6 characters length'})
            return false
        } else if(/^[a-zA-Z0-9]*$/.test(this.state.new_pwd) === false) {
          this.setState({npError: true, npMsg: 'Password contains only alphabets and number'})
        } else if(this.state.new_pwd !== this.state.confirm_pwd) {
            this.setState({cpError: true, cpMsg: 'Old password and confirm old password must be same'})
            return false
        }
        return true
    }

    handleUpdate = event => {
        this.setState({
            opError: false,
            opMsg: '',
            npError: false,
            npMsg: '',
            cpError: false,
            cpMsg: ''
        })
        if(this.validateForm()) {
            const sendData = {
                id: this.props.authInfo.id,
                old_pwd: this.state.old_pwd,
                new_pwd: this.state.new_pwd
            }
            this.props.updatePasswordCB(sendData)
        } 
    }

  render() {
    const { classes } = this.props
    return (
      <div id="mainContainer">
        <Paper className={classes.paper}>
        <Grid item xs={12} className={classes.marginLeft20}>
            <Heading
              label="Change Password"
            />
        </Grid>
        <Grid item xs={12} className={classes.marginLeft20}>
          <Grid container>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={12} className={classes.marginLeft20}>
                    <TextField
                        id="outlined-with-placeholder"
                        label="Old Password"
                        className={classes.textField}
                        type="password"
                        margin="normal"
                        variant="outlined"
                        value={this.state.old_pwd}
                        onChange={this.handleChange('old_pwd')}
                        error={this.state.opError}
                        helperText={this.state.opMsg}
                    /> 
                </Grid>
                <Grid item xs={12} className={classes.marginLeft20}>
                    <TextField
                        id="bank_name"
                        label="New Password"
                        className={classes.textField}
                        type="password"
                        margin="normal"
                        variant="outlined"
                        value={this.state.new_pwd}
                        onChange={this.handleChange('new_pwd')}
                        error={this.state.npError}
                        helperText={this.state.npMsg}
                    /> 
                </Grid>
                <Grid item xs={12} className={classes.marginLeft20}>
                    <TextField
                            id="outlined-with-placeholder"
                            label="Confirm New Password"
                            className={classes.textField}
                            type="password"
                            margin="normal"
                            variant="outlined"
                            value={this.state.confirm_pwd}
                            onChange={this.handleChange('confirm_pwd')}
                            error={this.state.cpError}
                            helperText={this.state.cpMsg}
                        /> 
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
                
            </Grid>
          </Grid>
          </Grid>
            
          <Grid item xs={12} className={classes.btnRow}>
            <Button
                variant="contained"
                color="primary"
                onClick={this.handleUpdate}
                className={classes.button}
            >
                Change
            </Button>
          </Grid>
        </Paper>
      </div>)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    // changePassword,
  }, dispatch)

const mapStateToProps = state => ({
    // usersList: state.getIn(['RegistrationContainer', 'usersList']).toJS(),
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChangePassword))
