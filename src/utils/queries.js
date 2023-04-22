export const userQuery = (userid)=>{
const query = `*[_type == "user" && _id == '${userid}' ]`
return query
}

export const searchQuery = (search) =>{
    const query = `*[_type == "pin" && title match '${search}*' || category match '${search}*' || about match '${search}*']  {
        image{
            asset ->{
                url
            }
        },
        _id,
        destination,
        postedBy{
            _id,
            userName,
            image
        },
        save[]{
            _key,
            postedBy{
                _id,
                userName,
                image,
            }

        }
    }`
    
    return query

}

export const feedQuery = `*[_type == "pin"] | order(_createAt desc) {
    image{
        asset ->{
            url
        }
    },
    _id,
    destination,
    postedBy{
        _id,
        userName,
        image
    },
    save[]{
        _key,
        postedBy{
            _id,
            userName,
            image,
        }

    }
} `





























export const fetchUser = () =>{
    const userInfo =  localStorage.getItem("user") !== undefined
? JSON.parse(localStorage.getItem("user"))
: localStorage.clear();
 return userInfo
}