import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Item({ selectedSort }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to handle navigation

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get("https://santpur.onrender.com/api/item");
        setItems(response.data); // Assuming the API returns an array of items
      } catch (err) {
        console.error("Error fetching items:", err);
        setError("Failed to load items");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle click event and navigate to the item's details page
  const handleItemClick = (id) => {
    navigate(`/item/${id}`); // Dynamic route based on item ID
  };

  // Sorting logic
  const sortItems = (items, sortBy) => {
    const sortedItems = [...items];

    // Apply the selected sorting logic (popularity, low, or high)
    if (sortBy === "popularity") {
      // Sort by rating (descending)
      sortedItems.sort((a, b) => {
        const ratingA = Number(a.ratingAll.split(" Ratings")[0].replace(/,/g, "")) || 0;
        const ratingB = Number(b.ratingAll.split(" Ratings")[0].replace(/,/g, "")) || 0;
        return ratingB - ratingA; // descending order
      });
    } else if (sortBy === "low") {
      // Sort by price (ascending)
      sortedItems.sort((a, b) => {
        const priceA = Number(String(a.price).replace(/₹|,/g, "")) || 0;
        const priceB = Number(String(b.price).replace(/₹|,/g, "")) || 0;
        return priceA - priceB; // ascending order
      });
    } else if (sortBy === "high") {
      // Sort by price (descending)
      sortedItems.sort((a, b) => {
        const priceA = Number(String(a.price).replace(/₹|,/g, "")) || 0;
        const priceB = Number(String(b.price).replace(/₹|,/g, "")) || 0;
        return priceB - priceA; // descending order
      });
    }

    return sortedItems;
  };

  const sortedItems = sortItems(items, selectedSort);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  return (
    <Flex p={5} flexWrap="wrap" gap="10px" justifyContent="center">
      {sortedItems.map((item) => (
        <Flex
          key={item.id} // Unique key for each item
          border="1px solid"
          borderColor="gray.300"
          borderRadius="xl"
          p={4}
          mb={4}
          flexDirection="column"
          boxShadow="xl"
          w={{ base: "100%", sm: "48%", md: "32%", xl: "23%" }}
          alignItems="center"
          gap="1"
          _hover={{ boxShadow: "lg", transform: "scale(1.05)", border: "1px solid green", background: "black", color: "white" }} // Optional hover effect
          onClick={() => handleItemClick(item.id)} // On click event to navigate
          cursor="pointer" // Show pointer cursor when hovering
        >
          <Box py="5px" px="20px" bg="white" boxShadow={"xl"} borderRadius={"md"}>
            <Image src={item.img} w="100px" />
          </Box>
          <Text fontWeight="500">{item.title}</Text>

          <Flex gap="5px">
            <Flex
              gap="2px"
              py="1px"
              px="10px"
              bg="green"
              color="white"
              alignItems="center"
              borderRadius="md"
            >
              {item.rating}
              <FaStar />
            </Flex>
            <Text>
              ({item.ratingAll.split(" Ratings")[0].replace(/,/g, "")})
            </Text>
          </Flex>

          <Flex alignItems="center" gap="8px">
            <Text color="green.500">{String(item.price)}</Text>
            <Text as="del" color="gray.500">
              {item.priceOriginal}
            </Text>
            <Text color="green.500">
              {Math.floor(
                ((Number(String(item.priceOriginal).replace(/₹|,/g, "")) - Number(String(item.price).replace(/₹|,/g, ""))) /
                  Number(String(item.priceOriginal).replace(/₹|,/g, ""))) *
                  100
              )}
              % off
            </Text>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
}
