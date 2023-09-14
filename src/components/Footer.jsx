import styles from '../styles/Footer.module.scss';

function Footer() {
	return (
		<footer className={styles.footer}>
			Challenge by{' '}
			<a href='https://www.frontendmentor.io/challenges/results-summary-component-CE_K6s0maV'>
				Frontend Mentor
			</a>
			. Coded by <a href='https://www.frontendmentor.io/profile/JosueJMartinez'>Josue J Martinez</a>
			.
		</footer>
	);
}

export default Footer;
