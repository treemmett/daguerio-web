import React, { FC, useEffect, useState } from 'react';
import styles from './Uploader.scss';
import { v4 } from 'uuid';

interface FileData {
  id: string;
  file: File;
  isUploaded: boolean;
  isUploading: boolean;
}

const Uploader: FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  if (isDragging) {
    // eslint-disable-next-line no-console
    console.log('Is dragging');
  }

  const [files, setFiles] = useState<FileData[]>([]);
  function dragEnd(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }

  function dragOver(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }

  function drop(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const newFiles = [...e.dataTransfer.files].map<FileData>((file) => ({
      file,
      id: v4(),
      isUploaded: false,
      isUploading: false,
    }));

    setFiles((f) => [...f, ...newFiles]);
  }

  useEffect(() => {
    window.addEventListener('dragover', dragOver);
    window.addEventListener('dragleave', dragEnd);
    window.addEventListener('drop', drop);
  }, []);

  useEffect(() => {
    const filesCurrentlyUploading = files.filter((f) => f.isUploading);
    if (filesCurrentlyUploading.length > 2) {
      return;
    }

    const fileToUpload = files.find((f) => !f.isUploaded && !f.isUploading);
    if (!fileToUpload) return;

    setTimeout(() => {
      setFiles((s) =>
        s.map((f) => {
          if (f.id === fileToUpload.id) {
            return {
              ...fileToUpload,
              isUploaded: true,
              isUploading: false,
            };
          }

          return f;
        })
      );
    }, Math.random() * 3000);
  }, [files]);

  if (!files.length) return null;

  return (
    <div className={styles.uploader}>
      <div className={styles.title}>Uploading photos to library</div>
      <div className={styles.status}>
        {`${files.filter((f) => f.isUploaded || f.isUploading).length} of ${
          files.length
        }`}
      </div>
    </div>
  );
};

export default Uploader;
