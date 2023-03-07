import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react"
import { FormEvent, useEffect, useRef, useState } from "react"
import { useQueryClient } from "react-query"
import { api } from "../services/api"

interface IProps {
  isOpen: boolean, 
  onOpen: () => void, 
  onClose: () => void 
}

interface ITitleInput {
  value: string
}

function CreateTaskModal({ isOpen, onOpen, onClose }: IProps) {
  
  const [title, setTitle] = useState("")
  const [error, setError] = useState<null | string>(null)
  const toast = useToast()

  const queryClient = useQueryClient()

  useEffect(() => {
    if (error) {
      setError(null)
    }
  }, [title])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      await api.post("/tasks", { title })
      queryClient.invalidateQueries("tasks")
      toast({
        title: 'Sucesso!',
        description: `Sua tarefa foi criada.`,
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
      onClose()
      setTitle("")

    } catch (error: any) {
      setError(error.response.data.message);
    }
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
          <ModalHeader>Criar nova tarefa</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nome da tarefa:</FormLabel>
              <Input 
                borderColor={error ? "red.500" : "blue.500"}
                placeholder='Ex: Ir para academia'
                value={title} 
                onChange={e => setTitle(e.target.value)}
              />
              {error && (
                <Text mt={1} color="red.400" fontWeight={600}>{error}</Text>
              )}
            </FormControl>
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
              <Button onClick={handleSubmit} colorScheme='green' mr={3}>
                Criar
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateTaskModal