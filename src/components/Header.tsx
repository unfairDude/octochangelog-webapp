import {
  Box,
  BoxProps,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  Image,
  Stack,
  useDisclosure,
} from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { FaBars } from 'react-icons/fa';

import Container from '~/components/Container';
import RouteLink from '~/components/RouteLink';
import useWindowWidth from '~/hooks/useWindowWidth';

const LOGO_SIZES = { base: '25px', md: '30px', lg: '50px' };
const INLINE_BREAKPOINT = 768; // desktop

const MenuLink: React.FC<{ href: string; isDesktop: boolean }> = ({
  href,
  isDesktop,
  children,
  ...rest
}) => {
  const router = useRouter();
  const isActive = router?.pathname === href;

  return (
    <RouteLink
      href={href}
      color={isDesktop ? 'white' : 'gray.800'}
      borderBottomWidth={isActive ? '4px' : 'none'}
      borderColor={isActive ? 'primary.500' : 'none'}
      _hover={{
        textDecoration: 'none',
        color: isActive ? 'none' : 'primary.300',
      }}
      width={isDesktop ? 'auto' : 'min-content'}
      {...rest}
    >
      {children}
    </RouteLink>
  );
};

const LinksStack: React.FC<{ isDesktop: boolean }> = ({ isDesktop }) => (
  // FIXME: warning about useLayoutEffect (option 2)
  //  https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
  <Stack
    isInline={isDesktop}
    spacing={4}
    align={isDesktop ? undefined : 'center'}
  >
    <MenuLink href="/" isDesktop={isDesktop}>
      Home
    </MenuLink>
    <MenuLink href="/comparator" isDesktop={isDesktop}>
      Comparator
    </MenuLink>
    {/* TODO: implement logout if necessary */}
  </Stack>
);

const Header = (props: BoxProps) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  // TODO: extract into useDesktopSize
  const windowWidth = useWindowWidth();
  const isDesktop = windowWidth > INLINE_BREAKPOINT;
  const linksInner = <LinksStack isDesktop={isDesktop} />;

  return (
    /* FIXME: set zIndex to "banner" when chakra-ui fixes types here */
    <Box as="header" bg="gray.700" color="white" zIndex={1200} {...props}>
      <Container py={5}>
        <Flex justify="space-between" alignItems="center">
          <Flex alignItems="center">
            <Image as="picture" h={LOGO_SIZES} w={LOGO_SIZES} mr={2}>
              <source srcSet="/logo.webp" type="image/webp" />
              <img src="/logo.png" alt="Crystal ball" />
            </Image>
            <Heading fontSize={{ xs: 'md', md: 'xl', lg: '4xl' }}>
              <RouteLink href="/">Octoclairvoyant</RouteLink>
            </Heading>
          </Flex>
          {isDesktop ? (
            linksInner
          ) : (
            <>
              <Button
                aria-label="Toggle menu"
                variant="ghost"
                variantColor="gray"
                size="sm"
                onClick={onToggle}
              >
                <Box as={FaBars} />
              </Button>
              <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent py={2}>
                  <DrawerCloseButton />
                  <DrawerBody>{linksInner}</DrawerBody>
                </DrawerContent>
              </Drawer>
            </>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
