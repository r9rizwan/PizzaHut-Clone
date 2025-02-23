import { useState } from "react";
import { Button, CartIcon } from "@/components/ui";
import { CollectionGPS, Scooter } from "@/components/icons";
import { useSelector, useDispatch } from "react-redux";
import { TrashIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { cartActions } from "@/store/slices/cart-slice";
import { cn } from "@/utils";
import { DeliveryTypeDialog } from "@/components/ui/dialog";

const Cart = () => {
  const [activeIcon, setActiveIcon] = useState(null);
  const { cart, totalValue } = useSelector((store) => store.cart); // Accessing cart and totalValue from Redux
  const dispatch = useDispatch();

  // Function to handle icon clicks
  const handleIconClick = (iconName) => {
    setActiveIcon(iconName);
  };

  // Handle clearing the cart
  const handleClearCart = () => {
    dispatch(cartActions.clearCart()); // Dispatch the action to clear the cart
  };

  // Format price to a number (removes non-numeric characters)
  const formatPrice = (price) => {
    // Ensure price is a string before calling replace
    const priceString = typeof price === "string" ? price : price.toString();
    const rawPrice = parseFloat(priceString.replace(/[^0-9.-]+/g, "")); // Remove the currency symbol and parse the number
    return rawPrice.toFixed(2); // Format as two decimal places
  };

  return (
    <>
      {/* <div className="hidden xl:block bg-primary h-[5.85rem] w-1/5 sticky top-0 right-0"></div> */}
      <div className="hidden p-5 xl:flex flex-col gap-4 fixed right-0 h-screen w-1/5 bg-background border-l border-muted shadow-md">
        <h3 className="text-lg font-bold">Your Basket</h3>
        <div className="flex space-x-1 bg-muted p-2 rounded-md border-muted">
          {/* Delivery options */}
          <CartIcon
            icon={Scooter}
            activeBackground="bg-background"
            defaultBackground="bg-muted"
            isActive={activeIcon === "scooter"}
            onClick={() => handleIconClick("scooter")}>
            <div className="flex flex-col text-sm items-start">
              <span>Deliver</span>
              <span>£2.49</span>
            </div>
          </CartIcon>

          <CartIcon
            icon={CollectionGPS}
            activeBackground="bg-background"
            defaultBackground="bg-muted"
            isActive={activeIcon === "collectionGPS"}
            onClick={() => handleIconClick("collectionGPS")}>
            <div className="flex flex-col text-sm items-start">
              <span>Collect</span>
              <span>Free</span>
            </div>
          </CartIcon>
        </div>

        <DeliveryTypeDialog
          cart={cart}
          deliveryType={activeIcon}
          handleIconClick={handleIconClick}
        />

        <div className="flex h-full flex-col gap-4 relative">
          {/* Cart items */}
          <ul
            className="divide-y divide-border h-full flex flex-col gap-3 overflow-y-auto px-2 py-1 mb-40"
            style={{ scrollbarWidth: "thin" }}>
            {cart.map((item, index) => (
              <li
                key={item.id}
                className={cn("flex flex-col gap-1", index > 0 && "pt-3")}>
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-medium">{`${item.title}`}</h3>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(
                        cartActions.deleteFromCart({
                          id: item.id,
                          size: item.size,
                          crust: item.crust,
                        })
                      )
                    }>
                    <TrashIcon className="size-8 text-error hover:bg-red-500/15 p-2 rounded" />
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    {item?.crust && <span>{item?.crust}</span>}
                    {item?.size && item?.crust && <span> / </span>}
                    {item?.size && <span>{item?.size}</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={item.quantity <= 1}
                      onClick={() =>
                        dispatch(
                          cartActions.updateQuantity({
                            id: item.id,
                            size: item.size,
                            crust: item.crust,
                            quantity: item.quantity - 1,
                          })
                        )
                      }>
                      <MinusIcon className="size-4 text-muted-foreground" />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      disabled={item.quantity >= 10}
                      onClick={() =>
                        dispatch(
                          cartActions.updateQuantity({
                            id: item.id,
                            size: item.size,
                            crust: item.crust,
                            quantity: item.quantity + 1,
                          })
                        )
                      }>
                      <PlusIcon className="size-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Display total price */}
          {cart.length > 0 && (
            <div className="bg-background sticky bottom-0 flex justify-between items-start py-4">
              <div className="flex flex-col">
                <span className="text-lg font-semibold">
                  Total: £{" "}
                  {formatPrice(
                    activeIcon === "scooter" ? totalValue + 2.49 : totalValue
                  )}
                </span>
                {activeIcon === "scooter" && (
                  <span className="text-sm text-muted-foreground">
                    Incl. delivery of £ 2.49
                  </span>
                )}
              </div>
              {/* Button to clear cart */}
              <button
                type="button"
                className=" rounded-lg text-error font-semibold hover:bg-red-500/10 h-10 px-3"
                onClick={handleClearCart}>
                Clear Cart
              </button>
            </div>
          )}
        </div>

        {/* Show an error message if cart is cleared */}
        {cart.length === 0 && (
          <p className="text-error font-semibold mt-2">
            Your cart is empty. Add items to continue.
          </p>
        )}
      </div>
      <DeliveryTypeDialog />
    </>
  );
};

export default Cart;
