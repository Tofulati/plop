import {useState} from 'react';
import "../styles/AddRestroomForm.css";

export default function AddRestroomForm({latlng, onSubmit, onCancel}) {
    const [name, setName] = useState("");
    const [cleanliness, setCleanliness] = useState(3);
    const [stank, setStank] = useState(3);
    const [maintained, setMaintained] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        onSubmit({
            name, 
            lat: latlng[0],
            lng: latlng[1],
            cleanliness: Number(cleanliness),
            stank: Number(stank),
            maintained,
            images: [],
        });
    };

    return (
        <div className='add-restroom-form-overlay'>
            <form className='add-restroom-form' onSubmit={handleSubmit}>
                <h2>Add New Restroom</h2>

                <label>
                    Name:
                    <input value={name} onChange={(e) => setName(e.target.value)} required/>
                </label>

                <label>
                    Cleanliness (1-5):
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={cleanliness}
                        onChange={(e) => setCleanliness(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Stank level (1-5):
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={stank}
                        onChange={(e) => setStank(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Maintained:
                    <input
                        type='checkbox'
                        checked={maintained}
                        onChange={(e) => setMaintained(e.target.checked)}
                    />
                </label>

                <div className='form-button'>
                    <button type='submit'>Add Restroom</button>
                    <button type='button' onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    )
}