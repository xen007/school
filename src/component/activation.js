import React, { useState } from 'react';
import config from './config';

const Activation = () => {
    const [schoolName, setSchoolName] = useState('');
    const [activationCode, setActivationCode] = useState('');

    const handleGenerate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${config.apiBaseUrl}/activation.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ schoolName })
            });
            const result = await response.json();
            setActivationCode(result.activationCode);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <main className='main-container'>
            <form onSubmit={handleGenerate}>
                <label>
                    Nom de l'école :
                    <input
                        type="text"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Générer le code</button>
                {activationCode && (
                    <p>Code d'activation généré : {activationCode}</p>
                )}
            </form>
        </main>
    );
};

export default Activation;
