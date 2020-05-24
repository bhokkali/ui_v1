import React from 'react'
import EventCalendar from '../Common/EventCalendar/EventCalendar'
import Heading from '../Common/Heading'

  export default function ListCalendar(props){

      let myEventsList = []
      props.schoolCalendarList.map((opt) => {
        const curObj = {
                        start: opt.event_date,
                        end: opt.event_date,
                        title: opt.event_name,
                        allDay: true
                      }
        myEventsList.push(curObj)
      })

      return (
        <div id="mainContainer">
          <div>
            <Heading
              label="School Calendar"
            />
          </div>
          <EventCalendar 
            myEventsList={myEventsList}
          />
        </div>)
    
  }
