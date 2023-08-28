import { Instance, types } from 'mobx-state-tree';
import { v4 as uuidv4 } from 'uuid';
import { DocumentValueModel } from './document-value-model';

export const DocumentModel = types
  .model('Document', {
    id: types.optional(types.identifier, () => uuidv4()),
    documentValues: types.optional(types.array(DocumentValueModel), []),
    name: 'Untitled'
  })
  .views((self) => ({
    getDocumentValue(fragmentId: string) {
      return self.documentValues.find((fragment) => fragment.id === fragmentId);
    }
  }))
  .actions((self) => ({
    setName(value: string) {
      self.name = value;
    },
    addNewDocumentValue(value = '') {
      const docValue = DocumentValueModel.create();
      docValue.setValue(value);
      self.documentValues.push(docValue);
    },
    replaceDocumentValue(valueId: string, value: string) {
      const documentValue = self.getDocumentValue(valueId);
      documentValue?.setValue(value);
    },
    deleteDocumentValue(valueId: string) {
      const documentValue = self.getDocumentValue(valueId);
      if (documentValue) {
        self.documentValues.remove(documentValue);
      }
    },
    moveDocumentValue(valueId: string, _position: number) {
      const documentValue = self.getDocumentValue(valueId);
      const newPosition = Math.max(0, Math.min(self.documentValues.length - 1, _position));
      if (!documentValue) {
        return;
      }

      const currentPosition = self.documentValues.indexOf(documentValue);

      if (currentPosition !== newPosition) {
        const documentValueCopy = { ...documentValue };
        self.documentValues.remove(documentValue);
        self.documentValues.splice(newPosition, 0, documentValueCopy);
      }
    }
  }))
  .actions((self) => ({
    moveDocumentValueUp(valueId: string) {
      const documentValue = self.getDocumentValue(valueId);
      if (documentValue) {
        const index = self.documentValues.indexOf(documentValue);
        self.moveDocumentValue(valueId, index - 1);
      }
    },
    moveDocumentValueDown(valueId: string) {
      const documentValue = self.getDocumentValue(valueId);
      if (documentValue) {
        const index = self.documentValues.indexOf(documentValue);
        self.moveDocumentValue(valueId, index + 1);
      }
    }
  }));

export interface IDocumentModel extends Instance<typeof DocumentModel> {}
