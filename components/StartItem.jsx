export const StartItem = ({ children, heading }) => {
    return (
        <div className='flex flex-col space-y-1 items-center'>
            <p className='text-lg'>{heading}</p>
            {
                children && children
            }
        </div>
    )

}