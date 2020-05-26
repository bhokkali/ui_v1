import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import NotFound from '../components/Pages/NotFound'
import About from '../components/Pages/About'
import Features from '../components/Pages/Features'


const useStyles = {
  mainContainer: {
    padding: '10px 0px'
  }
};

//const classes = useStyles();

//export default function StaticPageContainer(props) {
  export class StaticPageContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentPage: ''
      }
    }
  
  //const [currentPage, setCurrentPage] = React.useState();

  static getDerivedStateFromProps(props, state) {
    if(state.currentPage !== props.match.params.pageName) {
      let currentPage = '';
      switch (props.match.params.pageName) {
        case 'about':
          return {
            currentPage: <About />
          }
        case 'features':
          return {
            currentPage: <Features />
          }
        default:
            return {
              currentPage: <NotFound />
            }
      }
    }
    return null;
  }

  render() {
    const { classes } = this.props
    const { currentPage } = this.state
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header  {...this.props}/>
          <main className={classes.mainContainer}>
            {currentPage}
          </main>
        </Container>
          <Footer />
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(StaticPageContainer);