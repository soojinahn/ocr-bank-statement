import axios from 'axios';
import { useState } from 'react';

function Headings() {
    const [input, setInput] = useState("");
    const form = new FormData();
    form.append('heading', input);

    function handleSubmit() {
        axios({
            url:'/heading',
            method: 'post',
            data: form
        })
        .then(res => console.log(res))
        .catch(errors => console.log(errors))
    };
 
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter desired heading:
                    <input type="text" onChange={(e) => setInput(e.target.value)}/>
                </label>
                <input type="submit"/>
            </form>
        </div>
    );
}

export default Headings;