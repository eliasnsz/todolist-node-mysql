import { Divider, Heading } from '@chakra-ui/react'
import { FC } from 'react'


export const Header: FC = (props) => {
  return (
    <>
      <Heading
        mb={2}
        fontSize="2em"
      >
        Minhas tarefas:
      </Heading>
      <Divider 
        my={4}
        opacity={1}
        borderColor="#9F00AB" 
      />
    </>
  )
}
