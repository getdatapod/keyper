import React from 'react';
import styled from 'styled-components';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import Flex from '../Flex';
import Separator from '../Separator';
import NavLink from './NavLink';

import { ReactComponent as Keys } from '../../assets/icons/keys.svg';
import { ReactComponent as Permission } from '../../assets/icons/permission.svg';
import { ReactComponent as Provider } from '../../assets/icons/provider.svg';

import Logo from '../../assets/logo.png';

const Sidebar = () => {
  return (
    <Container column height="100vh" align="center">
      <LogoContainer width="100%" justify="center" align="center">
        <img src={Logo} alt="" height="55rem" />
        Keyper
      </LogoContainer>
      <Separator />
      <LinksContainer column width="100%">
        <NavLink exact to="/" icon={<Keys />}>
          <Tippy
            content="Add, remove or review the keys to your data accounts."
            placement="right"
          >
            <span>Your keys</span>
          </Tippy>
        </NavLink>
        <NavLink to="/connected-apps" icon={<Permission />}>
          <Tippy
            content="Review the active connections to your accounts"
            placement="right"
          >
            <span>Connected apps</span>
          </Tippy>
        </NavLink>
        {/* <NavLink to="/accounts" icon={<Provider />}>
          <Tippy content="Manage your accounts" placement="right">
            <span>Accounts</span>
          </Tippy>
        </NavLink> */}
      </LinksContainer>
    </Container>
  );
};

export default Sidebar;

const Container = styled(Flex)`
  min-width: 17rem;
  position: sticky;
  top: 0;
  background-color: ${(props) => props.theme.sidebarColor};
  padding: 1rem 0rem;
`;

const LogoContainer = styled(Flex)`
  padding: 0.2rem 0;
  color: ${(props) => props.theme.linkColor};
  font-size: 1.2rem;
  font-weight: 600;

  img {
    margin-right: 0.5rem;
  }
`;

const LinksContainer = styled(Flex)`
  padding: 1rem 0.8rem;
`;
