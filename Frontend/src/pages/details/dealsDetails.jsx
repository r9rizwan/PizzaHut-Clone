import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardImage,
  CardTitle,
  CardSubTitle,
  Button,
} from "@/components/ui";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/slices/cart-slice";
import { useMemo } from "react";
import { dealsActions } from "@/store/slices/deals-slice";

const DealsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deal, setDeal] = useState(null);
  const { selectedDeal } = useSelector((store) => store.deals);
  const dispatch = useDispatch();
  console.log(selectedDeal);

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/deals/${id}`);
        const data = await response.json();
        setDeal(data);
      } catch (error) {
        console.error("Error fetching deal details:", error);
      }
    };

    fetchDeal();
  }, [id]);

  const handleSelect = ({ type, quantity, ...item }, index, position) => {
    let queryString = "";
    for (const key in item) {
      if (Object.prototype.hasOwnProperty.call(item, key)) {
        const value = item[key];
        queryString += `&${key}=${value}`;
      }
    }
    navigate(
      `/home/${type}?fromDetailsPage=true&dealId=${id}&index=${index}&position=${position}&${queryString}`
    );
  };

  const renderCategoryCard = (item, index) => {
    // Create an array to render the category card as many times as specified by the count
    const cards = [];
    for (let i = 1; i <= parseInt(item.quantity); i++) {
      const label = `${i}. ${
        selectedDeal[index] && selectedDeal[index][i]
          ? selectedDeal[index][i].title
          : item.type.replace(/s$/, "")
      }`; // Remove trailing "s" from plural

      cards.push(
        <Card
          key={`${item.type}-${i}`}
          className="flex flex-row items-center justify-between p-2 mt-4 mb-4 cursor-pointer transition-all duration-300 ease-in-out transform hover:border-error border-2"
          onClick={() => handleSelect(item, index, i)}>
          <div>
            <h6 className="capitalize font-light text-xl">{label}</h6>
            {selectedDeal[index] &&
              selectedDeal[index][i] &&
              selectedDeal[index][i].size && (
                <span className="ml-5">{selectedDeal[index][i].size}</span>
              )}
            {selectedDeal[index] &&
              selectedDeal[index][i] &&
              selectedDeal[index][i].crust && (
                <span> / {selectedDeal[index][i].crust}</span>
              )}
          </div>
          <Button
            className="px-5 font-normal"
            color={
              selectedDeal[index] &&
              selectedDeal[index][i] &&
              selectedDeal[index][i]
                ? "outline-primary"
                : "primary"
            }
            onClick={(e) => {
              e.stopPropagation();
              handleSelect(item, index, i);
            }}>
            {selectedDeal[index] &&
            selectedDeal[index][i] &&
            selectedDeal[index][i]
              ? "Edit"
              : "Select"}
          </Button>
          {/* {selectedCategory === type && renderCategoryComponent(type)} */}
        </Card>
      );
    }
    return cards;
  };

  // convert array to some other datatype like number, string, object etc.
  // current scenario: array of object => number (total items in deal)
  // accumulator points to the updated value of second argument of reduce (initial value)
  // must return some value which is then assigned to the accumulator

  // [{quantity: 1}, {quantity: 2}, {quantity: 3}]

  // i => 0, acc = 0, curr = {quantity: 1}, curr.quantity = 1, return acc = 0 + 1 = 1
  // i => 1, acc = 1, curr = {quantity: 2}, curr.quantity = 2, return acc = 1 + 2 = 3
  // i => 2, acc = 3, curr = {quantity: 3}, curr.quantity = 3, return acc = 3 + 3 = 6

  // result = 6, totalItems

  const totalItems = deal?.category.reduce((acc, curr) => {
    return acc + parseInt(curr.quantity);
  }, 0);

  // 6

  // Object.keys({0: {}, 1: {}, 2: {}}) => [0, 1, 2]
  // [0, 1, 2, 3]

  // i = 0, acc = 0, curr = 0, Object.keys(selectedDeal[0]).length = 2, return acc = 0 + 2 = 2
  // i = 1, acc = 2, curr = 1, Object.keys(selectedDeal[1]).length = 2, return acc = 2 + 2 = 4
  // i = 2, acc = 4, curr = 2, Object.keys(selectedDeal[2]).length = 1, return acc = 4 + 1 = 5
  // i = 2, acc = 5, curr = 3, Object.keys(selectedDeal[3]).length = 1, return acc = 5 + 1 = 6
  const selectedItems = useMemo(
    () =>
      Object.keys(selectedDeal).reduce((acc, curr) => {
        // acc = acc + 1;
        // Object.keys(selectedDeal[curr]).length // length of nested object => 2, 1
        acc = acc + Object.keys(selectedDeal[curr]).length;
        return acc;
      }, 0),
    [selectedDeal]
  );

  const showAddToCartButton = totalItems === selectedItems;

  console.log(totalItems);
  console.log(selectedItems);

  const handleAddDealToCart = () => {
    if (!showAddToCartButton) return null;
    dispatch(
      cartActions.addToCart({
        title: deal.title,
        quantity: 1,
        price: deal.price,
      })
    );
    dispatch(dealsActions.clearSelectedDeal());
    return navigate("/home/deals");
  };

  if (!deal) return <div>Loading...</div>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 container mx-auto p-4">
      <div className="flex flex-col mt-4 w-4/5">
        <CardImage src={deal.image} alt={deal.title} />
        <CardTitle className="text-2xl font-bold mt-4">{deal.title}</CardTitle>
        <div>
          {deal.description
            .split(",") // Split by commas
            .map((item, index) => (
              <p key={index}>{item.trim()}</p> // Trim spaces and render each as a <p> tag
            ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-1">
            {deal.previousPrice && (
              <del className="text-muted-foreground text-sm ml-2">
                £{deal.previousPrice}
              </del>
            )}
            <CardSubTitle className="text-xl font-bold text-primary">
              £{deal.price}
            </CardSubTitle>
          </div>
          {showAddToCartButton && (
            <div>
              <Button
                color="outline-primary"
                type="button"
                onClick={handleAddDealToCart}>
                Add To Cart
              </Button>
            </div>
          )}
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold">Deal Details</h1>
        {deal.category.map((item, index) => {
          return renderCategoryCard(item, index);
        })}
      </div>
    </div>
  );
};

export default DealsDetail;
