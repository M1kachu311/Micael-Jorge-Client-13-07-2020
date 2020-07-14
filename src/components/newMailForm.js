import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Editor } from "@tinymce/tinymce-react";
import { createNewEmail } from "../api/messages";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function NewMailForm(props) {
  const classes = useStyles();
  const token = useSelector((state) => state.auth.token);
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleEditorChange = (content, editor) => {
    setContent(content);
  };

  const handleSend = (e) => {
    setError(null);
    setMessage(null);
    if (!recipient || !subject || !content) {
      setError("All fields are mandatory");
      return;
    }
    createNewEmail(token, recipient, subject, content)
      .then((data) => {
        props.refreshMessages();
        setMessage("Message Sent Successfully");
        setRecipient("");
        setSubject("");
        setContent("");
      })
      .catch((err) => {
        setError(err);
      });
  };
  return (
    <div className={classes.layout}>
      <Typography variant="h6" gutterBottom>
        Compose New Mail
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="recipient"
            label="Recipient"
            fullWidth
            autoComplete="recipient"
            value={recipient}
            onInput={(e) => setRecipient(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="subject"
            label="Subject"
            fullWidth
            autoComplete="subject"
            value={subject}
            onInput={(e) => setSubject(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Editor
            initialValue=""
            value={content}
            init={{
              height: 250,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
            }}
            onEditorChange={handleEditorChange}
          />
        </Grid>
        <Grid item xs={12}>
          {error ? <Alert severity="error">{error}</Alert> : ""}
          {message ? <Alert severity="info">{message}</Alert> : ""}
        </Grid>
        <Grid
          container
          alignItems="flex-start"
          justify="flex-end"
          direction="row"
        >
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleSend}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
