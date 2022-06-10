import React from "react";
import AppUser from "./user/layout/appUser.jsx"
import AppAdmin from "./admin/layout/appAdmin.jsx";

const AD = localStorage.getItem("role");
console.log(AD)
class App extends React.Component {
 
  render() {{
    if(AD=="ROLE_ADMIN"){
      return (
        <AppAdmin/>)
    }
    else {
      return(
        <AppUser/>)
    }
  }
  }
}

export default (App);
