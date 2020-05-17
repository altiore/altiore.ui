import React, { useCallback, useState } from 'react';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Forward from '@material-ui/icons/Forward';
import ReplyAll from '@material-ui/icons/ReplyAll';

import { useStyles } from './styles';

interface ITaskStatus {
  t?: any;
}

enum HOVERED {
  REPLAY = 'replay',
  FORWARD = 'forward',
}

export const ChangeStatus: React.FC<ITaskStatus> = () => {
  const classes = useStyles();

  const [anchorRef, setAnchorRef] = useState(null);
  const [hovered, setHovered] = useState<HOVERED | null>(null);

  const handleReplayOver = useCallback(
    e => {
      setHovered(HOVERED.REPLAY);
      setAnchorRef(e.currentTarget);
    },
    [setAnchorRef, setHovered]
  );

  const handleForwardOver = useCallback(
    e => {
      setHovered(HOVERED.FORWARD);
      setAnchorRef(e.currentTarget);
    },
    [setAnchorRef, setHovered]
  );

  const handleClose = useCallback(() => {
    setHovered(null);
    setAnchorRef(null);
  }, [setAnchorRef, setHovered]);

  return (
    <div onMouseLeave={handleClose}>
      <ButtonGroup variant="contained" aria-label="small outlined button group">
        <Button className={classes.replay} onMouseEnter={handleReplayOver}>
          <ReplyAll color="inherit" className={classes.leftIcon} />
          Вернуть
        </Button>
        <Button className={classes.forward} onMouseOver={handleForwardOver}>
          Продвинуть
          <Forward color="inherit" className={classes.rightIcon} />
        </Button>
      </ButtonGroup>
      <Popper open={Boolean(hovered)} anchorEl={anchorRef} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper id="menu-list-grow-nested">{/*<Typography>Здесь появятся варианты</Typography>*/}</Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};
