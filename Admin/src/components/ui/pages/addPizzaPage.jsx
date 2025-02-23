import React from "react";
import AddPizzaForm from "@/pages/addPizza";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/buttons";

const AddPizzaPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <Button type="button" onClick={() => navigate(-1)} className="mb-4">
        Go Back
      </Button>
      <AddPizzaForm onClose={() => navigate("/home/pizzas")} />
    </div>
  );
};

export default AddPizzaPage;
