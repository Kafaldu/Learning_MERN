import { useState } from 'react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { 
  Box, HStack, IconButton, Image, Heading, Text, useColorModeValue, VStack, Input, 
  useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, 
  ModalBody, ModalFooter, Button, useToast 
} from '@chakra-ui/react';
import { useProductStore } from '../store/product';

const ProductCard = ({ product }) => {
  if (!product) {
    console.error("Product data is missing.");
    return <Box>Error: Product data is missing</Box>;
  }

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.700");
  
  const store = useProductStore();
  const deleteProduct = store?.deleteProduct;
  const updateProductFunction = store?.updateProduct;

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [updateProduct, setUpdateProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });

  const handleDeleteProduct = async () => {
    if (!deleteProduct) {
      console.error("deleteProduct function is undefined.");
      return;
    }

    const { success, message } = await deleteProduct(product._id);
    toast({
      title: message,
      status: success ? "success" : "error",
      isClosable: true,
    });
  };

  const handleUpdateProduct = async () => {
    if (!updateProductFunction) {
      console.error("updateProduct function is undefined.");
      return;
    }

    const { success, message } = await updateProductFunction(product._id, updateProduct);
    toast({
      title: message,
      status: success ? "success" : "error",
      isClosable: true,
    });

    if (success) onClose();
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>{product.name}</Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>${product.price}</Text>

        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
          <IconButton icon={<DeleteIcon />} onClick={handleDeleteProduct} colorScheme="red" />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input 
                placeholder="Product Name"
                value={updateProduct.name}
                onChange={(e) => setUpdateProduct({ ...updateProduct, name: e.target.value })}
              />
              <Input
                placeholder="Product Price"
                type="number"
                value={updateProduct.price}
                onChange={(e) => setUpdateProduct({ ...updateProduct, price: e.target.value })} 
              />
              <Input
                placeholder="Product Image URL"
                value={updateProduct.image}
                onChange={(e) => setUpdateProduct({ ...updateProduct, image: e.target.value })} 
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdateProduct}>Update</Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
