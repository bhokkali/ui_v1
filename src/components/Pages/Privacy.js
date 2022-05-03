import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  postText: {
    marginTop: 10,
    fontSize: 15,
    textAlign: 'justify',
    color: '#000000ba'
  },
  title: {
      marginTop: 20
  }
}));

export default function Privacy(props) {
  const classes = useStyles();
  const list = {
    "Privacy Policy" : 'This website does not collect Personal Information from public users. You can generally visit the site without revealing Personal Information, unless you choose to provide such information after login.',
    "Cookies": "A cookie is a piece of software code that an internet web site sends to your browser when you access information at that site. This site does not use cookies instead using browser caching for authentication and authorisation purpose.",
    "Site Visit Data": "This website records your visit and logs the following information for statistical purposes your server's address; the name of the top-level domain from which you access the Internet (for example, .gov, .com, .in, etc.); the type of browser you use; the date and time you access the site; the pages you have accessed and the documents downloaded and the previous Internet address from which you linked directly to the site. We will not identify users or their browsing activities, except when a law enforcement agency may exercise a warrant to inspect the service provider's logs.",
    "Copyright": "The contents of this website can not be used in any misleading or objectionable context."
}
    return (
        <React.Fragment>
            <Grid item xs={12} md={12}>
                {Object.keys(list).map((opt, key) => {
                    return (
                        <React.Fragment>
                            <Typography variant="h6" gutterBottom className={classes.title}>
                                {opt}
                            </Typography>
                            <Typography>
                                <div className={classes.postText}>
                                    {list[opt]}
                                </div>
                           </Typography>
                        </React.Fragment>
                    )
                })
                }

            </Grid>
        </React.Fragment>
    )
}
