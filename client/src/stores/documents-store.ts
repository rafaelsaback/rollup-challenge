import { Instance, types } from 'mobx-state-tree';
import { DocumentModel } from '../models/document-model';

export const DocumentsStore = types
  .model({
    workspaceId: types.identifier,
    documents: types.optional(types.array(DocumentModel), []),
    selectedDocumentId: ''
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
    addDocument() {
      const newDoc = DocumentModel.create();
      self.documents.push(newDoc);
      self.selectDocument(newDoc.id);
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
