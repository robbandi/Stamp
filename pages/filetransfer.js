import React from 'react'
import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function FileTransfer() {
  const classes = useStyles()
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = data => {
    // Send email with link to file
    axios.post('/api/send-email', {
      sender: data.sender,
      receiver: data.receiver,
      fileUrl: 'https://your-file-url.com',
    })
  }

  return (
    <div className={classes.container}>
      <Head>
        <title>File Transfer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Your Email"
          name="sender"
          inputRef={register({ required: true })}
          error={Boolean(errors.sender)}
          helperText={errors.sender && 'Email is required'}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Receiver's Email"
          name="receiver"
          inputRef={register({ required: true })}
          error={Boolean(errors.receiver)}
          helperText={errors.receiver && 'Email is required'}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Send File
        </Button>
      </form>
    </div>
  )
}