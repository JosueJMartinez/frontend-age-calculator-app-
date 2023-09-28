import styles from '../styles/Display.module.scss';
import { useSpring, animated } from 'react-spring';

export function Display({ date }) {
	const fadeIn = useSpring({
		// transform: date['year'] !== '' ? 'scale(1)' : 'scale(1)',
		opacity: date['year'] !== '' ? 1 : 0,
		config: { duration: 1000 },
	});
	const fadeOut = useSpring({
		// transform: date['year'] !== '' ? 'scale(1)' : 'scale(1)',
		opacity: date['year'] !== '' ? 0 : 1,
		config: { duration: 1000 },
	});
	const loopThroughDate = () => {
		const keys = Object.keys(date);

		return keys.map(key => (
			<li key={key}>
				<animated.span style={date[key] !== '' ? fadeIn : fadeOut}>
					{date[key] !== '' ? date[key] : '--'}
				</animated.span>
				{date[key] === 1 ? key : `${key}s`}
			</li>
		));
	};

	return <ul className={styles.display_container}>{loopThroughDate()}</ul>;
}
