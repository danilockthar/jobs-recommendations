import React from 'react';
import 'fragments/main/main.scss';
import { MainFragmentProps } from 'fragments/main/interfaces';
import { useMainController } from 'fragments/main/main.controller';
import { PersonNavigator } from 'navigators/person-navigator';

export const MainFragment: React.FC<MainFragmentProps> = (props) => {
    const { useController = useMainController } = props;
    const controller = useController();

    // Render
    return (
        <div className={'main'}>
            <PersonNavigator />
        </div>
    );
};
