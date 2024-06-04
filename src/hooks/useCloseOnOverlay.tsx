import { useEffect } from 'react';
import type { RefObject } from 'react';

export type TUseCloseOnOverlay = {
	isOpened?: boolean;
	toggleOpenState?: () => void;
	rootRef: RefObject<HTMLElement>;
};

export const useCloseOnOverlay = ({
	rootRef,
	isOpened,
	toggleOpenState,
}: TUseCloseOnOverlay) => {
	useEffect(() => {
		if (!isOpened) {
			return;
		}

		const handleClickOutside = (event: MouseEvent) => {
			const pathTree = event.composedPath();

			if (rootRef.current && !pathTree.includes(rootRef.current)) {
				toggleOpenState?.();
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				toggleOpenState?.();
			}
		};

		document.addEventListener('click', handleClickOutside);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('click', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpened, toggleOpenState]);
};
