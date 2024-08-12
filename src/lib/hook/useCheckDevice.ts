import { useState, useEffect } from 'react';

const useCheckDevice = () => {
	const [isAndroidDevice, setIsAndroidDevice] = useState(false);
	const [isAppleDevice, setIsAppleDevice] = useState(false);
	const [isDesktopDevice, setIsDesktopDevice] = useState(false);

	useEffect(() => {
		const checkDeviceType = () => {
			const userAgent = window.navigator.userAgent.toLowerCase();

			const isAndroid = /android/.test(userAgent);
			const isApple =
				/(ipad|iphone|ipod)/.test(userAgent) || /(mac|macintosh)/.test(userAgent);
			const isDesktop = !/(iphone|ipod|ipad|android)/.test(userAgent);

			setIsAndroidDevice(isAndroid);
			setIsAppleDevice(isApple);
			setIsDesktopDevice(isDesktop);
		};

		checkDeviceType();
	}, []);

	return { isAndroidDevice, isAppleDevice, isDesktopDevice };
};

export default useCheckDevice;
