import Link from 'next/link';

export const PrimaryButton = ({ content, onClick, href }) => {
  return (
    <button onClick={onClick && onClick} className="py-1 px-2 rounded bg-highlight text-white text-center whitespace-nowrap" type="button">
      {href ? (
        <Link href="/auth">
          <a>{content}</a>
        </Link>
      ) : (
        content
      )}
    </button>
  );
};
