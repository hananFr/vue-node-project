   
export function CardValid( obj ) {
    let error = "";
    let data = {
      travelName: obj.travelName,
      headerContext: obj.headerContext,
      travelDescription: obj.travelDescription,
      travelAddress: obj.travelAddress,
      travelCategory: obj.travelCategory,
      travelImage: obj.travelImage,
      travelDate: obj.travelDate
      
    };
    if (!data.travelName || data.travelName.length < 2) {
      error += `השם חייב להכיל שני תווים לפחות`;
    }
    if (!data.headerContext || data.headerContext.length < 10 || data.headerContext.length > 100) {
      error += `השם חייב להכיל עשרה תווים לפחות ולא יותר ממאה`;
    }
  
    if (!data.travelDescription || data.travelDescription.length < 2) {
      error += `תיאור הטיול חייב לכלול שני תווים לפחות!`;
    }
    if (!data.travelAddress || data.travelAddress.length < 2) {
      error += `הכתובת חייבת להכיל שני תווים לפחות`;
    }
  
    if (!data.travelCategory || data.travelCategory === 'בחר קטגוריה') {
      error += "אתה חייב לבחור קטגוריה!";
    }
    if(!data.travelImage) error += 'אנא צרף תמונה!'
  
  
    return error || data;
  }
  
  