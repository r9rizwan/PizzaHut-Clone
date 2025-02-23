import ToppingsComponent from "@/components/ui/toppingsComponent";
import { CheeseOptions } from "@/components/ui/toppings";
import { useState } from "react";

export const CheeseToppingsOptions = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const handleRadioChange = (option) => {
    setSelectedOption(option);
  };
  return (
    <section className="mb-6">
      <h3 className="text-xl font-semibold mb-8">Cheese Options</h3>
      <ul>
        {CheeseOptions.map((cheese) => (
          <ToppingsComponent
            key={cheese.id}
            id={cheese.id}
            imageSrc={cheese.src}
            altText={cheese.altText}
            value={cheese.value}
            selectedOption={selectedOption}
            onChange={handleRadioChange}
          >
            <div className="flex flex-col space-y-1">
              <span className="font-bold">{cheese.name}</span>
              <span className="text-sm">{cheese.calorie} kcal</span>
              <span className="text-sm font-semibold">+£{cheese.addon}</span>
            </div>
          </ToppingsComponent>
        ))}
      </ul>
    </section>
  );
};
