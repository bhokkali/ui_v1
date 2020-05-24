import React from 'react';
import _ from 'lodash'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import GradeDashboard from '../components/Grades/GradeDashboard'
import AddGrade from '../components/Grades/AddGrade'
import ListGrade from '../components/Grades/ListGrade'
import AddMarkGrade from '../components/Grades/AddMarkGrade'
import ListMarkGrades from '../components/Grades/ListMarkGrades'
import { getGradesMaster, getAcademicYearsMaster, getSchoolTeachersMaster } from '../store/Masters/actionCreator'
import { getUrlParams } from '../components/Common/Utility/Utils'
import { createUpdateSchoolGrade, getSchoolGradesList, createUpdateMarkGrade, getMarkGradesList } from '../store/SchoolGrades/actionCreator'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  breadCrumbs: {
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  rootContent: {
    backgroundColor: theme.palette.background.paper,
    padding: 5,
  },
  textLink: {
    cursor: 'pointer',
    fontSize: 15,
    color: '#1976d2',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  }
});

class GradesContainer extends React.Component {
  state = {
    value: 0,
    currentSubPage: '',
    dispName: ''
  };

  componentDidMount() {
    if(this.props.authInfo.data) {
      if(this.props.listGradesMaster)  this.props.getGradesMaster()
      if(this.props.academicYearMaster) this.props.getAcademicYearsMaster()
      if(this.props.schoolTeachersMaster) this.props.getSchoolTeachersMaster(this.props.authInfo.data.id)
      if(this.props.schoolGradesList) this.props.getSchoolGradesList(this.props.authInfo.data.id, this.props.authInfo.data.academic_year_id)
      if(this.props.schoolMarkGradesList) this.props.getMarkGradesList(this.props.authInfo.data.id)
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { authInfo, 
      location, 
      history,
      listGradesMaster, 
      academicYearMaster, 
      schoolTeachersMaster,
      createUpdateSchoolGrade,
      schoolGradesList,
      createUpdateMarkGrade,
      schoolMarkGradesList
    } = props

    const paramResult = getUrlParams(location.search)
    let pageContent = <GradeDashboard />
    let dispName = ''
    switch(paramResult.p.split("_")[1]) {
      case 'add':
        pageContent = <AddGrade 
        authInfo={authInfo.data} 
        history={history}
        listGradesMaster={listGradesMaster}
        academicYearMaster={academicYearMaster}
        schoolTeachersMaster={schoolTeachersMaster}
        createUpdateSchoolGradeCB={createUpdateSchoolGrade}
        mode="Add"
        />

        dispName = "Add New Grade"
        break;
      case 'edit':
        let selectedObj = '';
        if(paramResult.p.split("_")[2]) {
          selectedObj = _.find(schoolGradesList, (n) => { return n.id === parseInt(paramResult.p.split("_")[2]) })
        }

        pageContent = <AddGrade 
        authInfo={authInfo.data} 
        history={history}
        listGradesMaster={listGradesMaster}
        academicYearMaster={academicYearMaster}
        schoolTeachersMaster={schoolTeachersMaster}
        createUpdateSchoolGradeCB={createUpdateSchoolGrade}
        selectedGradeInfo={selectedObj}
        mode="Edit"
        />

        dispName = "Edit Grade Details"
        break
      case 'list':
        pageContent = <ListGrade 
          authInfo={authInfo.data} 
          history={history}
          schoolGradesList={schoolGradesList}
        />
        dispName = "List Grades"
        break;
      
      case 'addMarkGrade':
        pageContent = <AddMarkGrade 
        authInfo={authInfo.data} 
        history={history}
        createUpdateMarkGrade={createUpdateMarkGrade}
        mode="Add"
        />

        dispName = "Add Mark Grade"
        break;
      case 'editMarkGrade':
        let selectedObj2 = '';
        if(paramResult.p.split("_")[2]) {
          selectedObj2 = _.find(schoolMarkGradesList, (n) => { return n.id === parseInt(paramResult.p.split("_")[2]) })
        }
        pageContent = <AddMarkGrade 
        authInfo={authInfo.data} 
        history={history}
        createUpdateMarkGrade={createUpdateMarkGrade}
        selectedMarkGradeInfo={selectedObj2}
        mode="Edit"
        />

        dispName = "Edit Mark Grade"
        break;
      case 'listMarkGrades':
        pageContent = <ListMarkGrades
          authInfo={authInfo.data} 
          history={history}
          schoolMarkGradesList={schoolMarkGradesList}
        />
        dispName = "List Mark Grades"
        break;
      default:
        pageContent = <GradeDashboard />
        dispName = ''
        break;
    }
    return {
        currentSubPage: pageContent,
        dispName
    }
    
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, authInfo } = this.props;
    const { currentSubPage, dispName } = this.state;
    
    return (
      <div className={classes.root}>
        <div className={classes.breadCrumbs}>
          <Link to="/km?p=dashboard" className={classes.textLink}>Dashboard</Link> > <Link to="/km?p=grades" className={classes.textLink}>Grades</Link> > {dispName}
        </div>
        <div className={classes.rootContent}>
          {currentSubPage}
        </div>
      </div>
    );
  }
}

GradesContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getGradesMaster,
    getAcademicYearsMaster,
    getSchoolTeachersMaster,
    createUpdateSchoolGrade,
    getSchoolGradesList,
    createUpdateMarkGrade,
    getMarkGradesList
  }, dispatch)

  const mapStateToProps = state => ({
    listGradesMaster: state.Masters.listGradesMaster,
    academicYearMaster: state.Masters.academicYearMaster,
    schoolTeachersMaster: state.Masters.schoolTeachersMaster,
    schoolGradesList: state.Grades.schoolGradesList,
    schoolMarkGradesList: state.Grades.schoolMarkGradesList
  })

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GradesContainer))