import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { IDocumentModel } from '../../../models/document-model';
import { InputGroup } from '@blueprintjs/core';
import styles from './document-name.module.css';

interface IDocumentNameProps {
  document: IDocumentModel;
}

const DocumentName_ = (props: IDocumentNameProps): React.JSX.Element => {
  const [docName, setDocName] = React.useState(props.document.name);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setDocName(props.document.name);
  }, [props.document.name]);

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const onBlur = () => {
    props.document.setName(docName);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocName(e.target.value.replace('\n', ''));
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      props.document.setName(docName);
      inputRef.current?.blur();
    }
  };

  return (
    <InputGroup
      className={styles.documentName}
      inputClassName={styles.input}
      inputRef={inputRef}
      value={docName}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyUp={onKeyUp}
    />
  );
};

export const DocumentName = observer(DocumentName_);
