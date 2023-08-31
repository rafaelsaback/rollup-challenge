import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { NonIdealState as BlueprintNonIdealState } from '@blueprintjs/core/lib/esm/components/non-ideal-state/nonIdealState';

interface INonIdealStateProps {
  title?: React.ReactNode;
  description?: React.ReactChild;
}

const NonIdealState_ = (props: INonIdealStateProps): React.JSX.Element => {
  const { title, description } = props;

  return <BlueprintNonIdealState title={title} description={description} />;
};

export const NonIdealState = observer(NonIdealState_);
