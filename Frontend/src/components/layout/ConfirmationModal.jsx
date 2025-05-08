import React from 'react'

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop with blur effect */}
        <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
        ></div>
        
        {/* Modal */}
        <div className="bg-white rounded-lg p-6 shadow-xl z-50 w-[90%] max-w-md mx-auto my-auto sm:w-[80%] md:w-[60%] lg:w-[40%]">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
                {title}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
                {message}
            </p>
            <div className="flex flex-col sm:flex-row justify-end gap-3">
                <button
                    onClick={onClose}
                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    Logout
                </button>
            </div>
        </div>
    </div>
)
}

export default ConfirmationModal