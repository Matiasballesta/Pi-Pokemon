import React from 'react';
import {Link} from 'react-router-dom'

const Notfound = () => {
    return(
        <div>
            Pokemon doesn't exist
            <Link to='/home'>
                <button>GoBack</button>
            </Link>
        </div>
    )
}

export default Notfound;