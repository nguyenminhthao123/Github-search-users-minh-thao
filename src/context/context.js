import React, { useState, useEffect, createContext } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';
export const GithubContext = createContext()
const GithubProvider = ({ children }) => {
    const [gitHubUser, setGithubUser] = useState(mockUser)
    const [repos, setRepos] = useState(mockRepos)
    const [followers, setFollowers] = useState(mockFollowers)
    const [request, setRequest] = useState(0)
    const [error, setError] = useState({ show: false, msg: '' })
    const [isLoading, setIsLoading] = useState(false)
    const checkRequest = () => {
        axios(`${rootUrl}/rate_limit`).then(({ data }) => {
            let { rate: { remaining } } = data
            setRequest(remaining)
            if (remaining === 0) {
                setError({ show: true, msg: 'sorry, you have exceeded your hourly rate limit' })
            }

        }).catch((error) => {
            console.log(error)
        })
    }
    const searchUser = async (user) => {
        setError({ show: false, msg: 'user not founds' })
        setIsLoading(true)
        const response = await axios(`${rootUrl}/users/${user}`).catch((e) => {
        })
        if (response) {
            const { login, followers_url } = response.data
            // [Repos](https://api.github.com/users/john-smilga/repos?per_page=100)
            // - [Followers](https://api.github.com/users/john-smilga/followers)
            //Repos
            // const responses = await axios(`${rootUrl}/users/${login}/repos?per_page=100`)
            // console.log(responses.data)
            // setRepos(responses.data)
            // //Followers
            // const responsess= await axios(`${followers_url}?per_page=100`)
            await Promise.allSettled([
                axios(`${rootUrl}/users/${login}/repos?per_page=100`),
                axios(`${followers_url}?per_page=100`)
            ]).then((results)=>{
                const [repos,followers]=results
                const status ='fulfilled'
                if (repos.status===status)
                {
                    setRepos(repos.value.data)
                }
                if (followers.status===status)
                {
                    setFollowers(followers.value.data)
                }
                
            })
            // setFollowers(responsess.data)
            setGithubUser(response.data)
        } else {
            setError({ show: true, msg: 'user not founds' })
        }
        checkRequest()
        setIsLoading(false)

    }
    useEffect(() => {
        checkRequest()
    }, [])
    return <GithubContext.Provider
        value={{ gitHubUser, repos, followers, request, error, searchUser, isLoading }}
    >{children}</GithubContext.Provider>
}
export default GithubProvider