import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
    dashboardBox: {
        height: "90px",
    },
    textLink: {
        color: '#fff',
        textDecoration: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        padding: 5,
        marginTop: 8
    },
    dashBlock: {
        display: 'flex',
        background: '#265985',
        color: '#fff',
        margin: 5,
        borderRadius: "0px 10px 10px 0px",
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
            backgroundColor: '#05355f'
            //backgroundColor: "#ff6a00"
          },
    },
    dashDesign: {
        width: 10,
        background: "#ff6a00"
    },
    dashLabelBlock: {
        display: 'flex',
        padding: "20px 5px"
    },
    disabledBlock: {
        background: "#265985",
        opacity: 0.6,
        display: 'flex',
        color: '#fff',
        margin: 5,
        borderRadius: "0px 10px 10px 0px",
        textDecoration: 'none',
    },
    disabledTextLink: {
        color: '#fff',
        textDecoration: 'none',
        textAlign: 'left',
        padding: 5,
        marginTop: 8
    },
  });

export class DashboardBlock extends React.Component {
    constructor(props) {
        super(props)
        
    }


    handleChange = (stName) => event => {
        this.setState({ [stName]: event.target.value })
    }

    render () {
        const { classes, icon, label, link, disabled, authInfo, subadminInfo, permissions } = this.props
        let displayButtonStatus = true
        
        if(authInfo.data.loginAs === 'SubAdmin') {
            displayButtonStatus = false
            if(permissions) { 
                const findObj = _.find(subadminInfo.permissionsDaos, (n) => {
                    //return n.permission_name === lableObj.permission
                    return permissions.indexOf(n.permission_name) !== -1 
                })
                if(findObj) {
                    displayButtonStatus = true
                }
            }
        }
        //const DBClass = disabled ? classes.dashboardBox + ' '+ classes.dashboardBoxDisabled : classes.dashboardBox
        return (
            <React.Fragment>
                {displayButtonStatus && 
                    <div className={classes.dashboardBox}>
                        {disabled ? (
                            <div className={classes.disabledBlock}>
                                <div className={classes.dashDesign}></div>
                                <div className={classes.dashLabelBlock}>
                                    {icon}
                                    <span className={classes.disabledTextLink}>{label}</span>
                                </div>
                            </div>
                        ) : (
                            <Link to={link} className={classes.dashBlock}>
                                <div className={classes.dashDesign}></div>
                                <div className={classes.dashLabelBlock}>
                                    {icon}
                                    <span className={classes.textLink}>{label}</span>
                                </div>
                            </Link>
                        )
                        }
                    </div>
                }
            </React.Fragment>
        )
    }
}

DashboardBlock.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  const mapDispatchToProps = dispatch =>
  bindActionCreators({
    
  }, dispatch)

  const mapStateToProps = state => {
    return ({
        authInfo: state.Auth.authInfo,
        subadminInfo: state.Auth.subadminInfo
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DashboardBlock))
