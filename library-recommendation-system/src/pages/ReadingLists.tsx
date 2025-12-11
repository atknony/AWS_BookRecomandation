import { useState, useEffect } from 'react';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { Input } from '@/components/common/Input';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { getReadingLists, createReadingList } from '@/services/api';
import { ReadingList } from '@/types';
import { formatDate } from '@/utils/formatters';
import { handleApiError, showSuccess } from '@/utils/errorHandling';

/**
 * ReadingLists page component
 */
export function ReadingLists() {
  const [lists, setLists] = useState<ReadingList[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListDescription, setNewListDescription] = useState('');

  useEffect(() => {
    loadLists();
  }, []);

  const loadLists = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with DynamoDB query
      const data = await getReadingLists();
      setLists(data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateList = async () => {
    if (!newListName.trim()) {
      alert('Please enter a list name');
      return;
    }

    try {
      // TODO: Replace with DynamoDB put operation
      const newList = await createReadingList({
        userId: '1', // TODO: Get from auth context
        name: newListName,
        description: newListDescription,
        bookIds: [],
      });
      setLists([...lists, newList]);
      setIsModalOpen(false);
      setNewListName('');
      setNewListDescription('');
      showSuccess('Reading list created successfully!');
    } catch (error) {
      handleApiError(error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">My Reading Lists</h1>
            <p className="text-slate-600 text-lg">Organize your books into custom lists</p>
          </div>
          <Button variant="primary" size="lg" onClick={() => setIsModalOpen(true)}>
            Create New List
          </Button>
        </div>

        {lists.length === 0 ? (
          <div className="text-center py-12 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200">
            <svg
              className="w-16 h-16 text-slate-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No reading lists yet</h3>
            <p className="text-slate-600 mb-4">
              Create your first list to start organizing your books
            </p>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Create Your First List
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lists.map((list) => (
              <div
                key={list.id}
                className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-2">{list.name}</h3>
                <p className="text-slate-600 mb-4 line-clamp-2">{list.description}</p>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>{list.bookIds.length} books</span>
                  <span>Created {formatDate(list.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create New Reading List"
        >
          <div>
            <Input
              label="List Name"
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="e.g., Summer Reading 2024"
              required
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea
                value={newListDescription}
                onChange={(e) => setNewListDescription(e.target.value)}
                placeholder="What's this list about?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[100px] resize-none"
              />
            </div>

            <div className="flex gap-3">
              <Button variant="primary" onClick={handleCreateList} className="flex-1">
                Create List
              </Button>
              <Button variant="secondary" onClick={() => setIsModalOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
