export default function AuthAction({ content, action }) {
  return (
    <>
      <button className="" onClick={action}>{content}</button>
    </>
  );
}
