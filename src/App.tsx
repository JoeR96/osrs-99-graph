import React, { useState } from 'react';
import axios from 'axios';
import SkillBar from './SkillBar';

interface SkillData {
    metric: string;
    level: number;
    experience: number;
}

const WiseOldManAPIBaseUrl = 'https://api.wiseoldman.net/v2';

const App: React.FC = () => {
    const [skills, setSkills] = useState<SkillData[]>([]);
    const [username, setUsername] = useState(''); // State to hold the input username

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the form from causing a page reload
        if (username) { // Only fetch if username is not empty
            try {
                const encodedUsername = encodeURIComponent(username);
                const response = await axios.get(`${WiseOldManAPIBaseUrl}/players/${encodedUsername}`);
                const playerSkills = Object.values(response.data.latestSnapshot.data.skills);
                setSkills(playerSkills);
            } catch (error) {
                console.error('Error fetching skills:', error);
            }
        }
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: 'column', // Change to column for vertical alignment
            alignItems: 'center',
            justifyContent: 'center',
            width: '100vw',
        }}>
            <form onSubmit={handleSubmit} style={{marginBottom: '20px'}}>
                <input
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{padding: '10px', marginRight: '10px', fontSize: '16px'}}
                />
                <button type="submit" style={{padding: '10px', fontSize: '16px'}}>Submit</button>
            </form>

            <div>
                <h1 style={{textAlign: 'center'}}>Autism Remaining for {username} </h1>

                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    height: '100vh',
                    alignItems: 'stretch'
                }}>
                    {skills.length > 0 ? (
                        skills.map(skill => (
                            <SkillBar key={skill.metric} skill={skill} style={{flexGrow: 1, width: '100%'}}/>
                        ))
                    ) : (
                        <p>Please enter a username and submit to display skills.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
