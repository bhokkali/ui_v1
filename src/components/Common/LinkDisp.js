import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const styles = {
    navLink: {
        cursor: "pointer",
        color: "#000",
        textDecoration: "none",
        '&:hover': {
            textDecoration: 'underline',
            backgroundColor: "#ebebeb"
          },
    }
  };

export class LinkDisp extends React.Component {
    
    
    render () {
        const { classes, kmLink, kmLinkId, kmLinkName } = this.props
        let editUrl = (kmLinkId) ? kmLink+"_"+kmLinkId : kmLink 
        return (
            <React.Fragment>
                <Link to={editUrl} className={classes.navLink}>
                    {kmLinkName}
                </Link>
            </React.Fragment>
            
        )
    }
}


export default withStyles(styles)(LinkDisp)
