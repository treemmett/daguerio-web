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
  const [previewId, setPreviewId] = useState<string>(undefined);
  const previewImage = data?.photos.find((p) => p.id === previewId);

  if (loading) return <>loading</>;

  return (
    <div className={styles.photos}>
      {previewId && (
        <Preview
          close={() => setPreviewId(undefined)}
          height={previewImage.height}
          placeholderUrl={
            previewImage.thumbnails.find((t) => t.type === 'NORMAL').url
          }
          url={previewImage.url}
          width={previewImage.width}
        />
      )}
      {data.photos.map((photo) => (
        <Photo
          color={photo.dominantColor}
          height={photo.height}
          key={photo.id}
          onClick={() => setPreviewId(photo.id)}
          thumbnails={photo.thumbnails ?? []}
          width={photo.width}
        />
      ))}
    </div>
  );
};

export default Photos;
