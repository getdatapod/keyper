import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const App = () => {
	const { appId } = useParams();

	return <div>{appId}</div>;
};

export default App;
