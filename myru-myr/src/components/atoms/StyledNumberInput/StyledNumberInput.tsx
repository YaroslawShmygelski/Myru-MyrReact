import { useState, ChangeEvent } from "react";
import "./styles.css";

interface StyledNumberInputProps {
  onInputValueChange: (value: number) => void;
  initial_value?: number;
}

export const StyledNumberInput = ({
  onInputValueChange,
  initial_value,
}: StyledNumberInputProps) => {
  const [quantity, setQuantity] = useState<number>(initial_value ?? 1);
  const [effect1, setEffect1] = useState<boolean>(false);
  const [effect2, setEffect2] = useState<boolean>(false);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input_val = e.target.value;

    if (input_val === "") {
      setQuantity(1);
      onInputValueChange(1);
    } else {
      const parsed_val = parseInt(input_val, 10);
      if (!isNaN(parsed_val)) {
        const fixed_val = Math.max(Math.min(parsed_val, 99), 1);
        setQuantity(fixed_val);
        onInputValueChange(fixed_val);
      }
    }
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = Math.min(prevQuantity + 1, 99);
      onInputValueChange(newQuantity);
      return newQuantity;
    });
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = Math.max(prevQuantity - 1, 1);
      onInputValueChange(newQuantity);
      return newQuantity;
    });
  };

  return (
    <>
      <div className="flex items-center justify-between w-full px-1 gap-2">
        <button
          className={`modal-action-button ${effect2 ? "animate-press" : ""}`}
          onClick={() => {
            handleDecrement();
            setEffect2(true);
          }}
          onAnimationEnd={() => setEffect2(false)}
        >
          <p className="text-white text-lg font-semibold">-</p>
        </button>

        <input
          type="number"
          value={quantity === 0 ? 1 : quantity}
          onChange={handleOnChange}
          className="modal-input-field text-black bg-white border border-gray-300 p-2 rounded-md"
          placeholder="Enter quantity"
        />

        <button
          className={`modal-action-button ${effect1 ? "animate-press" : ""}`}
          onClick={() => {
            handleIncrement();
            setEffect1(true);
          }}
          onAnimationEnd={() => setEffect1(false)}
        >
          <p className="text-white text-lg font-semibold">+</p>
        </button>
      </div>
      <div className="mt-4 text-2xl text-mainText font-medium"></div>
    </>
  );
};
