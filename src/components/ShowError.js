export function ShowError({ game }) {
  return (
    <div className="show-error">
      <p>{game.error}</p>
    </div>
  );
}

export default ShowError;
