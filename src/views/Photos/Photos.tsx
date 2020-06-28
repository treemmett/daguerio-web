import React, { FC } from 'react';
import Photo from './components/Photo';
import { Photo as PhotoInt } from 'app';
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
      thumbnails {
        url
        type
      }
    }
  }
`;

const Photos: FC = () => {
  const { data, loading } = useQuery<{ photos: PhotoInt[] }>(PHOTOS);

  if (loading) return <>loading</>;

  return (
    <div className={styles.photos}>
      {data.photos.map((photo) => (
        <Photo
          color={photo.dominantColor}
          height={photo.height}
          key={photo.id}
          thumbnails={photo.thumbnails ?? []}
          width={photo.width}
        />
      ))}
    </div>
  );
};

export default Photos;
