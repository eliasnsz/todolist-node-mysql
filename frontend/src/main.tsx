import App from './App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import "@fontsource/rubik"

import { ChakraBaseProvider, extendTheme } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from "react-query"

import "moment/locale/pt-br"
import moment from 'moment'

moment.locale("pt-br")

const fonts = {
  primary: "Rubik"
}

const queryClient = new QueryClient()

const theme = extendTheme({ fonts })

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>  
    <QueryClientProvider client={queryClient}>
      <ChakraBaseProvider theme={theme}>
        <App />
      </ChakraBaseProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
