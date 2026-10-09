export default function Loader({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-2 py-6" role="status">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-600" />
      <span className="text-sm text-gray-600">{label}</span>
    </div>
  );
}