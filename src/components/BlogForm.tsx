'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface BlogFormProps {
  initialData?: {
    title: string;
    link: string;
  };
  onSubmit: (blog: any) => void;
  formTitle: string;
  submitButtonText: string;
}

const BlogForm = ({
  initialData = {
    title: '',
    link: '',
  },
  onSubmit,
  formTitle,
  submitButtonText,
}: BlogFormProps) => {
  const [blog, setBlog] = useState(initialData);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBlog((prev) => {
      const updatedBlog = {
        ...prev,
        [name]: value,
      };
      checkIfFormChanged(updatedBlog);
      return updatedBlog;
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!blog.title || !blog.link) {
      console.error('Title and link are required fields are required fields');
      return;
    }
    onSubmit(blog);
  };

  const handleCancel = () => {
    router.back();
  };

  const checkIfFormChanged = (updatedBlog: any) => {
    setIsFormChanged(JSON.stringify(updatedBlog) !== JSON.stringify(initialData));
  };

  useEffect(() => {
    checkIfFormChanged(blog);
  }, [blog]);


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[90%] p-6 max-w-lg bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">{formTitle}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={blog.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="link" className="block text-sm font-medium text-gray-700">
              Link
            </label>
            <input
              id="link"
              type="text"
              name="link"
              value={blog.link}
              onChange={handleInputChange}
              placeholder="Link"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-between space-x-4">
            <button
              type="submit"
              className={`w-full py-2 text-white rounded-md hover:bg-green-700 ${isFormChanged
                ? 'bg-green-600'
                : 'bg-gray-200 cursor-not-allowed hover:bg-gray-200'
                }`}
              disabled={!isFormChanged}
            >
              {submitButtonText}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="w-full py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
