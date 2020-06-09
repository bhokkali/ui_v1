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

export class ProfileDashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            position: 'D'
        }
    }


    handleChange = (stName) => event => {
        this.setState({ [stName]: event.target.value })
    }

    render () {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <DashboardBlock 
                    icon={<Share className={classes.iconStyle} />}
                    label='Add New Mark Grade'
                    link='/km?p=grades_addMarkGrade'
                    disabled={false}
                    permissions={['Manage Grades']}
                />
                <DashboardBlock 
                    icon={<Share className={classes.iconStyle} />}
                    label='List Mark Grades'
                    link='/km?p=grades_listMarkGrades'
                    disabled={false}
                    permissions={['Manage Grades']}
                />
                <DashboardBlock 
                    icon={<Share className={classes.iconStyle} />}
                    label='Add New Grade'
                    link='/km?p=grades_add'
                    disabled={false}
                    permissions={['Manage Grades']}
                />
                <DashboardBlock 
                    icon={<Share className={classes.iconStyle} />}
                    label='List Grades'
                    link='/km?p=grades_list'
                    disabled={false}
                    permissions={['Manage Grades']}
                />
            </div>
        )
    }
}

ProfileDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ProfileDashboard)
