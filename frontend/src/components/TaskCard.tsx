import { Box, Button, GridItem, IconButton, Input, Stack, Text, useDisclosure, useToast } from '@chakra-ui/react'
import { BsTrash3, BsCheck } from "react-icons/bs"
import { AiOutlineEdit } from "react-icons/ai"
import React, { FC, useEffect, useRef, useState } from 'react'
import { ITask } from '../types'
import DeleteTaskModal from './DeleteTaskModal'
import { api } from '../services/api'
import { useQueryClient } from 'react-query'
import moment from 'moment'
import { calcSpentTime } from '../services/calcSpentTime'

interface IProps {
  task: ITask
}

export const TaskCard:FC<IProps> = ({ task }) => {

  const queryClient = useQueryClient()
  const toast = useToast()  

  const inputRef = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  

  const handleChangeTitle = async () => {
    await api.put(`/tasks/${task.id}`, {
      title: inputRef.current?.value,
      status: task.status
    })
    queryClient.invalidateQueries("tasks")
    toast({
      title: 'Tarefa atualizada.',
      description: `A tarefa foi atualizada com sucesso.`,
      status: 'info',
      duration: 4000,
      isClosable: true,
    })
    setIsEditing(false)
  }
  
  const handleChangeStatus = async () => {
    await api.put(`/tasks/${task.id}`, 
    { 
      title: task.title,
      status: "Concluída"
    })
    queryClient.invalidateQueries("tasks")

    const getTimeSpent = calcSpentTime(task.created_at)
    
    toast({
      title: 'Tarefa concluída.',
      description: `Você demorou ${getTimeSpent} para concluir essa tarefa.`,
      status: 'success',
      duration: 4000,
      isClosable: true,
    })
  }

  const { 
    onOpen: openDeleteModal, 
    onClose: closeDeleteModal,
    isOpen: isOpenDeleteModal 
  } = useDisclosure()

  return (
    <>
      <DeleteTaskModal 
        id={task?.id}
        onOpen={openDeleteModal} 
        onClose={closeDeleteModal} 
        isOpen={isOpenDeleteModal}
      />
      <Stack 
        p={4}
        w="100%" 
        justify="center"
        borderRadius="lg"
        bgColor="#722478"
        transition=".2s ease-in-out"
        border="1px solid #9F00AB" 
        _hover={{ bgColor: "#A333AB" }}
      >
        <Stack 
          h="100%"
          justify="space-between"
          direction={["column", "row"]}
          align={["flex-start", "center"]}
        >
          { isEditing ?
            (
              <Stack spacing={0}>
                <Text fontWeight={600}>Tarefa:</Text>
                <Input
                  ref={inputRef}
                  defaultValue={task.title}
                />
              </Stack>
            )
          :
            (
              <Stack spacing={0}>
                <Text fontWeight={600}>Tarefa:</Text>
                <Text>{task.title}</Text>
              </Stack>
            )
          }
          <Stack 
            align={["start", "center"]}
            w={["100%", "55%"]} 
            justify="space-between"
            direction={["column", "row"]} 
          >
            <Stack spacing={0} >
              <Text fontWeight={600}>Status:</Text>
              <Text color={task.status === "Pendente" ? "blue.300" : "green.300"}>
                {task.status}
              </Text>
            </Stack>
            <Stack
              pt={[4, 0]}
              px={[0, 4]}
              w={["100%", "fit-content"]}
              direction={["row-reverse", "row"]}
            >
              ({ task.status === "Pendente" && !isEditing &&
                (<IconButton
                    p={1}
                    size="sm"
                    as={BsCheck}
                    color="#fff"
                    bg="green.500"
                    aria-label='concluir'
                    onClick={handleChangeStatus}
                    w={[ "100%", "fit-content"]}
                    _hover={{ bgColor: "green.600", cursor: "pointer" }}
                />)
              }
              { task.status === "Pendente" && !isEditing &&
                (<IconButton
                    p={1}
                    size="sm"
                    bg="blue.500"
                    color="#fff"
                    as={AiOutlineEdit}
                    aria-label='editar'
                    w={[ "100%", "fit-content"]}
                    onClick={() => setIsEditing(true)}
                    _hover={{ bgColor: "blue.600", cursor: "pointer" }}
                />)
              }
              { !isEditing && 
                <IconButton
                  p={2}
                  size="sm"
                  bg="red.500"
                  as={BsTrash3}
                  color="#fff"
                  aria-label='excluir'
                  onClick={openDeleteModal}
                  w={[ "100%", "fit-content"]}
                  _hover={{ bgColor: "red.600", cursor: "pointer" }}
                />
              })
              {
                isEditing &&
                (
                  <>
                    <Button
                      px={2}
                      size="sm"
                      color="#fff"
                      bg="green.500"
                      fontWeight={300}
                      aria-label='concluir'
                      onClick={handleChangeTitle}
                      w={[ "100%", "fit-content"]}
                      _hover={{ bgColor: "green.600", cursor: "pointer" }}
                    >
                      Salvar
                    </Button>
                    <Button
                      px={2}
                      size="sm"
                      color="#fff"
                      bg="red.500"
                      fontWeight={300}
                      aria-label='concluir'
                      onClick={() => setIsEditing(false)}
                      w={[ "100%", "fit-content"]}
                      _hover={{ bgColor: "red.600", cursor: "pointer" }}
                    >
                      Cancelar
                    </Button>
                  </>
                )
              }
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>  
  )
}
