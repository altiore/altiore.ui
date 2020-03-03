import Button from '@material-ui/core/Button';
import React, { useEffect } from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { email } from 'redux-form-validators';

import { PasswordIco as PassIco } from '@components/@icons/Password';
import { UserIco } from '@components/@icons/User';
import InputField from '@components/InputField';

import { useStyles } from './styles';

export interface ILoginFormProps {
  autoFocus?: boolean;
  buttonText?: string;
  isLogin: boolean;
}

const LoginForm: React.FC<ILoginFormProps & InjectedFormProps<{}, ILoginFormProps>> = ({
  autoFocus,
  handleSubmit,
  isLogin,
  submitting,
}) => {
  const classes = useStyles();
  useEffect(() => {
    // if ('credentials' in navigator) {
    //   (navigator as any).credentials.get({
    //     password: true,
    //     // unmediated: true,
    //   })
    //     .then(function(creds) {
    //       //Do something with the credentials.
    //       console.log('creds here', creds);
    //       setIsKnownUser(true);
    //     });
    // } else {
    //   console.log("No credentials");
    //   //Handle sign-in the way you did before.
    // };
  }, []);

  return (
    <div className={classes.wrapper}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Field
          autoComplete="username"
          autoFocus={autoFocus}
          className={classes.field}
          component={InputField}
          icon={<UserIco />}
          name="email"
          placeholder="Введите email..."
          type="email"
          validate={[email({ msg: 'Введите валидный email-адрес' })]}
        />
        <Field
          autoComplete="current-password"
          className={classes.field}
          component={InputField}
          icon={<PassIco />}
          name="password"
          placeholder="Введите пароль..."
          type="password"
        />
        <Button color="secondary" disabled={submitting} fullWidth type="submit" variant="outlined">
          <span>{isLogin ? 'Войти' : 'Зарегистрироваться'}</span>
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
