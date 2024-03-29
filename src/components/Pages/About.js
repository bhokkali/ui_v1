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
  },
  title: {
      marginTop: 20
  }
}));

export default function About(props) {
  const classes = useStyles();
  const list = {
    "About Bhokkali" : [
    'Bhokkali is a result of the quest to find out what is happening in school as a parent.',
    'The software will also be designed to meet the needs of children and the safety of children in the future.',
  ]
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
                            {list[opt].map((obj) => {
                                return(
                                    <div className={classes.postText}>
                                        {obj}
                                    </div>
                                )
                            })}
                           </Typography>
                        </React.Fragment>
                    )
                })
                }

            </Grid>
        </React.Fragment>
    )
}
