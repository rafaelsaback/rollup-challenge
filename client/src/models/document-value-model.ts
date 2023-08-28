import { Instance, types } from 'mobx-state-tree';
import { v4 as uuidv4 } from 'uuid';

export const DocumentValueModel = types
  .model('DocumentValue', {
    id: types.optional(types.identifier, () => uuidv4()),
    key: '',
    value: ''
  })
  .actions((self) => ({
    setKey(key: string) {
      self.key = key;
    },
    setValue(value: string) {
      self.value = value;
    }
  }));

export interface IDocumentValueModel extends Instance<typeof DocumentValueModel> {}
