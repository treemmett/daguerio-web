import React, { FC, useEffect, useState } from 'react';
import { Photo } from 'app';
import gql from 'graphql-tag';
import styles from './Uploader.scss';
import { useMutation } from '@apollo/react-hooks';
import { v4 } from 'uuid';

interface FileData {
  id: string;
  file: File;
  isUploaded: boolean;
  isUploading: boolean;
}

const ADD_PHOTO = gql`
  mutation($photo: Upload!) {
    addPhoto(photo: $photo) {
      id
      height
      width
      dominantColor
      url
      thumbnails {
        id
        height
        width
        type
        url
      }
    }
  }
`;

interface AddPhoto {
  addPhoto: Photo;
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

  // add photo
  const [addPhoto] = useMutation<{ addPhoto: Photo }, { photo: File }>(
    ADD_PHOTO,
    {
      update: (cache, data) => {
        const query = gql`
          query Photos {
            photos {
              id
              dominantColor
              height
              width
              url
              thumbnails {
                url
                type
              }
            }
          }
        `;

        const { photos } = cache.readQuery<{ photos: Photo[] }>({
          query,
        });

        cache.writeQuery<{ photos: Photo[] }>({
          data: { photos: [...photos, data.data.addPhoto] },
          query,
        });
      },
    }
  );

  useEffect(() => {
    const filesCurrentlyUploading = files.filter((f) => f.isUploading);
    if (filesCurrentlyUploading.length > 2) {
      return;
    }

    const fileToUpload = files.find((f) => !f.isUploaded && !f.isUploading);
    if (!fileToUpload) return;

    addPhoto({ variables: { photo: fileToUpload.file } }).finally(() => {
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
    });
  }, [files, addPhoto]);

  if (!files.length) return null;

  if (files.every((f) => f.isUploaded)) {
    return (
      <div className={styles.uploader}>
        <div className={styles.title}>{files.length} photos uploaded.</div>
      </div>
    );
  }

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
