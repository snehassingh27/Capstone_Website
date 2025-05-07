import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

// Configure PDF.js worker
if (typeof window !== 'undefined' && !pdfjs.GlobalWorkerOptions.workerSrc) {
  // Use a simpler worker approach
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
}

interface PdfViewerProps {
  pdfUrl: string;
  className?: string;
}

export function PdfViewer({ pdfUrl, className = '' }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setPageNumber(1);
  }, [pdfUrl]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoading(false);
    setError(false);
  }

  function onDocumentLoadError() {
    setLoading(false);
    setError(true);
  }

  function changePage(offset: number) {
    if (numPages) {
      const newPage = Math.min(Math.max(1, pageNumber + offset), numPages);
      setPageNumber(newPage);
    }
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  function zoomIn() {
    setScale(prevScale => Math.min(2.5, prevScale + 0.1));
  }

  function zoomOut() {
    setScale(prevScale => Math.max(0.5, prevScale - 0.1));
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="bg-gray-50 border rounded-md p-4 w-full max-w-3xl mb-4 flex flex-col items-center">
        {loading && (
          <div className="flex items-center justify-center h-40 w-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}
        
        {error && (
          <div className="flex flex-col items-center justify-center h-40 w-full text-red-500">
            <p className="mb-2 font-semibold">Failed to load the PDF document</p>
            <p className="text-sm">Please try again later</p>
          </div>
        )}
        
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={<></>}
          className="w-full"
        >
          <Page 
            pageNumber={pageNumber} 
            scale={scale} 
            renderTextLayer={true}
            renderAnnotationLayer={true}
            className="flex justify-center"
            loading={false}
          />
        </Document>
      </div>
      
      {numPages && (
        <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-3xl">
          <div className="flex items-center space-x-2 mb-2 sm:mb-0">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={zoomOut} 
              disabled={scale <= 0.5}
              aria-label="Zoom out"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm">{Math.round(scale * 100)}%</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={zoomIn} 
              disabled={scale >= 2.5}
              aria-label="Zoom in"  
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={previousPage} 
              disabled={pageNumber <= 1}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Page {pageNumber} of {numPages}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={nextPage} 
              disabled={numPages ? pageNumber >= numPages : true}
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}