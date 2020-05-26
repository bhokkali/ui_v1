import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  postText: {
    marginTop: 10,
    fontSize: 15,
    textAlign: 'justify',
    color: '#000000ba'
  }
}));

export default function MainContent(props) {
  const classes = useStyles();
    return (
        <React.Fragment>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                From the Bhokkali
              </Typography>
              <Divider />
              <Typography>
                  <div className={classes.postText}>
                  According to the couplet 396, Water will flow from a well in the sand in proportion to the depth to which it is dug, and knowledge will flow from a man in proportion to his learning.
                  </div>
                  <div className={classes.postText}>
                  As is the case, the school has simplified all the functions needed to search for Bhokkali software. It is a computer application developed to reduce the workload of teachers, parents and students.
                  </div>
                  <div className={classes.postText}>
                  Most school needs are fulfilled and are to be fulfilled - Bhokkali
                  </div>
                  <div className={classes.postText}>  </div>
              </Typography>
            </Grid>
        </React.Fragment>
    )
}