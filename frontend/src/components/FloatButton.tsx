import { Center, IconButton, useDisclosure } from '@chakra-ui/react'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import CreateTaskModal from './CreateTaskModal'

export const FloatButton = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  
  return (
    <Center w="100%">
      <IconButton
        p={2}
        m="auto"
        size="lg"
        right={8}
        bottom={4}
        color="#fff"
        pos="absolute"
        onClick={onOpen}
        borderRadius={50}
        bgColor="green.500"
        as={AiOutlineAppstoreAdd}
        aria-label='create-button'
        boxShadow="0px 0px 10px #00000077"
        _hover={{ bgColor: "green.600", cursor: "pointer" }}
      />
      <CreateTaskModal 
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </Center>
  )
}
