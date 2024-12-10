import React from "react";
import './GETBlock.scss';
import person1 from '../../assets/person1.png';
import person2 from '../../assets/person2.png';
import person3 from '../../assets/person3.png';
import person4 from '../../assets/person4.png';
import person5 from '../../assets/person5.png';
import person6 from '../../assets/person6.png';

const GETBlock = () => {
    const people = [
        {
            img: person1,
            name: "Salvador Stewart Flynn Thomas",
            position: "Frontend Developer Frontend",
            email: "frontend_develop@gmail.com",
            phone: "+38 (098) 278 44 24",
        },
        {
            img: person2,
            name: "Takamaru Ayako Jurrien",
            position: "Lead Independent Director",
            email: "Takamuru@gmail.com",
            phone: "+38 (098) 278 90 24",
        },
        {
            img: person3,
            name: "Ilya",
            position: "Co-Founder and CEO",
            email: "Ilya_founder@gmail.com",
            phone: "+38 (098) 235 44 24",
        },
        {
            img: person4,
            name: "Alexandre",
            position: "Lead Independent Director",
            email: "Alexandr_develop@gmail.com",
            phone: "+38 (098) 198 44 24",
        },
        {
            img: person5,
            name: "Winny",
            position: "Former Senior Director",
            email: "Winny_develop@gmail.com",
            phone: "+38 (098) 278 22 88",
        },
        {
            img: person6,
            name: "Simon",
            position: "President of Commerce",
            email: "Simon@gmail.com",
            phone: "+38 (098) 278 44 00",
        },
    ];

    return (
        <div className="GETBlock">
            <div className="GETBlock_container">
                <h1 className="GETBlock_title">Working with GET request</h1>
                <div className="GETBlock_card-container">
                    {people.map((person, index) => (
                        <div key={index} className="GETBlock_card">
                            <img src={person.img} alt={person.name} className="GETBlock_card-image" />
                            <h6 className="GETBlock_card_title">{person.name}</h6>
                            <p className="GETBlock_card_position">{person.position}</p>
                            <p className="GETBlock_card_email">{person.email}</p>
                            <p className="GETBlock_card_phone">{person.phone}</p>
                        </div>
                    ))}
                </div>
                <button className="GETBlock_button">Show more</button>
            </div>
        </div>
    );
};

export default GETBlock;