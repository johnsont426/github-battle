import axios from 'axios';

const id = "605697f66106e2a33e55";
const sec = "39157f5c6dcf025dd4dea5bb1f8ad21f09e9212a";
const params = `?client_id=${id}&client_secret=${sec}`;

function getProfile (username) {
  return axios.get(`https://api.github.com/users/${username + params}`)
    .then((user) =>user.data);
}

function getRepos (username) {
  return axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`);
}

function getStarCount (repos) {
  return repos.data.reduce((count, repo) => count + repo.stargazers_count, 0);
}

function calculateScore (profile, repos) {
  const followers = profile.followers;
  const totalStars = getStarCount(repos);

  return (followers * 3) + totalStars;
}

function handleError (error) {
  console.warn(error);
  return null;
}

async function getUserData (player) {
  try {
    const profile = await getProfile(player);
    const repos = await getRepos(player);
    return {
      profile,
      score: calculateScore(profile, repos)
    }
  }catch(e) {
    console.warn('error in getUserData', e)
  }
}

function sortPlayers (players) {
  return players.sort(function (a,b) {
    return b.score - a.score;
  });
}

export async function battle(players) {
  try {
    const playersData = await Promise.all(players.map(getUserData));
    return sortPlayers(playersData);
  }catch(e) {
    handleError(e)
  }
};
export async function fetchPopularRepos(language) {
  try {
    const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
    const response = await axios.get(encodedURI);
    return response.data.items
  }catch(e) {
    handleError(e);
  }
};
