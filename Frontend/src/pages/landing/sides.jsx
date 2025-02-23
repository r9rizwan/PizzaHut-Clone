import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardDescription,
  CardImage,
  CardSubTitle,
} from "@/components/ui";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/slices/cart-slice";
import { useAlert } from "@/utils/hooks/use-alert";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import SkeletonCard from "@/components/ui/skeleton";
import { dealsActions } from "@/store/slices/deals-slice";
import { useSearchParams } from "react-router-dom";

// Check if user is authenticated
const getUserAuth = () => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  return user && token ? true : false;
};

const SidesCard = () => {
  const { errorAlert } = useAlert();
  const [sides, setSides] = useState([]);
  const [selectedSide, setSelectedSide] = useState(null); // State to track selected side
  const userAuth = getUserAuth();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const fromDetailsPage = searchParams.get("fromDetailsPage") === "true";
  const position = searchParams.get("position");
  const index = searchParams.get("index");
  const dealId = searchParams.get("dealId");

  // Fetch the sides data from the API
  useEffect(() => {
    const fetchSides = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/sides");
        const data = await response.json();
        console.log("sides Data", data);
        setSides(data);

        // Pre-select the side if coming from DetailsPage
        if (fromDetailsPage) {
          const side = data.find((side) => side.id === selectedSideId);
          if (side) setSelectedSide(side);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSides();
  }, [fromDetailsPage]);

  // If the user is not authenticated, redirect to login page
  if (!userAuth) {
    errorAlert("Unauthorized Access!");
    return <Navigate to="/auth/login" replace />;
  }

  // Handle adding a product
  const handleAddProduct = (side) => {
    if (fromDetailsPage) {
      dispatch(
        dealsActions.addToDeal({
          position: position,
          index: index,
          data: {
            title: side.title,
          },
        })
      );
      return navigate(`/home/deals/${dealId}`);
    }

    dispatch(
      cartActions.addToCart({
        id: side.id,
        title: side.title,
        price: side.price,
      })
    );
  };

  // Handle editing the selected side
  const handleEdit = () => {
    setSelectedSide(null); // Reset the selection
    navigate("/detailsPage"); // Redirect back to DetailsPage
  };

  return (
    <div className="flex flex-col container max-w-6xl mb-10 mt-10 mx-auto">
      {selectedSide && fromDetailsPage && (
        <div className="bg-muted p-4 mb-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              Selected Side: {selectedSide.title}
            </h2>
            <Button className="h-10 px-4 text-sm" onClick={handleEdit}>
              Edit
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : sides.map((side) => (
              <Card
                key={side.id}
                className="flex flex-col p-0 m-0 w-full h-96 transition-all duration-300 ease-in-out transform hover:border-error border border-transparent rounded-lg shadow-lg">
                <CardHeader className="p-0">
                  <CardImage
                    src={side.image}
                    alt={side.title}
                    className="w-full h-48 object-fit rounded-t-lg"
                  />
                </CardHeader>
                <div className="h-full flex flex-col pb-3 px-4">
                  <CardBody className="p-0 flex-grow">
                    <CardTitle className="text-lg font-semibold">
                      {side.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {side.description}
                    </CardDescription>
                  </CardBody>

                  <CardFooter className="flex justify-between items-center">
                    {!fromDetailsPage && (
                      <CardSubTitle>
                        <span className="ml-1 text-primary font-bold">
                          £{side.price}
                        </span>
                      </CardSubTitle>
                    )}
                    <Button
                      className="h-11 px-3"
                      // onClick={handleAddProduct}
                      // onClick={() => handleAddProduct(side)}
                      onClick={handleAddProduct.bind(null, side)}>
                      <span>
                        {fromDetailsPage ? "Add to Deal" : "Add To Cart"}
                      </span>
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            ))}
      </div>
    </div>
  );
};

export default SidesCard;
