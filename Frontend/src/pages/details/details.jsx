import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductByIdApi, getCrusts } from "@/api/products";
import {
  Card,
  CardBody,
  CardTitle,
  CardDescription,
  CardImage,
  Button,
} from "@/components/ui";
import {
  AdditionalMeatOptions,
  AdditionalNonMeatOptions,
  CheeseToppingsOptions,
} from "../components/pizzas";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/slices/cart-slice";
import { dealsActions } from "@/store/slices/deals-slice";
import { useNavigate } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState(null);
  const [crusts, setCrusts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedCrust, setSelectedCrust] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const queryString = searchParams.toString();
  const fromDetailsPage = searchParams.get("fromDetailsPage");
  const position = searchParams.get("position");
  const index = searchParams.get("index");
  const dealId = searchParams.get("dealId");

  // checking data. and redirecting if any abnormality founds!
  useEffect(() => {
    if (!dealId || !position || !fromDetailsPage) {
      dispatch(dealsActions.clearSelectedDeal());
      navigate(`/home/pizzas/${id}`);
    }
  }, [dispatch, dealId, position, fromDetailsPage]);

  const handleSelectedSize = async (size) => {
    setSelectedSize(size);
    try {
      const res = await getCrusts(size?.sizeId?._id);
      setCrusts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchPizzaDetails = async () => {
      try {
        const pizzaData = await getProductByIdApi(id, queryString);

        setPizza(pizzaData.data); // Store pizza details
        if (pizzaData.data.sizes?.[0])
          handleSelectedSize(pizzaData.data.sizes[0]);
      } catch (err) {
        setError(err.message || "Error fetching pizza details");
      }
    };

    fetchPizzaDetails();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!pizza) return <div>Loading...</div>; // Show loading until data is fetched

  // Calculate the price based on selected size and crust
  const calculatePrice = () => {
    if (fromDetailsPage) return;
    if (!selectedSize) return 0;
    let price = selectedSize.price;
    if (selectedCrust && selectedCrust.addonPrice > 0) {
      price += selectedCrust.addonPrice;
    }
    return price.toFixed(2);
  };

  const handleAddProduct = () => {
    if (fromDetailsPage) {
      dispatch(
        dealsActions.addToDeal({
          position: position,
          index: index,
          data: {
            title: pizza.title,
            size: selectedSize.sizeId.name,
            crust: selectedCrust.name,
          },
        })
      );
      return navigate(`/home/deals/${dealId}`);
    }
    dispatch(
      cartActions.addToCart({
        id,
        title: pizza.title,
        size: selectedSize.sizeId.name,
        crust: selectedCrust.name,
        price: calculatePrice(),
      })
    );
    return navigate(`/home/pizzas`);
  };

  // Conditional check for "Add to Deal" or "Add To Cart" button
  const isButtonDisabled =
    !selectedSize || !selectedCrust || !selectedCrust.name;

  return (
    <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Column for Pizza Details */}
      <div className="flex flex-col p-6">
        <CardTitle className="text-3xl font-bold font-serif mb-0 cursor-pointer">
          {pizza.title}
        </CardTitle>
        <CardDescription className="text-sm mb-4">
          {pizza.description}
        </CardDescription>
        <CardImage
          src={`http://localhost:5000/uploads/${pizza.image}`}
          alt={pizza.title}
          className="size-fit"
        />

        <div className="text-primary font-bold space-y-2 mb-6 mt-6">
          {/* Single Add to Cart Button */}
          <div className="flex items-center justify-center space-x-4">
            <Button
              className="w-full h-12 bg-primary text-background flex justify-center items-center relative"
              disabled={isButtonDisabled}
              onClick={handleAddProduct}>
              <span>{fromDetailsPage ? "Add to Deal" : "Add To Cart"}</span>
              {!fromDetailsPage && (
                <span className="absolute right-8">£{calculatePrice()}</span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Right Column for Sizes and Crusts */}
      <div className="container hidden md:flex flex-col gap-1">
        {/* Sizes Section - Horizontal Layout */}
        <div className="flex flex-col mb-4">
          <h2 className="text-2xl font-bold mb-4">SIZE</h2>
          <div className="flex space-x-4 items-center justify-center">
            {pizza.sizes.map((size) => (
              <Card
                key={size.sizeId._id}
                className={`flex flex-col flex-grow items-center justify-center transition-all duration-300 ease-in-out border-2 border-transparent hover:border-primary hover:bg-border cursor-pointer ${
                  selectedSize === size ? "border-primary" : ""
                }`}
                onClick={() => handleSelectedSize(size)}>
                <CardTitle className="text-base font-semibold text-center text-nowrap">
                  {size.sizeId.name}
                </CardTitle>

                <CardDescription className="text-sm mr-2 text-center text-nowrap">
                  {size.sizeId.description}
                </CardDescription>

                {!fromDetailsPage && (
                  <span className="text-lg font-bold text-center">
                    £{size.price}
                  </span>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Crusts Section - Vertical Layout */}
        <div>
          <h2 className="text-2xl font-bold mb-4">CRUST</h2>
          {crusts.length > 0 ? (
            <div className="flex flex-col space-y-4">
              {crusts.map((crust) => (
                <Card
                  key={crust._id}
                  className={`flex flex-row items-center transition-all duration-300 ease-in-out border-2 border-transparent hover:border-primary hover:bg-border cursor-pointer ${
                    selectedCrust === crust ? "border-primary" : ""
                  }`}
                  onClick={() => setSelectedCrust(crust)}>
                  <CardImage
                    src={`http://localhost:5000/uploads/${crust.image}`}
                    alt={crust.name}
                    className="w-24 h-24 object-cover mr-4"
                  />
                  <CardBody>
                    <CardTitle className="text-lg font-semibold mb-2">
                      {crust.name}
                    </CardTitle>
                    <CardDescription className="text-sm text-nowrap">
                      {crust.description}
                    </CardDescription>

                    <div className="text-sm">
                      <p>{crust.nutritionFacts}</p>
                      {crust.addonPrice > 0 && (
                        <p className="font-bold">£{crust.addonPrice}</p>
                      )}
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          ) : (
            <div>No crusts available for this size</div>
          )}

          <div className="flex flex-col items-start space-y-8 p-8">
            <CheeseToppingsOptions />
            <AdditionalMeatOptions />
            <AdditionalNonMeatOptions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
