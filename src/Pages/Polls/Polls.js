import React, { useEffect, useState } from 'react';
import get from '../../helpers/get';
import post from '../../helpers/post';
import { Link } from 'react-router-dom';

const Polls = () => {
    const [allPolls, setAllPolls] = useState([]);
    const [name, setName] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        get(`getAllPolls`).then((res) => {
            setAllPolls(res);
        });
    }, [success])

    const handlePollSubmit = (e) => {
        e.preventDefault();
        const subdata = {
            pollName: name
        }
        post(`addPoll`, subdata).then(res => {
            setName("");
            setSuccess(!success);
        })
    }

    return (
        <div className='container-fluid'>
            <h1>Existing Polls:</h1>
            <ul>
                {
                    allPolls?.map((poll, i) => (
                        <li key={i}><Link to={`/polls/${poll?.id}`}>{poll?.pollName}</Link></li>
                    ))
                }
            </ul>
            <h1>New Poll:</h1>
            <form onSubmit={handlePollSubmit}>
                <label for="pollName">Name:</label>{" "}
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" id="fname" name="pollName" required /> <br />
                <button type="submit">Add Poll</button>
            </form>
        </div>
    );
};

export default Polls;