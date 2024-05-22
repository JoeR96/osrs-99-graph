import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface SkillData {
    metric: string;
    level: number;
    experience: number;
}

const SkillBar: React.FC<{ skill: SkillData }> = ({ skill }) => {
    const XP_FOR_LEVEL_99 = 13034431;
    const xpPercentage = (skill.experience / XP_FOR_LEVEL_99) * 100;

    // Define styles outside the component if they don't depend on props
    const VerticalProgressBar = styled(Box)({
        height: `${xpPercentage}%`,
        width: '100%',
        backgroundColor: '#4CAF50', // Green background
        position: 'absolute',
        bottom: 0,
        zIndex: 1, // Ensure the bar is behind the text
    });

    const InfoText = styled(Typography)({
        color: 'black', // Make text black
        fontWeight: '600', // Make text bolder
        position: 'relative',
        zIndex: 2, // Ensure the text is above the progress bar
        pointerEvents: 'none',
        textAlign: 'center'
    });
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    if (skill.level === 99 || skill.metric === 'overall') return null;

    return (
        <Box sx={{  display: 'flex', flexDirection: 'column', alignItems: 'center', p: 1 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: 'black' }}>
                {skill.metric}
            </Typography>
            <Box sx={{
                height: '80%',
                width: 120,
                border: '1px solid #ccc',
                borderRadius: 5,
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                backgroundColor: 'red'
            }}
            >
                <VerticalProgressBar />
                <Box sx={{ position: 'absolute', zIndex: 2 }}>
                    <InfoText style={{paddingBottom:'20px'}} variant="body2">
                        {capitalizeFirstLetter(skill.metric)}
                    </InfoText>                    <InfoText variant="body2">Level: {skill.level}</InfoText>
                    <InfoText variant="body2" sx={{ mt: 1 }}>
                        Remaining XP: {(XP_FOR_LEVEL_99 - skill.experience).toLocaleString()}
                    </InfoText>
                </Box>
            </Box>
        </Box>
    );
};

export default SkillBar;
