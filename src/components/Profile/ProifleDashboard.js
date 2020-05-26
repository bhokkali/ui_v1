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
        const { classes, authInfo } = this.props
        let disableStatus = false
        if(authInfo && authInfo.login_name === "demoschool") {
            disableStatus = true
        }
        return (
            <div className={classes.root}>
                <DashboardBlock 
                    icon={<Share className={classes.iconStyle} />}
                    label='Update Profile'
                    link='/km?p=profile_update'
                    disabled={false}
                />
                <DashboardBlock 
                    icon={<Share className={classes.iconStyle} />}
                    label='Change Password'
                    link='/km?p=profile_changePassword'
                    disabled={disableStatus}
                />
            </div>
        )
    }
}

ProfileDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ProfileDashboard)
