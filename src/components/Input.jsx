import { Form, Col } from 'react-bootstrap';

export function Input({ styles, isValid, value, type, handleFormInputChange }) {
	function checkForErrors() {
		// Define a function to check conditions
		function checkCondition(key, value) {
			if (key === 'isEmpty') {
				return value;
			} else {
				return !value;
			}
		}

		// Iterate through the isValid object and check conditions
		for (const key in isValid) {
			if (checkCondition(key, isValid[key])) {
				return true; // Error condition met, return true
			}
		}

		return false; // No error conditions met, return false
	}

	function getPlaceHolder() {
		if (type === 'day') return 'DD';
		else if (type === 'month') return 'MM';
		return 'YYYY';
	}

	return (
		<Col xs={4} md={3}>
			{checkForErrors()}
			<Form.Group controlId={type} className={styles.custom_form_control_wrapper}>
				<Form.Label className={checkForErrors() && styles.is_invalid}>
					{type.toUpperCase()}
				</Form.Label>
				<div className={styles.input_wrapper}>
					<Form.Control
						type='text'
						placeholder={getPlaceHolder()}
						name={type}
						value={value}
						onChange={handleFormInputChange}
						isInvalid={checkForErrors()}
					/>
					{isValid.isEmpty && (
						<Form.Control.Feedback type='invalid'>{type} is Blank</Form.Control.Feedback>
					)}
					{!isValid.isFormatted && (
						<Form.Control.Feedback type='invalid'>{type} is not valid</Form.Control.Feedback>
					)}
					{!isValid.isPast && (
						<Form.Control.Feedback type='invalid'>Must be in the past</Form.Control.Feedback>
					)}
					{!isValid.isValidDate && type === 'day' && (
						<Form.Control.Feedback type='invalid'>This is an invalid date.</Form.Control.Feedback>
					)}
				</div>
			</Form.Group>
		</Col>
	);
}
