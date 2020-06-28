import React, { FC } from 'react';
import Photo from './components/Photo';
import { gql } from 'apollo-boost';
import styles from './Photos.scss';
import { useQuery } from '@apollo/react-hooks';

const PHOTOS = gql`
  query Photos {
    photos {
      id
      thumbnails {
        id
        height
        url
        width
      }
    }
  }
`;

interface Photos {
  photos: {
    id: string;
    thumbnails: {
      id: string;
      height: number;
      url: string;
      width: number;
    }[];
  }[];
}

const Photos: FC = () => {
  const { data, loading } = useQuery<Photos>(PHOTOS);

  if (loading) return <>loading</>;

  return (
    <div className={styles.photos}>
      {data.photos.map((photo) => (
        <Photo
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
