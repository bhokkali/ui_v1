import React from 'react'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import EventCalendar from '../Common/EventCalendar/EventCalendar'
import Heading from '../Common/Heading'

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
  
  
  export class TeacherAttendanceCalendar extends React.Component {
    
    constructor(props) {
      super(props)
      this.state = {
        columnDef: [],
        userRowData: []
      }
    }
    
    /*static getDerivedStateFromProps(props, state) {
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
    } */
  
    render() {
      const { classes, listTeacherAttendance } = this.props
      const { columnDef, userRowData } = this.state

      let myEventsList = []
      listTeacherAttendance.map((opt) => {
        const allDay = opt.absent_period === 'Full Day' ? true : false
        const curObj = {
                        start: opt.from_date,
                        end: opt.to_date,
                        title: opt.teacher_name+" - "+opt.leave_type,
                        allDay: allDay
                      }
        myEventsList.push(curObj)
      })
      /*const myEventsList = [
        {
            start: '2020-04-15',
            end: '2020-04-19',
            title: 'test event',
            allDay: true
        },
        {
            start: '2020-03-29',
            end: '2020-03-29',
            title: 'test event',
            allDay: false
        },
    ]*/

      
      
      return (
        <div id="mainContainer">
          <div>
            <Heading
              label="Teacher Attendance Calendar"
            />
        </div>
          <EventCalendar 
            myEventsList={myEventsList}
          />
          {/*<SimpleTable 
            columnDef={columnDef} 
            rows={userRowData}
          />*/}
        </div>)
    }
  }
  
  

export default withStyles(styles)(TeacherAttendanceCalendar)