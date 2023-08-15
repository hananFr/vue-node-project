export function validateMessage(obj) {
    console.log(obj);
    let error = "";
    var data = {
      phone: obj.phone,
      message: obj.message,
      email: obj.email,
      favoriteAccess: obj.favoriteAccess,
      name: obj.name,
    };
  
      var reges =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var res = reges.test(data.email);
      if (!res) {
        error += "אנא מלא אימייל תקין";
      }
    
    
    if (!data.message || data.message.length < 2) {
      error += "השם חייב להכיל שני תווים לפחות";
    }
        function validatePhoneNumber(phoneNumber) {
            const regex = /^(?:\+972|0)(?:\-)?(?:5[02-9]|77(?:[1-9]|[0-9]{2})|81[0-9]|89[1-9])[0-9]{6}$/;
            const res = regex.test(phoneNumber);
          if(!res) error += "אנא מלא מספר טלפון תקין";
    }
    if (!data.name || data.name.length < 2) {
      error += "השם חייב להכיל שני תווים לפחות";
    }
    if (!data.favoriteAccess == 'דרך פנייה מועדפת') {
      error += "אנא ציין איך אתה רוצה שנפנה אליך";
    }
  
    return error || data;
  }