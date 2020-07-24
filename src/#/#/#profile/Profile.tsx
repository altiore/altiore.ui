import React, { useCallback, useState } from 'react';

import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import TelegramIco from '@components/@icons/Telegram';
import ButtonEdit from '@components/ButtonEdit';
import GradientHead from '@components/gradient-head';
import ProjectCard, { CARD_COLOR, LOGO_TYPE } from '@components/project-card';

import { Project } from '#/@store/projects';

import Avatar from './Avatar';
import GitHubIco from './icons/github';
import LinkedInIco from './icons/linkedin';
import ProfileForm from './ProfileForm';

import { ROLE } from '@types';
import getRandEnum from '@utils/get-rand-enum';

export const useStyles = makeStyles((theme: Theme) => ({
  avatarGrid: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: 120,
    [theme.breakpoints.down('sm')]: {
      paddingRight: 8,
    },
  },
  closeIcon: {
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
  contactIcon: {
    '&:hover': {
      backgroundColor: 'transparent',
      boxShadow: theme.shadows[3],
    },
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  iconColored: {
    color: theme.palette.secondary.main,
  },
  lastBlock: {
    borderLeft: `2px solid ${theme.palette.pause.main}`,
    display: 'flex',
    height: 120,
    minWidth: 20,
    paddingLeft: 40,
  },
  profileForm: {
    position: 'relative',
  },
  projectList: {
    margin: '0 auto',
    maxWidth: 1290,
    padding: '60px 0',
  },
  scrollBody: {
    backgroundColor: 'white',
    maxHeight: 'calc(100vh - 56px)',
    overflowY: 'auto',
    ...theme.scroll.secondary,
  },
  userNameStyle: {
    color: 'white',
    paddingLeft: theme.spacing(1),
  },
  userRoleStyle: {
    color: theme.palette.pause.main,
    margin: '8px 0 16px',
    paddingLeft: theme.spacing(1),
  },
}));

interface IProfile {
  projects: Project[];
  userAvatar?: string;
  userDisplayName: string;
  userRole: ROLE;
}

export const Profile: React.FC<IProfile> = ({ projects, userAvatar, userDisplayName, userRole }) => {
  const [isEdit, setIsEdit] = useState(false);

  const toggleEdit = useCallback(() => {
    setIsEdit(isE => !isE);
  }, [setIsEdit]);

  const handleConnect = useCallback(() => {
    alert('Not Implemented (');
  }, []);

  const {
    avatarGrid,
    closeIcon,
    contactIcon,
    iconColored,
    lastBlock,
    profileForm,
    projectList,
    scrollBody,
    userNameStyle,
    userRoleStyle,
  } = useStyles();
  return (
    <div className={scrollBody}>
      <GradientHead>
        <Grid item xs={12} md={4} className={avatarGrid}>
          <Avatar avatar={userAvatar} email={userDisplayName} />
        </Grid>
        <Grid item xs={12} md={4}>
          {isEdit ? (
            <Paper className={profileForm}>
              <IconButton onClick={toggleEdit} className={closeIcon}>
                <CloseIcon fontSize="small" />
              </IconButton>
              <ProfileForm />
            </Paper>
          ) : (
            <>
              <Typography variant="h3" className={userNameStyle}>
                {userDisplayName}
              </Typography>
              <Typography className={userRoleStyle}>{userRole}</Typography>
              <ButtonEdit onClick={toggleEdit}>Редактировать</ButtonEdit>
            </>
          )}
        </Grid>
        <Grid item xs={12} md={4} className={lastBlock}>
          <Fab className={contactIcon} onClick={handleConnect}>
            <TelegramIco />
          </Fab>
          <Fab className={contactIcon} onClick={handleConnect}>
            <GitHubIco color="inherit" className={iconColored} />
          </Fab>
          <Fab className={contactIcon} onClick={handleConnect}>
            <LinkedInIco color="inherit" className={iconColored} />
          </Fab>
        </Grid>
      </GradientHead>
      <div className={projectList}>
        <Grid alignItems="center" justify="center" container spacing={3}>
          {projects.map(({ id, members, shareValue, title, valueSum }) => (
            <Grid key={id} item>
              <ProjectCard
                color={getRandEnum(CARD_COLOR)}
                logoVariant={getRandEnum(LOGO_TYPE)}
                title={title}
                membersCount={members.length}
                userInfo={{
                  displayName: userDisplayName,
                  logoSrc: userAvatar,
                  mainRole: 'Разработчик',
                  // message?: string;
                  shortName: userDisplayName ? userDisplayName.slice(0, 2) : '--',
                  value: (valueSum || 0) * 50,
                }}
                value={shareValue}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};
