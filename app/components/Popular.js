var React = require('react');

class Popular extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedLanguage: 'All'
		}
		this.updateLanguage = this.updateLanguage.bind(this)
	}
	updateLanguage(language) {
		this.setState(function(){
			return {
				selectedLanguage: language
			}
		})
	}
	render() {
		var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
		return (
			<ul className="languages" >
				{languages.map((language)=>{
					return (
						<li
							style={language === this.state.selectedLanguage ? { color: '#d0021b'} : null}
							key={language}
							onClick={this.updateLanguage.bind(null, language)} >
							{language}
						</li>
					)
				})}
			</ul>
		) 
	}
}

module.exports = Popular