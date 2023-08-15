

export default function validateSignIn(data) {
    let error = "";
    var data = {
      email: data.email,
      password: data.password,
    };
  
    if (data.password) {
      var reges = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[#!*@$%^&()\-_]+)[A-Za-z\d#!*@$%^&()]{8,20}$/
      let res = reges.test(data.password);
      if (!res) error += '*הסיסמא שגויה'
    }
    else {
      error += '*הסיסמא שגויה'
    }
  
    if (data.email) {
      var reg =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var response = reg.test(data.email);
      if (!response) {
        error += "נא הכנס אימייל תקני *";
      }
    } else {
      error += "נא הכנס אימייל תקני   *";
    }
  
    return error || data;
  }