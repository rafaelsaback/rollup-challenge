import * as React from 'react';
import cn from 'classnames';
import styles from './documents-list.module.css';
import { IDocumentModel } from '../../models/document-model';
import { observer } from 'mobx-react';
import { DocumentItem } from './document-item';
import { Button } from '@blueprintjs/core';

interface IDocumentsListProps {
  documents: IDocumentModel[];
  addNewDoc(): void;
  onSelectDocument(id: string): void;
  onDeleteDocument(id: string): void;
}

const DocumentsList_ = (props: IDocumentsListProps): React.JSX.Element => {
  const addNewDoc = () => props.addNewDoc();

  return (
    <div className={styles.documentsList}>
      <h3>Documents</h3>
      {props.documents.map((doc) => (
        <DocumentItem
          key={doc.id}
          document={doc}
          onClick={() => props.onSelectDocument(doc.id)}
          onDelete={() => props.onDeleteDocument(doc.id)}
        />
      ))}
      <Button
        icon="add"
        className={cn({ [styles.button]: props.documents.length })}
        onClick={addNewDoc}
      />
    </div>
  );
};

export const DocumentsList = observer(DocumentsList_);
