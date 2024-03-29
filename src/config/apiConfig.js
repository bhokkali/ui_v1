const config = {
    //commonPath: 'http://localhost:8090/api/v1/', //local
    commonPath: 'https://bhokkali.com/api/v1/', //prod
    admin: {
        createUpdateAcademicYear: 'createUpdateAcademicYear',
        createUpdateSchool: 'createUpdateSchool',
        listSchools: 'listSchools',
        createUpdateGrade: 'createUpdateGrade',
        listGrades: 'listGrades',
        createUpdateSubject: 'createUpdateSubject',
        listSubjects: 'listSubjects',
        createUpdatePermission: 'createUpdatePermission',
        listPermissions: 'listPermissions'
    },
    auth: {
        schoolLogin: 'schoolLogin',
        forgot_password: 'forgot_password_temp',
        adminLogin: 'adminLogin',
        subadminLogin: 'subadminLogin'
    },
    profile: {
        update_school_info: 'createUpdateSchool',
        school_change_password: 'schoolChangePassword',
        createUpdateSubadmin: 'createUpdateSubadmin',
        listSubadmins: 'listSubadmins'
    },
    masters: {
        list_grades_master: 'listGrades',
        list_academic_years: 'getAcademicYearsList',
        list_school_teachers: 'getSchoolTeachers',
        list_subjects: 'listSubjects',
        getAcademicYearInfoFromYearString: 'getAcademicYearInfoFromYearString'
    },
    schoolGrades: {
        createUpdateSchoolGrade: 'createUpdteSchoolGrade',
        listSchoolGrades: 'listSchoolGrades',
        createUpdateMarkGrade: 'createUpdateMarkGrade',
        listMarkGrades: 'listMarkGrades'
    },
    teachers: {
        createUpdateTeacher: 'createUpdateTeacher',
        getSchoolTeachers: 'getSchoolTeachers',
        getSubjectTeachers: 'getSubjectTeachers',
        checkAvailabilityTeacher: 'checkAvailabilityTeacher'
    },
    parents: {
        createUpdateParent: 'createUpdateParents',
        getSchoolParents: 'getAllParents',
        checkAvailabilityParents: 'checkAvailabilityParents',
        getParentInfo: 'getParentInfo',
        searchParents: 'searchParents'
    },
    students: {
        createUpdateStudent: 'createUpdateStudents',
        getSchoolStudents: 'getAllStudents',
        listAcademicStudents: 'listAcademicStudents',
        createUpdateExamMarks: 'createUpdateExamMarks',
        listExamGradeMarks: 'listExamGradeMarks',
        listExamReports: 'listExamReports',
        createUpdateExamReport: 'createUpdateExamReport',
        listStudentGradeAttendance: 'listStudentGradeAttendance',
        createUpdateStudentAttendance: 'createUpdateStudentAttendance',
        listAllExamReports: 'listAllExamReports',
        updateAcademicPromotion: 'updateAcademicPromotion',
        listStudentAttendanceCalendar: 'listStudentAttendanceCalendar',
        searchStudent: 'searchStudent'
    },
    schoolCalendar: {
        createUpdateCalendar: 'createUpdateCalendar',
        getSchoolCalendar: 'getSchoolCalendar'
    },
    periods: {
        createUpdatePeriod: "createUpdatePeriod",
        getSchoolPeriods: "getSchoolPeriods"
    },
    timetable: {
        getSchoolTimeTable: 'listSchoolTimeTable',
        createUpdateTimeTable: 'createTimeTable',
        getGradeTimeTable: 'getGradeTimeTable',
        getTeacherTimeTable: 'getTeacherTimeTable',
        listSchoolActiveSubjects: 'listSchoolActiveSubjects'
    },
    teacherAttendance: {
        addTeacherAttendance: 'addUpdateTeacherAttendance',
        getTeacherAttendance: 'listSchoolStaffAttendance'
    },
    exams: {
        createUpdateExam: 'createUpdateExam',
        getExamsList: 'listExams',
        listGradeExams: 'listGradeExams',
        createUpdateExamGrade: 'createUpdateExamGrade'
    },
    circulars: {
        createUpdateCircular: 'createUpdateCircular',
        listSchoolCirculars: 'listSchoolCirculars'
    }
}

export default config