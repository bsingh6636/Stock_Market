export const formvalidate = (email,password) => {
    const isemailvalid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const ispasswordvalid = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})$/.test(password);
  
  
    if(!isemailvalid) return "Email is not valid";
    if(!ispasswordvalid)return "Enter 8 character valid password";
    // if(!ispasswordvalid)return null;
  
    return null ;
  
  }
  
  