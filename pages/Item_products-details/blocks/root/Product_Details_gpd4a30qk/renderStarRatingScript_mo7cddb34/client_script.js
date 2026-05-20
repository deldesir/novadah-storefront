window.renderStarRating = (rating) => {
	// Round to nearest 0.5
	const rounded = Math.round(Math.max(0, Math.min(5, rating)) * 2) / 2;

	const fullStars = Math.floor(rounded);
	const halfStar = rounded % 1 !== 0;
	const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

	const fullStarSvg = `
	<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http:///www.w3.org/2000/svg">
		<path fill-rule="evenodd" clip-rule="evenodd"
			d="M7.35718 2.27146C7.64867 1.78711 8.35083 1.78713 8.64234 2.27146L10.4226 5.22947L13.7859 6.00779C14.3366 6.13538 14.5529 6.80356 14.1824 7.23045L11.9197 9.83787L12.2185 13.2773C12.267 13.8403 11.6989 14.2527 11.1785 14.0322L7.99976 12.6855L4.82105 14.0322C4.30067 14.2527 3.73249 13.8403 3.78101 13.2773L4.07984 9.83787L1.81714 7.23045C1.4466 6.80359 1.66302 6.13544 2.21363 6.00779L5.57691 5.22947L7.35718 2.27146Z"
			fill="#171717"/>
	</svg>`;

	const emptyStarSvg = `
	<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http:///www.w3.org/2000/svg">
		<path fill-rule="evenodd" clip-rule="evenodd"
			d="M7.35718 2.27146C7.64867 1.78711 8.35083 1.78713 8.64234 2.27146L10.4226 5.22947L13.7859 6.00779C14.3366 6.13538 14.5529 6.80356 14.1824 7.23045L11.9197 9.83787L12.2185 13.2773C12.267 13.8403 11.6989 14.2527 11.1785 14.0322L7.99976 12.6855L4.82105 14.0322C4.30067 14.2527 3.73249 13.8403 3.78101 13.2773L4.07984 9.83787L1.81714 7.23045C1.4466 6.80359 1.66302 6.13544 2.21363 6.00779L5.57691 5.22947L7.35718 2.27146Z"
			fill="#E5E5E5"/>
	</svg>`;

	const halfStarSvg = `
	<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http:///www.w3.org/2000/svg">
		<defs>
			<linearGradient id="half-fill">
				<stop offset="50%" stop-color="#171717"/>
				<stop offset="50%" stop-color="#E5E5E5"/>
			</linearGradient>
		</defs>
		<path fill-rule="evenodd" clip-rule="evenodd"
			d="M7.35718 2.27146C7.64867 1.78711 8.35083 1.78713 8.64234 2.27146L10.4226 5.22947L13.7859 6.00779C14.3366 6.13538 14.5529 6.80356 14.1824 7.23045L11.9197 9.83787L12.2185 13.2773C12.267 13.8403 11.6989 14.2527 11.1785 14.0322L7.99976 12.6855L4.82105 14.0322C4.30067 14.2527 3.73249 13.8403 3.78101 13.2773L4.07984 9.83787L1.81714 7.23045C1.4466 6.80359 1.66302 6.13544 2.21363 6.00779L5.57691 5.22947L7.35718 2.27146Z"
			fill="url(#half-fill)"/>
	</svg>`;

	return `
		<div style="display:flex;gap:4px;align-items:center;">
			${fullStarSvg.repeat(fullStars)}
			${halfStar ? halfStarSvg : ""}
			${emptyStarSvg.repeat(emptyStars)}
		</div>
	`;
}