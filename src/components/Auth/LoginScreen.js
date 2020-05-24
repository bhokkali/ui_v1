import React from 'react'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { getCurrentAcademicYear, isEmpty, getUrlParams } from '../Common/Utility/Utils'

const styles = {
    group: {
      display: 'inline',
    },
    paper: {
        padding: 10,
    },
    formControl: {
        marginBottom: 20,
    },
    selectBox: {
        width: 200,
    }
}

export class LoginScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            login_name: '',
            login_pwd: '',
            academic_year_id: ''
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(props.academicYearMaster.length > 0 && state.academic_year_id === '') {
            let currentAcaYear = getCurrentAcademicYear()
            let academicObj = _.find(props.academicYearMaster, (n) => { return n.academic_year === currentAcaYear })
            if(!isEmpty(academicObj)) {
                return { 
                    academic_year_id: academicObj.id 
                }
            }
        }
        return null
    }

    handleChange = (stName) => event => {
        this.setState({ 
            [stName] : event.target.value
          })
    }


    handleSubmit = () => {
        let sendData = {
            login_name: this.state.login_name,
            login_pwd: this.state.login_pwd,
        }
        const paramResult = getUrlParams(window.location.search)
        const param = !isEmpty(paramResult) ? paramResult.c : ''
        this.props.submitLoginCB(sendData, this.state.academic_year_id, param)
    }


    render () {
        const { classes, changeModeCB , academicYearMaster} = this.props
        console.log('this.state >>> list >>> ')
        console.log(this.state)
        return (
            <Paper className={classes.paper}>
            <Grid container>
                <Grid item xs={12}>
                    <h2> School Login</h2>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="outlined-with-placeholder"
                        label="Enter User Name"
                        placeholder="Placeholder"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        value={this.state.login_name}
                        onChange={this.handleChange('login_name')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="outlined-with-placeholder"
                        label="Enter Password*"
                        type='password'
                        placeholder="Placeholder"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        value={this.state.login_pwd}
                        onChange={this.handleChange('login_pwd')}
                    />
                </Grid>
                <Grid item  xs={12} sm={12} md={12}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-simple">Select Academic Year*</InputLabel>
                        <Select
                            value={this.state.academic_year_id}
                            onChange={this.handleChange('academic_year_id')}
                            className={classes.selectBox}
                        >
                        {academicYearMaster.map((opt, key) => {
                            return (<MenuItem value={opt.id} key={key}>{opt.academic_year}</MenuItem>)
                        })}
                        </Select>
                    </FormControl> 
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleSubmit}
                        className={classes.button}
                    >
                        Submit
                </Button>
                {/*<span className={classes.navLink} onClick={changeModeCB('Forgot')}>Forgot Password</span>*/}
                </Grid>
            </Grid>
            </Paper>
        )
    }
}

LoginScreen.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(LoginScreen)
