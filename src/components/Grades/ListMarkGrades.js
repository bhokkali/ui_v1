import React from 'react'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import SimpleTable from '../Common/Table/SimpelTable'
import LinkDisp from '../Common/LinkDisp'

const styles = {
    root: {
      display: 'flex',
      height: 300,
    },
    paper: {
      margin: '10px 0px',
      padding: '10px',
    }
  };
  
  
  export class ListMarkGrades extends React.Component {
    
    constructor(props) {
      super(props)
      this.state = {
        columnDef: [],
        userRowData: []
      }
    }
    
    static getDerivedStateFromProps(props, state) {
      const { schoolMarkGradesList } = props
      if (schoolMarkGradesList.length > 0) {
        // Construct column data
        let columnDef = Object.keys(schoolMarkGradesList[0])
        columnDef = _.remove(columnDef, function(n) {
          return (n !== 'id' && n !== 'school_id');
        });
        if(columnDef.indexOf('Action') === -1) {
            columnDef.push('Action')
        } 
        //Construct Row Data
        let userRowData = []
        schoolMarkGradesList.map((obj) => {
          obj.Action = <LinkDisp 
            kmLink="/km?p=grades_editMarkGrade" 
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
  
    render() {
      const { classes } = this.props
      const { columnDef, userRowData } = this.state
      
      return (
        <div id="mainContainer">
          <SimpleTable 
            columnDef={columnDef} 
            rows={userRowData}
            label="List Mark Grades"
          />
        </div>)
    }
  }
  
  

export default withStyles(styles)(ListMarkGrades)