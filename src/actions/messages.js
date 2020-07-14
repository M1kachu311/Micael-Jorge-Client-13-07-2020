
export const getMails = (messages) =>{
    return{
        type:'GETMAILS',
        data:messages
    }
}

export const clearMails = () =>{
    return{
        type:'CLEARMAILS' 
    }
}
