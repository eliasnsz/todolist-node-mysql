import { Stack } from '@chakra-ui/react'
import React, { FC } from 'react'

interface IProps {
  children: React.ReactElement
}

export const CardContainer:FC<IProps> = ({ children }) => {
  return (
    <Stack 
      h="90%"
      sx={{
        "&::-webkit-scrollbar": {
          width: "0.4em", 
          height: "0.4em", 
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent", 
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#A333AB", 
          borderRadius: "full", 
        },
      }}
      overflowY="scroll" 
    >
      {children}
    </Stack>
  )
}
