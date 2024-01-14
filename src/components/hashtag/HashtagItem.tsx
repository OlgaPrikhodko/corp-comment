export default function HashtagItem({
  name,
  onSelectName,
}: {
  name: string;
  onSelectName: (name: string) => void;
}) {
  return (
    <li>
      <button onClick={() => onSelectName(name)}>#{name}</button>
    </li>
  );
}
