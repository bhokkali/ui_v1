import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import DashboardBlock from './DashboardBlock'
import LocationCity from '@material-ui/icons/LocationCity'
import ViewComfy from '@material-ui/icons/ViewComfy'
import Assignment from '@material-ui/icons/Assignment'
import CalendarToday from '@material-ui/icons/CalendarToday'
import SpeakerNotes from '@material-ui/icons/SpeakerNotes'
import LocalLibrary from '@material-ui/icons/LocalLibrary'
import WC from '@material-ui/icons/Wc'
import PeopleAlt from '@material-ui/icons/PeopleAlt'
import FormatListNumbered from '@material-ui/icons/FormatListNumbered'
import HourglassEmpty from '@material-ui/icons/HourglassEmpty'
import PlaylistAddCheck from '@material-ui/icons/PlaylistAddCheck'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Heading from '../Common/Heading'

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap'
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
        const { classes, authInfo } = this.props
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
                                        <Grid item xs={12} className={classes.infoRow}>Total Parents : {authInfo.parents_count}</Grid>
                                        <Grid item xs={12} className={classes.infoRow}>Total Students : {authInfo.students_count}</Grid>
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
                                icon={<LocationCity className={classes.iconFont} />}
                                label='School Profile'
                                link='/km?p=profile'
                                disabled={false}
                                permissions={['School Profile']}
                            />
                            <DashboardBlock 
                                icon={<LocalLibrary className={classes.iconFont} />}
                                label='Teachers'
                                link='/km?p=teachers'
                                disabled={false}
                                permissions={['Manage Teachers']}
                            />
                            <DashboardBlock 
                                icon={<FormatListNumbered className={classes.iconFont} />}
                                label='Grades'
                                link='/km?p=grades'
                                disabled={false}
                                permissions={['Manage Grades']}
                            />
                            <DashboardBlock 
                                icon={<PeopleAlt className={classes.iconFont} />}
                                label='Parents'
                                link='/km?p=parents'
                                disabled={false}
                                permissions={['Manage Parents / Students']}
                            />
                            <DashboardBlock 
                                icon={<WC className={classes.iconFont} />}
                                label='Students'
                                link='/km?p=students'
                                disabled={false}
                                permissions={['Manage Parents / Students', 'Student Attendance', 'Student Marks', 'Student Promotion']}
                            />
                            <DashboardBlock 
                                icon={<CalendarToday className={classes.iconFont} />}
                                label='Calendar'
                                link='/km?p=calendar'
                                disabled={false}
                                permissions={['School Calendar']}
                            />
                            <DashboardBlock 
                                icon={<HourglassEmpty className={classes.iconFont} />}
                                label='Periods'
                                link='/km?p=periods'
                                disabled={false}
                                permissions={['Manage Periods']}
                            />
                            <DashboardBlock 
                                icon={<ViewComfy className={classes.iconFont} />}
                                label='Time Table'
                                link='/km?p=timeTable'
                                disabled={false}
                                permissions={['Manage Time Table']}
                            />
                            <DashboardBlock 
                                icon={<PlaylistAddCheck className={classes.iconFont} />}
                                label='Teacher Absence'
                                link='/km?p=teacherAttendance'
                                disabled={false}
                                permissions={['Teacher Absence']}
                            />
                            <DashboardBlock 
                                icon={<Assignment className={classes.iconFont} />}
                                label='Exams'
                                link='/km?p=exams'
                                disabled={false}
                                permissions={['Manage Exams']}
                            />
                            <DashboardBlock 
                                icon={<SpeakerNotes className={classes.iconFont} />}
                                label='Circulars'
                                link='/km?p=circulars'
                                disabled={false}
                                permissions={['School Circular']}
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
                                <DashboardBlock 
                                    icon={<AccountCircle className={classes.iconFont} />}
                                    label='Permissions'
                                    link='/km?p=admin_permissions'
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
