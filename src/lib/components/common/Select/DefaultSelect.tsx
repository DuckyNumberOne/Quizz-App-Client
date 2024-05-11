import React, { useEffect, useState } from "react";

interface OptionProps {
  value: string | number;
  title: string;
  [key: string]: any;
}

interface SelectProps {
  label: string;
  name: string;
  register: any;
  errors: any;
  textSelect?: string;
  errorsOption?: any;
  classLabel: string;
  classSelect: string;
  options: Array<OptionProps>;
  defaultValue?: string | number;
}

const Select: React.FC<SelectProps> = ({
  name,
  label,
  errors,
  errorsOption,
  options,
  register,
  textSelect,
  classLabel,
  classSelect,
  defaultValue,
}) => {
  const [selectedOption, setSelectedOption] = useState("");
  const keys = errorsOption ? Object.keys(errorsOption) : [];

  // useEffect(() => {
  //   if (!options.map((opt) => opt.value).includes(selectedOption)) {
  //     setSelectedOption("");
  //   }
  // }, [options]);

  return (
    <>
      <label htmlFor={name} className={classLabel}>
        {label}
      </label>
      <select
        value={selectedOption}
        id={name}
        {...register(name, errorsOption)}
        className={classSelect}
        defaultValue={defaultValue}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="" disabled>
          {textSelect}
        </option>
        {options &&
          options.map((item) => (
            <option
              key={item.value}
              value={item.value}
              // selected={item.value === defaultValue ? true : false}
            >
              {item.title}
            </option>
          ))}
      </select>

      {errors?.[name] &&
        keys.map((items, index) => (
          <div key={index}>
            {errors?.[name]?.type === items && (
              <p key={items} className="text-red mt-3 font-medium">
                {errors?.[name]?.message}
              </p>
            )}
          </div>
        ))}
    </>
  );
};
export default Select;
