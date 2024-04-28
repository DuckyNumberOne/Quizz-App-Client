import React from "react";

interface OptionProps {
  value: string;
  text: string;
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
  defaultValue?: string;
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
  const keys = errorsOption ? Object.keys(errorsOption) : [];

  return (
    <>
      <label htmlFor={name} className={classLabel}>
        {label}
      </label>
      <select
        id={name}
        {...register(name, errorsOption)}
        className={classSelect}
        defaultValue={defaultValue}
      >
        <option value="" disabled selected>
          {textSelect}
        </option>
        {options.map((items) => (
          <option key={items.value} value={`${items.value}`}>
            {items.value}
          </option>
        ))}
      </select>
      {errors?.[name] &&
        keys.map((items) => (
          <>
            {errors?.[name]?.type === items && (
              <p key={items} className="text-red-600 mt-3">
                {errors?.[name]?.message}
              </p>
            )}
          </>
        ))}
    </>
  );
};
export default Select;
