export const login =(token,username)=>{
    return{
        type:'LOGIN',
        data:{token,username}
    }
}
export const logout =()=>{
    return{
        type:'LOGOUT'
    }
}
