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

export default function Features(props) {
  const classes = useStyles();
  const list = {
    "Prompt Contact Prompt Contact" : [
    'Easier way to send message from school to teacher and parents.',
    'Instant SMS and Email.',
    'Mobile Application.',
    'Online updates'
  ],
  "Uses for Students" : [
      "Get Tasks from App and Web",
      "Creative methods"
  ],
  "Uses for School": [
      "Admission",
      "Generate time table",
      "Attendance", 
      "Exams and Reports",
  ],
  "Uses for Admin": [
      'Time saving',
      'Cost saving',
      'Quick click to access'
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
                           <Divider />
                        </React.Fragment>
                    )
                })
                }
              {/*<Typography variant="h6" gutterBottom>
                Prompt Contact
              </Typography>
              <Typography>
                  <div className={classes.postText}>
                  
                  </div>
                  <div className={classes.postText}>
                  Instant SMS and Email.
                  </div>
                  <div className={classes.postText}>
                  Mobile Application.
                  </div>
                  <div className={classes.postText}>
                  Mobile Application.
                  </div>
                  <div className={classes.postText}>
                  Mobile Application.
                  </div>

            </Typography> */}
            </Grid>
        </React.Fragment>
    )
}