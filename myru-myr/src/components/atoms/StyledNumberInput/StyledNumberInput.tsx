import { useState, ChangeEvent } from "react";

interface StyledNumberInputProps {
  onInputValueChange: (value: number) => void;
}

export const StyledNumberInput = ({
  onInputValueChange,
}: StyledNumberInputProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [effect1, setEffect1] = useState<boolean>(false);
  const [effect2, setEffect2] = useState<boolean>(false);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input_val = e.target.value;

    if (input_val === "") {
      setQuantity(0);
      onInputValueChange(0);
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
          className={`flex items-center justify-center gap-1 w-8 h-8 rounded-full bg-customBlue hover:bg-customBlue700 hover:shadow-xl ${
            effect2 ? "animate-press" : ""
          }`}
          onClick={() => {
            handleDecrement();
            setEffect2(true);
          }}
          onAnimationEnd={() => setEffect2(false)}
        >
          <p className="text-white text-2xl font-semibold">-</p>
        </button>

        <input
          type="number"
          value={quantity === 0 ? "" : quantity}
          onChange={handleOnChange}
          className="p-1 m-1 shadow-md hover:shadow-xl rounded-md border-0 border-b-2 border-gray-300 w-12 text-center text-lg appearance-none
          [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden 
          focus:border-b-2 focus:border-customBlue focus:outline-none"
        />

        <button
          className={`flex items-center justify-center gap-1 w-8 h-8 rounded-full bg-customBlue hover:bg-customBlue700 hover:shadow-xl ${
            effect1 ? "animate-press" : ""
          }`}
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
