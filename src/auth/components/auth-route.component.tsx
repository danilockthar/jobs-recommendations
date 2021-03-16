import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useLocalSession } from 'auth/helpers/session.hooks';
import { Redirect, Switch } from 'react-router-dom';
import { LoginFragment } from 'auth/fragments/login/login.fragment';
import { RegisterFragment } from 'auth/fragments/register/register.fragment';
import { ResetPasswordFragment } from 'auth/fragments/reset-password/reset-password.fragment';
import FlexLoader from 'components/flex-loader/flex-loader.component';

export type RoutePrivateProps = RouteProps;

const AuthRoute: React.FC<RoutePrivateProps> = (props) => {
    const [getSession, , , isLoading] = useLocalSession();
    const session = getSession();

    return (
        <div>
            {isLoading ? (
                <div style={{ display: 'flex', height: '100vh' }}>
                    <FlexLoader />
                </div>
            ) : (
                <Switch>
                    <Route path={'/login'}>
                        <LoginFragment />
                    </Route>
                    <Route path={'/register'}>
                        <RegisterFragment />
                    </Route>
                    <Route path={'/reset-password/:token'}>
                        <ResetPasswordFragment />
                    </Route>
                    <Route
                        render={({ location }) =>
                            !isLoading && session.isAuthenticated() ? (
                                props.children
                            ) : (
                                <Redirect
                                    to={{
                                        pathname: '/login',
                                        state: { from: location },
                                    }}
                                />
                            )
                        }
                    />
                </Switch>
            )}
        </div>
    );
};

export default AuthRoute;
