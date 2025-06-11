import React from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

export default function Shiamnu( {description}) {
  const html = DOMPurify.sanitize(marked(description));

  return (
    <div
      className="mt-5 whitespace-pre-line text-gray-500 md:w-4/5 max-h-64 overflow-y-auto border p-3"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
} 