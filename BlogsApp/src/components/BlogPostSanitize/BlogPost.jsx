import React from 'react';
import DOMPurify from 'dompurify';

function BlogPost({ description }) {
  // Sanitize the HTML content
  const sanitizedDescription = DOMPurify.sanitize(description);

  return (
    <div className="blog-description" dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
  );
}

export default BlogPost;
