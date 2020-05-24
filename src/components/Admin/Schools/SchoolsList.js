import React from 'react'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import SimpleTable from '../../Common/Table/SimpelTable'
import LinkDisp from '../../Common/LinkDisp'

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        height: 300,
      },
      iconStyle: {
        fontSize: 42,
        transform: 'rotate(90deg)'
      },
  };

export class SchoolsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            columnDef: [],
            userRowData: []
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { adminSchoolsList } = props
        if (adminSchoolsList.length > 0) {
          // Construct column data
          let columnDef = Object.keys(adminSchoolsList[0])
          columnDef = _.remove(columnDef, function(n) {
            return (n !== 'academic_year_id' && n !== 'academic_year' && n !== 'teachers_count' && n !== 'grades_count' && n !== 'students_count');
          });
          if(columnDef.indexOf('Action') === -1) {
              columnDef.push('Action')
          } 
          //Construct Row Data
          let userRowData = []
          adminSchoolsList.map((obj) => {
            obj.Action = <LinkDisp 
              kmLink="/km?p=admin_schoolEdit" 
              kmLinkId={obj.id}
              kmLinkName="Edit" 
          /> 
            userRowData.push(obj)
          })
  
          return {
              columnDef,
              userRowData
          }
  
        }
      }


  

    render () {
        const { classes } = this.props
        const { columnDef, userRowData } = this.state

        return (
            <div className={classes.root}>
                <SimpleTable 
                    columnDef={columnDef} 
                    rows={userRowData}
                />
            </div>
        )
    }
}

SchoolsList.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(SchoolsList)
