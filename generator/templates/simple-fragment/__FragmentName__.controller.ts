import { useState } from 'react';
import { __FragmentName__Controller } from 'fragments/__FragmentName__(kebabCase)/interfaces';

export const use__FragmentName__Controller = (): /* <--Dependency Injections  like services hooks */
__FragmentName__Controller => {
    /* State */
    // Ex. const [count, setCount] = useState(0);
    const [example, setExample] = useState('example');

    /* Listeners */
    // Ex. useEffect(() => { onSessionUpdate(); }, [session]);

    /* View Events */
    //Ex. const onIncreaseButtonPressed = () => {}
    const onButtonPressed = () => {
        // Example event
    };

    /* Private Methods */
    //Ex. const increaseCount = () => {}

    // Return state and events
    return { example, onButtonPressed };
};
