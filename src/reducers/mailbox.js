const initialState = {
  selectedPage: "inbox"
};
const mailboxReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INBOX":
      return {
        selectedPage: "inbox"
    };
    case "OUTBOX":
      return {
        selectedPage: "outbox"
    };
    case "COMPOSE":
      return {
        selectedPage: "compose"
    };
    default:
      return state;
  }
};
export default mailboxReducer;
