import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import BannerImg from '../../assets/images/banner.png'

const useStyles = makeStyles(theme => ({
  
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
    maxWidth: '100%',
    flexBasis: '100%'
  }
  
}));

export default function Banner(props){
    const classes = useStyles();
    return (
        <React.Fragment>
            <img
                style={{ display: 'none' }}
                src="https://source.unsplash.com/featured/?school"
                //src={BannerImg}
                alt="background"
              />
            <div className={classes.overlay} />
            <Grid container>
              <Grid item md={6}>
                <div className={classes.mainFeaturedPostContent}>
                  <Typography component="h3" variant="h5" color="inherit" gutterBottom>
                    தொட்டனைத் தூறும் மணற்கேணி மாந்தர்க்குக்<br />
                    கற்றனைத் தூறும் அறிவு.
                  </Typography>
                  <Typography variant="h6" color="inherit" paragraph>
                    Water will flow from a well in the sand in proportion to the depth to which it is dug, and knowledge will flow from a man in proportion to his learning.
    </Typography> 

                  {/*<Link variant="subtitle1" href="#">
                    Continue reading…
    </Link> */}
                 </div> 
              </Grid>
                </Grid> 
        </React.Fragment>
    )
}