import { useState } from "react";
import { CheckboxInput } from "../ui/checkbox-input";

export const Todos = () => {
  const [todos, setTodos] = useState([
    {
      title: "Make pages responsive",
      references: [],
      done: false,
    },
    {
      title: "Add cart functionality to hamburger, side menu in mobile.",
      references: ["YOU CAN REFER TO FILTER BUTTON ON TOP OF PIZZAS PAGE"],
      done: false,
    },
    {
      title:
        "Create a thank you page after checkout and then add a button to go home.",
      references: [],
      done: false,
    },
  ]);
  const handleCheckboxChange = (index, value) => {
    setTodos([
      ...todos.slice(0, index),
      {
        ...todos[index],
        done: !value,
      },
      ...todos.slice(index + 1),
    ]);
  };
  return (
    <ul className="flex flex-col gap-2">
      {todos.map((todo, index) => {
        const Tag = todo.done ? "del" : "strong";
        return (
          <li key={index} className="list-disc">
            <div className="flex justify-between items-start">
              <Tag>{todo.title}</Tag>
              <CheckboxInput
                value={todo.done}
                checked={todo.done}
                onChange={(value) => handleCheckboxChange(index, value)}
              />
            </div>
            {todo.references.length > 0 && !todo.done && (
              <ul className="px-4 flex gap-5 items-center flex-wrap">
                {todo.references.map((ref, index) => (
                  <li className="list-decimal" key={index}>
                    {ref}
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
};
