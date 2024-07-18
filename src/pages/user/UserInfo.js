import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserInfo = ({ memberId }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`https://localhost:7169/api/user/GetUserInfo`);
                setUserInfo(response.data);
            } catch (error) {
                console.error('Error fetching user info:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, [memberId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading user info</p>;

    return (
        <div className="user-info">
            <h1><strong>Welcome {userInfo.name}</strong> </h1>
            {/* <p><strong>Email:</strong> {userInfo.email}</p>
            <p><strong>Active:</strong> {userInfo.isActive}</p>
            <p><strong>Team:</strong> {userInfo.team_Name}</p>
            <p><strong>Role ID:</strong> {userInfo.roleID}</p>
            <p><strong>Team Description:</strong> {userInfo.team_Descriptoin}</p> */}
        </div>
    );
};

export default UserInfo;
