import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import { removeAuthInfo, userLogout } from '../store/Auth/actionCreator'
import Container from '@material-ui/core/Container';
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import { getUrlParams, isEmpty } from '../components/Common/Utility/Utils'
import DashboardContainer from './DashboardContainer'
import ProfileContainer from './ProfileContainer'
import GradesContainer from './GradesContainer'
import TeachersContainer from './TeachersContainer'
import ParentsContainer from './ParentsContainer'
import StudentsContainer from './StudentsContainer'
import CalendarContainer from './CalendarContainer'
import PeriodsContainer from './PeriodsContainer'
import TimeTableContainer from './TimeTableContainer'
import TeacherAttendanceContainer from './TeacherAttendanceContainer'
import ExamsContainer from './ExamsContainer'
import CircularsContainer from './CircularsContainer'
import AdminContainer from './AdminContainer'

const useStyles = {
    mainContainer: {
      padding: '10px 0px'
    }
  };

export class SchoolContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: '' 
        }
    }

    componentDidMount() {
        const localAuthData = JSON.parse(window.localStorage.getItem('AuthInfo'))
        if (!localAuthData || Object.keys(localAuthData).length < 1) {
            this.props.removeAuthInfo()
            window.location.href = "/"
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { location } = props
        
        const localAuthData = JSON.parse(window.localStorage.getItem('AuthInfo'))
        if (!localAuthData || Object.keys(localAuthData).length < 1) {
            props.removeAuthInfo()
            window.location.href = "/"
        }
        
        const paramResult = getUrlParams(location.search)
        if(!isEmpty(paramResult) && paramResult.p.split("_")[0]) {
            return {
                currentPage: paramResult.p.split("_")[0]
            }
        }

        return null;
    }   

    render() {
        const { classes, authInfo, userLogout, subadminInfo } = this.props
        const { currentPage } = this.state
        let pageContent = <div>Load other pages</div>
        switch (currentPage) {
            case 'dashboard':
                pageContent = <DashboardContainer authInfo={authInfo} {...this.props} />
                break
            case 'profile':
                pageContent = <ProfileContainer authInfo={authInfo} {...this.props} />
                break
            case "grades":
                pageContent = <GradesContainer authInfo={authInfo} {...this.props} />
                break
            case "teachers":
                pageContent = <TeachersContainer authInfo={authInfo} {...this.props} />
                break
            case "parents":
                pageContent = <ParentsContainer authInfo={authInfo} {...this.props} />
                break
            case "students":
                pageContent = <StudentsContainer authInfo={authInfo} {...this.props} />
                break
            case "calendar":
                pageContent = <CalendarContainer authInfo={authInfo} {...this.props} />
                break
            case "periods":
                pageContent = <PeriodsContainer authInfo={authInfo} {...this.props} />
                break
            case "timeTable":
                pageContent = <TimeTableContainer authInfo={authInfo} {...this.props} />
                break
            case "teacherAttendance":
                pageContent = <TeacherAttendanceContainer authInfo={authInfo} {...this.props} />
                break
            case "exams":
                pageContent = <ExamsContainer authInfo={authInfo} {...this.props} />
                break
            case "circulars":
                pageContent = <CircularsContainer authInfo={authInfo} {...this.props} />
                break
            case "admin":
                pageContent = <AdminContainer authInfo={authInfo} {...this.props} />
                break

        }

        return (
            <React.Fragment>
                <Container maxWidth="lg">
                <Header authInfo={authInfo} logoutCB={userLogout}  {...this.props}   />
                <main className={classes.mainContainer}>
                    {pageContent}
                </main>
                </Container>
                <Footer />
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    removeAuthInfo,
    userLogout
  }, dispatch)

  const mapStateToProps = state => {
    return ({
        authInfo: state.Auth.authInfo,
        subadminInfo: state.Auth.subadminInfo
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(SchoolContainer))