import Link from "next/link"

export const PrimaryButton = ({ content, onClick, href }) => {
    return (
        <button onClick={onClick && onClick} className='py-2 px-4 bg-gradient-main text-white text-center rounded-sm'>
            {
                href ?
                    <Link href="/auth">
                        <a>{content}</a>
                    </Link> :
                    { content }
            }

        </button>
    )
}