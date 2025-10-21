'use client';

import React, { useState } from 'react';

interface SwitchButtonProps {
  initialState?: boolean;
  onChange?: (state: boolean) => void;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({ initialState = false, onChange }) => {
  const [isOn, setIsOn] = useState(initialState);

  const toggleSwitch = () => {
    setIsOn((prev) => {
      const newState = !prev;
      onChange?.(newState);
      return newState;
    });
  };

  return (
    <button
      onClick={toggleSwitch}
      className={`w-[50px] h-[28px] rounded-full cursor-pointer relative transition-colors duration-300 ${
        isOn ? 'bg-[#10B981]' : 'bg-[#E5E7EB]'
      }`}
    >
      <span
        className={`w-[22px] h-[22px] bg-white rounded-full shadow-md absolute top-[3px] transition-all duration-300 ${
          isOn ? 'left-[25px]' : 'left-[3px]'
        }`}
      />
    </button>
  );
};

export default SwitchButton;
