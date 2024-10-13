import React from 'react';

const FormInput = ({ label, type, name, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-black mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-black bg-white text-black rounded focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
      />
    </div>
  );
};

export default FormInput;
