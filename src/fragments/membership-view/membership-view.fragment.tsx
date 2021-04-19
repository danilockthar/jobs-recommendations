import React, { useContext, useEffect } from 'react';
import 'fragments/membership-view/membership-view.scss';
import { MembershipViewFragmentProps, TimeSubscription } from 'fragments/membership-view/interfaces';
import { useMembershipViewController } from 'fragments/membership-view/membership-view.controller';
import { CheckOutlined } from '@ant-design/icons';
import FlexLoader from 'components/flex-loader/flex-loader.component';
import { useTranslator } from 'tools/view-hooks/translator-hook';

export const MembershipViewFragment: React.FC<MembershipViewFragmentProps> = (props) => {
    const { useController = useMembershipViewController } = props;
    const controller = useController();
    const { translate } = useTranslator();

    // Create our number formatter.
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return (
        <div className={'membership-view'}>
            <div className="select-time-subscription">
                <h4>Billing</h4>
                <div className="select-time">
                    <p
                        className={`subscription-option ${controller.timeSub === TimeSubscription.MONTHLY && 'active'}`}
                        onClick={() => controller.changeTimeSubscription(TimeSubscription.MONTHLY)}
                    >
                        {' '}
                        {translate({ key: 'general.monthly' })}
                    </p>
                    <p
                        className={`subscription-option ${controller.timeSub === TimeSubscription.ANUALLY && 'active'}`}
                        onClick={() => controller.changeTimeSubscription(TimeSubscription.ANUALLY)}
                    >
                        {' '}
                        {translate({ key: 'general.anually' })}
                    </p>
                </div>
            </div>
            {controller.isLoaderVisible ? (
                <div className="membership-options">
                    <FlexLoader />
                </div>
            ) : controller.subscriptions.length > 0 && controller.basic.length > 0 && controller.full.length > 0 ? (
                controller.timeSub === TimeSubscription.MONTHLY ? (
                    <div className="membership-options">
                        <div className="box basic-box">
                            <h5>Team Plan</h5>
                            <h4>
                                {' '}
                                {formatter.format(
                                    controller.basic
                                        .filter((item: any) => item.nickname === 'basic_month')
                                        .map((sub: any) => sub.unit_amount / 100),
                                )}{' '}
                            </h4>
                            <p>
                                {' '}
                                {controller.basic
                                    .filter((item: any) => item.nickname === 'basic_month')
                                    .map((sub: any) => sub.product.description)}{' '}
                            </p>
                            {/* onClick={() => controller.subscribeTo({ priceId: 'price_1IYy5UIKVu1c1nGOGcbJrtl1' })} */}
                            <button
                                onClick={() => {
                                    if (controller.company.subscriptions.length > 0) {
                                        controller.getCostumerPortalURL();
                                    } else {
                                        controller.subscribeTo({
                                            priceId: controller.basic
                                                .filter((item: any) => item.nickname === 'basic_month')
                                                .map((sub: any) => sub.id)[0],
                                            productId: controller.basic
                                                .filter((item: any) => item.nickname === 'basic_month')
                                                .map((sub: any) => sub.product.id)[0],
                                            companyId: controller.company.id,
                                        });
                                    }
                                }}
                                className={
                                    controller.company.subscriptions.length > 0
                                        ? controller.basic
                                              .filter((item: any) => item.nickname === 'basic_month')
                                              .map((sub: any) => sub.id)[0] ===
                                          controller.company.subscriptions.slice().reverse()[0].gatewayPriceId
                                            ? 'btn-disabled'
                                            : 'btn-ok'
                                        : 'btn-ok'
                                }
                            >
                                {' '}
                                <CheckOutlined />{' '}
                                {controller.company.subscriptions.length > 0
                                    ? controller.basic
                                          .filter((item: any) => item.nickname === 'basic_month')
                                          .map((sub: any) => sub.id)[0] ===
                                      controller.company.subscriptions.slice().reverse()[0].gatewayPriceId
                                        ? 'Current Plan'
                                        : 'Upgrade to Team'
                                    : 'Upgrade to Team'}
                            </button>
                        </div>
                        <div className="box full-box">
                            <h5>Business Plan</h5>
                            <h4>
                                {' '}
                                {formatter.format(
                                    controller.full
                                        .filter((item: any) => item.nickname === 'full_month')
                                        .map((sub: any) => sub.unit_amount / 100),
                                )}{' '}
                            </h4>
                            <p>
                                {' '}
                                {controller.full
                                    .filter((item: any) => item.nickname === 'full_month')
                                    .map((sub: any) => sub.product.description)}{' '}
                            </p>
                            <button
                                onClick={() => {
                                    if (controller.company.subscriptions.length > 0) {
                                        controller.getCostumerPortalURL();
                                    } else {
                                        controller.subscribeTo({
                                            priceId: controller.full[1].id,
                                            productId: controller.full[1].product.id,
                                            companyId: controller.company.id,
                                        });
                                    }
                                }}
                                className={
                                    controller.company.subscriptions.length > 0
                                        ? controller.company.subscriptions.slice().reverse()[0].gatewayPriceId ===
                                          controller.full[1].id
                                            ? 'btn-disabled'
                                            : 'btn-ok'
                                        : 'btn-ok'
                                }
                            >
                                {' '}
                                <CheckOutlined />
                                {controller.company.subscriptions.length > 0
                                    ? controller.company.subscriptions.slice().reverse()[0].gatewayPriceId ===
                                      controller.full[1].id
                                        ? 'Current Plan'
                                        : 'Upgrade to Business'
                                    : 'Upgrade to Business'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="membership-options">
                        <div className="box basic-box">
                            <h5>Team Plan</h5>
                            <h4>
                                {' '}
                                {formatter.format(
                                    controller.basic
                                        .filter((item: any) => item.nickname === 'basic_year')
                                        .map((sub: any) => sub.unit_amount / 100),
                                )}{' '}
                            </h4>
                            <p>
                                {' '}
                                {controller.basic
                                    .filter((item: any) => item.nickname === 'basic_year')
                                    .map((sub: any) => sub.product.description)}{' '}
                            </p>
                            {/* onClick={() => controller.subscribeTo({ priceId: 'price_1IYy5UIKVu1c1nGOGcbJrtl1' })} */}
                            <button
                                onClick={() => {
                                    if (controller.company.subscriptions.length > 0) {
                                        controller.getCostumerPortalURL();
                                    } else {
                                        controller.subscribeTo({
                                            priceId: controller.basic
                                                .filter((item: any) => item.nickname === 'basic_year')
                                                .map((sub: any) => sub.id)[0],
                                            productId: controller.basic
                                                .filter((item: any) => item.nickname === 'basic_year')
                                                .map((sub: any) => sub.product.id)[0],
                                            companyId: controller.company.id,
                                        });
                                    }
                                }}
                                className={
                                    controller.company.subscriptions.length > 0
                                        ? controller.company.subscriptions.slice().reverse()[0].gatewayPriceId ===
                                          controller.basic
                                              .filter((item: any) => item.nickname === 'basic_year')
                                              .map((sub: any) => sub.id)[0]
                                            ? 'btn-disabled'
                                            : 'btn-ok'
                                        : 'btn-ok'
                                }
                            >
                                {' '}
                                <CheckOutlined />
                                {controller.company.subscriptions.length > 0
                                    ? controller.company.subscriptions.slice().reverse()[0].gatewayPriceId ===
                                      controller.basic
                                          .filter((item: any) => item.nickname === 'basic_year')
                                          .map((sub: any) => sub.id)[0]
                                        ? 'Current Plan'
                                        : 'Upgrade to Team'
                                    : 'Upgrade to Team'}
                            </button>
                        </div>
                        <div className="box full-box">
                            <h5>Business Plan</h5>
                            <h4>
                                {' '}
                                {formatter.format(
                                    controller.full
                                        .filter((item: any) => item.nickname === 'full_year')
                                        .map((sub: any) => sub.unit_amount / 100),
                                )}{' '}
                            </h4>
                            <p>
                                {' '}
                                {controller.full
                                    .filter((item: any) => item.nickname === 'full_month')
                                    .map((sub: any) => sub.product.description)}{' '}
                            </p>
                            <button
                                onClick={() => {
                                    if (controller.company.subscriptions.length > 0) {
                                        controller.getCostumerPortalURL();
                                    } else {
                                        controller.subscribeTo({
                                            priceId: controller.full[0].id,
                                            productId: controller.full[0].product.id,
                                            companyId: controller.company.id,
                                        });
                                    }
                                }}
                                className={
                                    controller.company.subscriptions.length > 0
                                        ? controller.company.subscriptions.slice().reverse()[0].gatewayPriceId ===
                                          controller.full[0].id
                                            ? 'btn-disabled'
                                            : 'btn-ok'
                                        : 'btn-ok'
                                }
                            >
                                {' '}
                                <CheckOutlined />{' '}
                                {controller.company.subscriptions.length > 0
                                    ? controller.company.subscriptions.slice().reverse()[0].gatewayPriceId ===
                                      controller.full[0].id
                                        ? 'Current Plan'
                                        : 'Upgrade to Business'
                                    : 'Upgrade to Business'}
                            </button>
                        </div>
                    </div>
                )
            ) : (
                <h1> No hay subscripciones por el momento</h1>
            )}
        </div>
    );
};
