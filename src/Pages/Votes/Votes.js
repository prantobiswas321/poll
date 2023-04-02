import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Votes.css';
import get from '../../helpers/get';
import post from '../../helpers/post';

const Votes = () => {
    const { userId } = useParams();

    const [votes, setVotes] = useState([]);
    const [pollName, setPollName] = useState("");
    const [name, setName] = useState("");
    const [selectedValue, setSelectedValue] = useState('YES');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        get(`selectedPoll/${userId}`).then(res => {
            setPollName(res?.pollName);
            setVotes(res?.votes);
        })
    }, [success])

    // user select vote dropdown
    const voteArr = [
        {
            label: "YES",
            value: 1,
        },
        {
            label: "NO",
            value: 2,
        },
        {
            label: "ABSTENTION",
            value: 3,
        }
    ];

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleVoteSubmit = (e) => {
        e.preventDefault();
        const subdata = {
            voterName: name,
            voterVote: selectedValue
        }
        post(`addVote/${userId}/vote`, subdata).then(res => {
            if (res?.data?.length < 1) {
                setError("Voter already exist");
            }
            else {
                setName("");
                setError("");
                setSelectedValue("YES");
                setSuccess(!success);
            }
        })
    }

    return (
        <div className='container-fluid'>
            <h1>{pollName}</h1>
            <h3>Existing Votes:</h3>

            <table>
                <tr>
                    <th>Name</th>
                    <th>Vote</th>
                </tr>
                {
                    votes?.map((vote, i) => (
                        <tr key={i}>
                            <td>{vote?.voterName}</td>
                            <td>{vote?.voterVote}</td>
                        </tr>
                    ))
                }
            </table>

            <h3>New Vote:</h3>
            <form
                onSubmit={handleVoteSubmit}
            >
                <label for="pollName">Name:</label>{" "}
                <input onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                }} value={name} type="text" id="fname" name="pollName" required /> <br />
                <label for="pollName">Vote Option:</label>{" "}
                <select value={selectedValue} onChange={handleChange}>
                    {/* <option value="">Select an option</option> */}
                    {voteArr.map((option) => (
                        <option key={option.label} value={option.label}>
                            {option.label}
                        </option>
                    ))}
                </select><br />
                <button type="submit">Add Vote</button><br />
                {
                    error?.length > 0 ?
                        <>
                            <span style={{ color: 'red' }}>{error}</span><br />
                        </>
                        :
                        null
                }

                <Link to={"/"}>Back to polls overview</Link>
            </form>

        </div>
    );
};

export default Votes;