
import { Box,Flex,Text,Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaInstagramSquare } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { IoLogoYoutube } from "react-icons/io";
import { MdPayment } from "react-icons/md";
import qrImage from '../assets/payment.jpg'

export default function Footer(){

    return <>
            <Flex   gap={'15px'} flexWrap={'wrap'} flexDir={{base:'column',md:'row'}} justifyContent={'space-between'} py='4vw' px={{base:"2vw",md:'5vw'}} bg='rgb(2, 19, 28)' color={'white'}>
                <Flex flexDir={'column'}>
                    <Text textAlign={'center'} borderRadius={'sm'} fontWeight={'600'} color={'black'} bg='yellow'>Pages</Text>
                    <Link to='/'><Text>About Us</Text></Link>
                    <Link to='/'><Text>Conteact Us</Text></Link>
                    <Link to='/'><Text>Login</Text></Link>
                    <Link to='/'><Text>Signup</Text></Link>
                </Flex>
                <Flex flexDir={'column'}>
                    <Text textAlign={'center'} borderRadius={'sm'} fontWeight={'600'} color={'black'} bg='yellow'>Address</Text>
                    <Text>Copyright© By Santpur </Text>
                    <Text>Word No 08,Santpur,Nautan Dube<br/>Bettiah,Bihar-845438</Text>
                </Flex>
                <Flex flexDir={'column'}>
                    <Text textAlign={'center'} borderRadius={'sm'} fontWeight={'600'} color={'black'} bg='yellow'>Follow</Text>
                    <Link><Flex gap='5px' alignItems={'center'} ><Box><FaInstagramSquare color={'#FCAF45'}/></Box><Text>Instagram</Text></Flex></Link>
                    <Link><Flex gap='5px' alignItems={'center'}><Box><BsWhatsapp color="#25D366"/></Box><Text>Whatsapp</Text></Flex></Link>
                    <Link><Flex gap='5px' alignItems={'center'}><Box><IoLogoYoutube color="	#FF0000"/></Box><Text>Youtube</Text></Flex></Link>
                </Flex>
                <Flex flexDir={'column'}>
                    <Text textAlign={'center'} borderRadius={'sm'} fontWeight={'600'} color={'black'} bg='yellow'>Payment</Text>
                    <Flex gap='5px' alignItems={'center'} ><Box><MdPayment /></Box><Text>You Can Pay alwasy</Text>
                    </Flex>
                   
                    <Flex gap='5px' alignItems={'center'} >
                        <Box><MdPayment /></Box><Text>8210942893@pytes</Text></Flex>
                    
                    <Flex gap='5px' alignItems={'center'} >
                        <Box></Box><Text>After Payment Submit UTR <br /> and Screen Short </Text></Flex>
                    
                </Flex>
                <Flex flexDir={'column'} w={{base:'100%',md:'30%'}}>
                <Text textAlign={'center'} borderRadius={'sm'} fontWeight={'600'} color={'black'} bg='yellow'>Other</Text>
                <Text>We are providing Mobile EMI services in Bettiah.</Text>
                <Text>You can order from my website, provide Flipkart or Amazon mobile links, and check the best offers for you.</Text>
                </Flex>


            </Flex>
    </>
}