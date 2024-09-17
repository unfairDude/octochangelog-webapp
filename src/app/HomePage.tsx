'use client'

import {
	Box,
	Button,
	Center,
	Container,
	Flex,
	Heading,
	Icon,
	List,
	SimpleGrid,
	Stack,
	useColorModeValue,
} from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'
import { type ReactNode } from 'react'
import { type IconType } from 'react-icons'
import {
	HiOutlineFilter,
	HiOutlineFire,
	HiOutlineShare,
	HiOutlineSwitchHorizontal,
} from 'react-icons/hi'

import { BRIEF_DESCRIPTION } from '@/common'
import mascotIcon from '@/public/mascot-icon.png'

const MainSection = () => (
	<Stack
		alignItems="center"
		justifyContent="center"
		direction={{ base: 'column-reverse', lg: 'row' }}
		spacing={{ base: 10, lg: 1 }}
	>
		<Stack alignItems={{ base: 'center', lg: 'start' }} spacing="24">
			<Heading
				as="h2"
				color="primaryText"
				fontSize={{ base: '3xl', md: '5xl' }}
				fontWeight="black"
				textAlign={{ base: 'center', lg: 'left' }}
				letterSpacing="tight"
				px={{ base: 12, lg: 0 }}
			>
				{BRIEF_DESCRIPTION}.
			</Heading>
			<Flex justify="space-between" align="center">
				<NextLink href="coming soon" passHref legacyBehavior>
					<Button as="a" variant="cta">
						SI
					</Button>	
				</NextLink>
				<NextLink href="https://t.me/SteveCoinNews" passHref legacyBehavior>
			        <Button as="b" variant="cta">
						NO
					</Button>
			    </NextLink>
			</Flex>
		</Stack>
		<Center width="full">
			<Image src={mascotIcon} alt="" quality={100} priority />
		</Center>
	</Stack>
)

interface FeatureItemProps {
	icon: IconType
	title: string
	children: ReactNode
}

const FEATURES_DESCRIPTIONS: Array<FeatureItemProps> = [
	{
		icon: HiOutlineSwitchHorizontal,
		title: 'STEVE IS FAMOUS',
		children: (
			<Box>
				Everyone knows STEVE. 
				<br />
				It's just a matter of time before it goes viral.
			</Box>
		),
	},
	{
		icon: HiOutlineShare,
		title: 'EXPERIENCED TEAM',
		children: (
			<Box>
				We have a solid team behind.
				<br />
				Marketing is ready for the launch.
			</Box>
		),
	},
	{
		icon: HiOutlineFire,
		title: "TO THE MOON",
		children: (
			<Box>
				$STEVE is a newcomer, but it's here to stay and climb the ladder of crypto charts.
				<br />
				Our goal is to reach the top positions of meme coins.
			</Box>
		),
	},
	{
		icon: HiOutlineFilter,
		title: 'TOKENOMICS',
		children: (
			<Box>
				$STEVE team will only keep 5% of the total supply, dedicated to marketing, airdrops and animators.
				<br />
				The remaining supply will be locked into liquidity for 1 year. Every 1M MarketCap we will re-lock the tokens for another year.
			</Box>
		),
	},
]

const FeatureItem = ({ icon, title, children }: FeatureItemProps) => {
	const iconColor = useColorModeValue('secondary.700', 'secondary.200')
	const iconBgColor = useColorModeValue('secondary.200', 'secondary.800')
	return (
		<Box>
			<Flex
				boxSize={10}
				bgColor={iconBgColor}
				borderRadius="full"
				alignItems="center"
				justifyContent="center"
			>
				<Icon as={icon} boxSize="18px" color={iconColor} />
			</Flex>
			<Heading as="h3" color="primaryText" fontSize="2xl" mt={2}>
				{title}
			</Heading>
			<Box
				fontSize="md"
				width={{ base: 'full', lg: '70%' }}
				color="secondaryText"
			>
				{children}
			</Box>
		</Box>
	)
}

const HomePage = () => {
	return (
		<Box py={{ base: 8, lg: 16 }} mb={10}>
			<Container maxWidth="container.lg">
				<MainSection />

				<Box mt={40} />

				<List fontSize="" color="secondaryText">
					<SimpleGrid
						columns={{ base: 1, md: 2 }}
						spacing={{ base: 10, md: 32 }}
					>
						{FEATURES_DESCRIPTIONS.map(({ title, icon, children }) => (
							<FeatureItem key={title} icon={icon} title={title}>
								{children}
							</FeatureItem>
						))}
					</SimpleGrid>
				</List>
			</Container>
		</Box>
	)
}

export default HomePage
