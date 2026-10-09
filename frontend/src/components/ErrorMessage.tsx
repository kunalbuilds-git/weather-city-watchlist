export default function ErrorMessage({ message }: { message: string }) {
  return (
    <p role="alert" className="bg-red-50 text-red-700 border border-red-200 rounded-md px-4 py-2">
      {message}
    </p>
  );
}