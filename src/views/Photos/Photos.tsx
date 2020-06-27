import React, { FC } from 'react';
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
    }[];
  }[];
}

const Photos: FC = () => {
  const { data, loading } = useQuery<Photos>(PHOTOS);

  if (loading) return <>loading</>;

  return (
    <div className={styles.photos}>
      {data.photos.map((photo) => (
        <div
          className={styles.photo}
          key={photo.id}
          style={{
            gridRow: `span ${Math.floor(photo.thumbnails[0].height / 100)}`,
          }}
        >
          <img alt="alt" src={photo.thumbnails[0].url} />
        </div>
      ))}
    </div>
  );
};

export default Photos;
