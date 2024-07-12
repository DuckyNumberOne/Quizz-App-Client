import React, { memo, useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";

interface PropsDefaultValue {
  onSubmitForm: (data: any, setError: any, reset: any) => void;
  classForm: string;
  children: (props: any) => React.JSX.Element;
  id?: string;
  defaultValue?: any;
}

const Form: React.FC<PropsDefaultValue> = ({
  children,
  classForm,
  onSubmitForm,
  defaultValue,
}) => {
  const [currentDefaultValue, setCurrentDefaultValue] =
    useState<any>(defaultValue);

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: currentDefaultValue,
  });
  // const router = useRouter();
  // const dispath = useDispatch();
  // const patch = usePathname();

  const onSubmit = useCallback(async (data: any) => {
    onSubmitForm(data, setError, reset);
  }, []);

  useEffect(() => {
    if (defaultValue !== undefined) {
      setCurrentDefaultValue(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (currentDefaultValue !== undefined) {
      reset(currentDefaultValue);
    }
  }, [currentDefaultValue, reset]);

  return (
    <form className={classForm} action="#" onSubmit={handleSubmit(onSubmit)}>
      {children({ registers: register, error: errors, controls: control })}
    </form>
  );
};
export default memo(Form);
