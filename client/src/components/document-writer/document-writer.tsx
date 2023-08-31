import * as React from 'react';
import styles from './document-writer.module.css';
import { IDocumentModel } from '../../models/document-model';
import { DocumentValue } from './document-value';
import { observer } from 'mobx-react';
import { DocumentName } from './document-name';
import { Button } from '../common/button';
import { NonIdealState } from '../common/non-ideal-state';

interface IDocumentWriterProps {
  document?: IDocumentModel;
  addNewDocValue(): void;
}

const DocumentWriter_ = (props: IDocumentWriterProps): React.JSX.Element => {
  const addDocumentValue = () => {
    props.addNewDocValue();
  };

  const renderEmptyDocument = () => {
    return (
      <NonIdealState
        title="No document selected"
        description="Please select or create a new document"
      />
    );
  };

  const renderDocument = (doc: IDocumentModel) => {
    return (
      <>
        <DocumentName document={doc} />
        {doc.documentValues.map((docValue) => (
          <DocumentValue
            key={docValue.id}
            docValue={docValue}
            onDelete={() => doc.deleteDocumentValue(docValue.id)}
            onMoveUp={() => doc.moveDocumentValueUp(docValue.id)}
            onMoveDown={() => doc.moveDocumentValueDown(docValue.id)}
          />
        ))}
        <Button className={styles.button} icon="add" intent="primary" onClick={addDocumentValue}>
          Key/Value Pair
        </Button>
      </>
    );
  };

  return (
    <div className={styles.documentWriter}>
      <div className={styles.documentWriterPaper}>
        {props.document ? renderDocument(props.document) : renderEmptyDocument()}
      </div>
    </div>
  );
};

export const DocumentWriter = observer(DocumentWriter_);
