import { Box,Flex,Text } from "@chakra-ui/react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import SloganDisplay from "../Components/SloganDisplay";
import { FaMobileAlt } from "react-icons/fa";
import { SiFlipkart } from "react-icons/si";
import { useEffect, useState } from "react";
import axios from "axios";
import Item from "../Components/Item";


function Main(){
   
    const [selectedSort, setSelectedSort] = useState("popularity"); // State to track the selected sort option

    // Handle the change in select dropdown
    const handleSortChange = (e) => {
      setSelectedSort(e.target.value); // Update the state with the selected option
      console.log("Selected Sort Option:", e.target.value); // You can perform sorting/filtering logic here based on the selected option
    };

    
    return <>
            <Box px='6vw' py='2vw' pb={'5vw'}>
                <SloganDisplay/>
                <Flex  gap='10px' flexDir={{base:"column",md:'row'}} color={'white'} borderRadius={'md'} p='10px' bg='rgb(2, 19, 28)' justifyContent={'space-between'}>
                    <Flex alignItems={'center'}><FaMobileAlt/><Text>SmartpPhone</Text></Flex>
                    <Flex alignItems={'center'}>
                        <SiFlipkart color="yellow"/>
                        <Text fontWeight={600} color={'yellow'}>Flipkard or Amazon</Text>
                    </Flex>
                    <select value={selectedSort}  onChange={handleSortChange} style={{color:"black",borderRadius:"4px"}}>
                        <option value="popularity" >Sortby: Popularity </option>
                        <option value="low">Sortby: Low To High</option>
                        <option value="high">Sortby: High To Low</option>
                    </select>
                </Flex>
                <Item selectedSort={selectedSort}/>
            </Box>
    </>
}

export default function Home(){

    return <>
           <Navbar/>
           <Main/>
           <Footer/>
    </>
}