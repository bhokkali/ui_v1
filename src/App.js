import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import HomeContainer from './containers/HomeContainer'
import StaticPageContainer from './containers/StaticPageContainer'
import AuthContainer from './containers/AuthContainer'
import Snackbars from './components/Common/Notifications/Snackbars'
import { toggleSnackBar } from './store/Snackbars/actionCreator'
import { getAuthInfo } from './store/Auth/actionCreator'
import { checkCookie } from './components/Common/Utility/Utils'
import SchoolContainer from './containers/SchoolContainer'
import MessageDialog from './components/Common/Dialogs/MessageDialog'
import './App.css';
import history from './history';
import loader from './assets/images/loader.gif'

class App extends Component {

  componentDidMount() {
		if(typeof document !== "undefined") {
            const chCookie = checkCookie()
            if (chCookie === true) {
            const sendData = JSON.parse(window.localStorage.getItem('AuthInfo'))
            this.props.getAuthInfo(sendData)
            }
        } else {
            console.log('document not defined yet')
        }
  }

  dialogCloseCB = () => {
    const succSnackbar = {status: false, variant: '', message: '', mode: '' }
    this.props.toggleSnackBar(succSnackbar)
  }
  
  render() {
    const { snackbarMessage, loaderStatus, toggleSnackBar } = this.props
    let snackbarOpenStatus = false
    let dialogOpenStatus = false
    if(snackbarMessage && snackbarMessage.mode === "snackbar") {
      snackbarOpenStatus = true
    }
    if(snackbarMessage && snackbarMessage.mode === "dialog") {
      dialogOpenStatus = true
    }
    const  dialogTitle = snackbarMessage.variant === "success" ? "Confirmation" : "Error"

    return (
      <React.Fragment>
        {loaderStatus.status && 
          <div className="apiLoader">
            <div className="apiLoaderContent">
              <img src={loader} />
            </div>
          </div>
        }
        <BrowserRouter history={history}>
          <Switch>
              <Route exact path="/" component={HomeContainer} />
              <Route exact path="/page/:pageName" component={StaticPageContainer} />
              <Route exact path="/login" component={AuthContainer} />
              <Route exact path="/km" component={SchoolContainer} />
          </Switch>
      </BrowserRouter>
        <Snackbars
          variant={snackbarMessage.variant}
          message={snackbarMessage.message}
          openStatus={snackbarOpenStatus}
          toggleSnackBar={toggleSnackBar}
        />
        <MessageDialog
          dialogOpenStatus={dialogOpenStatus}
          dialogTitle={dialogTitle}
          dialogContent={snackbarMessage.message}
          cancelBtnText="Got it"
          cancelBtnCB={this.dialogCloseCB}
          variant={snackbarMessage.variant}
        />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    toggleSnackBar,
    getAuthInfo
  }, dispatch)

  const mapStateToProps = state => {
    return ({
      snackbarMessage: state.Snackbars.snackbarMessage,
      loaderStatus: state.Snackbars.loaderStatus
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
