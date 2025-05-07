import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Configure the PDF.js worker location
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

interface SimplePdfViewerProps {
  pdfUrl: string;
  className?: string;
}

export default function SimplePdfViewer({ pdfUrl, className = '' }: SimplePdfViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => {
      const newPageNumber = prevPageNumber + offset;
      if (numPages === null) return prevPageNumber;
      if (newPageNumber < 1) return 1;
      if (newPageNumber > numPages) return numPages;
      return newPageNumber;
    });
  };

  const previousPage = () => changePage(-1);
  const nextPage = () => changePage(1);

  return (
    <div className={`pdf-container ${className}`}>
      <Document 
        file={pdfUrl} 
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<div className="text-center py-10">Loading PDF...</div>}
        error={<div className="text-center py-10 text-red-500">Error loading PDF document.</div>}
      >
        <Page 
          pageNumber={pageNumber} 
          scale={1.2}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          className="border border-gray-200 rounded shadow-sm mx-auto"
        />
      </Document>
      
      {numPages && (
        <div className="flex items-center justify-between mt-4">
          <Button 
            variant="outline" 
            onClick={previousPage} 
            disabled={pageNumber <= 1}
            className="flex items-center"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <p className="text-sm">
            Page {pageNumber} of {numPages}
          </p>
          
          <Button 
            variant="outline" 
            onClick={nextPage} 
            disabled={pageNumber >= numPages}
            className="flex items-center"
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}