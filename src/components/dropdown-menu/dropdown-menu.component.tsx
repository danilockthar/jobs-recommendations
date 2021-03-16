import React, { ReactNode } from 'react';
import { Dropdown, Menu } from 'antd';
import 'components/nav-bar-dropdown/nav-bar-dropdown.scss';

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    menuItemsChildren: ReactNode[];
}

export const DropdownMenu: React.FC<DropdownMenuProps> = (props) => {
    const { menuItemsChildren, className, ...divProps } = props;
    return (
        <div className={`${className} nav-bar-dropdown`} {...divProps}>
            <Dropdown
                overlayClassName={'nav-bar-dropdown-overlay'}
                overlay={
                    <Menu>
                        {menuItemsChildren.map((menuItemChildren, index) => (
                            <Menu.Item key={index}> {menuItemChildren} </Menu.Item>
                        ))}
                    </Menu>
                }
            >
                {props.children}
            </Dropdown>
        </div>
    );
};
