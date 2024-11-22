import { Box,Flex,Text,Image } from "@chakra-ui/react";

export default function NavImg(){

    return <>
            <Flex w='100vw' h='60vh' bg='blackAlpha.200' justifyContent={'space-between'}>
                        <Box w='50%'>
                            <Image w='100%' h='100%' src='https://img.freepik.com/premium-photo/portrait-young-caucasian-woman-hold-hands-heart-smiling-daydreaming-thinking-smth-heartwarming-posing-against-beige-background_1258-87254.jpg'/>
                            
                        </Box>
                        <Box w='50%'>
                            <Image w='100%' h='100%' src='https://img.freepik.com/premium-photo/stylish-young-caucasian-woman-smiling-pointing-fingers-left-showing-advertisement-promo-offer-standing-against-beige-background_1258-87783.jpg?w=360'/>

                        </Box>
            </Flex>
    </>
}