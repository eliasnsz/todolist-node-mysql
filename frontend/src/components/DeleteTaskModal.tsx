import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react"
import { FormEvent, useEffect, useRef, useState } from "react"
import { useQueryClient } from "react-query"
import { api } from "../services/api"

interface IProps {
  id: number,
  isOpen: boolean, 
  onOpen: () => void, 
  onClose: () => void 
}


function DeleteTaskModal({ isOpen, onOpen, onClose, id }: IProps) {
  
  const queryClient = useQueryClient()
  const toast = useToast()

  const handleDelete = async () => {
    await api.delete(`/tasks/${id}`)
    queryClient.invalidateQueries("tasks")
    toast({
      title: 'Pronto.',
      description: "Tarefa removida.",
      status: 'error',
      duration: 4000,
      isClosable: true,
    })
    onClose()
  }

  return (
    <>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay backdropFilter="blur(5px)"/>
        <ModalContent bg="#722478" color="#fff">
          <ModalHeader>Excluir tarefa:</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text>Tem certeza que deseja excluir essa tarefa?</Text>
          </ModalBody>

          <ModalFooter>
            <Stack direction="row">
              <Button 
                variant="ghost"
                onClick={onClose} 
                colorScheme="white"
              >
                Cancelar
              </Button>
              <Button colorScheme='red' onClick={handleDelete} mr={3}>
                Excluir
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteTaskModal