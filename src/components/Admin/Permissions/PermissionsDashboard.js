import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import DashboardBlock from '../../Dashboard/DashboardBlock'
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

export class PermissionsDashboard extends React.Component {
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
                    label='Add New Permission'
                    link='/km?p=admin_permissionsAdd'
                    disabled={false}
                />
                <DashboardBlock 
                    icon={<Share className={classes.iconStyle} />}
                    label='List Permissions'
                    link='/km?p=admin_permissionsList'
                    disabled={false}
                />
            </div>
        )
    }
}

PermissionsDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(PermissionsDashboard)
