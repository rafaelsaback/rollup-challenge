import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { Button as BlueprintButton } from '@blueprintjs/core/lib/esm/components/button/buttons';
import { IconName } from '@blueprintjs/icons';
import { MaybeElement } from '@blueprintjs/core/src/common/props';
import { Intent } from '@blueprintjs/core/src/common/intent';

interface IButtonProps {
  children?: React.ReactNode;
  className?: string;
  icon?: IconName | MaybeElement;
  intent?: Intent;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const Button_ = (props: IButtonProps): React.JSX.Element => {
  const { className, icon, intent, children, onClick } = props;
  return (
    <BlueprintButton className={className} icon={icon} intent={intent} onClick={onClick}>
      {children}
    </BlueprintButton>
  );
};

export const Button = observer(Button_);
