export function validateEditUser(
    obj
  ) {
    console.log(obj);
    let error = "";
    var data = {
      image: obj.image,
      about_writer: obj.about_writer,
      email: obj.email,
      name: obj.name,
    };
  
    if(!data.image){
      console.log(data);
      error = 'אנא הוסף את תמונך לאתר'
    }
  
    if (data.email) {
      var reges =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var res = reges.test(data.email);
      if (!res) {
        error += "אנא מלא אימייל תקין";
      }
    
    }
    if (!data.name || data.name.length < 2) {
      error += "השם חייב להכיל שני תווים לפחות";
    }
  
    return error || data;
  }