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

export class ParentDashboard extends React.Component {

    render () {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <DashboardBlock 
                    icon={<Share className={classes.iconStyle} />}
                    label='Add New Parent'
                    link='/km?p=parents_add'
                    disabled={false}
                    permissions={['Manage Parents / Students']}
                />
                <DashboardBlock 
                    icon={<Share className={classes.iconStyle} />}
                    label='List Parents'
                    link='/km?p=parents_list'
                    disabled={false}
                    permissions={['Manage Parents / Students']}
                />
            </div>
        )
    }
}

ParentDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ParentDashboard)
