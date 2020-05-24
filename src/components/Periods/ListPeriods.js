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
  
  
  export class ListPeriods extends React.Component {
    
    constructor(props) {
      super(props)
      this.state = {
        columnDef: [],
        userRowData: []
      }
    }
    
    static getDerivedStateFromProps(props, state) {
      const { listSchoolPeriods } = props
      if (listSchoolPeriods && listSchoolPeriods.length > 0) {
        // Construct column data
        let columnDef = Object.keys(listSchoolPeriods[0])
        columnDef = _.remove(columnDef, function(n) {
          return (n !== 'id' && n !== 'school_id' && n !== 'created_date' && n !== 'updated_date');
        });
        if(columnDef.indexOf('Action') === -1) {
            columnDef.push('Action')
        } 
        //Construct Row Data
        let userRowData = []
        listSchoolPeriods.map((obj) => {
          obj.Action = <div><LinkDisp 
            kmLink="/km?p=periods_edit" 
            kmLinkId={obj.id}
            kmLinkName="Edit" 
        /></div>
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
            label="List Periods"
          />
        </div>)
    }
  }
  
  

export default withStyles(styles)(ListPeriods)