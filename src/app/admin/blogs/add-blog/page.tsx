'use client';

import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { useRouter } from 'next/navigation';
import BlogForm from '@/components/BlogForm';

export default function AddBlog() {
  const router = useRouter();

  const handleSubmit = async (blog: any) => {
    const blogData = {
      title: blog.title,
      link: blog.link,
      image: blog.image,
    };
    if (!blogData.title || !blogData.link || !blogData.image) {
      return;
    }

    try {
      await addDoc(collection(db, 'Blogs'), blogData);
      router.push('/admin/blogs');
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  return (
    <BlogForm
      onSubmit={handleSubmit}
      formTitle="Add New Blog"
      submitButtonText="Save"
    />
  );
}
