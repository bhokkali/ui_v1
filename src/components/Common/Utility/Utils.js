
export function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

export function ValidateEmail (emailField) {
    var atposition=emailField.indexOf("@");  
    var dotposition=emailField.lastIndexOf(".");  
    if (atposition<1 || dotposition<atposition+2 || dotposition+2>=emailField.length){  
        return false;  
    } 
    return true
}

export function isEmpty (data) {
    return (data === null ||
    data === undefined ||
    (data.hasOwnProperty('length') && data.length === 0) ||
    (data.constructor === Object && Object.keys(data).length === 0))
  }

  export function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function checkCookie() {
    var user = getCookie("login_name");
    return (user !== "") ? true : false
}

export function deleteCookie(cname) {
    var d = new Date(); //Create an date object
    d.setTime(d.getTime() - (1000*60*60*24)); //Set the time to the past. 1000 milliseonds = 1 second
    var expires = "expires=" + d.toGMTString(); //Compose the expirartion date
    window.document.cookie = cname + "=" + "; " + expires;//Set the cookie with name and the expiration date
}

export function changeDateFormat(checkDate) {
    const dateArray = checkDate.split("/")
    return dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0]
    /* const dt = new Date(checkDate)
    console.log(dt)
    var dd = dt.getDate();
    var mm = dt.getMonth()+1; //January is 0!
    mm = mm < 10 ? '0'+mm : mm
    var yyyy = dt.getFullYear();
    return yyyy + '-' + mm + '-' + dd */
}

export function getFormatedDate (dt) {
    const month = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
    if (dt) {
      let fdate = new Date(dt)
      var mm = fdate.getMonth()
      var dd = fdate.getDate()
  
      return [
        month[mm], ' ',
        (dd > 9 ? '' : '0') + dd, ', ',
        fdate.getFullYear(),
  
      ].join('')
    } else {
      return ''
    }
}

export function getCurrentDateForDateField () {
  var dt = new Date();
  var dd = dt.getDate();
  var mm = dt.getMonth()+1; //January is 0!
  mm = mm < 10 ? '0'+mm : mm
  var yyyy = dt.getFullYear();
  return yyyy + '-' + mm + '-' + dd 
}

export function arrowGenerator(color) {
    return {
      '&[x-placement*="bottom"] $arrow': {
        top: 0,
        left: 0,
        marginTop: '-0.95em',
        width: '3em',
        height: '1em',
        '&::before': {
          borderWidth: '0 1em 1em 1em',
          borderColor: `transparent transparent ${color} transparent`,
        },
      },
      '&[x-placement*="top"] $arrow': {
        bottom: 0,
        left: 0,
        marginBottom: '-0.95em',
        width: '3em',
        height: '1em',
        '&::before': {
          borderWidth: '1em 1em 0 1em',
          borderColor: `${color} transparent transparent transparent`,
        },
      },
      '&[x-placement*="right"] $arrow': {
        left: 0,
        marginLeft: '-0.95em',
        height: '3em',
        width: '1em',
        '&::before': {
          borderWidth: '1em 1em 1em 0',
          borderColor: `transparent ${color} transparent transparent`,
        },
      },
      '&[x-placement*="left"] $arrow': {
        right: 0,
        marginRight: '-0.95em',
        height: '3em',
        width: '1em',
        '&::before': {
          borderWidth: '1em 0 1em 1em',
          borderColor: `transparent transparent transparent ${color}`,
        },
      },
    };
  }

  export function sortData (order, orderBy) {
    return order === 'desc' ? (a, b) => b[orderBy] - a[orderBy] : (a, b) => a[orderBy] - b[orderBy]
}

export function getUrlParams (params) {
  let inputArr = params.split("?")
  let outputArray = {}
  if(inputArr.length > 1) {
    inputArr = inputArr[1].split("&")
    inputArr.forEach((input) => {
      const data = input.split("=")
      outputArray[data[0]] = data[1]
    })
  }
  return outputArray
}

export function schoolTimeList() {
    let hours, minutes, ampm;
    let listTime = []
    for(let i = 420; i <= 1320; i += 15){
        hours = Math.floor(i / 60);
        minutes = i % 60;
        if (minutes < 10){
            minutes = '0' + minutes; // adding leading zero
        }
        ampm = hours % 24 < 12 ? 'AM' : 'PM';
        hours = hours % 12;
        if (hours === 0){
            hours = 12;
        }
        listTime.push(hours + ':' + minutes + ' ' + ampm)
    }
    return listTime;
}

export function getCurrentAcademicYear() {
  let curDate = new Date()
  let currentYear = curDate.getFullYear()
  let currentMonth = curDate.getMonth() + 1
  let currentAcademicYear = ''
  let prevYear = parseInt(currentYear) - 1
  let nextYear = parseInt(currentYear) + 1
  if(currentMonth >= 4) {
    currentAcademicYear = currentYear + "-" + nextYear
  } else {
    currentAcademicYear =  prevYear + "-" + currentYear
  }
  return currentAcademicYear;
}

export function getNextAcademicYear(currentAcademicYear) {
  let nextYearArr = currentAcademicYear.split("-")
  let nextYear = parseInt(nextYearArr[0]) + 1
  let nextToNextYear = parseInt(nextYearArr[1]) + 1
  let nextAcademicYear = nextYear + "-" + nextToNextYear
  return nextAcademicYear;
}

export function getTableHead (obj) {
  let arr = obj.split("_")
  let str = ''
  arr.map((obj) => {
      str += obj.charAt(0).toUpperCase() + obj.slice(1) + ' ';
  })
  return str
}

export function getAttendanceDateRanges(days) {
  let dateRange = {min: '', max: ''}
  var date = new Date();
  var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));

  var c_day =date.getDate();
  c_day = c_day < 10 ? '0'+c_day : c_day
  var c_month=date.getMonth()+1;
  c_month = c_month < 10 ? '0'+c_month : c_month
  var c_year=date.getFullYear();

  var l_day =last.getDate();
  l_day = l_day < 10 ? '0'+l_day : l_day
  var l_month=last.getMonth()+1;
  l_month = l_month < 10 ? '0'+l_month : l_month
  var l_year=last.getFullYear();

  dateRange.min = l_year+"-"+l_month+"-"+l_day
  dateRange.max = c_year+"-"+c_month+"-"+c_day
  return dateRange
}

export function getCurrentDate() {
  //return format YYYY-mm-dd
  let date = new Date()
  var day = date.getDate()
  var month = date.getMonth() + 1
  var year = date.getFullYear()
  day = day < 10 ? "0"+day : day
  month = month < 10 ? "0"+month : month
  let retDate = year+"-"+month+"-"+day
  return retDate
}