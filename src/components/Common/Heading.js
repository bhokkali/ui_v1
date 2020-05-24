import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
   
    headText: {
        color: '#fff',
        textDecoration: 'none',
        textAlign: 'left',
        fontSize: 20
    },
    dashBlock: {
        display: 'flex',
        background: '#265985',
        color: '#fff',
        borderRadius: "0px 10px 10px 0px",
        textDecoration: 'none',
        marginBottom: 10
    },
    dashDesign: {
        width: 10,
        background: "#ff6a00",
    },
    dashLabelBlock: {
        display: 'flex',
        padding: "10px 5px"
    }
  });

export class Heading extends React.Component {
    
    
    render () {
        const { classes, label } = this.props
        return (
            <React.Fragment>
                <div className={classes.dashBlock}>
                    <div className={classes.dashDesign}></div>
                    <div className={classes.dashLabelBlock}>
                        <span className={classes.headText}>{label}</span>
                    </div>
                </div>
            </React.Fragment>
            
        )
    }
}


export default withStyles(styles)(Heading)
