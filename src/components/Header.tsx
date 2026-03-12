
import React from 'react';

// Fixed, visible header that stays on top
const Header: React.FC = () => {
	return (
		<header className="fixed top-0 left-0 right-0 h-16 z-[14000] pointer-events-auto bg-white/6 backdrop-blur-sm border-b border-white/5 flex items-center px-4 shadow-sm">
			<div className="max-w-7xl mx-auto w-full flex items-center justify-between">
				<div className="text-sm font-bold text-oksap-silver">OKSAP</div>
				<nav className="text-xs text-white/70">&nbsp;</nav>
			</div>
		</header>
	);
};

export default Header;
