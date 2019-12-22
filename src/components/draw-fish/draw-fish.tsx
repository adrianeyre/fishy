import React from 'react';

import IDrawFishProps from './interfaces/draw-fish-props';

export default class DrawFish extends React.Component<IDrawFishProps, {}> {

	public render() {
		return <div key={ this.props.fish.key } style={ this.styleFish(this.props.fish.x, this.props.fish.y) }>
			<img
				src={ this.props.image }
				height={ this.props.fish.height }
				width={ this.props.fish.width }
				alt="fish"
			/>
		</div>
	}

	private styleFish = (x: number, y: number) => ({
		width: 0,
		height: 0,
		opacity: 1,
		WebkitTransform: `translate3d(${ x }px, ${ y }px, 0)`,
		transform: `translate3d(${ x }px, ${ y }px, 0)`,
		zIndex: 5000
	})
}
