function Loader() {
  return (
    <div class="mx-auto sm:w-3/4 md:w-2/4 fixed inset-0 flex items-center" id="signin-success-message">
       <div class="px-6 py-4 rounded-md text-lg flex items-center justify-center w-full">
        <button type="button" class="inline-flex items-center justify-center self-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-purple-500 hover:bg-purple-400 transition ease-in-out duration-150 cursor-not-allowed" disabled="">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </button>
      </div>
    </div>
  )
}

export default Loader
