import { useState, useEffect, useRef, useCallback } from 'react';
import moment from 'moment/moment';

import styles from '../styles/MainContainer.module.scss';
import { Button, Form, Row, Col } from 'react-bootstrap';
import iconArrow from '../assets/images/icon-arrow.svg';
// import Header from './Header';
// import Body from './Body';

export function DateForm({ date, handleChange }) {
	const { day, month, year } = { ...date };
	const currentDate = new Date();
	const currMonth = currentDate.getMonth() + 1;
	const currYear = currentDate.getFullYear();
	const currDate = currentDate.getDate();

	const [isSubmitted, setIsSubmitted] = useState(false);

	const [isValid, setIsValid] = useState({
		day: { isEmpty: false, isFormatted: true, isPast: true },
		month: { isEmpty: false, isFormatted: true, isPast: true },
		year: { isEmpty: false, isFormatted: true, isPast: true },
	});

	const [isWholeFormValid, setIsWholeFormValid] = useState(false);

	const isInitialMount = useRef(true);

	const checkIfFormComplete = useCallback(() => {
		const firstDate = moment(`${currYear}-${currMonth}-${currDate}`);
		const secondDate = moment(`${year}-${month}-${day}`);

		const diffYears = firstDate.diff(secondDate, 'year');
		secondDate.add(diffYears, 'years');

		const diffMonths = firstDate.diff(secondDate, 'months');
		secondDate.add(diffMonths, 'months');

		const diffDays = firstDate.diff(secondDate, 'days');

		console.log(`${diffYears} years, ${diffMonths} months, ${diffDays} days`);
	}, [currDate, currMonth, currYear, year, month, day]);

	useEffect(() => {
		console.log('isValid.genericValid calculate');
		if (isInitialMount.current) {
			isInitialMount.current = false;
		} else {
			checkIfFormComplete();
		}
	}, [isWholeFormValid, checkIfFormComplete]);

	const handleFormInputChange = e => {
		let { name, value } = e.target;

		// if (name === 'cardNumber') value = formatCardNumber(value);

		/* if (name === 'cardExpYear' || name === 'cardExpMonth') {
				value = modifyTwoDigit(value);
			} */

		setIsValid(prevState => ({
			...prevState,
			[name]: { ...prevState[name], isEmpty: false, isFormatted: true, isPast: true },
		}));

		handleChange({
			...date,
			[name]: value,
		});
	};

	const handleSubmit = evt => {
		evt.preventDefault();

		setIsSubmitted(prevState => !prevState);

		genericValidate(month, {
			checkForLengthAndNumber: 2,
			name: 'month',
			checkForValueLimit: { min: 1, max: 12 },
		});

		genericValidate(year, {
			checkForLengthAndNumber: 4,
			name: 'year',
			// checkForValueLimit: { min: 0, max: 99 },
		});

		genericValidate(day, {
			checkForLengthAndNumber: 2,
			checkForValueLimit: { min: 0, max: 31 },
			name: 'day',
		});

		setIsWholeFormValid(arePropertiesMatching(isValid, false, true, true));
	};

	const arePropertiesMatching = (data, isEmptyValue, isFormattedValue, isPastValue) => {
		for (const key in data) {
			if (key !== 'genericValid') {
				const item = data[key];
				if (
					item.isEmpty !== isEmptyValue ||
					item.isFormatted !== isFormattedValue ||
					item.isPast !== isPastValue
				) {
					return false; // At least one property does not match the specified values.
				}
			}
		}
		return true; // All properties match the specified values.
	};

	const genericValidate = (value, args) => {
		const { checkForLengthAndNumber, checkForValueLimit, formatCardNumber, name } = { ...args };

		if (formatCardNumber) {
			value = value.replace(/\s/g, '');
		}

		if (!value) {
			setIsValid(prevState => ({
				...prevState,
				[name]: { ...prevState[name], isEmpty: true },
			}));
		} else if (checkForLengthAndNumber && !isNumberSpecificLen(value, checkForLengthAndNumber)) {
			setIsValid(prevState => ({
				...prevState,
				[name]: { ...prevState[name], isFormatted: false },
			}));
		} else if (checkForValueLimit) {
			const testValue = +value;
			if (testValue < checkForValueLimit.min || testValue > checkForValueLimit.max) {
				setIsValid(prevState => ({
					...prevState,
					[name]: { ...prevState[name], isFormatted: false },
				}));
			}
		}

		/* console.log(`!moment(${day}-${month}-${year}).isValid()`);
		console.log(!moment(`${year}-${month}-${day}`).isValid()); */

		if (name === 'year' && value > currYear) {
			setIsValid(prevState => ({
				...prevState,
				[name]: { ...prevState[name], isPast: false },
			}));
		} else if (name === 'month' && value > currMonth && Number(year) === currYear) {
			setIsValid(prevState => ({
				...prevState,
				[name]: { ...prevState[name], isPast: false },
			}));
		} else if (
			name === 'day' &&
			value > currDate &&
			Number(month) === currMonth &&
			Number(year) === currYear
		) {
			setIsValid(prevState => ({
				...prevState,
				[name]: { ...prevState[name], isPast: false },
			}));
		} else if (name === 'day' && !moment(`${year}-${month}-${day}`).isValid()) {
			setIsValid(prevState => ({
				...prevState,
				[name]: { ...prevState[name], isFormatted: false },
			}));
		}
	};

	const isNumberSpecificLen = (str, len) => {
		const regexPattern = new RegExp(`^\\d{${len}}$`);
		return regexPattern.test(str);
	};

	return (
		<Form id='main-form' className='w-100 mt-5' onSubmit={handleSubmit}>
			<Row>
				<Col xs={4} md={3}>
					<Form.Group controlId='day'>
						<Form.Label>DAY</Form.Label>
						<div className='custom-form-control-wrapper'>
							<Form.Control
								type='text'
								placeholder='DD'
								name='day'
								value={day}
								onChange={handleFormInputChange}
								isInvalid={isValid.day.isEmpty || !isValid.day.isFormatted || !isValid.day.isPast}
							/>
							{isValid.day.isEmpty && (
								<Form.Control.Feedback type='invalid'>Day is Blank</Form.Control.Feedback>
							)}
							{!isValid.day.isFormatted && (
								<Form.Control.Feedback type='invalid'>Day is not valid</Form.Control.Feedback>
							)}
							{!isValid.day.isPast && (
								<Form.Control.Feedback type='invalid'>Must be in the past</Form.Control.Feedback>
							)}
						</div>
					</Form.Group>
				</Col>
				<Col xs={4} md={3}>
					<Form.Group controlId='month'>
						<Form.Label>MONTH</Form.Label>
						<div className='custom-form-control-wrapper'>
							<Form.Control
								type='text'
								placeholder='MM'
								name='month'
								value={month}
								onChange={handleFormInputChange}
								isInvalid={
									isValid.month.isEmpty || !isValid.month.isFormatted || !isValid.month.isPast
								}
							/>
							{isValid.month.isEmpty && (
								<Form.Control.Feedback type='invalid'>Month is Blank</Form.Control.Feedback>
							)}
							{!isValid.month.isFormatted && (
								<Form.Control.Feedback type='invalid'>Month is not valid</Form.Control.Feedback>
							)}
							{!isValid.month.isPast && (
								<Form.Control.Feedback type='invalid'>Must be in the past</Form.Control.Feedback>
							)}
						</div>
					</Form.Group>
				</Col>
				<Col xs={4} md={3}>
					<Form.Group controlId='year'>
						<Form.Label>YEAR</Form.Label>
						<div className='custom-form-control-wrapper'>
							<Form.Control
								type='text'
								placeholder='YYYY'
								name='year'
								value={year}
								onChange={handleFormInputChange}
								isInvalid={
									isValid.year.isEmpty || !isValid.year.isFormatted || !isValid.year.isPast
								}
							/>
							{isValid.year.isEmpty && (
								<Form.Control.Feedback type='invalid'>Year is Blank</Form.Control.Feedback>
							)}
							{!isValid.year.isFormatted && (
								<Form.Control.Feedback type='invalid'>Year is not valid</Form.Control.Feedback>
							)}
							{!isValid.year.isPast && (
								<Form.Control.Feedback type='invalid'>Must be in the past</Form.Control.Feedback>
							)}
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
