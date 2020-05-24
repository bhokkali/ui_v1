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

export class ExamDashboard extends React.Component {

    render () {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <DashboardBlock 
                    icon={<Share className={classes.iconStyle} />}
                    label='Add Exam Details'
                    link='/km?p=exams_add'
                    disabled={false}
                />
                <DashboardBlock 
                    icon={<Share className={classes.iconStyle} />}
                    label='Exam Calendar'
                    link='/km?p=exams_list'
                    disabled={false}
                />
                <DashboardBlock 
                    icon={<Share className={classes.iconStyle} />}
                    label='Exam Calendar - Grid'
                    link='/km?p=exams_grid'
                    disabled={false}
                />
                <DashboardBlock 
                    icon={<Share className={classes.iconStyle} />}
                    label='Add Exam TimeTable'
                    link='/km?p=exams_addTimeTable'
                    disabled={false}
                />
                <DashboardBlock 
                    icon={<Share className={classes.iconStyle} />}
                    label='List Exam TimeTable'
                    link='/km?p=exams_listTimeTable'
                    disabled={false}
                />
            </div>
        )
    }
}

ExamDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ExamDashboard)
