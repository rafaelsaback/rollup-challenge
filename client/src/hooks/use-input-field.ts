import React from 'react';

export const useInputField = (
  initialValue: string
): [string, React.ChangeEventHandler<HTMLInputElement>] => {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return [value, onChange];
};
