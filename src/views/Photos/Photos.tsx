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
      thumbnails {
        id
        height
        url
        width
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
          height={photo.thumbnails[0].height}
          key={photo.id}
          url={photo.thumbnails[0].url}
          width={photo.thumbnails[0].width}
        />
      ))}
    </div>
  );
};

export default Photos;
