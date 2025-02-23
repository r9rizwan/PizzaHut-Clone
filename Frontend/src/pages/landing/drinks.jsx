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

const getUserAuth = () => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  if (!user || !token) return false;
  return true;
};

const DrinksCard = () => {
  const { errorAlert } = useAlert();
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const userAuth = getUserAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const fromDetailsPage = searchParams.get("fromDetailsPage") === "true";
  const position = searchParams.get("position");
  const index = searchParams.get("index");
  const dealId = searchParams.get("dealId");

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/drinks");
        const data = await response.json();
        setDrinks(data);
      } catch (error) {
        console.error("Error fetching Data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrinks();
  }, []);

  if (!userAuth) {
    errorAlert("Unauthorized Access!");
    return <Navigate to="/auth/login" replace />;
  }

  const handleAddToCart = (drink) => {
    if (fromDetailsPage) {
      dispatch(
        dealsActions.addToDeal({
          position: position,
          index: index,
          data: {
            title: drink.title,
          },
        })
      );
      return navigate(`/home/deals/${dealId}`);
    }
    dispatch(
      cartActions.addToCart({
        id: drink.id,
        title: drink.title,
        price: drink.price,
        quantity: 1,
      })
    );
  };

  return (
    <div className="flex flex-col container max-w-6xl mb-10 mt-10 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 9 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : drinks.map((drink) => (
              <Card
                key={drink.id}
                className="flex flex-col p-0 m-0 w-full h-96 transition-all duration-300 ease-in-out transform hover:border-error border border-transparent rounded-lg shadow-lg"
              >
                <CardHeader className="p-0">
                  <CardImage
                    src={drink.image}
                    alt={drink.title}
                    className="w-full h-48 object-fit rounded-t-lg"
                  />
                </CardHeader>
                <div className="flex flex-col justify-between flex-grow p-4">
                  <CardBody className="p-0">
                    <CardTitle className="text-lg">{drink.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {drink.description}
                    </CardDescription>
                  </CardBody>

                  <CardFooter className="flex justify-between items-center mt-auto">
                    {!fromDetailsPage && (
                      <CardSubTitle>
                        <span className="text-primary font-bold">
                          £{drink.price}
                        </span>
                      </CardSubTitle>
                    )}
                    <Button
                      className="h-10 px-4"
                      onClick={() => handleAddToCart(drink)}
                    >
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

export default DrinksCard;
