import { useEffect, useState } from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

let firstRender = true;

export const Favourite = ({ favourite, updateContent, toggleIsSaving, project, userId }) => {
    const [isFavourite, setIsFavourite] = useState(favourite);

    const toggleFavourite = async () => {
        setIsFavourite((prevState) => !prevState);
    }

    useEffect(() => {
        const updateCloud = async () => { // for some reason called twice on init
            toggleIsSaving(true);
            project.isFavourite = isFavourite
            await updateContent(userId, project.id, project);
            toggleIsSaving(false);
        }
        if (!firstRender) {
            updateCloud();
        }
        if (firstRender) firstRender = false;
    }, [isFavourite])

    return (
        <button onClick={toggleFavourite} className='text-yellow-600 absolute bottom-2 right-2'>
            {isFavourite ? <AiFillStar size={25} /> : <AiOutlineStar size={25} />}
        </button>
    );
}