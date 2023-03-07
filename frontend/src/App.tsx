import { Box, Button, Center, Container, Divider, Heading, IconButton, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import { CardContainer } from './components/CardContainer'
import { FloatButton } from './components/FloatButton'
import { useEffect } from 'react'
import { TaskCard } from './components/TaskCard'
import { useQuery } from "react-query"
import { Header } from './components/Header'
import { api } from './services/api'

import axios from 'axios'
import { ITask } from './types'

function App() {

  const { data: tasks, isLoading } = useQuery("tasks", async () => {
    const response = await api.get<ITask[]>("/tasks")
    return response.data
  }, {
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: false
  })

  return (
    <Center
      w="100vw"
      h="100vh"
      backgroundSize="cover"
      backgroundPosition="left top"
      backgroundImage="url('wallpapers/purple-background.jpg')"
    >
      <Container 
        h="85%"
        color="#fff"
        fontSize="md" 
        pos="relative"
        fontFamily="rubik"
      >
        <Header/>
        <CardContainer>
          <>
          {
            !tasks?.length ?
              <Text m="auto" mt="30%">
                Nenhuma tarefa encontrada.
              </Text>
            :
            tasks.map((task, index) => {
              return <TaskCard key={index} task={task}/>
            })
          }
          </>
        </CardContainer>
        <FloatButton/>
      </Container>
    </Center>
  )
}

export default App
