const initialState={
    outbox:[],
    inbox:[],
    fetched:false
}
const messageReducer= (state=initialState,action)=>{
    switch(action.type){
        case "GETMAILS":
            return {
                outbox:action.data.outbox,
                inbox:action.data.inbox,
                fetched:true
          };
          case "CLEARMAILS":
              return initialState;
          default:
            return state;
    }
}
export default messageReducer