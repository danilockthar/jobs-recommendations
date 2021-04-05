import { InputDto } from 'services/subscription/subscription.service';

// export interface Company{
//     id: string
// }

export interface MembershipViewController {
    /* State */
    timeSub: string;
    company: any;
    changeTimeSubscription: (time: string) => void;
    subscribeTo: (input: InputDto) => void;
    subscriptions: any;
    basic: any;
    full: any;
    isLoaderVisible: boolean;
}

export interface MembershipViewFragmentProps {
    useController?: () => MembershipViewController;
}
