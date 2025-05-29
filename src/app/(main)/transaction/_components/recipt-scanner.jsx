"use client";

import { scanRecipt } from '@/actions/transaction';
import { Button } from '@/components/ui/button';
import useFetch from '@/hooks/use-fetch';
import { Camera, Loader2 } from 'lucide-react';
import React, { useRef, useEffect } from 'react';
import { toast } from 'sonner';

const ReciptScanner = ({ onScanComplete }) => {
    const fileInputRef = useRef();

    const {
      loading: scanReceiptLoading,
      fn: scanReceiptFn,
      data: scannedData 
    } = useFetch(scanRecipt);


    const handleReceiptScan = async (file) => {
    if (file.size > 5 * 1024 * 1024) { // file size should be under 5mb
        toast.error("File size should be less than 5MB");
        return;
        }

        await scanReceiptFn(file);
    };

    useEffect(() => {
        if (scannedData && !scanReceiptLoading) {
        onScanComplete(scannedData);
        toast.success("Receipt scanned successfully");
        }
    }, [scanReceiptLoading, scannedData]);

  return (
    <div>
        <input
         type='file'
         ref={fileInputRef} 
         className='hidden'
         accept='image/*'
         capture="environment" 
         onChange={(e) => {
            const file = e.target.files?.[0];
            if(file) handleReceiptScan(file);
         }}
        />
        <Button
         type="button"
         variant="outline"
         className="w-full h-10 bg-gradient-to-br from-emerald-500 via-teal-600 to-blue-700 animate-gradient hover:opacity-90 transition-opacity text-white hover:text-white"
         onClick={() => fileInputRef.current?.click()}
         disabled={scanReceiptLoading}
         >
            {scanReceiptLoading ? (
                <>
                  <Loader2 className='mr-2 animate-spin' />
                  <span>Scanning Receipt...</span>
                </>
            )  : (
                <>
                  <Camera className='mr-2' />
                  <span>Scan Receipt with AI</span>
                </>    
            )}
        </Button>
    </div>
  )
}

export default ReciptScanner;