import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardSubTitle,
  CardDescription,
  CardImage,
} from "@/components/ui";
import { Button } from "@/components/ui";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux"; // For dispatching Redux actions
import { cartActions } from "@/store/slices/cart-slice"; // Import cart actions
import { useAlert } from "@/utils/hooks/use-alert";
import SkeletonCard from "@/components/ui/skeleton";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { dealsActions } from "@/store/slices/deals-slice";

// Check user authentication status
const getUserAuth = () => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  return user && token;
};

const DessertsCard = () => {
  const { errorAlert } = useAlert();

  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize Redux dispatch

  const [desserts, setDesserts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const userAuth = getUserAuth();

  const [searchParams] = useSearchParams();
  const fromDetailsPage = searchParams.get("fromDetailsPage") === "true";
  const position = searchParams.get("position");
  const index = searchParams.get("index");
  const dealId = searchParams.get("dealId");

  useEffect(() => {
    const fetchDesserts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/desserts");
        const data = await response.json();
        setDesserts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDesserts();
  }, []);

  if (!userAuth) {
    errorAlert("Unauthorized Access!");
    return <Navigate to="/auth/login" replace />;
  }

  // Add dessert to the cart
  const handleAddToCart = (dessert) => {
    if (fromDetailsPage) {
      dispatch(
        dealsActions.addToDeal({
          position: position,
          index: index,
          data: {
            title: dessert.title,
          },
        })
      );
      return navigate(`/home/deals/${dealId}`);
    }

    dispatch(
      cartActions.addToCart({
        id: dessert.id,
        title: dessert.title,
        price: dessert.price,
      })
    );
  };

  return (
    <div className="flex flex-col container max-w-6xl mb-10 mt-10 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : desserts.map((dessert) => (
              <Card
                key={dessert.id}
                className="flex flex-col p-0 m-0 w-full h-[400px] transition-all duration-300 ease-in-out transform hover:border-error border border-transparent rounded-lg shadow-lg">
                <CardHeader className="p-0">
                  <CardImage
                    src={dessert.image}
                    alt={dessert.title}
                    className="w-full h-48 object-contain rounded-t-lg"
                  />
                </CardHeader>
                <div className="h-full flex flex-col pb-3 px-4">
                  <CardBody className="p-0 flex-grow">
                    <CardTitle className="text-lg font-semibold">
                      {dessert.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {dessert.description}
                    </CardDescription>
                  </CardBody>

                  <CardFooter className="flex justify-between items-center">
                    {!fromDetailsPage && (
                      <CardSubTitle>
                        <span className="ml-1 text-primary font-bold">
                          £{dessert.price}
                        </span>
                      </CardSubTitle>
                    )}
                    <Button
                      className="h-11 px-3"
                      onClick={() => handleAddToCart(dessert)}>
                      {fromDetailsPage ? "Add to Deal" : "Add"}
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            ))}
      </div>
    </div>
  );
};

export default DessertsCard;
