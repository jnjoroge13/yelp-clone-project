import "./Footer.css";
export default function Footer() {
	return (
		<div className="Footer-cont">
			<div className="about-div">
				<p className="about-name">Jesse Njoroge</p>
				<a
					href="https://github.com/jnjoroge13"
					target="_blank"
					className="about-github"
				>
					<i className="about-github fa-brands fa-github fa-2x"></i>
				</a>
				<a
					href="https://www.linkedin.com/in/jesse-njoroge/"
					target="_blank"
				>
					<i className="about-linkedin fa-brands fa-linkedin fa-2x"></i>
				</a>
			</div>
		</div>
	);
}
