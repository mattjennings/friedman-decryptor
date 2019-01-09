import { List, ListItem, Typography } from '@material-ui/core'

import React from 'react'
import { findAcronymMatch } from '../util'

export default function AcronymDecryptor({ acronym }) {
  const results = findAcronymMatch(acronym)

  return acronym.length > 1 ? (
    <List>
      {results.map(result => (
        <ListItem key={result}>
          <Typography key={result} variant="subtitle1">
            {result}
          </Typography>
        </ListItem>
      ))}
    </List>
  ) : null
}
