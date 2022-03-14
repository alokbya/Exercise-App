import React from 'react'

function Footer() {
    const date = new Date();
    return (
        <>
            <p>&copy; {date.getFullYear()} Alaaddin Hiefield</p>
        </>
    );
}
export default Footer;