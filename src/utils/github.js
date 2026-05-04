export const fetchRepos = async() => {
    const res = await fetch(
        "https://api.github.com/users/SiddhuPudi/repos"
    );

    if(!res.ok) {
        console.error("GitHub API Error");
        return[];
    }
    
    const data = await res.json();
    return data;
}