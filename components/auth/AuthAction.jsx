export function AuthAction({ content, action }) {
  return (
    <>
      <button
        className="rounded-md
            bg-gradient-to-r
            from-black
            to-indigo-800
            py-2 px-10 
            text-white 
            transition-all 
            duration-500 
            transform 
            hover:scale-110  
            hover:opacity-75"
        onClick={action}>
        {content.toUpperCase()}
      </button>
    </>
  );
}
