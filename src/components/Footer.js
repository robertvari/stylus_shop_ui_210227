import React from 'react';

function Signup() {
    return(
        <div className="signup-container">
            <input type="text" placeholder="Email"/>
            <button>SIGN UP</button>
        </div>
    )
}

function Footer(props) {
    return (
        <footer>
            <div className="content">
                <div className="footer-block">
                    <h4>QUICK LINKS</h4>
                    <small>Search</small>
                    <small>Contact</small>
                    <small>About Us</small>
                    <small>News</small>
                    <small>FAQ</small>
                </div>

                <div className="footer-block">
                    <h4>GET IN TOUCH</h4>
                    <p>Sign up to stay in the loop. Receive updates, access to exclusive deals, and more.</p>
                </div>

                <div className="footer-block">
                    <h4>NEWSLETTER</h4>
                    <Signup/>
                </div>
            </div>
        </footer>
    );
}

export default Footer;