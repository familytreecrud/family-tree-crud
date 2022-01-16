import React from 'react';
import { Container } from '@mantine/core';

const Layout = (props) => {
	return (
		<Container size='lg' padding='lg'>
			{props.children}
		</Container>
	);
};

export default Layout;
