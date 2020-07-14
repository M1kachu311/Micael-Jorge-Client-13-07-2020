import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import SingleMail from "./singleMail";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

export default function MailBox(props) {
  const type = props.type;
  const allMails = useSelector((state) => state.messages);
  const classes = useStyles();
  let mails = [];
  if (allMails.fetched) {
    switch (type) {
      case "inbox":
        mails = allMails.inbox;
        break;
      case "outbox":
        mails = allMails.outbox;
        break;
      default:
        break;
    }
  }

  return (
    <div className={classes.root}>
      {mails.map((mail) => {
        return <SingleMail refreshMessages={props.refreshMessages} key={mail.id} type={type} data={mail}/>;
      })}
      {!mails.length?
            <Box display="flex" justifyContent="center" alignItems="center">
              <h3>No mails here, Youre all done!</h3>
            </Box>
      :""}
    </div>
  );
}
