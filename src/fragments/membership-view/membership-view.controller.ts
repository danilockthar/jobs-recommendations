import { useState, useEffect } from 'react';
import { MembershipViewController } from 'fragments/membership-view/interfaces';
import { loadStripe } from '@stripe/stripe-js';
import { InputDto, useAPIsubscriptionService } from 'services/subscription/subscription.service';
import { CompanyDto, useAPICompanyService } from 'services/company/company.service';
import { useMessenger } from 'tools/view-hooks/messenger-hook';

const stripePromise = loadStripe('pk_test_Lx9A5KLXL1muLAIl54xnrFYI006MqwHBxy');

export const useMembershipViewController = (
    subscribptionService = useAPIsubscriptionService(),
    companyService = useAPICompanyService(),
    messenger = useMessenger(),
): /* <--Dependency Injections  like services hooks */
MembershipViewController => {
    /* State */
    // Ex. const [count, setCount] = useState(0);
    const [example, setExample] = useState('example');
    const [timeSub, setTimeSub] = useState('monthly');
    const [companyID, setCompanyID] = useState<number>(0);
    const [company, setCompany] = useState<any>({ subscriptions: [] });
    const [emailToInvitate, setEmailToInvitate] = useState('');
    const [basic, setBasic] = useState([]);
    const [full, setFull] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [isLoaderVisible, setIsLoaderVisible] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setIsLoaderVisible(true);
        companyService
            .getCompany()
            .then((output) => {
                if (output.id) {
                    setCompany(output);
                } else {
                    messenger.showErrorMessage({
                        key: 'Error al obtener datos de la organización.',
                    });
                }
            })
            .catch((err) => {
                switch (err.response.status) {
                    case 409:
                        setCompany(err.response.data.company);
                        break;

                    default:
                        messenger.showErrorMessage({
                            key: 'Error al obtener datos de la empresa. Por favor ingrese un nombre para la misma.',
                        });
                        break;
                }
            })
            .finally(() => {
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
                    });
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

    const changeTimeSubscription = (time: string) => {
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
