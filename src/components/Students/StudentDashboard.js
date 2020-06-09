import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import DashboardBlock from '../Dashboard/DashboardBlock'
import Share from '@material-ui/icons/Share'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

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
      iconStyle: {
        fontSize: 42,
        transform: 'rotate(90deg)'
      },
  };

export class StudentDashboard extends React.Component {

    render () {
        const { classes } = this.props
        return (
            <Paper className={classes.paper}>
                <Grid item xs={12} className={classes.root}>
                    <DashboardBlock 
                        icon={<Share className={classes.iconStyle} />}
                        label='List Academic Students'
                        link='/km?p=students_academicList'
                        disabled={false}
                        permissions={['Manage Parents / Students']}
                    />
                    <DashboardBlock 
                        icon={<Share className={classes.iconStyle} />}
                        label='Feed - Academic Students Attendacne'
                        link='/km?p=students_attendance'
                        disabled={false}
                        permissions={['Student Attendance']}
                    />
                    <DashboardBlock 
                        icon={<Share className={classes.iconStyle} />}
                        label='View - Academic Students Attendacne in Calendar'
                        link='/km?p=students_attendanceCalendar'
                        disabled={false}
                        permissions={['Student Attendance']}
                    />
                    <DashboardBlock 
                        icon={<Share className={classes.iconStyle} />}
                        label='List All Students'
                        link='/km?p=students_list'
                        disabled={false}
                        permissions={['Manage Parents / Students']}
                    />
                    <DashboardBlock 
                        icon={<Share className={classes.iconStyle} />}
                        label='Add Students Marks'
                        link='/km?p=students_addMarks'
                        disabled={false}
                        permissions={['Student Marks']}
                    />
                    <DashboardBlock 
                        icon={<Share className={classes.iconStyle} />}
                        label='Students Promotion'
                        link='/km?p=students_promotion'
                        disabled={false}
                        permissions={['Student Promotion']}
                    />
                </Grid>
            </Paper>
        )
    }
}

StudentDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(StudentDashboard)
