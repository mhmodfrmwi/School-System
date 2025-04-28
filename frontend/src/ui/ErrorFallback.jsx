function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <main className="flex h-screen items-center justify-center bg-gray-50 p-12">
      <div className="max-w-4xl rounded-md border border-gray-100 bg-white p-12 text-center">
        <h1 className="mb-4 text-2xl font-bold">Something went wrong 😓</h1>
        <p className="font-mono mb-8 text-gray-500">{error.message}</p>
        <button
          className="rounded-md bg-blue-600 px-6 py-3 text-lg text-white transition-colors hover:bg-blue-700"
          onClick={resetErrorBoundary}
        >
          Try again
        </button>
      </div>
    </main>
  );
}

export default ErrorFallback;
