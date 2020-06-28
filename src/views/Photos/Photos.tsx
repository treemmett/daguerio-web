import React, { FC, useState } from 'react';
import Photo from './components/Photo';
import { Photo as PhotoInt } from 'app';
import Preview from './components/Preview';
import { gql } from 'apollo-boost';
import styles from './Photos.scss';
import { useQuery } from '@apollo/react-hooks';

const PHOTOS = gql`
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

const Photos: FC = () => {
  const { data, loading } = useQuery<{ photos: PhotoInt[] }>(PHOTOS);
  const [previewUrl, setPreviewUrl] = useState<string>(undefined);

  if (loading) return <>loading</>;

  return (
    <div className={styles.photos}>
      {previewUrl && (
        <Preview close={() => setPreviewUrl(undefined)} url={previewUrl} />
      )}
      {data.photos.map((photo) => (
        <Photo
          color={photo.dominantColor}
          height={photo.height}
          key={photo.id}
          onClick={() => setPreviewUrl(photo.url)}
          thumbnails={photo.thumbnails ?? []}
          width={photo.width}
        />
      ))}
    </div>
  );
};

export default Photos;
