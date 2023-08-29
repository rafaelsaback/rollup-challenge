import * as React from 'react';
import { IDocumentModel } from '../../../models/document-model';
import { observer } from 'mobx-react';
import styles from './document-item.module.css';
import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons';

interface IDocumentItemProps {
  document: IDocumentModel;
  onClick(): void;
  onDelete(): void;
}

const DocumentItem_ = (props: IDocumentItemProps): React.JSX.Element => {
  const onDelete = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    props.onDelete();
  };

  return (
    <div className={styles.documentItem} onClick={props.onClick}>
      <div className={styles.documentItemName}> {props.document.name}</div>
      <Button className={styles.deleteBtn} icon="trash" onClick={onDelete} />
    </div>
  );
};

export const DocumentItem = observer(DocumentItem_);
