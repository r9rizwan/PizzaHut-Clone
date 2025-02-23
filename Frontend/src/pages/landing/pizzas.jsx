import React from "react";
import { Link } from "react-router-dom";
import { useGetPizzas } from "@/api/hooks";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardDescription,
  CardImage,
} from "@/components/ui";
import { Button } from "@/components/ui";
import { useSearchParams } from "react-router-dom";
import { PizzaLoadingCard } from "../components/pizzas";

const Pizzas = () => {
  const [searchParams] = useSearchParams();
  const queryString = searchParams.toString();
  const { data: pizzas = [], isLoading } = useGetPizzas(queryString);

  const fromDetails = searchParams.get("fromDetailsPage");

  // custom way to create a query string;
  // let queryString = "";
  // let iteration = 0;
  // searchParams.forEach((value, key) => {
  //   queryString += iteration === 0 ? `${key}=${value}` : `&${key}=${value}`;
  //   ++iteration;
  // });

  return (
    <div className="flex flex-col container max-w-6xl mb-10 mt-10 mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 ">
        {isLoading
          ? Array.from({ length: 9 }).map((_, index) => (
              <PizzaLoadingCard key={index} />
            ))
          : pizzas.map((pizza) => {
              const largeSize = pizza.sizes.find(
                (size) => size.sizeId.name === "Large"
              );
              const largePrice = largeSize ? largeSize.price : "N/A";

              return (
                <Card
                  key={pizza._id}
                  className="flex flex-col p-0 m-0 transition-all duration-300 ease-in-out transform hover:border-error border-2 h-[420px] w-full">
                  <Link
                    to={`/home/pizzas/${pizza._id}?${queryString}`}
                    className="flex flex-col h-full">
                    <CardHeader className="p-0">
                      <CardImage
                        src={`http://localhost:5000/uploads/${pizza.image}`}
                        alt={pizza.title}
                        className="transition-transform duration-300"
                        style={{ height: "240px", objectFit: "cover" }} // Fixed height for image
                      />
                    </CardHeader>
                    <div className="h-[140px] flex flex-col pb-2 px-2">
                      <CardBody className="p-0 flex flex-col flex-grow justify-center">
                        <CardTitle className="text-base font-bold">
                          {pizza.title}
                        </CardTitle>
                        <CardDescription className=" text-sm mt-1 mb-2">
                          {pizza.description}
                        </CardDescription>
                      </CardBody>
                      <CardFooter className="flex justify-between items-center h-10 px-4">
                        <div className="text-lg font-bold text-error">
                          {fromDetails ? null : `£${largePrice}`}
                        </div>
                        <Button className="h-11 px-3 transition-all duration-300">
                          Add
                        </Button>
                      </CardFooter>
                    </div>
                  </Link>
                </Card>
              );
            })}
      </div>
    </div>
  );
};

export default Pizzas;
