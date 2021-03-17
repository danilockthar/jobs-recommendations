import React from 'react';
import 'fragments/main/main.scss';
import { MainFragmentProps } from 'fragments/main/interfaces';
import { useMainController } from 'fragments/main/main.controller';
import { PersonNavigator } from 'navigators/person-navigator';
import { useLocalSession } from 'auth/helpers/session.hooks';
import { Role } from 'auth/services/auth/auth.service';
import { CompanyNavigator } from 'navigators/company-navigator';

export const MainFragment: React.FC<MainFragmentProps> = (props) => {
    const { useController = useMainController } = props;
    const controller = useController();
    const [getSession] = useLocalSession();
    const session = getSession();
    const currentRole = session.getUser()?.roles[0];

    // Render
    return <div className={'main'}>{currentRole == Role.Company ? <CompanyNavigator /> : <PersonNavigator />}</div>;
};
