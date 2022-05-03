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

export default function Contact(props) {
  const classes = useStyles();
  const list = {
    "Reach Us" : '#273, Church Hill lane, Ooty, The Nilgiris, Tamilnadu, Pincode: 643003.',
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
