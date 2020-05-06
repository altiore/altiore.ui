import React from 'react';

import Button from '@material-ui/core/Button';

import Center from '../../../.storybook/decor/Center';

import { storiesOf } from '@storybook/react';

storiesOf('Button', module)
  .addDecorator(Center)
  .add('variant="text", color="default"', () => <Button>Hello Button</Button>)
  .add('variant="text", color="primary"', () => <Button color="primary">Hello Button</Button>)
  .add('variant="text", color="secondary"', () => <Button color="secondary">Hello Button</Button>)
  .add('variant="outlined", color="default"', () => <Button variant="outlined">Hello Button</Button>)
  .add('variant="outlined", color="primary"', () => (
    <Button variant="outlined" color="primary">
      Hello Button
    </Button>
  ))
  .add('variant="outlined", color="secondary"', () => (
    <Button variant="outlined" color="secondary">
      Hello Button
    </Button>
  ))
  .add('variant="contained", color="default"', () => <Button variant="contained">Hello Button</Button>)
  .add('variant="contained", color="primary"', () => (
    <Button variant="contained" color="primary">
      Hello Button
    </Button>
  ))
  .add('variant="contained", color="secondary"', () => (
    <Button variant="contained" color="secondary">
      Hello Button
    </Button>
  ));
