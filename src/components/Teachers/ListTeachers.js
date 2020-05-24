import React from 'react'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import SimpleTable from '../Common/Table/SimpelTable'
import LinkDisp from '../Common/LinkDisp'
import { optionsSupported } from 'dom-helpers/cjs/addEventListener'

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
  
  
  export class ListTeachers extends React.Component {
    
    constructor(props) {
      super(props)
      this.state = {
        columnDef: [],
        userRowData: []
      }
    }
    
    static getDerivedStateFromProps(props, state) {
      const { listSchoolTeachers, subjectsMaster } = props
      if (listSchoolTeachers.length > 0) {
        // Construct column data
        let columnDef = Object.keys(listSchoolTeachers[0])
        columnDef = _.remove(columnDef, function(n) {
          return (n !== 'id' && n !== 'school_id' && n !== 'releving_date' && n !== 'login_name' && n !== 'login_pwd' && n !== 'subject_info');
        });
        if(columnDef.indexOf('Action') === -1) {
            columnDef.push('Action')
        } 
        //Construct Row Data
        let userRowData = []
        
        listSchoolTeachers.map((obj) => {
          let subjectsArr = []
          obj.Action = <LinkDisp 
            kmLink="/km?p=teachers_edit" 
            kmLinkId={obj.id}
            kmLinkName="Edit" 
        />
        obj.subject_info.map((opt) => {
          subjectsArr.push(opt.subject_name)
        })
          
          obj.subjects = subjectsArr.toString()
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
            label="List Teachers"
          />
        </div>)
    }
  }
  
  

export default withStyles(styles)(ListTeachers)