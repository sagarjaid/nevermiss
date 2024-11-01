'use client';

import React, { useState } from 'react';
import axios from 'axios';

const CreateJob: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchJobs = async () => {
        setLoading(true);
        setError(null);

        const url = 'https://api.cron-job.org/jobs';

        const auth = `Bearer ${process.env.NEXT_PUBLIC_CORN_AUTH}`;


        const jobData = {
            job: {
                enabled: true,
                title: 'API Test Job',
                saveResponses: true,
                url: 'https://gettherapyy.com/api/blondai',
                auth: {
                    enable: false,
                    user: '',
                    password: '',
                },
                notification: {
                    onFailure: false,
                    onSuccess: false,
                    onDisable: true,
                },
                extendedData: {
                    headers: [] as string[],
                    body: '{Hello: "Sagar"}',
                },
                type: 0,
                requestTimeout: 30,
                redirectSuccess: false,
                folderId: 0,
                schedule: {
                    timezone: 'Asia/Kolkata',
                    hours: [-1],
                    mdays: [-1],
                    minutes: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
                    months: [-1],
                    wdays: [-1],
                    expiresAt: 0,
                },
                requestMethod: 1,
            }
        }



        try {
            // Make the GET request using Axios
            const response = await axios.put(url, jobData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: auth,
                },
            });

            // Handle the response
            console.log('Job updated successfully:', response.data);

        } catch (error) {
            // Handle any error that occurs during the request
            console.error('Error updating job:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button
                className='btn btn-primary'
                onClick={fetchJobs}
                disabled={loading}>
                Create a Job
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default CreateJob;
