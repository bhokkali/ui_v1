import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';

const useStyles = {
  root: {
    width: '100%',
    overflowX: 'auto',
    padding: 10
  }
};

export class NoData extends React.Component {
    
    render () {
        const { classes, message } = this.props;
        return (
            <Paper className={classes.root}>
                {message}
            </Paper>
          );
    }
  
}

export default withStyles(useStyles)(NoData)
