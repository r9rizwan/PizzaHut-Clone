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
import { cartActions } from "@/store/slices/cart-slice";
import { useAlert } from "@/utils/hooks/use-alert";
import SkeletonCard from "@/components/ui/skeleton";

const getUserAuth = () => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  if (!user || !token) return false;
  return true;
};

const MeltsCard = () => {
  const { errorAlert } = useAlert();
  const [melts, setMelts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const userAuth = getUserAuth();
  const dispatch = useDispatch(); // Initialize Redux dispatch

  // Extract query parameters
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const fromDetailsPage = searchParams.get("fromDetailsPage") === "true";

  useEffect(() => {
    const fetchMelts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/melts");
        const data = await response.json();
        setMelts(data);
      } catch (error) {
        console.error("Error fetching Data:", error);
      } finally {
        setIsLoading(false); // Stop loading once data is fetched
      }
    };

    fetchMelts();
  }, []);

  if (!userAuth) {
    errorAlert("Unauthorized Access!");
    return <Navigate to="/auth/login" replace />;
  }

  const handleAddToCart = (melt) => {
    dispatch(
      cartActions.addToCart({
        id: melt.id,
        title: melt.title,
        price: melt.price,
        quantity: 1,
      })
    );
  };

  return (
    <div className="flex flex-col container max-w-6xl mb-10 mt-10 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 9 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : melts.map((melt) => (
              <Card
                key={melt.id}
                className="flex flex-col p-0 m-0 w-full h-96 transition-all duration-300 ease-in-out transform hover:border-error border border-transparent rounded-lg shadow-lg">
                <CardHeader className="p-0">
                  <CardImage
                    src={melt.image}
                    alt={melt.title}
                    className="w-full h-48 object-fit rounded-t-lg"
                  />
                </CardHeader>
                <div className="flex flex-col justify-between flex-grow p-4">
                  <CardBody className="p-0">
                    <CardTitle className="text-lg">{melt.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {melt.description}
                    </CardDescription>
                  </CardBody>

                  <CardFooter className="flex justify-between items-center mt-auto">
                    {!fromDetailsPage && (
                      <CardSubTitle>
                        <span className="text-primary font-bold">
                          £{melt.price}
                        </span>
                      </CardSubTitle>
                    )}
                    <Button
                      className="h-10 px-4"
                      onClick={() => handleAddToCart(melt)}>
                      Add
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            ))}
      </div>
    </div>
  );
};

export default MeltsCard;
