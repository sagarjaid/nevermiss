
"use client"

import React, { useState } from 'react';
import axios from 'axios';

const CallButton: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
    };

    const handleCall = async () => {
        setLoading(true);
        setError(null);

        // Headers
        const headers = {
            Authorization: process.env.NEXT_PUBLIC_BLOND_AUTH, // Replace with actual API key
        };

        //            task: 'Act as Gym couch and remind caller to go to the gym and track the progress. Remind me to go to the gym and track my progress by asking questions like are you hitting the gym today? what exercise you did do on the last day? what are you playing today? wish me the best day wait for 2 seconds and hangup the call.',


        // Data for API request
        const data: Record<string, any> = {
            phone_number: phoneNumber,
            from: null,
            task: 'Act as Gym couch and remind caller to go to the gym and track the progress',
            language: 'en',
            voice: 'nat',
            voice_settings: {},
            pathway_id: null,
            local_dialing: false,
            max_duration: '5',
            answered_by_enabled: false,
            wait_for_greeting: false,
            record: false,
            amd: false,
            interruption_threshold: 100,
            voicemail_message: null,
            temperature: null,
            transfer_phone_number: null,
            transfer_list: {},
            metadata: null,
            pronunciation_guide: [],
            start_time: null,
            request_data: {},
            tools: [],
            dynamic_data: [],
            analysis_preset: null,
            analysis_schema: {},
            webhook: null,
            calendly: {},
        };

        try {
            const response = await axios.post('https://us.api.bland.ai/v1/calls', data, { headers });
            console.log('API Response:', response.data);
            alert('Call placed successfully!');
        } catch (err) {
            console.error('API Error:', err);
            setError('Failed to place the call. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={handleInputChange}
                disabled={loading}
                style={{ marginRight: '10px' }}
            />
            <button onClick={handleCall} disabled={loading || !phoneNumber}>
                {loading ? 'Calling...' : 'Place Call'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default CallButton;