import { AdditionalNonMeatToppings } from "@/components/ui/toppings";

import React, { useState } from "react";
import ToppingsComponentCheckBox from "@/components/ui/toppingsComponentCheckbox";

export const AdditionalNonMeatOptions = () => {
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
      <h3 className="text-xl font-semibold mb-8">
        Additional Non-Meat Toppings
      </h3>
      <ul>
        {AdditionalNonMeatToppings.map((nonMeat) => (
          <ToppingsComponentCheckBox
            key={nonMeat.id}
            imageSrc={nonMeat.src}
            altText={nonMeat.altText}
            value={nonMeat.id}
            onChange={handleCheckboxChange}
            selectedOptions={selectedOptions} // Pass selected options to control checkbox state
          >
            <div className="flex flex-col space-y-1">
              <span className="font-bold">{nonMeat.name}</span>
              <span className="text-sm">{nonMeat.calorie} kcal</span>
              <span className="text-sm font-semibold">+£{nonMeat.addon}</span>
            </div>
          </ToppingsComponentCheckBox>
        ))}
      </ul>
    </section>
  );
};
