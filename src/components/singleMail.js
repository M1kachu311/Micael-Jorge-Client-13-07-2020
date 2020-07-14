import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useSelector } from "react-redux";
import { deleteEmailById } from "../api/messages";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
    alignSelf: "center",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    alignSelf: "center",
  },
}));

export default function SingleMail(props) {
  const classes = useStyles();
  const token = useSelector((state) => state.auth.token);
  const id = props.data.id;
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    handleClose();
    deleteEmailById(token, id)
      .then((data) => {
        props.refreshMessages();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div>
      <Accordion
        style={{ marginRight: "5px", marginBottom: "10px" }}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>
            {props.type === "inbox" ? "From: " + props.data.sender : ""}
            {props.type === "outbox" ? "To: " + props.data.recipient : ""}
          </Typography>
          <Typography className={classes.secondaryHeading}>
            {props.data.subject}
          </Typography>
          <IconButton
            style={{ marginLeft: "auto" }}
            size="medium"
            aria-label="delete selected"
            component="span"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              handleClickOpen();
            }}
          >
            <DeleteIcon />
          </IconButton>
        </AccordionSummary>
        <AccordionDetails
          style={{ borderTop: "1px solid rgba(0, 0, 0, .125)" }}
        >
          <div
            style={{ width: "100%" }}
            dangerouslySetInnerHTML={{ __html: props.data.content }}
          />
        </AccordionDetails>
      </Accordion>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete this message?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This actions is irreversible, are you sure you want to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            No
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
