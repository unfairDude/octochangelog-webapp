import { Box, Container, Link, Text, VStack } from '@chakra-ui/react'

const Footer = () => {
	return (
		<Box
			as="footer"
			bgColor="background2"
			pb={{ base: 8, lg: 12 }}
			borderTop="solid 1px"
			borderTopColor="monochromeInverted3"
		>
			<Container
				centerContent
				maxWidth="full"
				py={{ base: 1, lg: 4 }}
				px={{ base: 4, lg: 5 }}
			>
				<VStack spacing={5}>
					<Text
						color="primaryText"
						fontSize={{ base: 'lg', md: '2xl' }}
						fontWeight="black"
						textAlign="center"
					>
						Created with love <br /> by me
					</Text>
				</VStack>
			</Container>
		</Box>
	)
}

export default Footer
