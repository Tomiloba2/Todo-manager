const LoadingSpinner = () => {
    return (
        <div className="flex justify-center align-middle h-12 w-full mb-3">
            <div 
            className="h-12 w-12 rounded-full animate-spin  border-r-4 border-l-4 p-1 border-r-orange-700 border-green-700 "></div>
        </div>
      );
}
 
export default LoadingSpinner;

