import React, { useState } from "react";
import ToppingsComponentCheckBox from "@/components/ui/toppingsComponentCheckbox";
import { AdditionalMeatToppings } from "@/components/ui/toppings";

export const AdditionalMeatOptions = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (value) => {
    setSelectedOptions(
      (prevSelected) =>
        prevSelected.includes(value)
          ? prevSelected.filter((item) => item !== value) // Remove if already selected
          : [...prevSelected, value] // Add if not selected
    );
  };

  return (
    <section className="mb-6">
      <h3 className="text-xl font-semibold mb-8">Additional Meat Toppings</h3>
      <ul>
        {AdditionalMeatToppings.map((meat) => (
          <ToppingsComponentCheckBox
            key={meat.id}
            imageSrc={meat.src}
            altText={meat.altText}
            value={meat.id}
            onChange={handleCheckboxChange}
            selectedOptions={selectedOptions} // Pass selected options to control checkbox state
          >
            <div className="flex flex-col space-y-1">
              <span className="font-bold">{meat.name}</span>
              <span className="text-sm">{meat.calorie} kcal</span>
              <span className="text-sm font-semibold">+£{meat.addon}</span>
            </div>
          </ToppingsComponentCheckBox>
        ))}
      </ul>
    </section>
  );
};
