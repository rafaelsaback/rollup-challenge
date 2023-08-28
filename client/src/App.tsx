import React from 'react';
import './App.css';
import { DocumentsList } from './components/documents-list';
import { DocumentWriter } from './components/document-writer';
import { DocumentManagerService } from './services/document-manager-service';
import { observer } from 'mobx-react';

const WORKSPACE_ID_QUERY_PARAM = 'workspaceId';

const getWorkspaceId = () => {
  const searchParams = new URLSearchParams(document.location.search);
  return searchParams.get(WORKSPACE_ID_QUERY_PARAM) ?? undefined;
};

function App() {
  const [workspaceId] = React.useState(getWorkspaceId);
  const [docManager] = React.useState<DocumentManagerService>(
    () => new DocumentManagerService(workspaceId)
  );

  React.useEffect(() => {
    docManager.init();
    return () => docManager.dispose();
  }, [docManager]);

  return (
    <div className="App">
      <DocumentsList
        documents={docManager.documents}
        addNewDoc={docManager.addNewDoc}
        onSelectDocument={docManager.selectDocument}
        onDeleteDocument={docManager.deleteDocument}
      />
      <DocumentWriter
        document={docManager.selectedDocument}
        addNewDocValue={docManager.addNewDocValue}
      />
    </div>
  );
}

export default observer(App);
