import React, {useState} from 'react';

function ToggleButton({id, isActive}) {
    const [toggled, setToggled] = useState(isActive);

    const onToggle = async ()=>{
        const updatedStatus = !toggled;

        try{
            const response = await fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/users/${id}`, {
            method: 'PATCH',
            headers : {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ isActive: updatedStatus }),
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        setToggled(updatedStatus);

        }catch (err) {
            console.log(`Error: ${err}`);
        }
    }

    return (
        <button className={`toggle-btn ${toggled ? "toggled" : ""}`} 
            onClick={onToggle}>
            <div className='thumb'></div>
        </button>
    )
}

export default ToggleButton
