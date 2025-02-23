import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui";
import { useNavigate } from "react-router-dom";
import { cartActions } from "@/store/slices/cart-slice";
import Typography from "@/components/ui/typography";

const Exit = () => {
  const cart = useSelector((state) => state.cart.cart);
  const totalValue = useSelector((state) => state.cart.totalValue);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Correct usage of useNavigate hook

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto p-6 bg-muted rounded-lg shadow-sm mb-12">
      {/* Thank You Message */}
      <Typography className="text-lg font-medium text-center mb-6">
        Thank you for ordering with Pizza Hut. We aim to deliver in{" "}
        <span className="font-bold text-error">30 mins</span>.
      </Typography>

      {/* Order Summary Title */}
      <Typography className="text-xl font-semibold text-gray-700 mb-4">
        Order Summary:
      </Typography>

      {/* Cart Items */}
      <div className="w-full bg-white rounded-lg p-4 shadow-sm space-y-4">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div
              key={item.id + item.size + item.crust}
              className="flex justify-between items-center border-b pb-4">
              {/* Item Details */}
              <div>
                <p className="font-medium text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-500">
                  {item.size && item.crust
                    ? `${item.size} | ${item.crust}`
                    : item.size || item.crust}
                </p>
              </div>

              {/* Quantity and Price */}
              <div className="flex flex-col items-end">
                <span className="text-sm text-gray-600">
                  Qty: {item.quantity}
                </span>
                <span className="text-sm font-semibold text-gray-800">
                  £{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <Typography className="text-center text-gray-500">
            Your cart is empty!
          </Typography>
        )}
      </div>

      {/* Total and Continue Shopping */}
      {cart.length > 0 && (
        <div className="w-full flex justify-between items-center mt-6">
          <Typography className="text-lg font-semibold">Total:</Typography>
          <Typography className="text-xl font-bold text-gray-800">
            £{totalValue ? totalValue.toFixed(2) : "0.00"}
          </Typography>
        </div>
      )}

      <Button
        className="mt-8 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700"
        onClick={() => {
          dispatch(cartActions.clearCart()); // Dispatch clear cart action
          navigate("/home/deals"); // Navigate to the continue shopping page
        }}>
        Continue Shopping
      </Button>
    </div>
  );
};

export default Exit;
