import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PlayerPreview from './PlayerPreview';

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
  }
  handleChange(event) {
    const value = event.target.value;

    this.setState(function () {
      return {
        username: value
      }
    });
  }
  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.username
    );
  }
  render() {
    return (
      <form className='column' onSubmit={(e) => this.handleSubmit(e)}>
        <label className='header' htmlFor='username'>{this.props.label}</label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          value={this.state.username}
          autoComplete='off'
          onChange={(e) => this.handleChange(e)}
        />
        <button
          className='button'
          type='submit'
          disabled={!this.state.username}>
            Submit
        </button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

PlayerInput.defaultProps = {
  label: 'Username',
}

class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null,
    };
  }
  handleSubmit(id, username) {
    this.setState(function () {
      let newState = {};
      newState[id + 'Name'] = username;
      newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200'
      return newState;
    });
  }
  handleReset(id) {
  	this.setState(function () {
      let newState = {};
      newState[id + 'Name'] = '';
      newState[id + 'Image'] = null;
      return newState;
    });
  }
  render() {
  	const match = this.props.match;
    const { playerOneName, playerTwoName, playerOneImage, playerTwoImage } = this.state;

    return (
      <div>
        <div className='row'>
          {!playerOneName &&
            <PlayerInput
              id='playerOne'
              label='Player One'
              onSubmit={this.handleSubmit.bind(this)}
            />}

          {playerOneImage !== null &&
          	<PlayerPreview
          		avatar={playerOneImage}
          		username={playerOneName}
          	>
          		<button
								className='reset'
								onClick={() => this.handleReset('playerOne')}>
									Reset
							</button>
						</PlayerPreview>
					}

          {!playerTwoName &&
            <PlayerInput
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit.bind(this)}
            />}

          {playerTwoImage !== null &&
          	<PlayerPreview
          		avatar={playerTwoImage}
          		username={playerTwoName}
          	>
          		<button
								className='reset'
								onClick={() => this.handleReset('playerTwo')}>
									Reset
							</button>
						</PlayerPreview>
          		}

        </div>

        {playerOneImage && playerTwoImage &&
        	<Link
        		className='button'
        		to={{
        			pathname: match.url + '/results',
        			search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
        		}}>
        		Battle
        	</Link>
        }
      </div>
    )
  }
}

export default Battle;