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

export class PeriodDashboard extends React.Component {

    render () {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <DashboardBlock 
                    icon={<Share className={classes.iconStyle} />}
                    label='Add New Period'
                    link='/km?p=periods_add'
                    disabled={false}
                    permissions={['Manage Periods']}
                />
                <DashboardBlock 
                    icon={<Share className={classes.iconStyle} />}
                    label='List Periods'
                    link='/km?p=periods_list'
                    disabled={false}
                    permissions={['Manage Periods']}
                />
            </div>
        )
    }
}

PeriodDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(PeriodDashboard)
