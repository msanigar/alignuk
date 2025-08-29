'use client';

import { useState } from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';
import { deleteQuiz } from '@/lib/database';

interface DeleteQuizButtonProps {
  quizId: string;
  onDelete: () => void;
  quizTitle?: string;
}

export function DeleteQuizButton({ quizId, onDelete, quizTitle }: DeleteQuizButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      await deleteQuiz(quizId);
      setShowConfirmation(false);
      onDelete(); // Refresh the quiz list
    } catch (err) {
      console.error('Failed to delete quiz:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete quiz');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* Delete Button */}
      <button
        onClick={() => setShowConfirmation(true)}
        className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
        disabled={isDeleting}
      >
        <Trash2 className="w-4 h-4" />
        <span>Delete</span>
      </button>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">
                  Delete Quiz
                </h3>
                <p className="text-sm text-neutral-600">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-neutral-700">
                Are you sure you want to delete{' '}
                <span className="font-semibold">
                  {quizTitle || `Quiz #${quizId.slice(-8)}`}
                </span>
                ? This will permanently remove all quiz data including scores and answers.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 px-4 py-2 text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors disabled:opacity-50"
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
