import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { userAvatar, userDisplayName, userRole } from '#/@store/identity';
import { projectsExceptDefault } from '#/@store/projects';

import { Profile } from './Profile';

import { IState } from '@types';

const mapState = createStructuredSelector<IState, any>({
  projects: projectsExceptDefault,
  userAvatar,
  userDisplayName,
  userRole,
});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(Profile);
