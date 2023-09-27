import { useState, useEffect, useRef } from 'react';
import moment from 'moment/moment';

import styles from '../styles/DateForm.module.scss';
import { Button, Form, Row, Col } from 'react-bootstrap';
import iconArrow from '../assets/images/icon-arrow.svg';

export function DateForm({ handleDurationDateChange }) {
	const currentDate = new Date();
	const currMonth = currentDate.getMonth() + 1;
	const currYear = currentDate.getFullYear();
	const currDate = currentDate.getDate();

	const [formDate, setFormDate] = useState({ day: '', month: '', year: '' });
	const [isValid, setIsValid] = useState({
		day: { isEmpty: false, isFormatted: true, isPast: true, isValidDate: true },
		month: { isEmpty: false, isFormatted: true, isPast: true },
		year: { isEmpty: false, isFormatted: true, isPast: true },
	});
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [buttonPosition, setButtonPosition] = useState({});

	const isInitialMount = useRef(true);

	const { day, month, year } = { ...formDate };
	let dateForEffect = useRef({ currYear, currMonth, currDate, year, month, day });

	useEffect(() => {
		const handleWindowResize = () => {
			const seperatorWidth = document.querySelector(`#seperator`).offsetWidth;

			if (window.innerWidth < 768) {
				setButtonPosition({ right: `-${seperatorWidth / 2 - 35}px` });
			} else {
				setButtonPosition({ right: `-${seperatorWidth - 70}px` });
			}
		};

		if (isInitialMount.current) {
			handleWindowResize();
		}
		window.addEventListener('resize', handleWindowResize);
		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);

	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
		} else {
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

		setIsSubmitted(false);

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
				},
			}));

		dateForEffect.current = { ...dateForEffect.current, [name]: value };

		setFormDate(prevState => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = evt => {
		evt.preventDefault();

		genericValidate(month, {
			checkForLengthAndNumber: 2,
			name: 'month',
			checkForValueLimit: { min: 1, max: 12 },
		});

		genericValidate(year, {
			checkForLengthAndNumber: 4,
			name: 'year',
		});

		genericValidate(day, {
			checkForLengthAndNumber: 2,
			checkForValueLimit: { min: 0, max: 31 },
			name: 'day',
		});
		setIsSubmitted(true);
	};

	const arePropertiesMatching = (
		data,
		isEmptyValue,
		isFormattedValue,
		isPastValue,
		isValidDate = true
	) => {
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
		return true;
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
			return;
		} else if (checkForLengthAndNumber && !isNumberSpecificLen(value, checkForLengthAndNumber)) {
			setIsValid(prevState => ({
				...prevState,
				[name]: { ...prevState[name], isFormatted: false },
			}));
			return;
		} else if (checkForValueLimit) {
			const testValue = +value;
			if (testValue < checkForValueLimit.min || testValue > checkForValueLimit.max) {
				setIsValid(prevState => ({
					...prevState,
					[name]: { ...prevState[name], isFormatted: false },
				}));
				return;
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
					<Form.Group controlId='day' className={styles.custom_form_control_wrapper}>
						<Form.Label
							className={
								(isValid.day.isEmpty ||
									!isValid.day.isFormatted ||
									!isValid.day.isPast ||
									!isValid.day.isValidDate) &&
								styles.is_invalid
							}
						>
							DAY
						</Form.Label>
						<div className={styles.input_wrapper}>
							<Form.Control
								type='text'
								placeholder='DD'
								name='day'
								value={day}
								onChange={handleFormInputChange}
								isInvalid={
									isValid.day.isEmpty ||
									!isValid.day.isFormatted ||
									!isValid.day.isPast ||
									!isValid.day.isValidDate
								}
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
								<Form.Control.Feedback type='invalid'>
									This is an invalid date.
								</Form.Control.Feedback>
							)}
						</div>
					</Form.Group>
				</Col>
				<Col xs={4} md={3}>
					<Form.Group controlId='month' className={styles.custom_form_control_wrapper}>
						<Form.Label
							className={
								(isValid.month.isEmpty || !isValid.month.isFormatted || !isValid.month.isPast) &&
								styles.is_invalid
							}
						>
							MONTH
						</Form.Label>
						<div className={styles.input_wrapper}>
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
					<Form.Group controlId='year' className={styles.custom_form_control_wrapper}>
						<Form.Label
							className={
								(isValid.year.isEmpty || !isValid.year.isFormatted || !isValid.year.isPast) &&
								styles.is_invalid
							}
						>
							YEAR
						</Form.Label>
						<div className={styles.input_wrapper}>
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
			<div id='seperator' className={styles.breaker}>
				<hr className={styles.line_splitter} />
				<Button variant='primary' type='submit' style={buttonPosition} className={styles.button}>
					<img
						id='arrow-button'
						src={iconArrow}
						alt='credit-card-logo'
						className={styles.button_arrow}
					/>
				</Button>
			</div>
		</Form>
	);
}
