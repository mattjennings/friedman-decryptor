import React, { useState } from 'react'
import { Tweet } from 'react-twitter-widgets'
import { List, ListItem, Typography } from '@material-ui/core'
import { findAcronymMatch } from '../util'
import { makeStyles } from '@material-ui/styles'

export default function TweetDecryptor({ url }) {
  const [acronyms, setAcronyms] = useState([])
  const splitUrl = url && url.split('/status/')

  const statusId = splitUrl && splitUrl[1]

  if (statusId) {
    return (
      <>
        <Tweet
          tweetId={statusId}
          onLoad={() => {
            // get text from tweet embed element

            const embedElem = document.getElementsByClassName('twitter-tweet')
            const shadowRoot = embedElem[0] && embedElem[0].shadowRoot

            if (shadowRoot) {
              const textElem = shadowRoot.querySelector('.Tweet-text')
              const text = textElem.innerHTML
              const acronyms = text.match(
                /\b[A-Z]*[a-z]*[A-Z]s?\d*[A-Z]*[\-\w+]\b/g
              )
              const deduplicated = [...new Set(acronyms)]
              setAcronyms(deduplicated)
            }
          }}
        />
        <AcronymsList acronyms={acronyms} />
      </>
    )
  }

  return null
}

const acronymListStyles = makeStyles(theme => ({
  acronymItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'start'
  },
  results: {
    marginTop: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start'
  }
}))

function AcronymsList({ acronyms }) {
  const classes = acronymListStyles()

  if (!acronyms || acronyms.length === 0) {
    return null
  }

  return (
    <List>
      {acronyms.map(acronym => {
        const results = findAcronymMatch(acronym)

        if (results.length === 0) {
          return null
        }
        return (
          <ListItem key={acronym} className={classes.acronymItem}>
            <Typography variant="h6">{acronym}</Typography>
            <div className={classes.results}>
              {results.map(result => (
                <Typography key={result} variant="subtitle1">
                  {result}
                </Typography>
              ))}
            </div>
          </ListItem>
        )
      })}
    </List>
  )
}
