import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
    dashboardBox: {
        width: 150,
        height: 100,
        background: '#00adff',
        color: '#fff',
        margin: 5,
        padding: 5,
        borderRadius: 5,
        textAlign: 'center',
    },
    dashboardBoxDisabled: {
        opacity: 0.5,
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
    }
  });

export class DashboardBlock extends React.Component {
    constructor(props) {
        super(props)
        
    }


    handleChange = (stName) => event => {
        this.setState({ [stName]: event.target.value })
    }

    render () {
        const { classes, icon, label, link, disabled } = this.props
        const DBClass = disabled ? classes.dashboardBox + ' '+ classes.dashboardBoxDisabled : classes.dashboardBox
        return (
            <div>
                <Link to={link} className={classes.dashBlock}>
                    <div className={classes.dashDesign}></div>
                    <div className={classes.dashLabelBlock}>
                        {icon}
                        <span className={classes.textLink}>{label}</span>
                    </div>
                </Link>
                {/*disabled ? (
                    <Grid container>
                        <Grid item xs={12}>
                            {icon}
                        </Grid>
                        <Grid item xs={12}>
                            {label}
                        </Grid>
                    </Grid>
                ) : (
                    <Link to={link} className={classes.textLink}>
                        <Grid item xs={12}>
                            {icon}
                        </Grid>
                        <Grid item xs={12}>
                            {label}
                        </Grid>
                    </Link>
                )*/}
                
            </div>
        )
    }
}

DashboardBlock.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(DashboardBlock)
