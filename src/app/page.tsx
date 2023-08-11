export default function Home() {
  return (
    <main className="w-full min-h-full flex justify-center bg-zinc-700 p-5">
      <div className="w-full flex flex-col items-center gap-4 max-w-5xl">
        <h1 className="font-semibold text-lg text-gray-300">Todo List</h1>
        <form className="w-full">
          <div className="relative">
            <input
              type="text"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Título"
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Adicionar
            </button>
          </div>
        </form>

        <ul className="w-full flex flex-col gap-2">
          <li>
            <div className="w-full p-6 bg-gray-50 border border-gray-300 rounded-lg shadow dark:bg-gray-700 dark:border-gray-600">
              <strong className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                Fazer a todo list
              </strong>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Owner: Guilherme Konell
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Status: In Progress
              </p>
            </div>
          </li>
        </ul>
      </div>
    </main>
  );
}
