import { Button, TextArea } from '@blueprintjs/core';
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
  const [value, setValue] = React.useState(props.docValue.value);
  const textAreaRef = React.useRef<TextArea>(null);

  React.useEffect(() => {
    setValue(props.docValue.value);
  }, [props.docValue.value]);

  const onFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.target.select();
  };

  const onBlur = () => {
    props.docValue.setValue(value);
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value.replace('\n', ''));
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        props.docValue.setValue(value);
        textAreaRef.current?.textareaElement?.blur();
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
      <TextArea
        ref={textAreaRef}
        className={styles.textArea}
        value={value}
        onFocus={onFocus}
        onChange={onChange}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
      />
      <Button className={styles.deleteBtn} icon="trash" onClick={props.onDelete} />
    </div>
  );
};

export const DocumentValue = observer(DocumentValue_);
