import { useState, useEffect, useRef, useCallback } from 'react';
import moment from 'moment/moment';

import styles from '../styles/MainContainer.module.scss';
import { Button, Form, Row, Col } from 'react-bootstrap';
import iconArrow from '../assets/images/icon-arrow.svg';
// import Header from './Header';
// import Body from './Body';

export function DateForm({ handleDurationDateChange }) {
	const currentDate = new Date();
	const currMonth = currentDate.getMonth() + 1;
	const currYear = currentDate.getFullYear();
	const currDate = currentDate.getDate();

	const [formDate, setFormDate] = useState({ day: '', month: '', year: '' });

	const { day, month, year } = { ...formDate };

	const [isValid, setIsValid] = useState({
		day: { isEmpty: false, isFormatted: true, isPast: true, isValidDate: true },
		month: { isEmpty: false, isFormatted: true, isPast: true },
		year: { isEmpty: false, isFormatted: true, isPast: true },
	});

	// const [isWholeFormValid, setIsWholeFormValid] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const isInitialMount = useRef(true);

	let dateForEffect = useRef({ currYear, currMonth, currDate, year, month, day });

	// const handleDurationCallback = useCallback(handleDurationDateChange,[])

	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
		} else {
			/* console.log('isWholeFormValid: ', isWholeFormValid)
			console.log('isSubmitted: ', isWholeFormValid) */
			if (arePropertiesMatching(isValid, false, true, true) && isSubmitted) {
				const firstDate = moment(
					`${dateForEffect.current.currYear}-${dateForEffect.current.currMonth}-${dateForEffect.current.currDate}`
				);
				const secondDate = moment(
					`${dateForEffect.current.year}-${dateForEffect.current.month}-${dateForEffect.current.day}`
				);

				const diffYears = firstDate.diff(secondDate, 'year');
				secondDate.add(diffYears, 'years');

				const diffMonths = firstDate.diff(secondDate, 'months');
				secondDate.add(diffMonths, 'months');

				const diffDays = firstDate.diff(secondDate, 'days');

				handleDurationDateChange({ day: diffDays, month: diffMonths, year: diffYears });
			} else {
				handleDurationDateChange({ day: '', month: '', year: '' });
			}
		}
	}, [isSubmitted]);

	const handleFormInputChange = e => {
		let { name, value } = e.target;
		// setIsWholeFormValid(false);
		setIsSubmitted(false);

		// if (name === 'cardNumber') value = formatCardNumber(value);

		if (name === 'month' || name === 'day') {
			value = modifyTwoDigit(value);
		}

		if (name === 'day')
			setIsValid(prevState => ({
				...prevState,
				[name]: {
					...prevState[name],
					isEmpty: false,
					isFormatted: true,
					isPast: true,
					isValidDate: true,
				},
			}));
		else
			setIsValid(prevState => ({
				...prevState,
				[name]: {
					...prevState[name],
					isEmpty: false,
					isFormatted: true,
					isPast: true,
					// isValidDate: true,
				},
			}));

		// const prevState = ;
		dateForEffect.current = { ...dateForEffect.current, [name]: value };
		// console.log(dateForEffect.current);

		setFormDate(prevState => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = evt => {
		// console.log('submitting');
		evt.preventDefault();

		// setIsSubmitted(prevState => !prevState);

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
		// const test = arePropertiesMatching(isValid, false, true, true);
		// setIsWholeFormValid(test);
		setIsSubmitted(true);
	};

	const arePropertiesMatching = (
		data,
		isEmptyValue,
		isFormattedValue,
		isPastValue,
		isValidDate = true
	) => {
		console.log(data);
		for (const key in data) {
			const item = data[key];
			if (key === 'day') {
				if (
					item.isEmpty !== isEmptyValue ||
					item.isFormatted !== isFormattedValue ||
					item.isPast !== isPastValue ||
					item.isValidDate !== isValidDate
				) {
					return false;
				}
			} else {
				if (
					item.isEmpty !== isEmptyValue ||
					item.isFormatted !== isFormattedValue ||
					item.isPast !== isPastValue
				) {
					return false;
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
				[name]: { ...prevState[name], isValidDate: false },
			}));
		}
	};

	const isNumberSpecificLen = (str, len) => {
		const regexPattern = new RegExp(`^\\d{${len}}$`);
		return regexPattern.test(str);
	};

	const modifyTwoDigit = value => {
		if (value.length === 1) value = '0' + value;
		else if (value.length === 3 && value[0] === '0') value = value.slice(1);
		else value = value.slice(0, value.length - 1);
		return value;
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
								isInvalid={isValid.day.isEmpty || !isValid.day.isFormatted || !isValid.day.isPast || !isValid.day.isValidDate}
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
							{!isValid.day.isValidDate && (
								<Form.Control.Feedback type='invalid'>This is an invalid date.</Form.Control.Feedback>
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
