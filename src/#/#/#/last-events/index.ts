import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { events } from '#/@store/tasks';

import { LastEventsTsx } from './last-events';

const mapState = createStructuredSelector({
  events,
} as any);

export const LastEvents = connect<any, any, any>(mapState)(LastEventsTsx);
