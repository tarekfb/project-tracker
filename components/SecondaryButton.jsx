export const SecondaryButton = ({ text, icon, styling, onClick, title }) => {
  return (
    <button
      type='button'
      title={title && title}
      onClick={onClick && onClick}
      className={`${styling && styling} whitespace-nowrap flex-nowrap flex flex-row place-items-center space-x-2 input-padding bg-white border border-highlight text-sm`}
    >
      {icon && <span>{icon}</span>}
      {text && <span>{text}</span>}
    </button>
  );
}
