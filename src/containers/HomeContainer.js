import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import Banner from '../components/Layout/Banner'
import FeaturePosts from '../components/Layout/FeaturePosts'
import HomeSidebar from '../components/Layout/HomeSidebar'
import MainContent from '../components/Layout/MainContent'
import { userLogout } from '../store/Auth/actionCreator'

const useStyles = (theme => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/featured/?school)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },

  mainWidth: {
    width: 'auto'
  }
    
}));


export class HomeContainer extends React.Component {

  render() {
    const { classes, authInfo, userLogout } = this.props
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header 
            classes={classes} 
            authInfo={authInfo} 
            logoutCB={userLogout} 
            {...this.props}
          />
          <main className={classes.mainWidth}>
            <Paper className={classes.mainFeaturedPost}>
              <Banner classes={classes} />
            </Paper>
              <FeaturePosts classes={classes} />
            <Grid container spacing={5} className={classes.mainGrid}>
              <MainContent classes={classes} />
              <HomeSidebar classes={classes} />
            </Grid>
          </main>
        </Container>
          <Footer classes={classes} />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    userLogout
  }, dispatch)

  const mapStateToProps = state => {
    return ({
        authInfo: state.Auth.authInfo
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(HomeContainer))