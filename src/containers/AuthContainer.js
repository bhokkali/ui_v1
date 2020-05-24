import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import Login from '../components/Auth/Login'
import { submitLogin } from '../store/Auth/actionCreator'
import { getAcademicYearsMaster } from '../store/Masters/actionCreator'


const useStyles = {
    mainContainer: {
      padding: '10px 0px'
    }
  };

export class AuthContainer extends React.Component {

    static getDerivedStateFromProps(props, state) {
        const { authInfo,history } = props
		if(authInfo.isAuth) {
			history.push('/km?p=dashboard')
        }
    }

    componentDidMount() {
        if(this.props.academicYearMaster) this.props.getAcademicYearsMaster()
    }


    forgotPassword = () => {
        console.log('ready to do forgot passowrd')
    }

    render() {
        const { classes, academicYearMaster, submitLogin } = this.props
        return (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="lg">
                <Header {...this.props} />
                <main className={classes.mainContainer}>
                    <Login 
                        submitLoginCB={submitLogin}
                        submitForgotPasswordCB={this.forgotPassword}
                        academicYearMaster={academicYearMaster}
                    />
                </main>
                </Container>
                <Footer />
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    submitLogin,
    getAcademicYearsMaster
  }, dispatch)

  const mapStateToProps = state => {
    return ({
        authInfo: state.Auth.authInfo,
        academicYearMaster: state.Masters.academicYearMaster,
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(AuthContainer))