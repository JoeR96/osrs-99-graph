// App.tsx
import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const username = 'bun lat ting'; // Your username with spaces
                const encodedUsername = encodeURIComponent(username);

                const response = await axios.get(`${WiseOldManAPIBaseUrl}/players/${encodedUsername}`);
                const playerSkills = Object.values(response.data.latestSnapshot.data.skills);
                setSkills(playerSkills);
            } catch (error) {
                console.error('Error fetching skills:', error);
            }
        };

        fetchSkills();
    }, []);

    return (
        <div style={{
            display: "flex",
            alignItems: 'center',
            justifyContent: 'center',
            width: '100vw', // Ensures the div takes up the full viewport width
        }}>


            <div>
                <h1 style={{textAlign: 'center'}}>Autism Remaining</h1>

                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    height: '100vh', // Set the container height to fill the viewport height
                    alignItems: 'stretch' // Stretch the children to fill the container height
                }}>
                    {skills.map(skill => (
                        <SkillBar key={skill.metric} skill={skill} style={{flexGrow: 1, width: '100%'}}/>
                    ))}
                </div>
            </div>
        </div>
    )
        ;
};

export default App;
