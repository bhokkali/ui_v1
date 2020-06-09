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

  

export class PermissionsAdd extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stateUpdated: false,
            permissionInfo: {
              permission_name: '',
            },
            permissionInfoError: {
              permission_name: {
                  error: false,
                  text: ''
              }
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
      if(!state.stateUpdated) {
        const { mode, selectedPermissionInfo } = props
  
        if(mode === 'Edit' && selectedPermissionInfo) {
          return { permissionInfo: { 
            ...state.permissionInfo,
            permission_name: selectedPermissionInfo.permission_name
          }}
        }
      }
      
      return null
    }

    setErrorState = (stname, err, msg) => {
        this.setState({ 
            permissionInfoError: {
            ...this.state.permissionInfoError,
            [stname]: {
              error: err,
              text: msg
            }
          }
         })
      }
    
      handleBlurChange = (stName) => event => {
        const enteredValue = event.target.value
        const { permissionInfoError } = this.state

          Object.keys(permissionInfoError).map((option) => {
            if(stName === option && !enteredValue) {
              this.setErrorState(option, true, 'Required')
            }
          })
      }
    
      validateUserInfo = () => {
        const { permissionInfo, permissionInfoError } = this.state
        let retactive_status = true
        Object.keys(permissionInfoError).map((obj) => {
          if(!permissionInfo[obj]) {
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
          permissionInfo: { 
          ...this.state.permissionInfo,
          [stName] : event.target.value
        }})
  
      }
    
    
      handleSubmit = event => {
          if(this.validateUserInfo()) {
            const { permissionInfo } = this.state
         

            const sendData = {
              permission_name: permissionInfo.permission_name
            }

            if(this.props.mode === 'Edit') {
              sendData.id = this.props.selectedPermissionInfo.id
            }

            this.props.createUpdatePermission(sendData)
            this.props.history.push("/km?p=admin_permissions")
          } 
        }


  

    render () {
        const { classes, mode } = this.props
        const { permissionInfo, permissionInfoError } = this.state
        let btnDisableState = false
        Object.keys(permissionInfoError).map((opt) => {
            if(permissionInfoError[opt].error) {
            btnDisableState = true
            }
        })
        
        return (
            <div>
                <Paper className={classes.paper}>
                <h2 className={classes.headBlock}>{mode} Permission</h2>
                  <Grid container>
                      <Grid item xs={12} sm={12} md={6}>
                          <TextField
                              id="outlined-with-placeholder"
                              label="Enter Permission Name*"
                              placeholder="Placeholder"
                              className={classes.textField}
                              margin="normal"
                              variant="outlined"
                              value={permissionInfo.permission_name}
                              onChange={this.handleChange('permission_name')}
                              error={permissionInfoError.permission_name.error}
                              helperText={permissionInfoError.permission_name.text}
                              onBlur={this.handleBlurChange('permission_name')}
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

PermissionsAdd.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(PermissionsAdd)
