'use client';

import React, { useState } from 'react';
import axios from 'axios';

const GetJob: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);



    const fetchJobs = async () => {
        setLoading(true);
        setError(null);

        const jobID = 5396272;

        const url = `https://api.cron-job.org/jobs/${jobID}`;

        const auth = `Bearer ${process.env.NEXT_PUBLIC_CORN_AUTH}`;

        try {
            // Make the GET request using Axios
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: auth,
                },
            });

            // Handle the response
            console.log('Response:', response.data);
        } catch (error) {
            // Handle any error that occurs during the request
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button
                className="btn btn-primary"
                onClick={fetchJobs}
                disabled={loading}>
                Fetch A Job
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default GetJob;
