import React from 'react';

import omit from 'lodash/omit';

import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import { Theme } from '@material-ui/core/styles';

import { CurrentDialog } from '#/@store/dialog/actions';

export interface IDialogTsx {
  isWidthLg: boolean;
  isWidthMd: boolean;
  isWidthSm: boolean;
  theme: Theme;
  height?: number;
  width?: number;
}

export const DialogTsx: React.FunctionComponent<DialogProps & IDialogTsx> = props => {
  if (!CurrentDialog) {
    return null;
  }
  const { isWidthSm, open } = props;
  const rest = omit(props, [
    'scrollHeight',
    'scrollWidth',
    'getRef',
    'isWidthLg',
    'isWidthMd',
    'isWidthSm',
    'theme',
    'height',
    'width',
  ]);
  return (
    <Dialog open={open || false} fullScreen={isWidthSm} {...rest} aria-labelledby="scroll-dialog-title">
      {React.isValidElement(CurrentDialog)
        ? React.cloneElement<any>(CurrentDialog, { onClose: props.onClose })
        : React.createElement(CurrentDialog as any, { onClose: props.onClose })}
    </Dialog>
  );
};
