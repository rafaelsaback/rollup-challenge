import { Button, InputGroup, TextArea } from '@blueprintjs/core';
import * as React from 'react';
import { IDocumentValueModel } from '../../../models/document-value-model';
import styles from './document-value.module.css';
import { observer } from 'mobx-react';

interface IDocumentValueProps {
  docValue: IDocumentValueModel;
  onDelete(): void;
  onMoveUp(): void;
  onMoveDown(): void;
}

const DocumentValue_ = (props: IDocumentValueProps): React.JSX.Element => {
  const [key, setKey] = React.useState(props.docValue.key);
  const [value, setValue] = React.useState(props.docValue.value);
  const inputKeyRef = React.useRef<HTMLInputElement>(null);
  const inputValueRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setValue(props.docValue.value);
  }, [props.docValue.value]);

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const commitChanges = () => {
    props.docValue.setKey(key);
    props.docValue.setValue(value);
  };

  const onKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value.replace('\n', ''));
  };

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.replace('\n', ''));
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        commitChanges();
        inputValueRef.current?.blur();
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
    <div className={styles.documentValue}>
      <label>Key:</label>
      <InputGroup
        inputRef={inputKeyRef}
        className={styles.textInput}
        value={key}
        onFocus={onFocus}
        onChange={onKeyChange}
        onBlur={commitChanges}
        onKeyUp={onKeyUp}
      />
      <label>Value:</label>
      <InputGroup
        inputRef={inputValueRef}
        className={styles.textInput}
        value={value}
        onFocus={onFocus}
        onChange={onValueChange}
        onBlur={commitChanges}
        onKeyUp={onKeyUp}
      />
      <Button className={styles.deleteBtn} icon="trash" onClick={props.onDelete} />
    </div>
  );
};

export const DocumentValue = observer(DocumentValue_);
