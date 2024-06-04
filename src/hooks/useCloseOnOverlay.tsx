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
			if (
				rootRef.current &&
				event.target instanceof Node &&
				!rootRef.current?.contains(event.target)
			) {
				toggleOpenState?.();
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				toggleOpenState?.();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [rootRef, isOpened, toggleOpenState]);
};
