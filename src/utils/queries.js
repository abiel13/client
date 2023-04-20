export const userQuery = (userid)=>{
const query = `*[_type == "user" && _id == '${userid}' ]`
return query
}