import React, { useState } from 'react'
import { Typography, Grid, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import TweetDecryptor from './TweetDecryptor'
import AcronymDecryptor from './AcronymDecryptor'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      marginTop: 20
    }
  },
  content: {
    marginTop: '40px',
    padding: 10
  }
}))

function Main() {
  const classes = useStyles()

  const [input, setInput] = useState(null)
  const [inputType, setInputType] = useState(null)

  return (
    <div className={classes.root}>
      <Typography variant="h4" align="center">
        Elliotte Friedman Decryptor
      </Typography>
      <Grid className={classes.content} spacing={16} container justify="center">
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth={true}
            variant="outlined"
            label="Enter an acronynm or tweet link"
            value={input}
            onChange={ev => {
              const { value } = ev.target
              if (value.startsWith('https://twitter.com')) {
                setInputType('tweet')
              } else {
                setInputType('acronym')
              }

              setInput(value)
            }}
          />
          {inputType === 'acronym' && <AcronymDecryptor acronym={input} />}
          {inputType === 'tweet' && <TweetDecryptor url={input} />}
        </Grid>
      </Grid>
    </div>
  )
}

export default Main
