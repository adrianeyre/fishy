import React, { FC } from 'react';

import IDrawFishProps from './interfaces/draw-fish-props';

const DrawFish: FC<IDrawFishProps> = (props: IDrawFishProps) => {
	const styleFish = (x: number, y: number) => ({
		width: 0,
		height: 0,
		opacity: 1,
		WebkitTransform: `translate3d(${ x }px, ${ y }px, 0)`,
		transform: `translate3d(${ x }px, ${ y }px, 0)`,
		zIndex: 5000
	})

	return <div key={ props.fish.key } style={ styleFish(props.fish.x, props.fish.y) }>
		<img
			src={ props.image }
			height={ props.fish.height }
			width={ props.fish.width }
			alt="fish"
		/>
	</div>
}

export default DrawFish;
