import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import Auth from './store/Auth/reducer'
import Snackbars from './store/Snackbars/reducer'
import Masters from './store/Masters/reducer'
import Teachers from './store/Teachers/reducer'
import Parents from './store/Parents/reducer'
import Students from './store/Students/reducer'
import Grades from './store/SchoolGrades/reducer'
import Calendar from './store/SchoolCalendar/reducer'
import Periods from './store/Periods/reducer'
import TimeTable from './store/TimeTable/reducer'
import TeacherAttendance from './store/TeacherAttendance/reducer'
import Exams from './store/Exams/reducer'
import Circulars from './store/Circulars/reducer'
import Admin from './store/Admin/reducer'

export default createStore(
  combineReducers({
    Auth,
    Snackbars,
    Masters,
    Teachers,
    Parents,
    Students,
    Grades,
    Calendar,
    Periods,
    TimeTable,
    TeacherAttendance,
    Exams,
    Circulars,
    Admin
  }),
  applyMiddleware(
    ReduxThunk
  )
)
