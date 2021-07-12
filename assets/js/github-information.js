function userInformationHTML(user) {
    // user is the object returned from the github API.
    return `
        <h2>${user.name}
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
            </span>
        </h2>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
                </a>
            </div>
            <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
        </div>`;
}

function repoInformationHTML(repos) {
    if (repos.length == 0) {
        return `<div class="clearfix repo-list">No repos!</div>`;
    }

    var listItemsHTML = repos.map(function (repo) {
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    });


    return `<div class="clearfix repo-list">
                <p>
                    <strong>Repo List:</strong>                
                </p>
                <ul>
                    ${listItemsHTML.join("\n")}
                </ul>
            </div>`;
}

function fetchGitHubInformation(event) {
    // emptys the divs
    $("#gh-user-data").html("");
    $("#gh-repo-data").html("");
    
    // popup text, when no username is typed in 
    var username = $("#gh-username").val();
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        return;
    }
    // load loader gif when searching for user
    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..." />
        </div>`);

    // The use of promise, a promise in coding is alot like coding in real life.(Jquery)
    // $.when().then.
    // .catch catches errors in the promise.

    $.when(
        // display user from username
        $.getJSON(`https://api.github.com/users/${username}`),
        // display repo from username
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
        function (firstResponse, secondResponse) {
            var userData = firstResponse[0];
            var repoData = secondResponse[0];
            $("#gh-user-data").html(userInformationHTML(userData));
            $("#gh-repo-data").html(repoInformationHTML(repoData));
        },
        function (errorResponse) {
            if (errorResponse.status === 404) {
                $("#gh-user-data").html(
                    `<h2>No info found for user ${username}</h2>`);
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        });
}

// display octocat when page has loaded
$(document).ready(fetchGitHubInformation);