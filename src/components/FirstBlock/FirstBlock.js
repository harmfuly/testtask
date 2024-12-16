import React from 'react';
import './FirstBlock.scss';

const FirstBlock = () => {
    return (
        <div className="first_block">
            <div className="first_block_title">
                <h1>Test assignment for front-end developer</h1>
                <p>
                    What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
                </p>
                <a href="#signup" className="first_block_button">Sign up</a>
            </div>
        </div>
    );
};

export default FirstBlock;


