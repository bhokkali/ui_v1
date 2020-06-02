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
  },
  kuralText: {
    ['@media (max-width:320px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: "11.2px"
    },
    ['@media (min-width:321px) and (max-width:420px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: 12
    },
    ['@media (min-width:421px) and (max-width:560px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: 13
    },
    ['@media (min-width:561px) and (max-width:660px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: 15
    }
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
                    <div className={classes.kuralText}>
                      தொட்டனைத் தூறும் மணற்கேணி மாந்தர்க்குக்<br />
                      கற்றனைத் தூறும் அறிவு.
                    </div>
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