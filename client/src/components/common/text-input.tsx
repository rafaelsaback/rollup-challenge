import { InputGroup } from '@blueprintjs/core/lib/esm/components/forms/inputGroup';

import * as React from 'react';
import { observer } from 'mobx-react-lite';

interface ITextInputProps {
  value?: string;
  className?: string;
  inputClassName?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
}

const TextInput_ = (props: ITextInputProps): React.JSX.Element => {
  const { value, className, inputRef, inputClassName } = props;
  const { onChange, onFocus, onBlur, onKeyUp } = props;

  return (
    <InputGroup
      inputRef={inputRef}
      className={className}
      inputClassName={inputClassName}
      value={value}
      onFocus={onFocus}
      onChange={onChange}
      onBlur={onBlur}
      onKeyUp={onKeyUp}
    />
  );
};

export const TextInput = observer(TextInput_);
