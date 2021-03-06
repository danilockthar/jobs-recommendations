import { useState, useEffect, useContext } from 'react';
import { MembershipViewController, TimeSubscription } from 'fragments/membership-view/interfaces';
import { loadStripe } from '@stripe/stripe-js';
import { InputDto, useAPIsubscriptionService } from 'services/subscription/subscription.service';
import { CompanyDto, useAPICompanyService } from 'services/company/company.service';
import { useMessenger } from 'tools/view-hooks/messenger-hook';
import { SessionContext } from 'auth/helpers/session.context';

const stripePromise = loadStripe('pk_test_Lx9A5KLXL1muLAIl54xnrFYI006MqwHBxy');

export const useMembershipViewController = (
    subscribptionService = useAPIsubscriptionService(),
    companyService = useAPICompanyService(),
    messenger = useMessenger(),
): /* <--Dependency Injections  like services hooks */
MembershipViewController => {
    /* State */
    const [timeSub, setTimeSub] = useState(TimeSubscription.MONTHLY);
    const { company } = useContext(SessionContext);
    const [basic, setBasic] = useState([]);
    const [full, setFull] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [isLoaderVisible, setIsLoaderVisible] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setIsLoaderVisible(true);
        subscribptionService
            .getStripeProducts()
            .then((output) => {
                if (output && output.data && output.data.length > 0) {
                    setSubscriptions(
                        output.data.filter(
                            (item: any) => item.product.name === 'basic' || item.product.name === 'full',
                        ),
                    );
                    setBasic(output.data.filter((item: any) => item.product.name === 'basic'));
                    setFull(output.data.filter((item: any) => item.product.name === 'full'));
                }
            })
            .catch((e) => {
                messenger.showErrorMessage({ key: e.message });
            })
            .finally(() => {
                setIsLoaderVisible(false);
            });
    };

    const getCostumerPortalURL = async () => {
        subscribptionService
            .getCostumerPortal()
            .then((output) => {
                if (output && output.url) {
                    window.location.href = output.url;
                }
            })
            .catch((err) => {
                messenger.showErrorMessage({
                    key: err.message,
                });
            });
    };

    const subscribeTo = async (input: InputDto) => {
        const stripe = await stripePromise;
        const response = await subscribptionService.getCheckoutSessionId(input);

        if (response && response.sessionId) {
            if (stripe !== null) {
                const { error } = await stripe.redirectToCheckout({
                    sessionId: response.sessionId,
                });
            }
        }
    };

    const changeTimeSubscription = (time: TimeSubscription) => {
        setTimeSub(time);
    };

    return {
        timeSub,
        changeTimeSubscription,
        subscribeTo,
        subscriptions,
        isLoaderVisible,
        basic,
        full,
        company,
        getCostumerPortalURL,
    };
};
