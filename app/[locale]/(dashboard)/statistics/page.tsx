import SalesChart from "@/components/pages/statistics/SalesChart";
import { Link } from "@/i18n/navigation";
import axiosInstance from "@/utils/axiosInstance";
import {
  Box,
  CardBody,
  CardRoot,
  CardTitle,
  Container,
  FormatNumber,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  List,
  Text,
} from "@chakra-ui/react";
import {
  DollarSignIcon,
  ShoppingCartIcon,
  TrendingUpIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("HomePage");
  const {
    data: { data: totalCustomers },
  } = await axiosInstance<{ data: number }>("/analyses/customers-count");
  const {
    data: { data: newCustomersCount },
  } = await axiosInstance<{ data: number }>(
    "/analyses/new-customers?daysCount=50",
  );
  const {
    data: { data: totalOrders },
  } = await axiosInstance<{ data: number }>("/analyses/orders-count");
  const {
    data: {
      data: { AOV },
    },
  } = await axiosInstance<{ data: { AOV: number } }>("/analyses/aov");
  const {
    data: {
      data: { totalRevenue: revenue },
    },
  } = await axiosInstance<{ data: { totalRevenue: number } }>(
    "/analyses/revenue",
  );
  const {
    data: { data: bestsellingProducts },
  } = await axiosInstance<{
    data: {
      unitsSold: number;
      name: string;
      productId: string;
      thumbnail: string;
      revenue: number;
    }[];
  }>("/analyses/top-products");
  return (
    <Container py={4} fluid h={"full"}>
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          xl: "repeat(5, 1fr)",
        }}
        gap={5}
      >
        {/* total number of customer card */}
        <GridItem colSpan={1}>
          <CardRoot h={"full"}>
            <CardBody>
              <HStack justifyContent={"space-between"}>
                <Box>
                  <UsersIcon size={40} />
                </Box>
                <Text textStyle={{ base: "xl", md: "3xl" }}>
                  <FormatNumber
                    value={totalCustomers}
                    notation="compact"
                    compactDisplay="short"
                  />
                </Text>
              </HStack>
              <Heading as={"h6"} size={"sm"}>
                Total Customers
              </Heading>
            </CardBody>
          </CardRoot>
        </GridItem>

        {/* total number of new customer card */}
        <GridItem colSpan={1}>
          <CardRoot>
            <CardBody>
              <HStack justifyContent={"space-between"}>
                <Box>
                  <UserPlusIcon size={40} />
                </Box>
                <Text textStyle={{ base: "xl", md: "3xl" }}>
                  <FormatNumber
                    value={newCustomersCount}
                    notation="compact"
                    compactDisplay="short"
                  />
                </Text>
              </HStack>
              <Heading as={"h6"} size={"sm"}>
                New Customers
              </Heading>
            </CardBody>
          </CardRoot>
        </GridItem>

        {/* total number of Orders card */}
        <GridItem colSpan={1}>
          <CardRoot>
            <CardBody>
              <HStack justifyContent={"space-between"}>
                <Box>
                  <ShoppingCartIcon size={40} />
                </Box>
                <Text textStyle={{ base: "xl", md: "3xl" }}>
                  <FormatNumber
                    value={totalOrders}
                    notation="compact"
                    compactDisplay="short"
                  />
                </Text>
              </HStack>
              <Heading as={"h6"} size={"sm"}>
                Total Orders
              </Heading>
            </CardBody>
          </CardRoot>
        </GridItem>

        {/* AOV */}
        <GridItem colSpan={1}>
          <CardRoot>
            <CardBody>
              <HStack justifyContent={"space-between"}>
                <Box>
                  <DollarSignIcon size={40} />
                </Box>
                <Text textStyle={{ base: "xl", md: "3xl" }}>
                  <FormatNumber value={AOV} style="currency" currency="USD" />
                </Text>
              </HStack>
              <Heading as={"h6"} size={"sm"}>
                Average Order Value
              </Heading>
            </CardBody>
          </CardRoot>
        </GridItem>

        {/* total revenue */}
        <GridItem colSpan={1}>
          <CardRoot>
            <CardBody>
              <HStack justifyContent={"space-between"}>
                <Box>
                  <DollarSignIcon size={40} />
                </Box>
                <Text textStyle={{ base: "xl", md: "3xl" }}>
                  <FormatNumber
                    value={revenue}
                    style="currency"
                    currency="USD"
                  />
                </Text>
              </HStack>
              <Heading as={"h6"} size={"sm"}>
                Total Revenue
              </Heading>
            </CardBody>
          </CardRoot>
        </GridItem>

        {/* sales card */}
        <GridItem colSpan={{ base: 1, sm: 2, xl: 3 }}>
          <CardRoot>
            <CardBody>
              <SalesChart />
            </CardBody>
          </CardRoot>
        </GridItem>

        {/* Bestselling products card */}
        <GridItem colSpan={{ base: 1, sm: 2, xl: 2 }}>
          <CardRoot>
            <CardBody>
              <CardTitle display={"flex"} gap={2} alignItems={"center"}>
                <TrendingUpIcon /> Bestselling Products:
              </CardTitle>
              <List.Root listStyle={"none"} h={393} overflow={"auto"}>
                {bestsellingProducts.map((p) => (
                  <List.Item
                    key={p.productId}
                    borderBlockEnd={"1px solid"}
                    borderColor={"border.emphasized"}
                    py={3}
                    _hover={{ background: "bg.emphasized" }}
                    transition={"background 0.3s"}
                  >
                    <Link href={`/products/${p.productId}`}>
                      <HStack alignItems={"center"}>
                        <Image src={p.thumbnail} alt={p.name} w={65} />
                        <Box>
                          <Heading as={"h6"} fontSize={"md"}>
                            {p.name}
                          </Heading>
                          <HStack flexWrap={"wrap"} gap={1}>
                            <Text
                              color={"fg.muted"}
                              fontSize={{ base: "xs", md: "sm" }}
                            >
                              Revenue:{" "}
                              <FormatNumber
                                value={p.revenue}
                                style="currency"
                                currency="USD"
                              />
                              ,
                            </Text>
                            <Text
                              color={"fg.muted"}
                              fontSize={{ base: "xs", md: "sm" }}
                            >
                              Units Sold: <FormatNumber value={p.unitsSold} />
                            </Text>
                          </HStack>
                        </Box>
                      </HStack>
                    </Link>
                  </List.Item>
                ))}
              </List.Root>
            </CardBody>
          </CardRoot>
        </GridItem>
      </Grid>
    </Container>
  );
}
