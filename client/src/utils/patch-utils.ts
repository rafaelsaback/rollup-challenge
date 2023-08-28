import { IJsonPatch } from 'mobx-state-tree';

export const isSelectedDocumentPatch = (patch: IJsonPatch) =>
  patch.path.includes('selectedDocument');
