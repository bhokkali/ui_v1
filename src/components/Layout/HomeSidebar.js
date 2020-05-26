import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
  
}));

const archives = [
    'March 2020',
    'February 2020',
    'January 2020',
    'December 2019',
    'November 2019',
    'October 2019',
    'September 2019',
    'August 2019',
    'July 2019',
    'June 2019',
    'May 2019',
    'April 2019',
  ];
  
const social = ['GitHub', 'Twitter', 'Facebook'];

export default function HomeSidebar(props) {
  const classes = useStyles();
    return (
        <React.Fragment>
            <Grid item xs={12} md={4}>
              <Paper elevation={0} className={classes.sidebarAboutBox}>
                <Typography variant="h6" gutterBottom>
                The Best Application for School
                </Typography>
                <Typography>
                Bhokkali is an easy software. This makes it easy to understand all kinds of school related jobs.
                Writing jobs from school admission to mastery has been facilitated.
                </Typography>
              </Paper>
              {/*}
              <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
                Archives
              </Typography>
              {archives.map(archive => (
                <Link display="block" variant="body1" href="#" key={archive}>
                  {archive}
                </Link>
              ))}
              <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
                Social
              </Typography>
              {social.map(network => (
                <Link display="block" variant="body1" href="#" key={network}>
                  {network}
                </Link>
              ))}
              */}
            </Grid>
        </React.Fragment>
    )
}