import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://bhokkali.com/">
          Bhokkali
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(2),
    padding: theme.spacing(6, 0),
    borderTop: '1px solid #ebebeb'
  }
}));

export default function Footer() {
  const classes = useStyles();
  return (
      <React.Fragment>
          <footer className={classes.footer}>
              <Container maxWidth="lg">
              {/*<Typography variant="h6" align="center" gutterBottom>
                  Bhokkali
              </Typography>
              <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                  Home | Login
              </Typography> */}
              <Copyright />
              </Container>
          </footer>
      </React.Fragment>
  )
}