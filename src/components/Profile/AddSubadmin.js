import React from 'react'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Heading from '../Common/Heading'
import AutoSuggest from '../Common/AutoSuggest/AutoSuggest'

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
    codeStyle: {
      display: 'inline',
      position: 'absolute'
    }
  };

export class AddSubadmin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stateUpdated: false,
            subadminInfo: {
                school_id: '',
                login_name: '',
                login_pwd: '',
                permissions: []
            },
            subadminInfoError: {
                login_name: {
                    error: false,
                    text: ''
                },
                login_pwd: {
                  error: false,
                  text: ''
                },
                permissions: {
                  error: false,
                  text: ''
                }
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(!state.stateUpdated) {
          const { mode, authInfo, selectedSubadminInfo } = props
          if(mode === 'Add' && authInfo) {
              return { subadminInfo: { 
                  ...state.subadminInfo,
                  school_id : authInfo.id
                }
              }
          }

          if(mode === 'Edit' && selectedSubadminInfo) {

            let permissionsArr = []
            selectedSubadminInfo.permissions_daos.map((opt) => {
              permissionsArr.push(opt.id)
            })

            return { subadminInfo: { 
              ...state.subadminInfo,
              login_name: selectedSubadminInfo.login_name.split("-")[1],
              login_pwd: selectedSubadminInfo.login_pwd,
              school_id: selectedSubadminInfo.school_id,
              permissions: permissionsArr
            }
            }
          }
        }
        return null
    }

    setErrorState = (stname, err, msg) => {
        this.setState({ 
            subadminInfoError: {
            ...this.state.subadminInfoError,
            [stname]: {
              error: err,
              text: msg
            }
          }
         })
      }
    
      handleBlurChange = (stName) => event => {
        const enteredValue = event.target.value
      
        if(stName === 'login_name') {
          if(!enteredValue) {
            this.setErrorState('login_name', true, 'Login Name required')
          }
        }

        if(stName === 'login_pwd') {
          if(!enteredValue) {
            this.setErrorState('login_pwd', true, 'Login Password required')
          }
        }
        

        
      }
    
      validateUserInfo = () => {
        const subadminInfo = this.state.subadminInfo
        if(!subadminInfo.login_name) {
          this.setErrorState('login_name', true, 'Period Name required')
          return false
        }

        if(!subadminInfo.login_pwd) {
          this.setErrorState('login_pwd', true, 'Login Password required')
          return false
        } 
        
  
        
        return true
      }
    
      handleChange = (stName) => (event) => {
        this.setErrorState(stName, false, '')
        this.setState({ 
          stateUpdated: true,
          subadminInfo: { 
          ...this.state.subadminInfo,
          [stName] : event.target.value
        }})
  
      }

    

      
      
    
      handleSubmit = event => {
          if(this.validateUserInfo()) {
            const { authInfo } = this.props
            const { subadminInfo } = this.state
            const sendData = {
              login_name: authInfo.school_code+"-"+subadminInfo.login_name,
              login_pwd: subadminInfo.login_pwd,
              school_id: subadminInfo.school_id,
              permissions: subadminInfo.permissions
            }
            if(this.props.mode === 'Edit') {
              sendData.id = this.props.selectedSubadminInfo.id
            }
            this.props.createUpdateSubadminCB(sendData)
            this.props.history.push("/km?p=profile")
          } 
        }

        selectedPermissions = (newValue) => {
          
          console.log(newValue)
          const value = [];
          newValue.map((opt) => {
            value.push(opt.id);
          }) 
        

          this.setErrorState("permissions", false, '')
          this.setState({ 
            stateUpdated: true,
            subadminInfo: { 
            ...this.state.subadminInfo,
            "permissions" : value
          }})
        }


    render() {
        const { classes, mode, adminPermissionsList, authInfo } = this.props
        const { subadminInfo, subadminInfoError } = this.state
        let btnDisableState = false
        Object.keys(subadminInfoError).map((opt) => {
            if(subadminInfoError[opt].error) {
            btnDisableState = true
            }
        })

        let defaultValueArr = []
        adminPermissionsList.map((opt) => {
          if(subadminInfo.permissions.indexOf(opt.id) !== -1) {
            defaultValueArr.push(opt)
          }
        })

        let displayHeadText = mode+" Subadmin"
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
                            <div className={classes.codeStyle}>{authInfo.school_code}-</div>
                            <TextField
                                id="outlined-with-placeholder"
                                label="Enter Login Name*"
                                placeholder="Placeholder"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={subadminInfo.login_name}
                                onChange={this.handleChange('login_name')}
                                error={subadminInfoError.login_name.error}
                                helperText={subadminInfoError.login_name.text}
                                onBlur={this.handleBlurChange('login_name')}
                            />
                        </Grid>
                        <Grid item  xs={12} sm={12} md={6}>
                          <TextField
                                id="outlined-with-placeholder"
                                label="Enter Login Password*"
                                placeholder="Placeholder"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={subadminInfo.login_pwd}
                                onChange={this.handleChange('login_pwd')}
                                error={subadminInfoError.login_pwd.error}
                                helperText={subadminInfoError.login_pwd.text}
                                onBlur={this.handleBlurChange('login_pwd')}
                            />
                        </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item xs={12} sm={12} md={6}>
                          <AutoSuggest 
                            options = {adminPermissionsList}
                            selected = {defaultValueArr}
                            label="Select Permissions"
                            optionLabel = "permission_name"
                            optionValue = "id"
                            onChangeCB = {this.selectedPermissions}
                            disabled={false}
                          />
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

export default withStyles(styles)(AddSubadmin);