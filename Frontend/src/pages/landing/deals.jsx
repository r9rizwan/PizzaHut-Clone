import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { Navigate } from "react-router-dom";
import { useAlert } from "@/utils/hooks/use-alert";
import { dealsActions } from "@/store/slices/deals-slice";
import { useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";

const getUserAuth = () => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  if (!user || !token) return false;
  return true;
};

// protect this page from unauthorized access.
const DealsCard = () => {
  const { errorAlert } = useAlert();
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userAuth = getUserAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/deals");
        const data = await response.json();
        setDeals(data);
      } catch (error) {
        console.error("Error fetching pizza deals:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeals();
  }, []);

  if (!userAuth) {
    errorAlert("Unauthorized Access!");
    return <Navigate to="/auth/login" replace />;
  }

  // Skeleton loader for cards
  const skeletonCard = (
    <Card className="flex flex-col p-0 m-0 transition-all duration-300 ease-in-out transform hover:border-error border-2 h-[380px] w-full">
      <div className="h-48">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="h-full flex flex-col pb-3 px-4">
        <div className="p-0 flex flex-col flex-grow justify-center">
          <Skeleton className="h-6 mb-2 w-2/3" />
          <Skeleton className="h-4 mb-4 w-full" />
        </div>
        <CardFooter className="flex justify-between items-center">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-8 w-16" />
        </CardFooter>
      </div>
    </Card>
  );

  return (
    <div className="flex flex-col container max-w-6xl my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                {skeletonCard}
              </div>
            ))
          : deals.map((deal) => (
              <Card
                key={deal.id}
                className="flex flex-col p-0 m-0 transition-all duration-300 ease-in-out transform hover:border-error border-2 h-[380px] w-full">
                <CardHeader className="p-0 w-full h-48">
                  <CardImage
                    src={deal.image}
                    className="h-48 w-full object-cover"
                    alt={deal.title}
                    onError={() =>
                      console.error(`Failed to load image: ${deal.image}`)
                    }
                  />
                </CardHeader>
                <div className="h-full flex flex-col pb-3 px-4">
                  <CardBody className="p-0 flex-grow">
                    <CardTitle className="text-lg">{deal.title}</CardTitle>
                    <CardDescription>{deal.description}</CardDescription>
                  </CardBody>
                  <CardFooter className="flex justify-between items-center">
                    <CardSubTitle>
                      <span className="text-sm leading-5 text-muted-foreground">
                        {deal.pretext}
                      </span>
                      <span className="ml-1 text-primary font-bold">
                        £{deal.price}
                      </span>
                      {deal.previousPrice && (
                        <del className="ml-2 text-muted-foreground text-sm">
                          {deal.previousPrice}
                        </del>
                      )}
                    </CardSubTitle>
                    <Button
                      className="h-11 px-3"
                      onClick={() => {
                        dispatch(dealsActions.clearSelectedDeal());
                        navigate(`/home/deals/${deal.id}`);
                      }}>
                      Get Started
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            ))}
      </div>
    </div>
  );
};

export default DealsCard;
