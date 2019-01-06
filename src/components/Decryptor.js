import {
  Typography,
  TextField,
  Grid,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'

import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import teamFinder from 'team-finder'

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

export default function Decryptor() {
  const classes = useStyles()

  const [acronym, setAcronym] = useState('')

  const results = findMatch(acronym)
  return (
    <div className={classes.root}>
      <Typography variant="h4" align="center">
        Elliotte Friedman Decryptor
      </Typography>
      <Grid className={classes.content} container justify="center">
        <Grid item>
          <TextField
            variant="outlined"
            label="Enter an acronynm"
            value={acronym}
            onChange={ev => setAcronym(ev.target.value)}
          />
          {acronym.length > 1 && (
            <List>
              {results.map(result => (
                <ListItem key={result}>
                  <ListItemText primary={result} />
                </ListItem>
              ))}
            </List>
          )}
        </Grid>
      </Grid>
    </div>
  )
}

const teams = teamFinder.getAllTeams()
const teamNames = Object.keys(teams).map(team => teams[team].fullName)

function findMatch(acronym) {
  return teamNames.filter(team => {
    const firstLetter = acronym.charAt(0).toUpperCase()
    return (
      team.indexOf(firstLetter) === 0 &&
      isConsecutiveCharMatch(acronym.toUpperCase(), team.toUpperCase())
    )
  })
}

/**
 * Searches for a consecutive char match from "term" in "text"
 *
 * for example: isConsecutiveCharMatch("VCR", "VANCOUVER") will return true because the characters 'V', 'C', 'R' appear in that order for "VANCOUVER"
 */
function isConsecutiveCharMatch(
  term,
  text,
  currentTermIndex = 0,
  currentTextIndex = 0
) {
  if (currentTermIndex > term.length - 1) {
    return true
  }

  const termChar = term.charAt(currentTermIndex)
  const slicedText = text.slice(currentTextIndex)
  const textMatchIndex = slicedText.indexOf(termChar) + currentTextIndex

  return currentTextIndex < text.length - 1
    ? textMatchIndex >= currentTextIndex &&
        isConsecutiveCharMatch(
          term,
          text,
          currentTermIndex + 1,
          textMatchIndex + 1
        )
    : false
}
