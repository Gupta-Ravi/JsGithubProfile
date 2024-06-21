const APIURL = "https://api.github.com/users/"

const searchBox = document.querySelector('#search')
const main = document.querySelector('#main')

const getUser = async (username) => {
    const response = await fetch(APIURL + username)
    const data = await response.json()

    const card = `
        <div class="card">
            <div>
                <img src="${data.avatar_url}" alt="Florin Pop" class="avatar">
            </div>
            <div class="user-info">
                <h2>${data.name}</h2>
                <p>${data.bio}</p>

                <ul class="info">
                    <li>${data.followers}<strong> Followers</strong></li>
                    <li>${data.following}<strong> Following</strong></li>
                    <li>${data.public_repos}<strong> Repos</strong></li>
                </ul>

                <div id="repos">
                    
                </div>

            </div>
        </div>
    `
    main.innerHTML = card
    getRepos(username)

}

const getRepos = async (username) => {
    const repos = document.querySelector('#repos')

    const response = await fetch(APIURL + username + "/repos")
    const data = await response.json()

    data.forEach(
        (item) => {
            const a = document.createElement('a')
            a.classList.add('repo')
            a.href = item.html_url
            a.innerText = item.name
            a.target = "_blank"
            repos.appendChild(a)
        }
    )
}
getUser("taylorotwell")

const formSubmit = () => {
    if (searchBox.value != "") {
        getUser(searchBox.value)
        searchBox.value = ''
    }

    return false
}

searchBox.addEventListener(
    "focusout",
    function(){
        formSubmit()
    }
)


// < a href = "#" target = "_blank" class="repo" > Repo 1</a >
// <a href="#" target="_blank" class="repo">Repo 2</a>
// <a href="#" target="_blank" class="repo">Repo 3</a>