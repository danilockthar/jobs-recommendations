import React from 'react';
import 'fragments/__FragmentName__(kebabCase)/__FragmentName__(kebabCase).scss';
import { __FragmentName__FragmentProps } from 'fragments/__FragmentName__(kebabCase)/interfaces';
import { use__FragmentName__Controller } from 'fragments/__FragmentName__(kebabCase)/__FragmentName__(kebabCase).controller';

export const __FragmentName__Fragment: React.FC<__FragmentName__FragmentProps> = (props) => {
    const { useController = use__FragmentName__Controller } = props;
    const controller = useController();

    // Render
    return (
        <div className={'__FragmentName__(kebabCase)'}>
            __FragmentName__
        </div>
    );
};
