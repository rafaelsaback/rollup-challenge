import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { IDocumentModel } from '../../../models/document-model';
import { InputGroup } from '@blueprintjs/core';
import styles from './document-name.module.css';
import { useInputField } from '../../../hooks/use-input-field';
import { selectTextOnFocus } from '../../../utils/event-handler-utils';

interface IDocumentNameProps {
  document: IDocumentModel;
}

const DocumentName_ = (props: IDocumentNameProps): React.JSX.Element => {
  const [docName, onChange] = useInputField(props.document.name);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onBlur = () => {
    props.document.setName(docName);
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      props.document.setName(docName);
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <InputGroup
      className={styles.documentName}
      inputClassName={styles.input}
      inputRef={inputRef}
      value={docName}
      onChange={onChange}
      onFocus={selectTextOnFocus}
      onBlur={onBlur}
      onKeyUp={onKeyUp}
    />
  );
};

export const DocumentName = observer(DocumentName_);
