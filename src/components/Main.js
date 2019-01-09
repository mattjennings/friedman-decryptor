import React, { useState } from 'react'
import { Typography, Grid, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import TweetDecryptor from './TweetDecryptor'
import AcronymDecryptor from './AcronymDecryptor'
import { useUrlState } from 'with-url-state'
import { blue } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 40,
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      paddingTop: 20
    }
  },
  content: {
    flexGrow: 1,
    marginTop: '20px',
    padding: 20
  },
  mattjennings: {
    color: blue[800],
    textDecoration: 'none'
  }
}))

function Main() {
  const classes = useStyles()

  const [urlState, setUrlState] = useUrlState({})
  const [input, setInput] = useState(
    urlState.text ||
      'https://twitter.com/FriedgeHNIC/status/1082684329921110016'
  )

  const inputType = input.startsWith('https://twitter.com')
    ? 'tweet'
    : 'acronym'

  return (
    <div className={classes.root}>
      <Typography variant="h4" align="center">
        Elliotte Friedman Decryptor
      </Typography>
      <Typography variant="subtitle1" align="center">
        by{' '}
        <a href="https://mattjennings.io" className={classes.mattjennings}>
          matt jennings
        </a>
      </Typography>
      <Grid className={classes.content} spacing={24} container justify="center">
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            fullWidth={true}
            variant="outlined"
            label="Enter an acronynm or tweet link"
            value={input}
            onChange={ev => {
              const { value } = ev.target

              setUrlState({ text: value })

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
