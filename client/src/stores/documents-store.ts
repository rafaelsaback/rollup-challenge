import { Instance, types } from 'mobx-state-tree';
import { DocumentModel } from '../models/document-model';
import { v4 as uuidv4 } from 'uuid';

export const DocumentsStore = types
  .model({
    workspaceId: types.optional(types.identifier, () => uuidv4()),
    documents: types.optional(types.array(DocumentModel), []),
    selectedDocumentId: types.optional(types.string, '')
  })
  .views((self) => ({
    getDocument(id: string) {
      return self.documents.find((doc) => doc.id === id);
    }
  }))
  .views((self) => ({
    get selectedDocument() {
      return self.getDocument(self.selectedDocumentId);
    }
  }))
  .actions((self) => ({
    addDocument() {
      const newDoc = DocumentModel.create();
      self.documents.push(newDoc);
      return newDoc;
    },
    selectDocument(docId: string) {
      const isValidDocId = !!self.getDocument(docId);
      if (isValidDocId) {
        self.selectedDocumentId = docId;
        console.log('Selected document', docId);
      } else {
        self.selectedDocumentId = '';
      }
    }
  }))
  .actions((self) => ({
    deleteDocument(docId: string) {
      const doc = self.getDocument(docId);
      if (doc) {
        self.documents.remove(doc);
      }
    }
  }));

export interface IDocumentStore extends Instance<typeof DocumentsStore> {}
