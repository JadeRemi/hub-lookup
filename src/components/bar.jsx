import React, {useState} from "react";

export function Bar ({ search, error }) {

    const [input, setInput] = useState('');

    const handleChange = (e) => {
        setInput(e.target.value);
    }
    const startSearch = () => {
        if (input) search(input);
    }

    const keyPress = (e) => {
        if (e.key === 'Enter') {
            startSearch();
        }
    }

    const handleClick = (e) => {
        e.preventDefault();
        startSearch();
    }

    return (
        <div className="bar">
            <label htmlFor="search">
                <span>
                    Search for a user
                </span>
            </label>
            <div className="bar-input">
                <input
                    type="text"
                    id="search"
                    placeholder="Enter valid username"
                    name="search"
                    onChange={handleChange}
                    onKeyUp={keyPress}
                    value={input}
                    className={`${error ? 'input-warning' : ''}`}
                />
                <button
                    onClick={handleClick}
                >
                    Search
                </button>
            </div>
            {error && (
                <p className="error">{error}</p>
            )}
            
        </div>
    )
}




    