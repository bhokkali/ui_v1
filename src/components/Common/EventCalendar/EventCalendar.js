import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";

export class EventCalendar extends React.Component {
    render() {
        const { myEventsList } = this.props
        const localizer = momentLocalizer(moment)
        return (
            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        )
    }
}

export default EventCalendar