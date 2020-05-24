import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import DashboardBlock from './DashboardBlock'
import AccountCircle from '@material-ui/icons/AccountCircle'
import GroupWork from '@material-ui/icons/GroupWork'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import Redeem from '@material-ui/icons/Redeem'
import LocalAtm from '@material-ui/icons/LocalAtm'
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle'
import Loyalty from '@material-ui/icons/Loyalty'
import CardTravel from '@material-ui/icons/CardTravel'
import DeveloperBoard from '@material-ui/icons/DeveloperBoard'
import DirectionsRun from '@material-ui/icons/DirectionsRun'
import Heading from '../Common/Heading'

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      },
      paper: {
        margin: '10px 10px',
        padding: '10px',
      },
      margin10: {
        margin: 10,
      },
      selectBox: {
        width: 150,
      },
      refLink: {
          textDecoration: 'underline',
      },
      iconStyle: {
        fontSize: 42,
        transform: 'rotate(90deg)'
      },
      iconFont: {
        fontSize: 40
      },
      textLink: {
        cursor: 'pointer',
        fontSize: 15,
        color: '#1976d2',
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
        },
      },
      infoRow: {
        background: '#26598526',
        height: 30,
        padding: 5,
        borderTop: '1px solid #fff'
      }
  };

export class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            position: 'D'
        }
    }


    handleChange = (stName) => event => {
        this.setState({ [stName]: event.target.value })
    }

    gotoRegister = (refUrl) => {
		//this.props.history.push(refUrl)
	}

    render () {
        const { classes, authInfo, location } = this.props
        console.log('authInfo <><>')
        console.log(authInfo)
        return (
            <div>
                <Grid container>
                    {authInfo && 
                    <React.Fragment>
                    <Grid item xs={12} sm={4} md={4} className={classes.marginLeft20}>
                        <Grid container>
                            <Grid item xs={12}>
                                {authInfo.isAdmin ? (
                                    <Paper className={classes.paper}>
                                        <Grid item xs={12}>
                                            <Heading
                                                label='OverAll Details'
                                            />
                                        </Grid>
                                        <Grid item xs={12} className={classes.infoRow}>Total Schools : 0</Grid>
                                        <Grid item xs={12} className={classes.infoRow}>Total Active Schools : 0</Grid>
                                        <Grid item xs={12} className={classes.infoRow}>Total Active Students : 0</Grid>
                                        <Grid item xs={12} className={classes.infoRow}>Total Active Teachers : 0</Grid>
                                    </Paper>
                                ) : (
                                    <Paper className={classes.paper}>
                                        <Grid item xs={12}>
                                            <Heading
                                                label='School Details'
                                            />
                                        </Grid>
                                        <Grid item xs={12} className={classes.infoRow}>Academic Year : {authInfo.academic_year}</Grid>
                                        <Grid item xs={12} className={classes.infoRow}>Total Teachers : {authInfo.teachers_count}</Grid>
                                        <Grid item xs={12} className={classes.infoRow}>Total Grades : {authInfo.grades_count}</Grid>
                                        <Grid item xs={12} className={classes.infoRow}>Total Parents : {authInfo.students_count}</Grid>
                                    </Paper>
                                )}
                                
                            </Grid>
                        </Grid>
                    </Grid>
                    
                    <Grid item xs={12} sm={8} md={8} className={classes.root}>
                    <Paper className={classes.paper}>
                    {(!authInfo.isAdmin) ? (
                        <Grid item xs={12} className={classes.root}>
                            <DashboardBlock 
                                icon={<AccountCircle className={classes.iconFont} />}
                                label='School Profile'
                                link='/km?p=profile'
                                disabled={false}
                            />
                            <DashboardBlock 
                                icon={<GroupWork className={classes.iconFont} />}
                                label='Teachers'
                                link='/km?p=teachers'
                                disabled={false}
                            />
                            <DashboardBlock 
                                icon={<GroupWork className={classes.iconFont} />}
                                label='Grades'
                                link='/km?p=grades'
                                disabled={false}
                            />
                            <DashboardBlock 
                                icon={<ShoppingCart className={classes.iconFont} />}
                                label='Parents'
                                link='/km?p=parents'
                                disabled={false}
                            />
                            <DashboardBlock 
                                icon={<Loyalty className={classes.iconFont} />}
                                label='Students'
                                link='/km?p=students'
                                disabled={false}
                            />
                            <DashboardBlock 
                                icon={<SupervisedUserCircle className={classes.iconFont} />}
                                label='Calendar'
                                link='/km?p=calendar'
                                disabled={false}
                            />
                            <DashboardBlock 
                                icon={<SupervisedUserCircle className={classes.iconFont} />}
                                label='Periods'
                                link='/km?p=periods'
                                disabled={false}
                            />
                            <DashboardBlock 
                                icon={<Redeem className={classes.iconFont} />}
                                label='Time Table'
                                link='/km?p=timeTable'
                                disabled={false}
                            />
                            <DashboardBlock 
                                icon={<CardTravel className={classes.iconFont} />}
                                label='Teacher Attendance'
                                link='/km?p=teacherAttendance'
                                disabled={false}
                            />
                            <DashboardBlock 
                                icon={<DeveloperBoard className={classes.iconFont} />}
                                label='Exams'
                                link='/km?p=exams'
                                disabled={false}
                            />
                            <DashboardBlock 
                                icon={<DirectionsRun className={classes.iconFont} />}
                                label='Circulars'
                                link='/km?p=circulars'
                                disabled={false}
                            />
                            </Grid>
                        ) : (
                            <Grid item xs={12} className={classes.root}>
                                <DashboardBlock 
                                    icon={<AccountCircle className={classes.iconFont} />}
                                    label='Academic Years'
                                    link='/km?p=admin_academicYears'
                                    disabled={false}
                                />
                                <DashboardBlock 
                                    icon={<AccountCircle className={classes.iconFont} />}
                                    label='Schools'
                                    link='/km?p=admin_schools'
                                    disabled={false}
                                />
                                <DashboardBlock 
                                    icon={<AccountCircle className={classes.iconFont} />}
                                    label='Grades'
                                    link='/km?p=admin_grades'
                                    disabled={false}
                                />
                                <DashboardBlock 
                                    icon={<AccountCircle className={classes.iconFont} />}
                                    label='Subjects'
                                    link='/km?p=admin_subjects'
                                    disabled={false}
                                />
                            </Grid>
                        ) }
                        </Paper>
                    </Grid>
                    </React.Fragment>
                    }
                </Grid>
            </div>
        )
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Dashboard)
