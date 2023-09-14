import { useState, useEffect } from 'react';

import styles from '../styles/MainContainer.module.scss';
import { Container, Card, Button, Form, Row, Col } from 'react-bootstrap';
import iconArrow from '../assets/images/icon-arrow.svg';
// import Header from './Header';
// import Body from './Body';

function MainContainer() {
	// const percentage = 72;

	// const jsonData = [
	// 	{
	// 		category: 'Reaction',
	// 		score: 80,
	// 		icon: './assets/images/icon-reaction.svg',
	// 	},
	// 	{
	// 		category: 'Memory',
	// 		score: 92,
	// 		icon: './assets/images/icon-memory.svg',
	// 	},
	// 	{
	// 		category: 'Verbal',
	// 		score: 61,
	// 		icon: './assets/images/icon-verbal.svg',
	// 	},
	// 	{
	// 		category: 'Visual',
	// 		score: 72,
	// 		icon: './assets/images/icon-visual.svg',
	// 	},
	// ];
	// const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

	// useEffect(() => {
	// 	const handleResize = () => {
	// 		setViewportWidth(window.innerWidth);
	// 	};

	// 	window.addEventListener('resize', handleResize);

	// 	return () => {
	// 		window.removeEventListener('resize', handleResize);
	// 	};
	// }, []);

	// const calculateScore = () => {
	// 	const sum = jsonData.reduce((accumalator, currentNode) => {
	// 		return accumalator + currentNode.score;
	// 	}, 0);
	// 	return Math.floor(sum / jsonData.length);
	// };

	// const checkMobileOrDesktop = () => {
	// 	if (viewportWidth < 576) {
	// 		return (
	// 			<Card className={styles.mainContainer_card}>
	//         MOBILE
	// 				{/* <Header percentage={percentage} score={calculateScore()} />
	// 				<Body jsonData={jsonData} /> */}
	// 			</Card>
	// 		);
	// 	} else {
	// 		return (
	// 			<Container className={styles.mainContainer}>
	// 				<Card className={styles.mainContainer_card}>
	//           DESKTOP
	// 					{/* <Header percentage={percentage} score={calculateScore()} />
	// 					<Body jsonData={jsonData} /> */}
	// 				</Card>
	// 			</Container>
	// 		);
	// 	}
	// };

	return (
		<main>
			<Container className={styles.mainContainer}>
				<Card className={`${styles.mainContainer_card} ${styles.card}`}>
					<Card.Body>
						<Form>
							<Row>
								<Col xs={4} md={3}>
									<Form.Group controlId='cardName'>
										<Form.Label>DAY</Form.Label>
										<div className='custom-form-control-wrapper'>
											<Form.Control
												type='text'
												placeholder='DD'
												name='cardName'
												// value={cardName}
												// onChange={handleFormInputChange}
												// isInvalid={isValid.cardName.isEmpty}
											/>
											<Form.Control.Feedback type='invalid'>
												Name can't be blank
											</Form.Control.Feedback>
										</div>
									</Form.Group>
								</Col>
								<Col xs={4} md={3}>
									<Form.Group controlId='cardName'>
										<Form.Label>MONTH</Form.Label>
										<div className='custom-form-control-wrapper'>
											<Form.Control
												type='text'
												placeholder='MM'
												name='cardName'
												// value={cardName}
												// onChange={handleFormInputChange}
												// isInvalid={isValid.cardName.isEmpty}
											/>
											<Form.Control.Feedback type='invalid'>
												Name can't be blank
											</Form.Control.Feedback>
										</div>
									</Form.Group>
								</Col>
								<Col xs={4} md={3}>
									<Form.Group controlId='cardName'>
										<Form.Label>YEAR</Form.Label>
										<div className='custom-form-control-wrapper'>
											<Form.Control
												type='text'
												placeholder='YYYY'
												name='cardName'
												// value={cardName}
												// onChange={handleFormInputChange}
												// isInvalid={isValid.cardName.isEmpty}
											/>
											<Form.Control.Feedback type='invalid'>
												Name can't be blank
											</Form.Control.Feedback>
										</div>
									</Form.Group>
								</Col>
							</Row>
							<div
								style={{
									position: 'relative',
								}}
							>
								<hr
									style={{
										color: 'red',
										backgroundColor: 'red',
										height: 2,
									}}
								/>
								<Button variant='primary' type='submit' style={{ 
									position: 'absolute',
									top:-35,
									right:135
							 }}>
									<img src={iconArrow} alt='credit-card-logo' className={styles.card_logo} />
								</Button>
							</div>
						</Form>
					</Card.Body>
				</Card>
			</Container>
		</main>
	);
}

export default MainContainer;
