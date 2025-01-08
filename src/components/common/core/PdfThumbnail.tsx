'use client';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PdfThumbnailProps {
  pdfUrl: string;
}

const PdfThumbnail = ({ pdfUrl }: PdfThumbnailProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const onDocumentLoadSuccess = () => {
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    setLoading(false);
    setError('Failed to load PDF');
    console.error(`Error loading PDF: ${error.message}`);
  };

  return (
    <div className={`relative flex items-center justify-center h-full w-full`}>
      {loading && (
        <div className="absolute inset-0 bg-gray-200 w-full h-full flex flex-col justify-center">
          <div className="w-[80%] h-[2px] bg-gray-300 rounded-full mx-auto my-[1px] animate-pulse" />
          <div className="w-[80%] h-[2px] bg-gray-300 rounded-full mx-auto my-[1px] animate-pulse" />
          <div className="w-[80%] h-[2px] bg-gray-300 rounded-full mx-auto my-[1px] animate-pulse" />
          <div className="w-[80%] h-[2px] bg-gray-300 rounded-full mx-auto my-[1px] animate-pulse" />
          <div className="w-[80%] h-[2px] bg-gray-300 rounded-full mx-auto my-[1px] animate-pulse" />
          <div className="w-[80%] h-[2px] bg-gray-300 rounded-full mx-auto my-[1px] animate-pulse" />
          <div className="w-[80%] h-[2px] bg-gray-300 rounded-full mx-auto my-[1px] animate-pulse" />
          <div className="w-[80%] h-[2px] bg-gray-300 rounded-full mx-auto my-[1px] animate-pulse" />
        </div>
      )}
      {error && (
        <div className="absolute inset-0 bg-gray-200 w-full h-full flex justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-gray-500">?</div>
          </div>
        </div>
      )}
      {!error && (
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={null}
        >
          <Page
            pageNumber={1}
            width={40} // Converts Tailwind w- classes to pixel width
            height={48} // Converts Tailwind h- classes to pixel height
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        </Document>
      )}
    </div>
  );
};

export default PdfThumbnail;
