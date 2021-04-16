import { useContext, useState } from 'react';
import { OnBoardingController } from 'fragments/on-boarding/interfaces';
import { useAPICompanyService } from 'services/company/company.service';
import { SessionContext } from 'auth/helpers/session.context';

export const useOnBoardingController = (
    companyService = useAPICompanyService(),
): /* <--Dependency Injections  like services hooks */ OnBoardingController => {
    const [isLoading, setIsLoading] = useState(false);
    const { setCompany } = useContext(SessionContext);

    const onOnboardingSubmit = (input: unknown) => {
        setIsLoading(true);
        console.log(input, 'forms');
        companyService
            .setCompanyNameAndLinkedinUrl(input)
            .then((output) => {
                setCompany(output);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return { onOnboardingSubmit, isLoading };
};
