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
  
  
  export class ListExams extends React.Component {
    
    
  
    render() {
      const { listExams } = this.props
      
      let myEventsList = []
      listExams.map((opt) => {
        const curObj = {
                        start: opt.start_date,
                        end: opt.end_date,
                        title: opt.exam_name,
                        allDay: true
                      }
        myEventsList.push(curObj)
      })

      return (
        <div id="mainContainer">
          <div>
            <Heading
              label="Exam Calendar"
            />
          </div>
          <EventCalendar 
            myEventsList={myEventsList}
          />
          
        </div>)
    }
  }
  
  

export default withStyles(styles)(ListExams)