import { useContext } from "react";
import { dealsContext } from "@/components/providers/deals-provider";

export const useDeals = () => {
    const context = useContext(dealsContext);

    // If context is not found, throw an error
    if (!context) {
        throw new Error("useDeals must be used within a DealsProvider");
    }

    return context;
};