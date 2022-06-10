export default function authHeader() {
    const config = localStorage.getItem("token");
    if (config) {
      return { Authorization: 'Bearer ' + config };
    } 
    else {
      return {};
    }
}