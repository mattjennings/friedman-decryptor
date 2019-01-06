import React, { Component } from 'react'
import { CssBaseline, createMuiTheme } from '@material-ui/core'
import { install, ThemeProvider } from '@material-ui/styles'
import Decryptor from './Decryptor'

install()

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
})
class App extends Component {
  render() {
    return (
      <>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Decryptor />
        </ThemeProvider>
      </>
    )
  }
}

export default App
