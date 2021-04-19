import { InputDto } from 'services/subscription/subscription.service';

export enum TimeSubscription {
    MONTHLY = 'monthly',
    ANUALLY = 'anually',
}

export interface MembershipViewController {
    /* State */
    timeSub: string;
    company: any;
    changeTimeSubscription: (time: TimeSubscription) => void;
    getCostumerPortalURL: () => void;
    subscribeTo: (input: InputDto) => void;
    subscriptions: any;
    basic: any;
    full: any;
    isLoaderVisible: boolean;
}

export interface MembershipViewFragmentProps {
    useController?: () => MembershipViewController;
}
