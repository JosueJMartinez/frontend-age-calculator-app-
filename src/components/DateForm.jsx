import { useState, useEffect } from 'react';

import styles from '../styles/MainContainer.module.scss';
import { Button, Form, Row, Col } from 'react-bootstrap';
import iconArrow from '../assets/images/icon-arrow.svg';
// import Header from './Header';
// import Body from './Body';

export function DateForm() {
	return (
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
							<Form.Control.Feedback type='invalid'>Name can't be blank</Form.Control.Feedback>
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
							<Form.Control.Feedback type='invalid'>Name can't be blank</Form.Control.Feedback>
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
							<Form.Control.Feedback type='invalid'>Name can't be blank</Form.Control.Feedback>
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
				<Button
					variant='primary'
					type='submit'
					style={{
						position: 'absolute',
						top: -35,
						right: 135,
					}}
				>
					<img src={iconArrow} alt='credit-card-logo' className={styles.card_logo} />
				</Button>
			</div>
		</Form>
	);
}
