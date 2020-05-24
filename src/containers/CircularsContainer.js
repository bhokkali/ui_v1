import React from 'react';
import _ from 'lodash'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import CircularDashboard from '../components/Circulars/CircularDashboard'
import AddCircular from '../components/Circulars/AddCircular'
import ListCirculars from '../components/Circulars/ListCirculars'
import { getUrlParams } from '../components/Common/Utility/Utils'
import { createUpdateCircular, getSchoolCirculars} from '../store/Circulars/actionCreator'

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

class CircularsContainer extends React.Component {
  state = {
    value: 0,
    currentSubPage: '',
    dispName: ''
  };

  componentDidMount() {
    if(this.props.authInfo.data) {
      if(this.props.listSchoolCirculars) this.props.getSchoolCirculars(this.props.authInfo.data.id, this.props.authInfo.data.academic_year_id)
    }
  }


  static getDerivedStateFromProps(props, state) {
    const { authInfo, 
      location,
      history,
      createUpdateCircular,
      listSchoolCirculars
    } = props
    
    const paramResult = getUrlParams(location.search)
    let pageContent = <CircularDashboard />
    let dispName = ''
    switch(paramResult.p.split("_")[1]) {
      case 'add':
        pageContent = <AddCircular
          authInfo={authInfo.data} 
          history={history}
          createUpdateCircular={createUpdateCircular}
          mode="Add"
        />

        dispName = "Add Circular"
        break;
      case 'list':
        pageContent = <ListCirculars 
          authInfo={authInfo.data} 
          history={history}
          listSchoolCirculars={listSchoolCirculars}
        />
        dispName = "List Circulars"
        break;
      case 'edit':
        let selectedObj = '';
        if(paramResult.p.split("_")[2]) {
          selectedObj = _.find(listSchoolCirculars, (n) => { return n.id === parseInt(paramResult.p.split("_")[2]) })
        }
        pageContent = <AddCircular
          authInfo={authInfo.data} 
          history={history}
          createUpdateCircular={createUpdateCircular}
          selectedCircularInfo={selectedObj}
          mode="Edit"
        />

        dispName = "Edit Circular"
        break;
      default:
        pageContent = <CircularDashboard />
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
          <Link to="/km?p=dashboard" className={classes.textLink}>Dashboard</Link> > <Link to="/km?p=circulars" className={classes.textLink}>Circulars</Link> > {dispName}
        </div>
        <div className={classes.rootContent}>
          {currentSubPage}
        </div>
      </div>
    );
  }
}

CircularsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    createUpdateCircular,
    getSchoolCirculars
  }, dispatch)

  const mapStateToProps = state => ({
    listSchoolCirculars: state.Circulars.listSchoolCirculars
  })

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CircularsContainer))