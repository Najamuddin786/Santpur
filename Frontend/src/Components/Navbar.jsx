import { Box,Flex ,Text,Image} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import '../App.css'
import { useState } from "react";
import NavImg from "./NavImg";

export default function Navbar(){
    let [navClick,setNavClick]=useState(false)

    return <>
            <Flex zIndex={'1500'} boxShadow={'xl'} position={'sticky'} top={'0px'} alignItems={'center'} bg='white' py='2px' px='5vw' justifyContent={'space-between'} >
                <Flex  cursor={'pointer'} boxShadow={'2xl'} borderRadius={'md'} p='10px' bg='yellow' flexDir={'column'}>
                    <Flex mt='-10px' fontWeight={'700'} fontSize={'34px'}>
                        <Text color={'red'}>SANT</Text>
                        <Text>PUR</Text>
                    </Flex>
                        <Text fontWeight={'600'} mt='-5px' fontSize={'12px'}>Mobile EMI with Addhar Card</Text>
                </Flex>
                {/* ______________ ALL PAGES */}
                <Flex fontWeight={500} gap={'10px'} display={{base:"none",md:"flex"}}>
                    <Link><Text _hover={{color:"blue"}}>Home</Text></Link>
                    <Link><Text _hover={{color:"blue"}}>My Order</Text></Link>
                    <Link><Text _hover={{color:"blue"}}>EMI</Text></Link>
                    <Link><Text _hover={{color:"blue"}}>KYC</Text></Link>
                    <Link><Text _hover={{color:"blue"}}>Login</Text></Link>
                    <Link><Text _hover={{color:"blue"}}>Signup</Text></Link>
                    <Link><Text _hover={{color:"blue"}}>Logout</Text></Link>
                    <Link><Text _hover={{color:"blue"}}>Contect Us</Text></Link>
                    <Link><Text _hover={{color:"blue"}}>About Us</Text></Link>
                </Flex>
                
                <Box onClick={()=>{if(navClick==false){setNavClick(true)}else{setNavClick(false)}}} display={{base:'block',md:'none'}} fontSize={'40px'}><IoMenu/></Box>
                {navClick==true && <Flex mx='-5vw' pt='1vh' color='white' bg={'black'} w='100vw' h='90vh' top='10vh' position={'fixed'} fontWeight={500} gap={'10px'} display={{md:"none"}}>
                    <Flex  border={'2px solid yellow'} borderRadius={'md'} alignItems={'center'} justifyContent={'space-around'} h='85vh' mx='5vw' flexDir={'column'} bg='white' color={'black'}>
                    <Link><Text _hover={{color:"blue"}}>Home</Text></Link>
                    <Link><Text _hover={{color:"blue"}}>My Order</Text></Link>
                    <Link><Text _hover={{color:"blue"}}>EMI</Text></Link>
                    <Link><Text _hover={{color:"blue"}}>KYC</Text></Link>
                    <Link><Text _hover={{color:"blue"}}>Login</Text></Link>
                    <Link><Text _hover={{color:"blue"}}>Signup</Text></Link>
                    <Link><Text _hover={{color:"blue"}}>Logout</Text></Link>
                    <Link><Text _hover={{color:"blue"}}>Contect Us</Text></Link>
                    <Link><Text _hover={{color:"blue"}}>About Us</Text></Link>
                    <Box h='40%' position={'relative'}>
                            <Image src='https://media.istockphoto.com/id/497683995/photo/smiling-woman-showing-copy-space.jpg?s=612x612&w=0&k=20&c=Q5EcDWbdXtUQTn2KB-VWDFyg4O8-tK8PAxVsyGqNg5U='/>
                            <Text borderRadius={'10px 30px 80px'} p='10px' border={'2px solid yellow'} boxShadow={'2xl'} bg='black' color={'white'} textAlign={'center'} ml='21%' position={'absolute'} top='18%'>Best Offer <br /> For You</Text>
                    </Box>
                    </Flex>
                </Flex>}
                
                

            </Flex>
            <NavImg/>
    </>
}
