import { WebsocketService } from './websocket-service';
import { v4 as uuidv4 } from 'uuid';
import { DocumentsStore, IDocumentStore } from '../stores/documents-store';
import { IJsonPatch, onPatch, applyPatch } from 'mobx-state-tree';
import { IDocumentModel } from '../models/document-model';
import { isSelectedDocumentPatch } from '../utils/patch-utils';

export class DocumentManagerModel {
  private readonly _workspaceId: string;
  private readonly _documentStore: IDocumentStore;
  private _inPatching = false;

  constructor(workspaceId: string = 'default') {
    this._workspaceId = workspaceId;
    this._documentStore = DocumentsStore.create();
    onPatch(this._documentStore, this.onPatch);
  }

  public init() {
    WebsocketService.init();
    this.subToWorkspace(this._workspaceId);
    this.subToPatches();
  }

  public dispose() {
    this.unsubFromWorkspace(this._workspaceId);
    this.unsubToPatches();
  }

  private subToWorkspace(workspaceId: string) {
    WebsocketService.instance.send('sub', { workspaceId }, (success) => {
      if (success) {
        console.log(`Subscribed to ${workspaceId}`);
      }
    });
  }

  private unsubFromWorkspace(workspaceId: string) {
    WebsocketService.instance.send('unsub', { workspaceId }, (success) => {
      if (success) {
        console.log(`Unsubscribed from ${workspaceId}`);
      }
    });
  }

  private submitPatch(workspaceId: string, documentId: string, patches: any) {
    const patchId = uuidv4();
    WebsocketService.instance.send(
      'patch',
      { workspaceId, documentId, patchId, patches },
      (success) => {
        if (success) {
          console.log(`Patch ${patchId} for document ${documentId} sent to ${workspaceId}`);
          console.log(patches);
        }
      }
    );
  }

  private subToPatches() {
    WebsocketService.instance.subscribe('patch', this.applyPatch);
  }

  private unsubToPatches() {
    WebsocketService.instance.unsubscribe('patch');
  }

  private onPatch = (patches: IJsonPatch) => {
    if (!this._inPatching && !isSelectedDocumentPatch(patches)) {
      this.submitPatch(this._workspaceId, '', patches);
    }
  };

  private applyPatch = ({ workspaceId, documentId, patches }: any) => {
    console.log(workspaceId, documentId, patches);
    this._inPatching = true;
    applyPatch(this._documentStore, patches);
    this._inPatching = false;
  };

  public addNewDoc = () => {
    const newDoc = this._documentStore.addDocument();
    this._documentStore.selectDocument(newDoc.id);
    return newDoc;
  };

  public addNewDocValue = () => {
    this._documentStore.selectedDocument?.addNewDocumentValue();
  };

  public get documents(): IDocumentModel[] {
    return this._documentStore.documents;
  }

  public selectDocument = (id: string) => {
    this._documentStore.selectDocument(id);
  };

  public deleteDocument = (id: string) => {
    this._documentStore.deleteDocument(id);
  };

  public get selectedDocument(): IDocumentModel | undefined {
    return this._documentStore.selectedDocument;
  }
}
