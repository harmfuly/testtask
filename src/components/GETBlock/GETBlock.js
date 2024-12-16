import React, { useEffect, useState } from "react";
import './GETBlock.scss';

const GETBlock = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`);
                const data = await response.json();
                const sortedUsers = data.users.sort((a, b) => b.registration_timestamp - a.registration_timestamp);

                if (page === 1) {
                    setUsers(sortedUsers);
                } else {
                    setUsers((prev) => [...prev, ...sortedUsers]);
                }

                console.log("Current page:", data.page, "Total pages:", data.total_pages);

                setIsLastPage(data.page >= data.total_pages);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [page]);

    const handleShowMore = () => {
        if (!isLastPage) {
            setPage((prev) => prev + 1);
        }
    };

    return (
        <div className="GETBlock">
            <div className="GETBlock_container">
                <h1 className="GETBlock_title">Working with GET request</h1>
                <div className="GETBlock_card-container">
                    {users.map((person, index) => (
                        <div key={index} className="GETBlock_card">
                            <img src={person.photo} alt={person.name} className="GETBlock_card_image" />
                            <h6 className="GETBlock_card_title">{person.name}</h6>
                            <p className="GETBlock_card_position">{person.position}</p>
                            <p className="GETBlock_card_email">{person.email}
                                <span className="tooltip">{person.email}</span>
                            </p>
                            <p className="GETBlock_card_phone">{person.phone}</p>
                        </div>
                    ))}
                </div>
                {!isLastPage && (
                    <button 
                        className="GETBlock_button"
                        onClick={handleShowMore} 
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Show more"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default GETBlock;