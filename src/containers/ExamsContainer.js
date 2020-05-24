import React from 'react';
import _ from 'lodash'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import ExamDashboard from '../components/Exams/ExamDashboard'
import AddExam from '../components/Exams/AddExam'
import ListExams from '../components/Exams/ListExams'
import GridExams from '../components/Exams/GridExams'
import ListExamTimeTable from '../components/Exams/ListExamTimeTable'
import AddExamTimeTable from '../components/Exams/AddExamTimeTable'
import { getUrlParams } from '../components/Common/Utility/Utils'
import { createUpdateExam, getExamsList, getExamTimeTable, createUpdateExamGrade } from '../store/Exams/actionCreator'
import { getSchoolGradesList } from '../store/SchoolGrades/actionCreator'
import { getSubjectsMaster } from '../store/Masters/actionCreator'

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

class ExamsContainer extends React.Component {
  state = {
    value: 0,
    currentSubPage: '',
    dispName: ''
  };

  componentDidMount() {
    if(this.props.authInfo.data) {
      if(this.props.listExams)  this.props.getExamsList(this.props.authInfo.data.id, this.props.authInfo.data.academic_year_id)
      if(this.props.schoolGradesList) this.props.getSchoolGradesList(this.props.authInfo.data.id,this.props.authInfo.data.academic_year_id)
      if(this.props.subjectsMaster)  this.props.getSubjectsMaster()
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { authInfo, 
      location, 
      history,
      listExams, 
      createUpdateExam,
      getExamTimeTable,
      createUpdateExamGrade,
      listExamTimeTable,
      schoolGradesList,
      subjectsMaster,
    } = props

    const paramResult = getUrlParams(location.search)
    let pageContent = <ExamDashboard />
    let dispName = ''
    switch(paramResult.p.split("_")[1]) {
      case 'add':
        pageContent = <AddExam
        authInfo={authInfo.data} 
        history={history}
        createUpdateExam={createUpdateExam}
        mode="Add"
        />

        dispName = "Add Exam Details"
        break;
      case 'grid':
        pageContent = <GridExams
          authInfo={authInfo.data} 
          history={history}
          listExams={listExams}
        />
        dispName = "List Exam Details - Grid View"
        break;
      case 'list':
        pageContent = <ListExams
          authInfo={authInfo.data} 
          history={history}
          listExams={listExams}
        />
        dispName = "List Exam Details"
        break;
    case 'edit':
        let selectedObj2 = '';
        if(paramResult.p.split("_")[2]) {
          selectedObj2 = _.find(listExams, (n) => { return n.id === parseInt(paramResult.p.split("_")[2]) })
        }
        pageContent = <AddExam
        authInfo={authInfo.data} 
        history={history}
        selectedExamInfo = {selectedObj2}
        createUpdateExam={createUpdateExam}
        mode="Edit"
        />
        dispName = "Edit Exam Details"
        break;
    case 'listTimeTable':
        pageContent = <ListExamTimeTable
        authInfo={authInfo.data} 
        history={history}
        listExams={listExams}
        schoolGradesList={schoolGradesList}
        getExamTimeTable={getExamTimeTable}
        listExamTimeTable={listExamTimeTable}
        />
        dispName = "List Exam TimeTable Details"
        break;
    case 'addTimeTable':
      pageContent = <AddExamTimeTable
      authInfo={authInfo.data} 
      history={history}
      createUpdateExamGrade={createUpdateExamGrade}
      listExams={listExams}
      schoolGradesList={schoolGradesList}
      subjectsMaster={subjectsMaster}
      mode="Add"
      />
      dispName = "Add Exam TimeTable"
      break;
    case 'editTimeTable':
      let selectedObj = '';
      if(paramResult.p.split("_")[2]) {
        selectedObj = _.find(listExamTimeTable, (n) => { return n.id === parseInt(paramResult.p.split("_")[2]) })
      }

      pageContent = <AddExamTimeTable
      authInfo={authInfo.data} 
      history={history}
      createUpdateExamGrade={createUpdateExamGrade}
      listExams={listExams}
      schoolGradesList={schoolGradesList}
      subjectsMaster={subjectsMaster}
      selectedExamTimeTableInfo={selectedObj}
      mode="Edit"
      />
      dispName = "Edit Exam TimeTable"
      break;
      default:
        pageContent = <ExamDashboard />
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
          <Link to="/km?p=dashboard" className={classes.textLink}>Dashboard</Link> > <Link to="/km?p=exams" className={classes.textLink}>Exams</Link> > {dispName}
        </div>
        <div className={classes.rootContent}>
          {currentSubPage}
        </div>
      </div>
    );
  }
}

ExamsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getExamsList,
    createUpdateExam,
    getExamTimeTable,
    createUpdateExamGrade,
    getSchoolGradesList,
    getSubjectsMaster
  }, dispatch)

  const mapStateToProps = state => ({
    listExams: state.Exams.listExams,
    listExamTimeTable: state.Exams.listExamTimeTable,
    schoolGradesList: state.Grades.schoolGradesList,
    subjectsMaster: state.Masters.subjectsMaster
  })

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ExamsContainer))