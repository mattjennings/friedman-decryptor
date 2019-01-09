import React, { useState } from 'react'
import { Tweet } from 'react-twitter-widgets'
import { List, ListItem, Typography } from '@material-ui/core'
import { findAcronymMatch } from '../util'
import { makeStyles } from '@material-ui/styles'

const tweetStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))
export default function TweetDecryptor({ url }) {
  const classes = tweetStyles()
  const [acronyms, setAcronyms] = useState([])
  const splitUrl = url && url.split('/status/')

  const statusId = splitUrl && splitUrl[1]

  if (statusId) {
    return (
      <div className={classes.root}>
        <div>
          <Tweet
            tweetId={statusId}
            onLoad={() => {
              // get text from tweet embed element

              const embedElem = document.getElementsByClassName('twitter-tweet')
              const shadowRoot = embedElem[0] && embedElem[0].shadowRoot

              if (shadowRoot) {
                const textElems = shadowRoot.querySelectorAll('.Tweet-text')

                if (textElems && textElems.length > 0) {
                  let acronymsInTweet = []

                  // iterate through all tweet elements and run acronym regex
                  textElems.forEach(elem => {
                    const text = elem.innerHTML

                    // regex may return null, so fallback to empty array
                    const foundAcronyms =
                      text.match(/\b[A-Z]*[a-z]*[A-Z]s?\d*[A-Z]*[-\w+]\b/g) ||
                      []

                    // join results
                    acronymsInTweet = [...acronymsInTweet, ...foundAcronyms]
                  })

                  // deduplicate any acronyms
                  const deduplicated = [...new Set(acronymsInTweet)]

                  setAcronyms(deduplicated)
                }
              }
            }}
          />
          <AcronymsList acronyms={acronyms} />
        </div>
      </div>
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
