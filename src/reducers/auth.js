const initialState={
    isLoggedIn:false,
    token:null,
    username:''
}
const authReducer= (state=initialState,action)=>{
    switch(action.type){
        case 'LOGIN':
            return {
                isLoggedIn:true,
                token:action.data.token,
                username:action.data.username
            }
        case 'LOGOUT':
            return {
                isLoggedIn:false,
                token:null,
                username:''
            }
        default:
        return state;
    }
}
export default authReducer