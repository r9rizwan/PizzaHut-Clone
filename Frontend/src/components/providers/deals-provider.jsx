import React, { createContext, useContext, useState } from "react";
import { dealsContext } from "../contexts";

export const DealsProvider = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState({});

  const updateSelectedProduct = (
    dealId,
    categoryType,
    product,
    additionalDetails = {}
  ) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [dealId]: {
        ...(prev[dealId] || {}),
        [categoryType]: { ...product, ...additionalDetails },
      },
    }));
  };

  const getSelectedProduct = (dealId, categoryType) => {
    return selectedProducts[dealId]?.[categoryType] || null;
  };

  return (
    <dealsContext.Provider value={{ selectedProducts, updateSelectedProduct }}>
      {children}
    </dealsContext.Provider>
  );
};
