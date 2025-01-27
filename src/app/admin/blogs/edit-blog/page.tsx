'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import BlogForm from '@/components/BlogForm';
import Spinner from '@/components/shared/Spinner';

export default function EditBlog() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
      title: '',
      link: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      const blogId = searchParams.get('id');
      if (!blogId) {
        console.error('Blog ID not found in the URL');
        setLoading(false);
        return;
      }

      try {
        const blogRef = doc(db, 'Blogs', blogId);
        const blogSnapshot = await getDoc(blogRef);

        if (blogSnapshot.exists()) {
          const blogData = blogSnapshot.data();
          setFormData({
            title: blogData.title || '',
            link: blogData.link || '',
          });
        } else {
          console.error('Blog not found in the database');
        }
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [searchParams]);

  const handleSubmit = async (blog: any) => {
    const blogId = searchParams.get('id');
    if (!blogId) {
      console.error('Blog ID not found in the URL');
      return;
    }

    try {
      const blogRef = doc(db, 'Blogs', blogId);
      await updateDoc(blogRef, blog);

      router.push('/admin/blogs');
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <BlogForm
      initialData={formData}
      onSubmit={handleSubmit}
      formTitle="Edit Blog"
      submitButtonText="Save"
    />
  );
}
