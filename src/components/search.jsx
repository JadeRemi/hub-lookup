import React, {useState, useEffect} from "react";
import { Bar } from "./bar.jsx";
import IconEye from "../images/eye.svg"
import IconStar from "../images/star.svg"
import IconFork from "../images/fork.svg"
import IconLink from "../images/link.svg"

const FALLBACK = 'jaderemi';
const API = 'https://api.github.com/users/';
const REPO = '/repos';

export function Search () {

    const [preloading, setPreloading] = useState(true);
    const [lookup, setLookup] = useState('');
    const [user, setUser] = useState(null);
    const [repos, setRepos] = useState(null);
    const [error, setError] = useState('');

    const dataValid = !preloading && !error && user;

    const fetchAPI = (path, saver) => {
        fetch(path, {
            // mode: 'no-cors',
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    setError(data.message === 'Not Found' ? 'User not found!' : 'API rate limit');
                } else {
                    setError('');
                    saver(data);
                }
            })
            .then(setPreloading(false))
    }

    const searchData = () => {
        const username = lookup || FALLBACK;
        setPreloading(true);
        fetchAPI(`${API}${username}`, setUser);
        fetchAPI(`${API}${username}${REPO}`, setRepos);
    }

    // useEffect(() => {
    //     if (preloading) {
    //         searchData();
    //     }
    // },[])

    useEffect(() => {
        searchData();
    },[lookup])

    const format = (day) => {
        const result = new Date(day)
        return result.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 
    }

    return (
        <div className="wrap">
            <Bar search={setLookup} error={error} />
            {dataValid && (
                        <div className="bio">
                            <img className="bio-avatar" src={user.avatar_url} alt={user.login} />
                            <div className="bio-title">
                                <h3>{user.login}</h3>
                                <a href={user.html_url} className="card-link">
                                    <img src={IconLink} alt={"Link"} />
                                </a>
                            </div>
                            <p><span>Description:</span> {user.bio}</p>
                            <p><span>Total repositories:</span> {user.public_repos}</p>
                        </div>
            )}
            {dataValid && repos && (
                <div className="cards">
                    {repos.map((item, index)=> (
                        <div className="card" key={index}>
                            <div className="card-text">
                                <div className="card-title">
                                    <h3>{item.name}</h3>
                                    <a href={item.html_url} className="card-link">
                                        <img src={IconLink} alt={"Link"} />
                                    </a>
                                </div>
                                <p><span>Description:</span> {item.description}</p>
                                <p><span>Started at:</span> {format(item.created_at)}</p>
                                <p><span>Size:</span> {item.size}</p>
                            </div>

                            <nav className="card-nav">
                                <div className="card-nav-item">
                                    <img src={IconStar} alt={"Stars"}/>
                                    <p>{item.stargazers_count}</p>
                                </div>
                                <div className="card-nav-item">
                                    <img src={IconEye} alt={"Watchers"}/>
                                    <p>{item.watchers_count}</p>
                                </div>
                                <div className="card-nav-item">
                                    <img src={IconFork} alt={"Forks"}/>
                                    <p>{item.forks}</p>
                                </div>
                            </nav>
                            
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}