import * as React from 'react';
import { IDocumentValueModel } from '../../../models/document-value-model';
import styles from './document-value.module.css';
import { observer } from 'mobx-react';
import { useInputField } from '../../../hooks/use-input-field';
import { selectTextOnFocus } from '../../../utils/event-handler-utils';
import { InputGroup } from '@blueprintjs/core/lib/esm/components/forms/inputGroup';
import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons';

interface IDocumentValueProps {
  docValue: IDocumentValueModel;
  onDelete(): void;
  onMoveUp(): void;
  onMoveDown(): void;
}

const DocumentValue_ = (props: IDocumentValueProps): React.JSX.Element => {
  const [key, onKeyChangeHandler] = useInputField(props.docValue.key);
  const [value, onValueChangeHandler] = useInputField(props.docValue.value);
  const inputKeyRef = React.useRef<HTMLInputElement>(null);
  const inputValueRef = React.useRef<HTMLInputElement>(null);

  const commitChanges = () => {
    props.docValue.setKey(key);
    props.docValue.setValue(value);
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        commitChanges();
        (e.target as HTMLInputElement).blur();
        break;
      case 'ArrowUp':
        props.onMoveUp();
        break;
      case 'ArrowDown':
        props.onMoveDown();
        break;
    }
  };

  return (
    <form className={styles.documentValue}>
      <label>Key:</label>
      <InputGroup
        inputRef={inputKeyRef}
        className={styles.textInput}
        value={key}
        onFocus={selectTextOnFocus}
        onChange={onKeyChangeHandler}
        onBlur={commitChanges}
        onKeyUp={onKeyUp}
      />
      <label>Value:</label>
      <InputGroup
        inputRef={inputValueRef}
        className={styles.textInput}
        value={value}
        onFocus={selectTextOnFocus}
        onChange={onValueChangeHandler}
        onBlur={commitChanges}
        onKeyUp={onKeyUp}
      />
      <Button className={styles.deleteBtn} icon="trash" onClick={props.onDelete} />
    </form>
  );
};

export const DocumentValue = observer(DocumentValue_);
