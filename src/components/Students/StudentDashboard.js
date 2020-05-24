import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import DashboardBlock from '../Dashboard/DashboardBlock'
import Share from '@material-ui/icons/Share'

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        height: 300,
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
            <div className={classes.root}>
                {/*<DashboardBlock 
                    icon={<Share className={classes.iconStyle} />}
                    label='Add New Student'
                    link='/km?p=students_add'
                    disabled={false}
                />*/}
                <DashboardBlock 
                    icon={<Share className={classes.iconStyle} />}
                    label='List Academic Students'
                    link='/km?p=students_academicList'
                    disabled={false}
                />
                <DashboardBlock 
                    icon={<Share className={classes.iconStyle} />}
                    label='Feed - Academic Students Attendacne'
                    link='/km?p=students_attendance'
                    disabled={false}
                />
                <DashboardBlock 
                    icon={<Share className={classes.iconStyle} />}
                    label='View - Academic Students Attendacne in Calendar'
                    link='/km?p=students_attendanceCalendar'
                    disabled={false}
                />
                <DashboardBlock 
                    icon={<Share className={classes.iconStyle} />}
                    label='List All Students'
                    link='/km?p=students_list'
                    disabled={false}
                />
                <DashboardBlock 
                    icon={<Share className={classes.iconStyle} />}
                    label='Add Students Marks'
                    link='/km?p=students_addMarks'
                    disabled={false}
                />
                <DashboardBlock 
                    icon={<Share className={classes.iconStyle} />}
                    label='Students Promotion'
                    link='/km?p=students_promotion'
                    disabled={false}
                />
            </div>
        )
    }
}

StudentDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(StudentDashboard)
