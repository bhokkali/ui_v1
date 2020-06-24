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

  

export class AcademicYearsAdd extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           stateUpdated: false,
            academicYearInfo: {
                academic_year: ''
            },
            academicYearInfoError: {
                academic_year: {
                    error: false,
                    text: ''
                }
            }
        }
    }

    setErrorState = (stname, err, msg) => {
        this.setState({ 
            academicYearInfoError: {
            ...this.state.academicYearInfoError,
            [stname]: {
              error: err,
              text: msg
            }
          }
         })
      }

      static getDerivedStateFromProps(props, state) {
        if(!state.stateUpdated) {
          const { mode, selectedAcademicYearInfo } = props
    
          if(mode === 'Edit' && selectedAcademicYearInfo) {
            return { academicYearInfo: { 
              ...state.academicYearInfo,
              academic_year: selectedAcademicYearInfo.academic_year
            }}
          }
        }
        
        return null
      }

    
      handleBlurChange = (stName) => event => {
        const enteredValue = event.target.value
      
        if(stName === 'academic_year') {
          if(!enteredValue) {
            this.setErrorState('academic_year', true, 'Enter Academic Year')
          }
        }

        
      }
    
      validateUserInfo = () => {
        const academicYearInfo = this.state.academicYearInfo
        if(!academicYearInfo.academic_year) {
          this.setErrorState('academic_year', true, 'Enter Academic Year')
          return false
        }
        
        return true
      }
    
      handleChange = (stName) => (event) => {
        this.setState({ 
          stateUpdated: true,
          academicYearInfo: { 
          ...this.state.academicYearInfo,
          [stName] : event.target.value
        }})
  
      }
    
    
      handleSubmit = event => {
          if(this.validateUserInfo()) {
            const { academicYearInfo } = this.state
         

            const sendData = {
                academic_year: academicYearInfo.academic_year
            }

            if(this.props.mode === 'Edit') {
              sendData.id = this.props.selectedAcademicYearInfo.id
            }

            this.props.createUpdateAcademicYear(sendData)
            this.props.history.push("/km?p=admin_academicYears")
          } 
        }


  

    render () {
        const { classes, mode } = this.props
        const { academicYearInfo, academicYearInfoError } = this.state
        let btnDisableState = false
        Object.keys(academicYearInfoError).map((opt) => {
            if(academicYearInfoError[opt].error) {
            btnDisableState = true
            }
        })
        
        return (
            <div>
                <Paper className={classes.paper}>
                <h2 className={classes.headBlock}>{mode} Academic Year</h2>
                  <Grid container>
                      <Grid item xs={12} sm={12} md={12}>
                          <TextField
                              id="outlined-with-placeholder"
                              label="Enter Academic Year*"
                              placeholder="Placeholder"
                              className={classes.textField}
                              margin="normal"
                              variant="outlined"
                              value={academicYearInfo.academic_year}
                              onChange={this.handleChange('academic_year')}
                              error={academicYearInfoError.academic_year.error}
                              helperText={academicYearInfoError.academic_year.text}
                              onBlur={this.handleBlurChange('academic_year')}
                          /> 
                      </Grid>
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

AcademicYearsAdd.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(AcademicYearsAdd)
