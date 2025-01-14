import "./BeautifulButton.css";

function BeautifulButton({ text }: { text: string }) {
	return (
		<button className="beautiful-button" type="button">
			<div className="svg-container">
				<svg
					className="svg1"
					width="298"
					height="139"
					viewBox="0 0 298 139"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<title>Button</title>
					<g filter="url(#filter0_f_277_8465)">
						<rect
							x="50"
							y="50"
							width="198"
							height="39"
							rx="19.5"
							fill="url(#paint0_linear_277_8465)"
							fillOpacity="0.6"
						/>
					</g>
					<rect
						x="45"
						y="50"
						width="209"
						height="40"
						rx="19"
						stroke="url(#paint1_linear_277_8465)"
						strokeWidth="2"
						style={{ mixBlendMode: "screen" }}
					/>
					<defs>
						<filter
							id="filter0_f_277_8465"
							x="0"
							y="0"
							width="298"
							height="139"
							filterUnits="userSpaceOnUse"
							colorInterpolationFilters="sRGB"
						>
							<feFlood floodOpacity="0" result="BackgroundImageFix" />
							<feBlend
								mode="normal"
								in="SourceGraphic"
								in2="BackgroundImageFix"
								result="shape"
							/>
							<feGaussianBlur
								stdDeviation="25"
								result="effect1_foregroundBlur_277_8465"
							/>
						</filter>
						<linearGradient
							id="paint0_linear_277_8465"
							x1="98.7962"
							y1="41.1786"
							x2="209.151"
							y2="89.851"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="#19A1BE" />
							<stop offset="1" stopColor="#7D4192" />
						</linearGradient>
						<linearGradient
							id="paint1_linear_277_8465"
							x1="96"
							y1="39.5"
							x2="214"
							y2="91"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="#19A1BE" />
							<stop offset="1" stopColor="#7D4192" />
						</linearGradient>
					</defs>
				</svg>

				<svg
					className="svg2"
					width="298"
					height="139"
					viewBox="0 0 298 139"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<title>Button</title>
					<g id="Group 42">
						<g id="Group 4">
							<g id="Rectangle 2" filter="url(#filter0_f_259_35)">
								<rect
									x="50"
									y="50"
									width="198"
									height="39"
									rx="19.5"
									fill="url(#paint0_linear_259_35)"
								/>
							</g>
							<g id="Rectangle 1">
								<rect
									x="44"
									y="48"
									width="209"
									height="40"
									rx="19"
									fill="url(#paint1_linear_259_35)"
								/>
								<rect
									x="44"
									y="48"
									width="209"
									height="40"
									rx="19"
									stroke="url(#paint2_linear_259_35)"
									strokeWidth="2"
									style={{ mixBlendMode: "screen" }}
								/>
							</g>
						</g>
					</g>
					<defs>
						<filter
							id="filter0_f_259_35"
							x="0"
							y="0"
							width="298"
							height="139"
							filterUnits="userSpaceOnUse"
							colorInterpolationFilters="sRGB"
						>
							<feFlood floodOpacity="0" result="BackgroundImageFix" />
							<feBlend
								mode="normal"
								in="SourceGraphic"
								in2="BackgroundImageFix"
								result="shape"
							/>
							<feGaussianBlur
								stdDeviation="25"
								result="effect1_foregroundBlur_259_35"
							/>
						</filter>
						<linearGradient
							id="paint0_linear_259_35"
							x1="98.7962"
							y1="41.1786"
							x2="209.151"
							y2="89.851"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="#19A1BE" />
							<stop offset="1" stopColor="#7D4192" />
						</linearGradient>
						<linearGradient
							id="paint1_linear_259_35"
							x1="95"
							y1="37.5"
							x2="213"
							y2="89"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="#19A1BE" />
							<stop offset="1" stopColor="#7D4192" />
						</linearGradient>
						<linearGradient
							id="paint2_linear_259_35"
							x1="95"
							y1="37.5"
							x2="213"
							y2="89"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="#19A1BE" />
							<stop offset="1" stopColor="#7D4192" />
						</linearGradient>
					</defs>
				</svg>
			</div>
			<span className="button-text">{text}</span>
		</button>
	);
}

export default BeautifulButton;
